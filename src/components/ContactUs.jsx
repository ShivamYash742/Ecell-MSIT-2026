import React, { useRef } from "react";
import styles from "./Contact.module.css";
import instagramLogo from "../public/instagram.png";
import linkedinLogo from "../public/linkedin.png";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Maharaja+Surajmal+Institute+of+Technology+Janakpuri+New+Delhi";

const ArrowIcon = () => (
  <svg className={styles.detailArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ContactUs = () => {
  const pageRef = useRef(null);

  // Cursor-follow glow: scoped to this page via ref (no document-wide query)
  const handleMouseMove = (e) => {
    if (!pageRef.current) return;
    const cards = pageRef.current.querySelectorAll("[data-glow]");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    e.target.reset();
  };

  return (
    <div className={styles.page} onMouseMove={handleMouseMove} ref={pageRef}>
      <div className={styles.background} />

      <div className={styles.container}>
        {/* Info Side */}
        <div className={styles.infoSide}>
          <span className={styles.eyebrow}>Contact</span>
          <h1 className={styles.title}>Get in Touch</h1>
          <span className={styles.titleUnderline} />
          <p className={styles.subtitle}>
            Have questions about E-Cell, our incubation program, or upcoming events?
            We'd love to hear from you. Drop us a message and our team will get back to you shortly.
          </p>

          <div className={styles.contactDetails}>
            <a
              className={styles.detailItem}
              data-glow
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.detailText}>
                <h4>Visit Us</h4>
                <p>Maharaja Surajmal Institute of Technology<br />C-4 Janakpuri, New Delhi - 110059</p>
              </div>
              <ArrowIcon />
            </a>

            <a className={styles.detailItem} data-glow href="mailto:ecell@msit.in">
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.detailText}>
                <h4>Email Us</h4>
                <p>ecell@msit.in</p>
              </div>
              <ArrowIcon />
            </a>
          </div>

          <div className={styles.socials}>
            <span className={styles.socialsLabel}>Follow us</span>
            <a href="https://www.instagram.com/ecellmsit/" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <img src={instagramLogo} alt="" />
            </a>
            <a href="https://in.linkedin.com/company/ecellmsit" target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <img src={linkedinLogo} alt="" />
            </a>
          </div>
        </div>

        {/* Form Side */}
        <div className={styles.formSide} data-glow>
          <div className={styles.formHeader}>
            <h2>Send us a message</h2>
            <p>We usually reply by email.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                className={styles.input}
                placeholder="Your full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                className={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                placeholder="How can we help you?"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;