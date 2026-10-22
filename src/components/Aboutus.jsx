import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";
import whoWeAreImg from "./images/who we are.jpg";
import missionImg from "./images/mission.jpg";
import achievementImg from "./images/achievement.jpg";
import eventsImg from "./images/events.jpg";
import establishmentImg from "./images/establishment.jpg";

const AboutUs = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const fadeElements = document.querySelectorAll(`.${styles.row}`);
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateUp);
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeElements.forEach((element) => {
      observerRef.current.observe(element);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll(`.${styles.row}`);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div className={styles.page} onMouseMove={handleMouseMove}>
      {/* Dynamic Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <h1 className={`${styles.title} ${styles.animateUp}`} style={{ animationDelay: '0.1s' }}>
          About e-Cell
          <span className={styles.titleUnderline} />
        </h1>
        <p className={`${styles.subtitle} ${styles.animateUp}`} style={{ animationDelay: '0.3s' }}>
          Fostering innovation, creativity, and the entrepreneurial spirit at MSIT.
        </p>
      </section>

      {/* Content Sections */}
      <div className={styles.sectionContainer}>
        
        {/* WHO ARE WE */}
        <div className={styles.row}>
          <div className={styles.textBlock}>
            <h2 className={styles.rowTitle}>Who We Are</h2>
            <p className={styles.rowText}>
              At e-Cell MSIT, we believe in fostering innovation and entrepreneurship among our students. Our incubation program provides a platform for young entrepreneurs to turn their ideas into successful startups. We are dedicated to nurturing the entrepreneurial spirit by offering guidance, resources, and networking opportunities to help transform ideas into impactful businesses.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <img src={whoWeAreImg} alt="Who We Are" className={styles.image} />
            </div>
          </div>
        </div>

        {/* OUR MISSION */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.textBlock}>
            <h2 className={styles.rowTitle}>Our Mission</h2>
            <p className={styles.rowText}>
              Our mission is to create a vibrant ecosystem that supports the growth of innovative startups. We provide resources, mentorship, and funding opportunities to help our startups succeed. By fostering collaboration between aspiring entrepreneurs, industry leaders, and investors, we aim to empower the next generation of innovators to turn their ideas into impactful businesses.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <img src="/our-mission.jpeg" alt="Our Mission" className={styles.image} />
            </div>
          </div>
        </div>

        {/* OUR ACHIEVEMENTS */}
        <div className={styles.row}>
          <div className={styles.textBlock}>
            <h2 className={styles.rowTitle}>Our Achievements</h2>
            <p className={styles.rowText}>
              We are proud of our achievements and the success of our startups. Here are a few highlights:
              <br/><br/>
              • Mr. Simarneet Singh's startup, <b>Jagudau</b>, selected for Shark Tank 2025.<br/>
              • Mr. Manav Solanki's startup, <b>Crowdfuez</b>, awarded by the President of India.<br/>
              • Successful organization of <b>Ideathon</b> in association with <b>NASSCOM</b>.<br/>
              • Over 50 startups incubated and funded in the last year.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <img src={achievementImg} alt="Our Achievements" className={styles.image} />
            </div>
          </div>
        </div>

        {/* EVENTS */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.textBlock}>
            <h2 className={styles.rowTitle}>Events</h2>
            <p className={styles.rowText}>
              We organize various events throughout the year to promote entrepreneurship and innovation. Some of our key events include:
              <br/><br/>
              • Annual Startup Fest<br/>
              • Monthly Workshops on Business Development<br/>
              • Networking Events with Industry Leaders<br/>
              • Pitch Competitions for Startups
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <img src={eventsImg} alt="Events" className={styles.image} />
            </div>
          </div>
        </div>

        {/* ESTABLISHMENT */}
        <div className={styles.row}>
          <div className={styles.textBlock}>
            <h2 className={styles.rowTitle}>Establishment</h2>
            <p className={styles.rowText}>
              e-Cell MSIT was established in 2020 with the vision to create a supportive environment for budding entrepreneurs. Since our inception, we have been committed to empowering students to explore their entrepreneurial potential and make a difference in the world.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.imageWrapper}>
              <img src={establishmentImg} alt="Establishment" className={styles.image} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
