import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  // Starting animation runs ONLY at the initial start of the website or full reload
  const [isStartingAnimation, setIsStartingAnimation] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const dismissStartingAnimation = () => {
    setIsStartingAnimation(false);
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
