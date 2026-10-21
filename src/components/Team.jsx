
import React, { useState, useEffect } from "react";
import styles from "./Team.module.css";

const teamData = {
  teachers: [
    {
      name: "Dr. Neeru Rathee",
      position: "Convenor",
      image: "/images/Events/neer.png",
    },
    {
      name: "Dr. Aman K. Dahiya",
      position: "Co-Convenor",
      image: "/images/Events/amank.jpg",
    },
    {
      name: "Dr. Rakhi Kamra",
      position: "Department Advisor",
      image: "/images/Events/rakhi.jpg",
    },
    {
      name: "Dr. Manoj Malik",
      position: "Department Advisor",
      image: "/images/Events/manoj.jpg",
    },
    {
      name: "Dr. Garima",
      position: "Department Advisor",
      image: "/images/Events/garima.jpg",
    },
    {
      name: "Dr. Saba Khanum",
      position: "Department Advisor",
      image: "/images/Events/saba.jpeg",
    },
  ],
  coreTeam: {
    leadership: [
      {
        name: "Sannidhya",
        position: "President",
        image: "/images/eCell Core 2025-26 Photos/Sannidhya.jpg",
      },
      {
        name: "Hargun Kaur",
        position: "Vice President",
        image: "/images/eCell Core 2025-26 Photos/hargun.jpg",
      },
      {
        name: "Devansh Parti",
        position: "Vice President Incubation",
        image: "/images/eCell Core 2025-26 Photos/DevanshParti_VicePresident_Incubation.jpg",
      },
      {
        name: "Kartik Upadhayay",
        position: "General Secretary",
        image: "/images/eCell Core 2025-26 Photos/KartikUpadhayay_GenSec (1).jpg",
      },
      {
        name: "Saiansh",
        position: "General Secretary Incubation",
        image: "/images/eCell Core 2025-26 Photos/Saiansh_GenSec Incubation.jpg"
      },
    ],
    departments: [
      {
        name: "Event Management",
        heads: [
          { name: "Bhumi Suri", image: "/images/eCell Core 2025-26 Photos/BhumiSuri_ExecutiveEVM.jpg" }
        ],
        deputies: [
          { name: "Ansh Gupta", image: "/images/eCell Core 2025-26 Photos/AnshGupta_DeputyEVM.jpg" },
          { name: "Reet Rathore", image: "/images/eCell Core 2025-26 Photos/ReetRathore_Deputy_EVM.jpg" }
        ]
      },
      {
        name: "Technical",
        heads: [
          { name: "Yash Gaurav", image: "/images/eCell Core 2025-26 Photos/YashGaurav_Executive-TechnicalDept.jpg" }
        ],
        deputies: [
          { name: "Shambhavi", image: "/images/eCell Core 2025-26 Photos/Shambhavi_DeputyTechnical.jpg" },
          { name: "Armaan Deep", image: "/images/eCell Core 2025-26 Photos/Armaandeep_deputyHead.png" }
        ]
      },
      {
        name: "Videography",
        heads: [
          { name: "Guransh Singh", image: "/images/eCell Core 2025-26 Photos/Guransh Singh_Executive videography.jpg" }

        ],
        deputies: [
          { name: "Sameer", image: "/images/eCell Core 2025-26 Photos/sameer_videography.jpg" }
        ]
      },
      {
        name: "Design",
        heads: [
          { name: "Yashasvii", image: null }

        ],
        deputies: [
          { name: "Aaryan Singh", image: null }
        ]
      },
      {
        name: "Content & Internal Affairs",
        heads: [
          { name: "Riddhee Nigam", image: "/images/eCell Core 2025-26 Photos/RiddheeNigam_ExecutiveContent&IntrrnalAffairs.jpg" }
        ],
        deputies: [
          { name: "Kamini juneja", image: "/images/eCell Core 2025-26 Photos/kaminijuneja_deputycontent (1).jpg" }
        ]
      },
      {
        name: "PR & Outreach",
        heads: [
          { name: "Amisha", image: "/images/eCell Core 2025-26 Photos/Amisha_executivehead_pr&outreach.jpg" }
        ],
        deputies: [
          { name: "Ishan Choudhary", image: "/images/eCell Core 2025-26 Photos/IshanChoudhary_Deputy_PR.jpg" },
          { name: "Vanshika Chawla", image: "/images/eCell Core 2025-26 Photos/VanshikaChawla_PR DeputyHead.jpg" }
        ]
      },
      {
        name: "Sponsorship",
        heads: [
          { name: "Vijay Kumar", image: "/images/eCell Core 2025-26 Photos/Vijay Kumar(Executive head sponsorship).jpg" },
          { name: "Varun Hooda", image: "/images/eCell Core 2025-26 Photos/varun hooda.JPG" }
        ],
        deputies: [
          { name: "Yashraj Singh", image: "/images/eCell Core 2025-26 Photos/YuvrajSingh_Sponsorship.png" },
          { name: "Vansh Sharma", image: "/images/eCell Core 2025-26 Photos/vansh sharma.png" }
        ]
      },
      {
        name: "Publicity",
        heads: [
          { name: "Samriddhi Tiwari", image: "/images/eCell Core 2025-26 Photos/SamriddhiTiwari_Executivepublicity.jpg" }
        ],
        deputies: [
          { name: "Preetika Sachdeva", image: "/images/eCell Core 2025-26 Photos/PreetikaSachdeva_deputyPublicity.jpg" },
          { name: "Janvi", image: "/images/eCell Core 2025-26 Photos/janvi_deputy publicity.jpg" }
        ]
      },
      {
        name: "Incubation",
        heads: [
          {
            name: "Devansh Parti",
            image: "/images/eCell Core 2025-26 Photos/DevanshParti_VicePresident_Incubation.jpg",
          },
        ],
        deputies: [
          {
            name: "Saiansh",
            image: "/images/eCell Core 2025-26 Photos/Saiansh_GenSec Incubation.jpg"
          },
        ]
      },
    ],
  },
};

