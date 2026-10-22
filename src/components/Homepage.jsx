import React from "react";
import styles from "./Home.module.css";
import { useTheme } from "../context/ThemeContext";

const activitiesData = [
  {
    title: "Study Abroad",
    description: "An interactive guidance session designed for students aspiring to pursue graduate studies and global research opportunities abroad.",
    image: "/IMG_3029-CLQUeSFB.jpg",
  },
  {
    title: "Career Launcher",
    description: "A focused seminar exploring career pathways across technology, management, and high-growth startup roles.",
    image: "/IMG_2094-BBlxtcv7.jpg",
  },
  {
    title: "MSME",
    description: "An official entrepreneurship awareness seminar conducted with MSME to guide student innovators on enterprise grants and incubation.",
    image: "/IMG_4617-Cg1tDCYQ.jpg",
  },
];

const sponsorsData = [
  {
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    imgClass: "h-11 max-w-[165px] object-contain",
  },
  {
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    imgClass: "h-10 max-w-[175px] object-contain",
  },
  {
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    imgClass: "h-10 max-w-[155px] object-contain mt-2",
  },
  {
    name: "Flipkart",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/flipkart.svg",
    imgClass: "h-10 max-w-[160px] object-contain",
  },
];

const speakersData = [
  {
    name: "Dr. Bill Van Heyst",
    role: "DEAN, FACULTY OF ENGINEERING, UNIVERSITY OF WINDSOR",
    primaryImg: "/1.jpeg",
    fallbackImg: "/Bill_Van_Heyst.png",
    initials: "BH",
    linkedin: "https://ca.linkedin.com/in/bill-van-heyst-197b5022",
  },
  {
    name: "Vedant Rusty",
    role: "YOUTUBER & PODCASTER @STORIESWITHRUSTY",
    primaryImg: "/2.jpeg",
    initials: "VR",
    linkedin: "https://in.linkedin.com/in/vedantrusty",
  },
  {
    name: "Bhanu Pathak",
    role: "FOUNDER GROWSHOW MEDIA",
    primaryImg: "/3.jpeg",
    initials: "BP",
    linkedin: "https://in.linkedin.com/in/pathakbhanu",
  },
];

