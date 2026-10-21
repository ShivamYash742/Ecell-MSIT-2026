import React from "react";
import logo from "../public/logo.png";
import { useLoading } from "../context/LoadingContext";

const Loader = () => {
  const { isLoading, words, currentWordIndex } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col justify-center items-center bg-black min-h-screen w-screen transition-opacity duration-300"
      style={{ pointerEvents: "all" }}
    >
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div>
          <img
            className="w-60 h-auto object-contain select-none"
            src={logo}
            alt="E-Cell MSIT logo"
          />
        </div>
        <div className="text-white text-5xl font-extrabold w-full text-center select-none tracking-tight">
          {words[currentWordIndex]}
        </div>
      </div>
    </div>
  );
};

export default Loader;
