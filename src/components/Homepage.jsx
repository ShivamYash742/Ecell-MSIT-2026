import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Home.module.css";

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
  const canvasRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const sceneRef = useRef(null);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecell_theme");
      if (saved) {
        setIsDarkMode(saved === "dark");
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ecell_theme", next ? "dark" : "light");
      } catch (e) {}
      if (sceneRef.current && sceneRef.current.fog) {
        sceneRef.current.fog.color.setHex(next ? 0x0a0a0a : 0xf4f4f4);
      }
      return next;
    });
  };

  // 3D Three.js WebGL Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (e) {
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0a0a0a : 0xf4f4f4, 0.032);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x00c853, 2.5, 35);
    greenLight.position.set(4, 4, 4);
    scene.add(greenLight);

    const blueLight = new THREE.PointLight(0x0072ff, 2.5, 40);
    blueLight.position.set(-6, -4, 3);
    scene.add(blueLight);

    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    const crystalGeo = new THREE.OctahedronGeometry(2.0, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x00c853,
      emissive: 0x0072ff,
      emissiveIntensity: 0.22,
      roughness: 0.15,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      opacity: 0.22,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(crystalMesh);

    const wireGeo = new THREE.IcosahedronGeometry(2.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0072ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    crystalGroup.add(wireMesh);

    const ringGeo = new THREE.TorusGeometry(4.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c853,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    crystalGroup.add(ringMesh);

    const shards = [];
    const shardGeo = new THREE.DodecahedronGeometry(0.55, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x0072ff,
      roughness: 0.4,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      opacity: 0.28,
    });

    for (let i = 0; i < 20; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 20) * Math.PI * 2;
      const radius = 5.5 + Math.random() * 8;
      shard.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 10 - 3
      );
      const scale = 0.35 + Math.random() * 0.85;
      shard.scale.set(scale, scale, scale);
      shard.userData = {
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012,
        offset: Math.random() * Math.PI * 2,
      };
      scene.add(shard);
      shards.push(shard);
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY || 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      crystalMesh.rotation.y = t * 0.3;
      crystalMesh.rotation.x = Math.sin(t * 0.4) * 0.2;
      wireMesh.rotation.y = -t * 0.18;
      ringMesh.rotation.z = t * 0.35;

      crystalGroup.position.y = Math.sin(t * 1.1) * 0.3;
      crystalGroup.position.x = THREE.MathUtils.lerp(crystalGroup.position.x, mouseX * 1.4, 0.05);

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 14 - Math.min(scrollY * 0.0015, 4), 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 0.7, 0.05);

      shards.forEach((s) => {
        s.rotation.x += s.userData.rotX;
        s.rotation.y += s.userData.rotY;
        s.position.y += Math.sin(t + s.userData.offset) * 0.0025;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
    };
  }, []);

  return (
    <div className={`${styles.homepageRoot} ${!isDarkMode ? styles.lightTheme : ""}`}>
      {/* 3D WebGL Background Canvas */}
      <canvas ref={canvasRef} className={styles.webglCanvas} />

      {/* Floating Theme Switch */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={styles.themeSwitchBtn}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: isDarkMode ? "#0072FF" : "#00C853" }}
        />
        <span className="font-mono text-xs font-bold uppercase tracking-widest">
          {isDarkMode ? "Dark Theme" : "Light Theme"}
        </span>
      </button>

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
                About E-Cell
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
                  BunkToBrains × eCell MSIT
                </h3>
                <p className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-2xl">
                  Empowering GGSIPU & MSIT engineering students with high-impact exam crash courses, honest campus reviews, student podcasts, mentorship bootcamps, and career roadmaps—turning last-minute learners into industry-ready builders.
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
                        e.target.style.display = "none";
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
