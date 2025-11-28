import Head from "next/head";
import { useState, useEffect } from "react";
import AboutCarousel from "./components/AboutCarousel";
import ExperienceTimeline from "./components/ExperienceTimeline";
import styles from "../styles/About.module.css";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaLightbulb,
  FaRocket,
  FaHeart,
  FaCode,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs } from "react-icons/si";
import ScrambleText from "./components/ScrambleText";
import MagneticButton from "./components/MagneticButton";

// Custom cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "2px solid rgba(168, 85, 247, 0.8)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering
            ? "rgba(168, 85, 247, 0.3)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#ec4899",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "linear-gradient(90deg, #a855f7, #ec4899, #f59e0b)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9998,
      }}
    />
  );
};

const traits = [
  { text: "Azure Certified (AZ-104, AI-102)", icon: FaLightbulb },
  { text: "full-stack engineer", icon: FaCode },
  { text: "cloud solutions architect", icon: FaRocket },
  { text: "AI integration specialist", icon: FaHeart },
];

const focusAreas = [
  "Cloud Architecture",
  "AI Integration",
  "Full Stack Development",
  "DevOps & Infrastructure",
  "Scalable Solutions",
];

const toolkit = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Azure", icon: null, color: "#0089D6" },
  { name: "MongoDB", icon: null, color: "#47A248" },
];

const timeline = [
  {
    role: "Senior Software Engineer",
    meta: "Emtec Inc. | Feb 2022 - Present",
    copy: "Leading full-stack development initiatives, architecting scalable cloud solutions on Azure, and implementing AI-driven features. Mentoring junior developers while delivering enterprise-grade applications using React, Node.js, and modern DevOps practices.",
  },
  {
    role: "Full Stack Developer",
    meta: "Eszmeletlen Holding Co. | Apr 2021 - Feb 2022",
    copy: "Developed and maintained multiple web applications using React, Next.js, and Node.js. Implemented CI/CD pipelines and cloud infrastructure solutions, improving deployment efficiency and application reliability.",
  },
  {
    role: "Senior Frontend Developer",
    meta: "Axioned | Sep 2019 - Apr 2021",
    copy: "Spearheaded frontend development for client projects, creating responsive and performant user interfaces. Collaborated with design teams to deliver pixel-perfect implementations while maintaining code quality and best practices.",
  },
];

const carouselSlides = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Mountain trail under cloudy skies",
    caption: "I Explore",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
    alt: "Training session at the gym",
    caption: "I Lift",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative studio session",
    caption: "I Build",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        cursor:
          mounted && typeof window !== "undefined" && window.innerWidth >= 768
            ? "none"
            : "auto",
      }}
    >
      {mounted && <CustomCursor />}
      <ScrollProgress />

      <Head>
        <title>About | Aakash</title>
        <meta
          name="description"
          content="Get to know Aakash - a creative engineer building expressive, high-impact digital experiences."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        />
      </Head>
      <NavBar />

      <main className={styles.page}>
        {/* Animated Background Elements */}
        <motion.div
          className={styles.gradientOrb1}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
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

        <div className={styles.wrapper}>
          <motion.section
            className={styles.hero}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className={styles.heroText}>
              <motion.span className={styles.eyebrow} variants={itemVariants}>
                More about me
              </motion.span>
              <motion.h1 className={styles.title} variants={itemVariants}>
                I'm Aakash, a <ScrambleText text="creative" delay={400} />{" "}
                <span className={styles.highlightWord}>engineer</span>
              </motion.h1>
              <motion.p className={styles.lead} variants={itemVariants}>
                With 6+ years of full-stack development experience and Azure
                certifications (AZ-104, AI-102), I architect scalable cloud
                solutions that leverage AI capabilities. From technical design
                to deployment, I deliver intelligent systems that solve real
                business challenges.
              </motion.p>
              <motion.p
                className={styles.secondaryParagraph}
                variants={itemVariants}
              >
                My work spans the entire development lifecycle - designing cloud
                infrastructure, building modern web applications with React and
                Next.js, implementing DevOps pipelines with Terraform and
                Kubernetes, and integrating AI-driven features. I specialize in
                transforming complex requirements into elegant, production-ready
                solutions that scale.
              </motion.p>

              <motion.div className={styles.traits} variants={itemVariants}>
                {traits.map((trait, index) => (
                  <motion.span
                    key={trait.text}
                    className={styles.trait}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {trait.icon && <trait.icon className={styles.traitIcon} />}
                    {trait.text}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div className={styles.signature} variants={itemVariants}>
                <span>
                  Senior Software Engineer at Emtec Inc. - Delivering enterprise
                  solutions.
                </span>
                <span>Based in India - Working in Emtec Currently.</span>
              </motion.div>
            </div>

            <motion.aside
              className={styles.photoColumn}
              variants={itemVariants}
            >
              <AboutCarousel slides={carouselSlides} autoPlayInterval={5200} />
            </motion.aside>
          </motion.section>

          <ExperienceTimeline />

          <motion.section
            className={styles.highlights}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.cardIcon}>
                <FaLightbulb />
              </div>
              <h3 className={styles.cardTitle}>What drives my work</h3>
              <p className={styles.cardBody}>
                I'm passionate about building cloud-native applications that
                leverage cutting-edge AI capabilities. With certifications in
                Azure Administration (AZ-104) and AI Engineering (AI-102), I
                bridge the gap between business needs and technical solutions.
                Every project is an opportunity to architect scalable,
                intelligent systems that deliver real value.
              </p>
              <div className={styles.chipList}>
                {focusAreas.map((item, index) => (
                  <motion.span
                    key={item}
                    className={styles.chip}
                    whileHover={{ scale: 1.08, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.cardIcon}>
                <FaCode />
              </div>
              <h3 className={styles.cardTitle}>Toolkit I reach for</h3>
              <p className={styles.cardBody}>
                From architecting cloud infrastructure to building responsive
                web applications, I leverage modern technologies and best
                practices. My expertise spans React, Next.js, TypeScript,
                Node.js, Azure, MongoDB, Kubernetes, and Terraform - creating
                fast, scalable, and maintainable solutions.
              </p>
              <div className={styles.chipList}>
                {toolkit.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className={styles.chipTech}
                    style={{ "--tech-color": tool.color }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tool.icon && <tool.icon />}
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.cardIcon}>
                <FaRocket />
              </div>
              <h3 className={styles.cardTitle}>A quick timeline</h3>
              <div className={styles.timeline}>
                {timeline.map(({ role, meta, copy }, index) => (
                  <motion.div
                    key={role}
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span
                      className={styles.timelineMarker}
                      aria-hidden="true"
                    />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineRole}>{role}</div>
                      <div className={styles.timelineMeta}>{meta}</div>
                      <p className={styles.cardBody}>{copy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
