import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  // Starting animation runs ONLY at the initial start of the website or full reload
  const [isStartingAnimation, setIsStartingAnimation] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Disable browser automatic scroll restoration so it never jumps down on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Whenever website is reloaded (e.g. browser reload circular arrow button), always reset to Home ("/")
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  const dismissStartingAnimation = () => {
    setIsStartingAnimation(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  // Direct, instant navigation between pages - NO transition loader
  const navigateWithLoader = (to) => {
    if (isStartingAnimation) {
      setIsStartingAnimation(false);
    }
    if (location.pathname !== to) {
      navigate(to);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <LoadingContext.Provider
      value={{
        isStartingAnimation,
        dismissStartingAnimation,
        navigateWithLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
