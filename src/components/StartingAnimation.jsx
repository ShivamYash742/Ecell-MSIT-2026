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
      console.warn("Starting animation failed to initialize, skipping safely:", err);
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
      }, 450);
    };

    // Auto-dismiss smoothly after complete brand reveal sequence (4.8s)
    autoDismissTimer = setTimeout(() => {
      finishAnimation();
    }, 4800);

    // Guaranteed safety timeout: unblocks website after 5.5s under all circumstances
    safetyTimer = setTimeout(() => {
      finishAnimation();
    }, 5500);

    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space" || e.code === "Escape" || e.code === "Enter") {
        e.preventDefault();
        finishAnimation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      window.removeEventListener("keydown", handleKeyDown);
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

      {/* Floating Skip Intro Button */}
      <button
        type="button"
        onClick={() => {
          setFading(true);
          setTimeout(() => {
            if (animInstanceRef.current) {
              try {
                animInstanceRef.current.unmount();
              } catch (e) {}
              animInstanceRef.current = null;
            }
            dismissStartingAnimation();
            setFading(false);
          }, 350);
        }}
        className="absolute top-6 right-6 z-[1000] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md shadow-lg transition"
        title="Skip intro and enter website (Space / Esc)"
      >
        Skip Intro &rarr;
      </button>
    </div>
  );
};

export default StartingAnimation;
