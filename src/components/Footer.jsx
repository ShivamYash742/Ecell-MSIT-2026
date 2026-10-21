import React from "react";
import logo from "../public/logo.png";
import instagramLogo from "../public/instagram.png";
import linkedinLogo from "../public/linkedin.png";
import facebookLogo from "../public/facebook.png";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useLoading } from "../context/LoadingContext";

const Footer = () => {
  const { navigateWithLoader } = useLoading();

  const handleLinkClick = (to, e) => {
    if (e) e.preventDefault();
    navigateWithLoader(to);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo & Description */}
          <div className={styles.col}>
            <Link to="/" className={styles.logo} onClick={(e) => handleLinkClick("/", e)}>
              <img src={logo} alt="E-Cell MSIT Logo" />
            </Link>
            <p className={styles.text}>
              Empowering students to innovate, lead, and create impactful solutions for the future.
            </p>
          </div>

          {/* Contact Info */}
          <div className={styles.col}>
            <h4 className={styles.title}>Contact Us</h4>
            <div className={styles.text}>
              <p>eCell MSIT, Maharaja Surajmal Institute of Technology</p>
              <p>C-4 Janakpuri, New Delhi - 110059</p>
            </div>
          </div>

          {/* Useful Links */}
          <div className={styles.col}>
            <h4 className={styles.title}>Useful Links</h4>
            <ul className={styles.links}>
              <li>
                <Link to="/about" className={styles.link} onClick={(e) => handleLinkClick("/about", e)}>About Us</Link>
              </li>
              <li>
                <Link to="/services" className={styles.link} onClick={(e) => handleLinkClick("/services", e)}>Services</Link>
              </li>
              <li>
                <Link to="/events" className={styles.link} onClick={(e) => handleLinkClick("/events", e)}>Events</Link>
              </li>
              <li>
                <Link to="/team" className={styles.link} onClick={(e) => handleLinkClick("/team", e)}>Team</Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className={styles.col}>
            <h4 className={styles.title}>Follow Us</h4>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/ecellmsit/" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <img src={instagramLogo} alt="Instagram" />
              </a>
              <a href="https://in.linkedin.com/company/ecellmsit" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <img src={linkedinLogo} alt="LinkedIn" />
              </a>
              <a href="https://www.facebook.com/ecellmsit/" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <img src={facebookLogo} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} eCell MSIT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
