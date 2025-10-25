import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../../styles/CTASection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const circle = circleRef.current;

    // Fade in animation
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      }
    );

    // Continuous rotation for the circle
    gsap.to(circle, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div className={styles.container}>
        {/* Badge with rotating circle */}
        <div className={styles.badgeWrapper}>
          <div className={styles.badge}>
            <img
              src="/logov2.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <svg
            ref={circleRef}
            className={styles.rotatingCircle}
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text className={styles.circleText}>
              <textPath href="#circlePath" startOffset="0%">
                WORKING IN EMTEC CURRENTLY • WORKING IN EMTEC CURRENTLY •
                WORKING IN EMTEC CURRENTLY •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Main content */}
        <div className={styles.content}>
          <p className={styles.topText}>
            CERTIFIED CLOUD & AI SOLUTIONS ARCHITECT
          </p>
          <h2 className={styles.heading}>
            LET'S BUILD SOMETHING{" "}
            <span className={styles.highlight}>AMAZING!</span>
          </h2>

          <button className={styles.ctaButton}>
            <span>Get In Touch</span>
            <svg
              className={styles.arrow}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4 10h12m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <p className={styles.availability}>
            Azure Certified (AZ-104, AI-102) • 6+ Years Experience • Available
            for exciting projects
          </p>
        </div>
      </div>
    </section>
  );
}
