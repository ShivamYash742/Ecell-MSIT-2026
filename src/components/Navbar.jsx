import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../public/logo.png";
import { useLoading } from "../context/LoadingContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigateWithLoader } = useLoading();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to, e) => {
    if (e) e.preventDefault();
    setIsMenuOpen(false);
    navigateWithLoader(to);
  };

  // Clicking top-left logo reloads the website and starts from the starting animation
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top Left Logo: Clicking reloads the website and replays starting animation */}
      <a href="/" className={styles.logo} onClick={handleLogoClick} aria-label="eCell MSIT Home - Reload to Intro">
        <img src={logo} alt="eCell MSIT Logo" />
      </a>

      {/* Desktop Links */}
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navLink} ${location.pathname === item.path ? styles.activeLink : ""}`}
            onClick={(e) => handleNavClick(item.path, e)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className={styles.hamburger} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.mobileLink} ${location.pathname === item.path ? styles.activeMobileLink : ""}`}
            onClick={(e) => handleNavClick(item.path, e)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
