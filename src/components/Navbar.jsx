import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../public/logo.png";
import { useLoading } from "../context/LoadingContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigateWithLoader } = useLoading();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <Link to="/" className={styles.logo} onClick={(e) => handleNavClick("/", e)}>
        <img src={logo} alt="E-Cell MSIT Logo" />
      </Link>

      {/* Desktop Links */}
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink} onClick={(e) => handleNavClick("/", e)}>Home</Link>
        <Link to="/about" className={styles.navLink} onClick={(e) => handleNavClick("/about", e)}>About</Link>
        <Link to="/team" className={styles.navLink} onClick={(e) => handleNavClick("/team", e)}>Team</Link>
        <Link to="/services" className={styles.navLink} onClick={(e) => handleNavClick("/services", e)}>Services</Link>
        <Link to="/events" className={styles.navLink} onClick={(e) => handleNavClick("/events", e)}>Events</Link>
        <Link to="/contact" className={styles.navLink} onClick={(e) => handleNavClick("/contact", e)}>Contact</Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className={styles.hamburger} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
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
        <Link to="/" className={styles.mobileLink} onClick={(e) => handleNavClick("/", e)}>Home</Link>
        <Link to="/about" className={styles.mobileLink} onClick={(e) => handleNavClick("/about", e)}>About</Link>
        <Link to="/team" className={styles.mobileLink} onClick={(e) => handleNavClick("/team", e)}>Team</Link>
        <Link to="/services" className={styles.mobileLink} onClick={(e) => handleNavClick("/services", e)}>Services</Link>
        <Link to="/events" className={styles.mobileLink} onClick={(e) => handleNavClick("/events", e)}>Events</Link>
        <Link to="/contact" className={styles.mobileLink} onClick={(e) => handleNavClick("/contact", e)}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
