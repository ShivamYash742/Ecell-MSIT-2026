import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const isInitialMount = useRef(true);

  // Cycling words: exact words from original App.jsx
  const words = ["Ideate.", "Inspire.", "Invest."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 800);

    return () => clearInterval(interval);
  }, [words.length]);

  // Initial load effect
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      isInitialMount.current = false;
    }, 2400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Browser back/forward navigation support
  useEffect(() => {
    if (isInitialMount.current) return;

    setIsLoading(true);
    setCurrentWordIndex(0);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  // Navigation function invoked on any navbar / navigation control click
  const navigateWithLoader = (to) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsLoading(true);
    setCurrentWordIndex(0);

    if (location.pathname !== to) {
      navigate(to);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        words,
        currentWordIndex,
        navigateWithLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
