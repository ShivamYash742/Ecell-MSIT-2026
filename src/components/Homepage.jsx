import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import clip from "./images/hero.mp4";
import img1 from "../public/IMG_3029.JPG";
import img2 from "../public/IMG_2094.JPG";
import img3 from "../public/IMG_4617.JPG";
import speaker1 from "../public/Bill_Van_Heyst.png";
import speaker2 from "../public/2.jpeg";
import speaker3 from "../public/3.jpeg";
import linkedinLogo from "../public/linkedin.png";

const HomePage = () => {
  const activities = [
    {
      title: "Study Abroad",
      description: "A session on studying abroad for the students who wanted to pursue higher studies abroad.",
      image: img1,
    },
    {
      title: "Career Launcher",
      description: "A seminar on building a successful career in business and technology.",
      image: img2,
    },
    {
      title: "MSME",
      description: "MSME conducted a seminar to promote entrepreneurship in the institute.",
      image: img3,
    },
  ];

  const sponsorLogos = [
    { name: "Sponsor 1", logo: "https://cdn.iconscout.com/icon/free/png-256/free-amazon-logo-icon-download-in-svg-png-gif-file-formats--brand-social-media-card-pack-logos-icons-1583154.png" },
    { name: "Sponsor 2", logo: "https://shop.mycrofine.com/wp-content/uploads/2023/06/flipkart.png" },
    { name: "Sponsor 3", logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" },
    { name: "Sponsor 4", logo: "https://www.techinfobit.com/wp-content/uploads/2012/08/Microsoft-Unveils-a-New-Logo-in-25-Years-New-Microsoft-Windows-Logo-techinfoBiT-Microsoft-New-PNG-Logo-Top-tech-Blog-bangalore.png" },
  ];

  const speakers = [
    {
      image: speaker1,
      name: "Dr. Bill Van Heyst",
      role: "Dean, Faculty of Engineering, University of Windsor",
      linkedin: "https://www.linkedin.com/in/bill-van-heyst-424735171/",
    },
    {
      image: speaker2,
      name: "Vedant Rusty",
      role: "YouTuber & Podcaster @storieswithrusty",
      linkedin: "https://in.linkedin.com/in/vedantrusty",
    },
    {
      image: speaker3,
      name: "Bhanu pathak",
      role: "Founder Growshow Media",
      linkedin: "https://in.linkedin.com/in/pathakbhanu",
    },
  ];

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Growth rate: increase by 1 for every 300px scrolled. Cap at 3.5x.
      const newScale = 1 + scrollY / 300;
      setScale(Math.min(newScale, 3.5));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video className={styles.heroVideo} src={clip} autoPlay loop muted playsInline />
        <div className={styles.heroContent}>
          <div className={styles.animateUp}>
            <h1
              className={styles.heroTitle}
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform',
                display: 'inline-block'
              }}
            >
              eCell MSIT
            </h1>
          </div>
          <p className={`${styles.heroSubtitle} ${styles.animateUp}`} style={{ animationDelay: '0.2s' }}>
            Ideate. Inspire. Invest.
          </p>
        </div>
      </section>

      {/* About & Vision Section */}
      <section className={styles.section}>
        <div className={styles.aboutVisionGrid}>
          <div className={`${styles.glassCard} ${styles.animateUp}`}>
            <h2 className={styles.cardTitle}>About E-Cell</h2>
            <p className={styles.cardText}>
              eCell is the driving force behind entrepreneurship at our college. We aim to foster creativity, innovation, and entrepreneurial spirit among students by providing them with the necessary resources, guidance, and platform to turn their ideas into reality. From workshops to startup competitions, we are here to support the next generation of entrepreneurs.
            </p>
          </div>
          <div className={`${styles.glassCard} ${styles.animateUp}`} style={{ animationDelay: '0.2s' }}>
            <h2 className={styles.cardTitle}>Our Vision</h2>
            <p className={styles.cardText}>
              We envision a world where innovation drives progress, and every student has the ability to lead and succeed in the field of entrepreneurship. Our goal is to foster an ecosystem of passionate entrepreneurs who can bring positive change to society and the economy.
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.animateUp}`}>
          Our Activities
          <span className={styles.titleUnderline} />
        </h2>
        <div className={styles.activitiesGrid}>
          {activities.map((activity, idx) => (
            <div key={idx} className={`${styles.activityCard} ${styles.animateUp}`} style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <img src={activity.image} alt={activity.title} className={styles.activityImage} />
              <div className={styles.activityInfo}>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
                <p className={styles.activityDesc}>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className={`${styles.sectionTitle} ${styles.animateUp}`} style={{ fontSize: '2rem', marginTop: '6rem' }}>
          Our Sponsors
        </h3>
        <div className={`${styles.sponsorsWrap} ${styles.animateUp}`}>
          <div className={styles.sponsorsTrack}>
            {/* Double array for seamless loop */}
            {[...sponsorLogos, ...sponsorLogos].map((sponsor, idx) => (
              <img key={idx} src={sponsor.logo} alt={sponsor.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className={styles.speakersSection}>
        <h2 className={`${styles.sectionTitle} ${styles.animateUp}`}>
          Meet Our Speakers
          <span className={styles.titleUnderline} />
        </h2>
        <div className={styles.speakersGrid}>
          {speakers.map((speaker, idx) => (
            <div key={idx} className={`${styles.speakerCard} ${styles.animateUp}`} style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <img src={speaker.image} alt={speaker.name} className={styles.speakerImg} />
              <h3 className={styles.speakerName}>{speaker.name}</h3>
              <p className={styles.speakerRole}>{speaker.role}</p>
              <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn" className={styles.linkedinIcon} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
