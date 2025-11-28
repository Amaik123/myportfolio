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
    label: "YEARS OF EXPERIENCE",
  },
  {
    id: 2,
    end: 46,
    suffix: "+",
    label: "PROJECTS COMPLETED",
  },
  {
    id: 3,
    end: 20,
    suffix: "+",
    label: "WORLDWIDE CLIENTS",
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

  // Track mouse position for parallax effects
  useEffect(() => {
    let rafId = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      const newX = (e.clientX / window.innerWidth - 0.5) * 20;
      const newY = (e.clientY / window.innerHeight - 0.5) * 20;

      if (Math.abs(newX - lastX) > 0.1 || Math.abs(newY - lastY) > 0.1) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: newX, y: newY });
          lastX = newX;
          lastY = newY;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Helper functions
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Animation loop: adjusts rotation every frame
  useEffect(() => {
    let rAF;

    function animate() {
      if (!isMouseOverRef.current) {
        // Smoothly return angles back to 0 when not hovered
        rotateXRef.current = lerp(rotateXRef.current, 0, 0.08);
        rotateYRef.current = lerp(rotateYRef.current, 0, 0.08);
      }
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(0, 0, 0) rotateX(${rotateXRef.current}deg) rotateY(${rotateYRef.current}deg)`;
      }
      rAF = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(rAF);
  }, []); // empty array => run once on mount

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
      {/* Floating gradient orbs */}
      <motion.div
        className={styles.gradientOrb1}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={styles.gradientOrb2}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className={styles.cardContainer} ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ProfileCard
            name="Aakash K."
            title="Certified AI & Cloud Solutions Architect"
            handle="aakash"
            status="Working in Emtec Currently"
            contactText="Contact Me"
            avatarUrl="/mypic.png"
            showUserInfo={true}
            enableTilt={
              typeof window !== "undefined" && window.innerWidth > 768
            }
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked")}
          />
        </motion.div>

        {/* Floating Tech Stack Icons around the card */}
        <div className={styles.floatingIcons}>
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={styles.techIcon}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePosition.x * (index % 2 === 0 ? 1 : -1) * 0.5,
                y: mousePosition.y * (index % 3 === 0 ? 1 : -1) * 0.5,
              }}
              transition={{
                delay: tech.delay,
                duration: 0.5,
                x: { duration: 0.3 },
                y: { duration: 0.3 },
              }}
              whileHover={{
                scale: 1.3,
                rotate: 360,
                transition: { duration: 0.6 },
              }}
              style={{
                "--icon-color": tech.color,
              }}
            >
              <TechIcon IconComponent={tech.IconComponent} color={tech.color} />
              <span className={styles.techTooltip}>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            className={styles.titleText}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            About Me
          </motion.span>

          <motion.h1
            className={styles.fontStyleHead}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
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
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
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
          </motion.div>

          {/* Tech Stack Grid */}
          <motion.div
            className={styles.techStackGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className={styles.techStackTitle}>Tech Arsenal</h3>
            <div className={styles.techStackList}>
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className={styles.techBadge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  style={{ borderColor: tech.color }}
                >
                  <TechIcon
                    IconComponent={tech.IconComponent}
                    color={tech.color}
                  />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className={styles.ctaContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <MagneticButton as="a" href="/work" strength={50}>
              View My Work
            </MagneticButton>
          </motion.div>

          <section className="counters-section" ref={ref}>
            <motion.div
              className={styles.countersContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {countersData.map((counter, index) => (
                <motion.div
                  key={counter.id}
                  className={styles.counter}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
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
                </motion.div>
              ))}
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