const HomePage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${styles.homepageRoot} ${!isDarkMode ? styles.lightTheme : ""}`}>
      {/* Main Content Surface */}
      <main className={styles.surfaceGrid}>
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            {/* Animated Brand Heading */}
            <div className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl ${styles.themedHeading} ${styles.ecellAnimatedBrand}`}>
              eCell MSIT
            </div>

            {/* Animated Hero Headline Ideate. Inspire. Invest. */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-8xl tracking-tight leading-[1.08] py-2">
              <span className={styles.heroAnimatedWords} aria-label="Ideate. Inspire. Invest.">
                <span className={`${styles.heroWord} ${styles.wordGreen}`} style={{ "--word-index": 0 }}>
                  Ideate.
                </span>
                <span className={`${styles.heroWord} ${styles.wordBlue}`} style={{ "--word-index": 1 }}>
                  Inspire.
                </span>
                <span className={`${styles.heroWord} ${styles.wordGreen}`} style={{ "--word-index": 2 }}>
                  Invest.
                </span>
              </span>
            </h1>

            {/* Supporting Paragraph Text */}
            <p className={`max-w-2xl mx-auto text-sm sm:text-base ${styles.themedSubtext} tracking-wide leading-relaxed`}>
              Empowering student founders, innovators, and builders at Maharaja Surajmal Institute of Technology to transform bold ideas into scalable ventures.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a href="#about" className={`${styles.btnPrimary} text-xs sm:text-sm uppercase tracking-widest px-8 py-4 font-bold`}>
                About e-Cell
              </a>
              <a href="#activities" className={`${styles.btnSecondary} text-xs sm:text-sm uppercase tracking-widest px-7 py-4 font-semibold`}>
                Our Activities
              </a>
              <a href="#speakers" className={`${styles.btnSecondary} text-xs sm:text-sm uppercase tracking-widest px-7 py-4 font-semibold`}>
                Meet Our Speakers
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT ECELL AND OUR VISION SECTION */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About ECell Card */}
            <div className={`${styles.aboutVisionCard} p-8 sm:p-10`}>
              <h2 className={`font-display font-black text-3xl sm:text-4xl uppercase ${styles.themedHeading} mb-5`}>
                About E-Cell
              </h2>
              <p className={`${styles.themedSubtext} text-base sm:text-lg leading-relaxed`}>
                Our entrepreneurship cell serves as the primary catalyst for student-led startups on campus. We cultivate creative problem-solving and a founder mindset by equipping students with mentorship, operational backing, and a launchpad to bring their concepts to market through hands-on bootcamps and pitch arenas.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className={`${styles.aboutVisionCard} ${styles.cardBlueAccent} p-8 sm:p-10`}>
              <h2 className={`font-display font-black text-3xl sm:text-4xl uppercase ${styles.themedHeading} mb-5`}>
                Our Vision
              </h2>
              <p className={`${styles.themedSubtext} text-base sm:text-lg leading-relaxed`}>
                We strive to build an environment where technical innovation fuels real-world impact and every student is empowered to lead as a founder. Our mission is to nurture a self-sustaining network of driven builders who create meaningful economic and social value.
              </p>
            </div>
          </div>
        </section>

        {/* OUR ACTIVITIES SECTION */}
        <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col items-center">
            <h2 className={`font-display font-black text-4xl sm:text-5xl uppercase ${styles.themedHeading}`}>
              Our <span className="text-[#00C853]">Activities</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#00C853] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activitiesData.map((act, idx) => (
              <div key={idx} className={`${styles.clipCard} overflow-hidden flex flex-col justify-between`}>
                <div>
                  <div className={`relative h-60 overflow-hidden bg-[#0A0A0A] border-b ${styles.themedBorder}`}>
                    <img
                      src={act.image}
                      alt={act.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className={`font-display font-extrabold text-2xl uppercase ${styles.themedHeading} mb-3`}>
                      {act.title}
                    </h3>
                    <p className={`text-sm sm:text-base ${styles.themedSubtext} leading-relaxed`}>
                      {act.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OUR SPONSORS & BUNKTOBRAINS */}
        <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Featured Partner Banner BunkToBrains */}
          <div className={`${styles.clipCardBanner} bg-[#0A0A0A] text-[#F4F4F4] border border-[#0072FF] p-8 sm:p-12 mb-16 relative overflow-hidden`}>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#00C853] font-bold">
                  FEATURED ECOSYSTEM PARTNER
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  BunkToBrains &times; eCell MSIT
                </h3>
                <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-2xl">
                  Empowering GGSIPU & MSIT engineering students with high-impact exam crash courses, honest campus reviews, student podcasts, mentorship bootcamps, and career roadmaps&mdash;turning last-minute learners into industry-ready builders.
                </p>
                <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs text-[#F4F4F4]">
                  <span className="px-3 py-1.5 border border-[#9CA3AF]/30">IPU Engineering Mentorship</span>
                  <span className="px-3 py-1.5 border border-[#9CA3AF]/30">Career & Startup Podcasts</span>
                  <span className="px-3 py-1.5 border border-[#9CA3AF]/30">Student Skill Upskilling</span>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="https://www.youtube.com/@Bunktobrains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#00C853] hover:bg-[#0072FF] text-[#0A0A0A] hover:text-white font-mono text-xs uppercase tracking-widest font-bold text-center transition"
                >
                  Explore BunkToBrains
                </a>
                <a
                  href="https://www.linkedin.com/company/bunktobrains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-transparent hover:border-[#00C853] border border-[#9CA3AF]/40 text-white font-mono text-xs uppercase tracking-widest font-semibold text-center transition"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className={`font-display font-black text-4xl sm:text-5xl uppercase ${styles.themedHeading}`}>
              Our <span className="text-[#0072FF]">Sponsors</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#0072FF] mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {sponsorsData.map((sp, idx) => (
              <div key={idx} className={`${styles.clipCard} p-8 flex items-center justify-center min-h-[150px]`}>
                <div className="h-24 w-full flex items-center justify-center px-6 py-4 bg-white border border-[#9CA3AF]/30">
                  <img
                    src={sp.logoUrl}
                    alt={sp.name}
                    loading="lazy"
                    className={sp.imgClass}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MEET OUR SPEAKERS SECTION */}
        <section id="speakers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-10">
          <div className="text-center mb-14 flex flex-col items-center">
            <h2 className={`font-display font-black text-4xl sm:text-5xl uppercase ${styles.themedHeading}`}>
              Meet Our <span className="text-[#00C853]">Speakers</span>
            </h2>
            <div className="w-16 h-[2px] bg-[#00C853] mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakersData.map((sp, idx) => (
              <div key={idx} className={`${styles.clipCard} p-8 text-center flex flex-col items-center justify-between`}>
                <div className="w-full">
                  <div className={styles.speakerAvatarRing}>
                    <img
                      src={sp.primaryImg}
                      alt={sp.name}
                      loading="lazy"
                      onError={(e) => {
                        if (sp.fallbackImg && e.target.src !== sp.fallbackImg) {
                          e.target.src = sp.fallbackImg;
                        } else {
                          e.target.style.display = "none";
                        }
                      }}
                    />
                  </div>
                  <h3 className={`font-display font-extrabold text-2xl ${styles.themedHeading} mb-2`}>
                    {sp.name}
                  </h3>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#00C853] leading-relaxed max-w-xs mx-auto">
                    {sp.role}
                  </p>
                </div>
                <div className={`mt-7 pt-4 border-t ${styles.themedBorder} w-full flex justify-center`}>
                  <a
                    href={sp.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sp.name} LinkedIn`}
                    className="inline-flex items-center justify-center w-11 h-11 bg-[#0072FF] hover:bg-[#00C853] text-white hover:text-[#0A0A0A] font-display font-black text-xl transition"
                  >
                    in
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
