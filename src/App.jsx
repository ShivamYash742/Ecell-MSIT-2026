import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import StartingAnimation from "./components/StartingAnimation";
import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import Footer from "./components/Footer";
import Aboutus from "./components/Aboutus";
import Events from "./components/Events";
import ContactUs from "./components/ContactUs";
import Team from "./components/Team";
import AdminPage from "./components/Admin";
import Services from "./components/Services";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "dark-theme bg-[#0A0A0A] text-[#F4F4F4]"
          : "light-theme bg-[#F4F4F4] text-[#0A0A0A]"
      }`}
    >
      <StartingAnimation />
      {/* 3D Moving Globe Background - Active across EVERY page */}
      <Background3D />

      <div className="relative z-10 overflow-hidden">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
