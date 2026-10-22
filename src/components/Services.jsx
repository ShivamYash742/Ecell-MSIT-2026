import React, { useState, useEffect } from "react";
import styles from "./Services.module.css";
import { useLoading } from "../context/LoadingContext";

const services = [
  {
    id: "mentorship",
    title: "Personalised Mentorship",
    shortDesc: "One-on-one or group mentorship from experienced entrepreneurs and industry experts. Get guidance tailored to your specific needs.",
    detailedOverview: "Connect 1-on-1 with established startup founders, seasoned venture capitalists, and MSIT alumni tailored to your specific domain.",
    keyDeliverables: [
      "Structured 1:1 strategy reviews and milestone checkpoints",
      "Comprehensive pitch deck evaluations and investor readiness audits",
      "Direct introductions to alumni founder networks and domain specialists",
      "Product-Market Fit (PMF) validation and go-to-market guidance"
    ],
    audience: "Early-stage student founders with a clear problem statement, prototype, or early traction looking for structured guidance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "workshops",
    title: "Workshops & Seminars",
    shortDesc: "Regular workshops on business fundamentals like fundraising, marketing, and scaling. Learn from industry leaders.",
    detailedOverview: "High-impact, practical masterclasses that bridge the gap between engineering concepts and venture commercialization.",
    keyDeliverables: [
      "Hands-on masterclasses on unit economics, customer discovery, and SaaS metrics",
      "Legal fundamentals: company registration, IP patents, and trademark guidelines",
      "Interactive fireside chats and teardowns with YC, Forbes 30u30, and unicorn operators",
      "Growth marketing, branding, and organic customer acquisition tactics"
    ],
    audience: "Aspiring entrepreneurs and tech builders eager to learn practical venture execution from industry veterans.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: "funding",
    title: "Startup Funding",
    shortDesc: "Connect with VCs, angel investors, and crowdfunding platforms. Get access to pitching sessions.",
    detailedOverview: "Direct pipelines to government grants, institutional seed funds, and accredited angel investor networks.",
    keyDeliverables: [
      "Exclusive pitching slots at the annual E-Cell MSIT Flagship E-Summit arena",
      "End-to-end guidance for MSME Idea Hackathon grants (up to ₹15 Lakhs) and Startup India Seed Fund",
      "Term sheet breakdowns, cap table management, and valuation advisory",
      "Warm introductions to early-stage angel syndicates and venture capital partners"
    ],
    audience: "Campus startups and teams with validated prototypes or proof-of-concept seeking seed or non-dilutive grant funding.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "incubation",
    title: "Incubation Support",
    shortDesc: "Access workspace, internet, and resources through our incubation partners. Develop your ideas in a supportive environment.",
    detailedOverview: "Zero-cost campus incubation support powered by MSIT's entrepreneurial cell and state-of-the-art incubation facilities.",
    keyDeliverables: [
      "Physical co-working space and high-speed dedicated connectivity on campus",
      "Complimentary cloud credits (AWS, Google Cloud, Azure) and developer tool subscriptions",
      "Official institutional endorsement, patent cell coordination, and student attendance flexibility",
      "Comprehensive CA, legal compliance, and startup incorporation assistance"
    ],
    audience: "Student teams and solo founders actively writing code or engineering physical products requiring on-campus backing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "networking",
    title: "Networking Opportunities",
    shortDesc: "Connect with investors, mentors, and peers at mixers, meetups, and demo days. Expand your professional network.",
    detailedOverview: "Immerse yourself into a vibrant founder ecosystem spanning 50+ college entrepreneurship cells, startup hubs, and tech founders across India.",
    keyDeliverables: [
      "Invitations to closed-door founder dinners, roundtable meetups, and investor mixers",
      "Collaborative access across premier Delhi-NCR university entrepreneurship networks",
      "Exclusive co-founder matchmaking to pair technical minds with business & design operators",
      "Access to eCell MSIT's internal community of over 500+ active innovators and alumni"
    ],
    audience: "Engineers, designers, and business students looking to meet ambitious co-founders or join promising student ventures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    id: "competitions",
    title: "Competitions & Challenges",
    shortDesc: "Participate in pitch competitions, hackathons, and case study challenges. Showcase your ideas and win prizes.",
    detailedOverview: "Compete in high-stakes campus, state, and national entrepreneurial challenges with cash prizes, mentorship, and VC spotlight.",
    keyDeliverables: [
      "Annual flagship arenas: Eureka! Ideathon, MSME Business Plan Challenges, & Case Competitions",
      "Rigorous feedback rounds judged by active VCs, angel investors, and seasoned founders",
      "Exciting cash prize pools, equity-free grants, trophies, and official recognition",
      "Fast-track entry into regional incubator cohorts and national accelerator stages"
    ],
    audience: "Any student with a creative idea, prototype, or business model ready to prove their venture under competitive jury scrutiny.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { navigateWithLoader } = useLoading();

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(`.${styles.card}`);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleApplyNow = () => {
    setSelectedService(null);
    navigateWithLoader("/contact");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    if (selectedService) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  return (
    <div className={styles.page} onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <h1 className={`${styles.title} ${styles.animateUp}`} style={{ animationDelay: "0.1s" }}>
          Our Services
          <span className={styles.titleUnderline} />
        </h1>
        <p className={`${styles.subtitle} ${styles.animateUp}`} style={{ animationDelay: "0.3s" }}>
          Empowering entrepreneurs with the tools, mentorship, and resources they need to succeed.
        </p>
      </section>

      {/* Services Grid */}
      <section className={styles.section}>
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`${styles.card} ${styles.animateUp}`}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              onClick={() => handleCardClick(service)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(service);
                }
              }}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <div className={styles.textContainer}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.shortDesc}</p>
              </div>

              {/* Click to expand pill */}
              <div className={styles.cardClickHint}>
                <span>Click for details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Service Detail Modal Popup */}
      {selectedService && (
        <div 
          className={styles.modalOverlay}
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div 
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInfo}>
                <div className={styles.modalIconBox}>
                  {selectedService.icon}
                </div>
                <div>
                  <span className={styles.modalBadge}>Official eCell Service</span>
                  <h2 id="service-modal-title" className={styles.modalTitle}>
                    {selectedService.title}
                  </h2>
                </div>
              </div>
              <button 
                type="button"
                className={styles.modalCloseBtn}
                onClick={handleCloseModal}
                aria-label="Close service modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Overview</h4>
                <p className={styles.modalText}>{selectedService.detailedOverview}</p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Key Deliverables & Benefits</h4>
                <ul className={styles.modalList}>
                  {selectedService.keyDeliverables.map((item, i) => (
                    <li key={i} className={styles.modalListItem}>
                      <span className={styles.modalListDot}>&#10003;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSubheading}>Who It Is For</h4>
                <p className={styles.modalText}>{selectedService.audience}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className={styles.modalFooter}>
              <button 
                type="button"
                onClick={handleApplyNow}
                className={styles.modalPrimaryBtn}
              >
                Apply / Connect with eCell &rarr;
              </button>
              <button 
                type="button"
                onClick={handleCloseModal}
                className={styles.modalSecondaryBtn}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
