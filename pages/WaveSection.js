// components/ThreeDCard.js
import { useRef, useEffect, useState } from "react";
import styles from "../styles/ThreeDCard.module.css";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import dynamic from "next/dynamic";
import ProfileCard from "./ProfileCard";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaDocker } from "react-icons/fa";
import {
  SiTypescript,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiKubernetes,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import ScrambleText from "./components/ScrambleText";
import MagneticButton from "./components/MagneticButton";

// Dynamic import to avoid SSR issues
const GradientText = dynamic(() => import("./components/GradientText"), {
  ssr: false,
});
const countersData = [
  {
    id: 1,
    end: 6,
    suffix: "+",
    label: "YEARS EXPERIENCE",
  },
  {
    id: 2,
    end: 8,
    suffix: "",
    label: "MAJOR PROJECTS",
  },
  {
    id: 3,
    end: 15,
    suffix: "+",
    label: "TECHNOLOGIES",
  },
];

// Icon wrapper component
const TechIcon = ({ IconComponent, color }) => {
  if (!IconComponent) return null;
  return <IconComponent style={{ color }} />;
};

const techStack = [
  { IconComponent: FaReact, name: "React", color: "#61DAFB", delay: 0 },
  { IconComponent: FaNodeJs, name: "Node.js", color: "#339933", delay: 0.1 },
  {
    IconComponent: SiTypescript,
    name: "TypeScript",
    color: "#3178C6",
    delay: 0.2,
  },
  { IconComponent: SiGraphql, name: "GraphQL", color: "#E10098", delay: 0.3 },
  { IconComponent: SiNextdotjs, name: "Next.js", color: "#FFFFFF", delay: 0.4 },
  { IconComponent: SiMongodb, name: "MongoDB", color: "#47A248", delay: 0.5 },
  {
    IconComponent: SiPostgresql,
    name: "PostgreSQL",
    color: "#4169E1",
    delay: 0.6,
  },
  { IconComponent: FaAws, name: "AWS", color: "#FF9900", delay: 0.7 },
  { IconComponent: FaDocker, name: "Docker", color: "#2496ED", delay: 0.8 },
  {
    IconComponent: SiKubernetes,
    name: "Kubernetes",
    color: "#326CE5",
    delay: 0.9,
  },
  {
    IconComponent: SiTailwindcss,
    name: "Tailwind",
    color: "#06B6D4",
    delay: 1.1,
  },
];

export default function ThreeDCard() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const cardImageRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Rotation stored in refs instead of state:
  const rotateXRef = useRef(0);
  const rotateYRef = useRef(0);
  // Track whether the mouse is over the card
  const isMouseOverRef = useRef(false);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  // Mouse tracking disabled for performance on home page
  // Removed continuous mousemove handler to reduce CPU usage and reflows.
  useEffect(() => {
    // no-op
    return () => {};
  }, []);

  // Helper functions
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Card tilt animation disabled for performance.
  // We keep a static transform and do not run a continuous animation loop.
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)`;
    }
    return () => {};
  }, []); // no continuous animation

  // Mouse move
  function handleMouseMove(e) {
    if (!isMouseOverRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    rotateYRef.current = clamp(mouseX / 10, -15, 15);
    rotateXRef.current = clamp(-mouseY / 10, -15, 15);
  }

  function handleMouseEnter() {
    isMouseOverRef.current = true;
    // Remove transition for immediate transform
    if (cardRef.current) {
      cardRef.current.style.transition = "none";
    }
  }

  function handleMouseLeave() {
    isMouseOverRef.current = false;
    // Re-apply transition to snap back
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.6s";
    }
  }

  // Set the card image once on mount
  useEffect(() => {
    if (cardImageRef.current) {
      const imageURL =
        "https://images.unsplash.com/photo-1719773188310-85c82542f677?q=80&w=2436&auto=format&fit=crop";
      cardImageRef.current.style.backgroundImage = `url(${imageURL})`;
    }
  }, []);

  return (
    <div className={styles.flexContainer}>
      {/* Static decorative gradient orbs (animations removed for performance) */}
      <div className={styles.gradientOrb1} aria-hidden="true" />
      <div className={styles.gradientOrb2} aria-hidden="true" />

      <div className={styles.cardContainer} ref={containerRef}>
        <div>
          <ProfileCard
            name="Aakash K."
            title="Certified AI & Cloud Solutions Architect"
            handle="aakash"
            status="Working in Emtec Currently"
            contactText="Contact Me"
            avatarUrl="/mypic.png"
            showUserInfo={true}
            // Tilt disabled for performance on home page
            enableTilt={false}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>

        {/* Floating Tech Stack Icons around the card */}
        <div className={styles.floatingIcons}>
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={styles.techIcon}
              style={{ "--icon-color": tech.color }}
            >
              <TechIcon IconComponent={tech.IconComponent} color={tech.color} />
              <span className={styles.techTooltip}>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <span className={styles.titleText}>About Me</span>

          <h1 className={styles.fontStyleHead}>
            <ScrambleText text="The Tech" delay={600} />{" "}
            <span className={styles.fontsubText}>
              <GradientText
                colors={["#a855f7", "#ec4899", "#f59e0b", "#ec4899", "#a855f7"]}
                animationSpeed={8}
                showBorder={false}
                className={styles.fontBoldImp}
              >
                Architect
              </GradientText>
            </span>
          </h1>

          <div>
            <p className={styles.titleSubTask}>
              Certified AI & Cloud Solutions Architect | AZ-104 & AI-102
              Certified
            </p>
            <p className={styles.titleMainTaskss}>
              With over 6 years of hands-on experience, I specialize in building
              robust web and mobile applications that deliver exceptional user
              experiences. I bring deep expertise in full-stack development,
              leveraging technologies like React, Node.js, Next.js, and React
              Native to create high-quality, scalable solutions. My projects
              span diverse industries, from healthcare tools to enterprise
              storytelling platforms, demonstrating my versatility and
              commitment to delivering impactful results.
              <br />
              <br />
              As a Microsoft Certified Azure Administrator (AZ-104) and AI
              Engineer (AI-102), I excel at deploying and managing cloud
              infrastructure while infusing intelligent AI capabilities into
              applications. I am proficient in infrastructure as code using
              Terraform, and skilled in both front-end and back-end
              technologies, with expertise in TypeScript, GraphQL, MongoDB, and
              Kubernetes.
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className={styles.techStackGrid}>
            <h3 className={styles.techStackTitle}>Tech Arsenal</h3>
            <div className={styles.techStackList}>
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className={styles.techBadge}
                  style={{ borderColor: tech.color }}
                >
                  <TechIcon
                    IconComponent={tech.IconComponent}
                    color={tech.color}
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <MagneticButton as="a" href="/work" strength={50}>
              View My Work
            </MagneticButton>
          </div>

          <section className="counters-section" ref={ref}>
            <div className={styles.countersContainer}>
              {countersData.map((counter, index) => (
                <div key={counter.id} className={styles.counter}>
                  <div className={styles.counterNumber}>
                    {inView ? (
                      <CountUp
                        start={0}
                        end={counter.end}
                        duration={2.5}
                        suffix={counter.suffix}
                      />
                    ) : (
                      "0"
                    )}
                  </div>
                  <p className={styles.counterLabel}>{counter.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
