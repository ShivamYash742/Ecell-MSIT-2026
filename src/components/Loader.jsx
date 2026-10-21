import React from "react";
import logo from "../public/logo.png";
import { useLoading } from "../context/LoadingContext";

const Loader = () => {
  const { isNavLoading, words, currentWordIndex } = useLoading();

  if (!isNavLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col justify-center items-center bg-[#0A0A0A] min-h-screen w-screen transition-opacity duration-300"
      style={{ pointerEvents: "all" }}
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div>
          <img
            className="w-60 h-auto object-contain select-none"
            src={logo}
            alt="eCell MSIT logo"
          />
        </div>
        <div className="text-[#F4F4F4] text-5xl font-extrabold w-full text-center select-none tracking-tight font-display">
          {words[currentWordIndex]}
        </div>
      </div>
    </div>
  );
};

export default Loader;
