import React, { useEffect, useRef, useState } from "react";
import { Animation4Module } from "../animation/final-animation/index.js";
import { useLoading } from "../context/LoadingContext";

const StartingAnimation = () => {
  const { isStartingAnimation, dismissStartingAnimation } = useLoading();
  const containerRef = useRef(null);
  const animInstanceRef = useRef(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isStartingAnimation) return;

    setFading(false);
    let autoDismissTimer = null;
    let fadeTimer = null;
    let safetyTimer = null;

    try {
      if (containerRef.current) {
        const anim = new Animation4Module();
        animInstanceRef.current = anim;
        anim.mount(containerRef.current);
      }
    } catch (err) {
      console.warn("Starting animation failed to initialize, continuing to site:", err);
      dismissStartingAnimation();
      return;
    }

    const finishAnimation = () => {
      setFading(true);
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        if (animInstanceRef.current) {
          try {
            animInstanceRef.current.unmount();
          } catch (e) {}
          animInstanceRef.current = null;
        }
        dismissStartingAnimation();
        setFading(false);
      }, 500);
    };

    // Compulsory full run of the starting animation (4.5s), then smoothly transitions into the website
    autoDismissTimer = setTimeout(() => {
      finishAnimation();
    }, 4500);

    // Backup safety timer in case tab was backgrounded during load
    safetyTimer = setTimeout(() => {
      finishAnimation();
    }, 5500);

    return () => {
      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (animInstanceRef.current) {
        try {
          animInstanceRef.current.unmount();
        } catch (e) {}
        animInstanceRef.current = null;
      }
    };
  }, [isStartingAnimation, dismissStartingAnimation]);

  if (!isStartingAnimation) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] w-screen h-screen bg-[#070B14] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ overflow: "hidden" }}
      aria-label="eCell MSIT Starting Animation"
    >
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default StartingAnimation;
