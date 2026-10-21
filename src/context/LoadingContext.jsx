import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  // Starting animation runs once on initial website entry
  const [isStartingAnimation, setIsStartingAnimation] = useState(true);

  // Navbar and page transition loader
  const [isNavLoading, setIsNavLoading] = useState(false);
  const words = ["Ideate.", "Inspire.", "Invest."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const wordsIntervalRef = useRef(null);
  const isInitialMount = useRef(true);
  const navigatingRef = useRef(false);

  // Cycling words during nav loading
  useEffect(() => {
    if (isNavLoading) {
      wordsIntervalRef.current = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 260);
    } else {
      if (wordsIntervalRef.current) {
        clearInterval(wordsIntervalRef.current);
        wordsIntervalRef.current = null;
      }
    }
    return () => {
      if (wordsIntervalRef.current) clearInterval(wordsIntervalRef.current);
    };
  }, [isNavLoading, words.length]);

  // Handle browser back and forward navigation
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If navigation was already triggered by navigateWithLoader, avoid double triggering
    if (navigatingRef.current) {
      navigatingRef.current = false;
      return;
    }

    setIsNavLoading(true);
    setCurrentWordIndex(0);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsNavLoading(false);
    }, 850);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  // Function called on Navbar, Footer, and page internal links
  const navigateWithLoader = (to) => {
    if (isStartingAnimation) {
      setIsStartingAnimation(false);
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    navigatingRef.current = true;
    setIsNavLoading(true);
    setCurrentWordIndex(0);

    if (location.pathname !== to) {
      navigate(to);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    timerRef.current = setTimeout(() => {
      setIsNavLoading(false);
      navigatingRef.current = false;
    }, 850);
  };

  const dismissStartingAnimation = () => {
    setIsStartingAnimation(false);
  };

  const replayStartingAnimation = () => {
    setIsNavLoading(false);
    setIsStartingAnimation(true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <LoadingContext.Provider
      value={{
        isStartingAnimation,
        dismissStartingAnimation,
        replayStartingAnimation,
        isNavLoading,
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