const Team = () => {
    const [data, setData] = useState(teamData);
    const [loading, setLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
      if (!selectedPhoto) return;

      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setSelectedPhoto(null);
        }
      };

      const previousOverflow = document.body.style.overflow;

      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }, [selectedPhoto]);

    useEffect(() => {
      // Simulate fetching
      setData(teamData);
      setLoading(false);
    }, []);

    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(`.${styles.memberCard}, .${styles.deptCard}`);
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: '#fff' }}>
          <p>Loading team data...</p>
        </div>
      );
    }

    return (
      <div className={styles.page} onMouseMove={handleMouseMove}>
        {/* Dynamic Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground} />

          <span className={styles.eyebrow}>
            MSIT · ENTREPRENEURSHIP CELL
          </span>

          <h1 className={`${styles.title} ${styles.animateUp}`}>
            Meet the Team
            <span className={styles.titleUnderline} />
          </h1>

          <p className={`${styles.subtitle} ${styles.animateUp}`}>
            The minds behind the mission. Meet the mentors, leaders, and
            innovators building a culture of entrepreneurship at MSIT.
          </p>
        </section>
        {/* Teachers / Mentors Section */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.animateUp}`} style={{ animationDelay: '0.2s' }}>
            Our Mentors
            <span className={styles.titleUnderline} />
          </h2>
          <div className={styles.mentorGrid}>
            {data.teachers.map((teacher, idx) => (
              <div
                key={idx}
                className={`${styles.memberCard} ${styles.animateUp}`}
                style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
              >
                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() =>
                    setSelectedPhoto({
                      src: teacher.image,
                      name: teacher.name,
                      position: teacher.position,
                    })
                  }
                  aria-label={`View full photo of ${teacher.name}`}
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className={styles.memberImage}
                  />
                  <span className={styles.photoHint}>View photo</span>
                </button>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{teacher.name}</h3>
                  <p className={styles.memberRole}>{teacher.position}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Team Section */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.animateUp}`} style={{ animationDelay: '0.2s' }}>
            Core Team
            <span className={styles.titleUnderline} />
          </h2>

          {/* Leadership */}
          <div className={styles.mentorGrid} style={{ marginBottom: '5rem' }}>
            {data.coreTeam.leadership.map((leader, idx) => (
              <div
                key={idx}
                className={`${styles.memberCard} ${styles.animateUp}`}
                style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
              >
                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() =>
                    setSelectedPhoto({
                      src: leader.image,
                      name: leader.name,
                      position: leader.position,
                    })
                  }
                  aria-label={`View full photo of ${leader.name}`}
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className={styles.memberImage}
                  />
                  <span className={styles.photoHint}>View photo</span>
                </button>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{leader.name}</h3>
                  <p className={styles.memberRole}>{leader.position}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Departments */}
          <div>
            <h3 className={`${styles.sectionTitle} ${styles.animateUp}`} style={{ fontSize: '2rem', animationDelay: '0.3s' }}>
              Departments
              <span className={styles.titleUnderline} style={{ width: '50px', height: '3px' }} />
            </h3>
            <div className={styles.deptGrid}>
              {data.coreTeam.departments.map((dept, idx) => (
                <div
                  key={idx}
                  className={`${styles.deptCard} ${styles.animateUp}`}
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  <h4 className={styles.deptName}>{dept.name}</h4>
                  <div className={styles.roleGroup}>
                    <span className={styles.roleLabel}>Heads</span>
                    <div className={styles.deptMembersGrid}>
                      {dept.heads.map((head, i) => (
                        <div key={i} className={styles.deptMember}>

                          <button
                            type="button"
                            className={styles.deptPhotoButton}
                            onClick={() =>
                              setSelectedPhoto({
                                src:
                                  head.image ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(head.name)}&background=0b0b71&color=fff&size=600`,
                                name: head.name,
                                position: `${dept.name} — Head`,
                              })
                            }
                            aria-label={`View full photo of ${head.name}`}
                          >
                            <img
                              src={
                                head.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(head.name)}&background=0b0b71&color=fff&size=150`
                              }
                              alt={head.name}
                              className={styles.deptMemberImage}
                            />
                            <span className={styles.deptPhotoHint} aria-hidden="true">
                              ⤢
                            </span>
                          </button>

                          <span className={styles.deptMemberName}>{head.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.roleGroup}>
                    <span className={styles.roleLabel}>Deputies</span>
                    <div className={styles.deptMembersGrid}>
                      {dept.deputies.map((deputy, i) => (
                        <div key={i} className={styles.deptMember}>

                          <button
                            type="button"
                            className={styles.deptPhotoButton}
                            onClick={() =>
                              setSelectedPhoto({
                                src:
                                  deputy.image ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(deputy.name)}&background=0b0b71&color=fff&size=600`,
                                name: deputy.name,
                                position: `${dept.name} — Deputy`,
                              })
                            }
                            aria-label={`View full photo of ${deputy.name}`}
                          >
                            <img
                              src={
                                deputy.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(deputy.name)}&background=0b0b71&color=fff&size=150`
                              }
                              alt={deputy.name}
                              className={styles.deptMemberImage}
                            />
                            <span className={styles.deptPhotoHint} aria-hidden="true">
                              ⤢
                            </span>
                          </button>

                          <span className={styles.deptMemberName}>{deputy.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Full-screen Photo Viewer */}
        {selectedPhoto && (
          <div
            className={styles.lightbox}
            onClick={() => setSelectedPhoto(null)}
            role="presentation"
          >
            <div
              className={styles.lightboxContent}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo of ${selectedPhoto.name}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo viewer"
              >
                &times;
              </button>

              <div className={styles.lightboxImageWrap}>
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.name}
                  className={styles.lightboxImage}
                />
              </div>

              <div className={styles.lightboxInfo}>
                <h3>{selectedPhoto.name}</h3>
                {selectedPhoto.position && (
                  <p>{selectedPhoto.position}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Team;
