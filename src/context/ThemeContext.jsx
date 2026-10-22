import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("ecell_theme");
      if (saved) {
        return saved === "dark";
      }
    } catch (e) {}
    return true; // Default to dark theme
  });

  useEffect(() => {
    try {
      localStorage.setItem("ecell_theme", isDarkMode ? "dark" : "light");
    } catch (e) {}

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    } else {
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
