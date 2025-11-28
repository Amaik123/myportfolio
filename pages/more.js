import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/More.module.css";
import ScrambleText from "./components/ScrambleText";

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

export default function More() {
  const [isGlassTheme, setIsGlassTheme] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsGlassTheme(!isGlassTheme);
  };

  const cards = [
    {
      id: 1,
      title: "Guestbook",
      subtitle: "Leave a Message",
      description: "Share your thoughts, feedback, or just say hello!",
      icon: "✍️",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
      link: "/guestbook",
    },
    {
      id: 2,
      title: "Bucket List",
      subtitle: "Dreams & Goals",
      description:
        "Things I want to achieve, places I want to visit, and experiences I'm chasing.",
      icon: "🎯",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      link: "/bucketlist",
    },
    {
      id: 3,
      title: "Links",
      subtitle: "Connect With Me",
      description:
        "Find me on social media, GitHub, LinkedIn, and other platforms.",
      icon: "🔗",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      link: "/links",
    },
    {
      id: 4,
      title: "Uses",
      subtitle: "My Tech Stack",
      description:
        "Tools, software, and hardware I use daily for development and design.",
      icon: "💻",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      link: "/uses",
    },
    {
      id: 5,
      title: "Attribution",
      subtitle: "Credits & Thanks",
      description:
        "Resources, libraries, and amazing people who made this portfolio possible.",
      icon: "🙏",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      link: "/attribution",
    },
    {
      id: 6,
      title: "Timeline",
      subtitle: "My Journey",
      description:
        "A visual timeline of my professional and personal milestones.",
      icon: "⏳",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      image:
        "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80",
      link: "/timeline",
    },
    {
      id: 7,
      title: "Book a Call",
      subtitle: "Let's Connect",
      description:
        "Schedule a call with me for project discussions, mentorship, or a quick chat.",
      icon: "📞",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image:
        "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80",
      link: "/book-call",
    },
    {
      id: 8,
      title: "RSS Feeds",
      subtitle: "Stay Updated",
      description:
        "Subscribe to my RSS feeds and never miss a new post or project update.",
      icon: "📡",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      link: "/rss",
    },
    {
      id: 9,
      title: "Certifications",
      subtitle: "My Credentials",
      description:
        "Professional certifications validating my expertise in various technologies.",
      icon: "🎓",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      link: "/certifications",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const emojiVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`${styles.container} ${isGlassTheme ? styles.glassTheme : ""}`}
      style={{
        cursor:
          mounted && typeof window !== "undefined" && window.innerWidth >= 768
            ? "none"
            : "auto",
      }}
    >
      {mounted && <CustomCursor />}
      <ScrollProgress />

      <NavBar />

      {/* Theme Toggle Button */}
      <motion.button
        className={styles.themeToggle}
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className={styles.toggleIcon}
          animate={{ rotate: isGlassTheme ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {isGlassTheme ? "🌈" : "💎"}
        </motion.div>
        <span className={styles.toggleText}>
          {isGlassTheme ? "Glass Mode" : "Default"}
        </span>
      </motion.button>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>
            <ScrambleText text="Beyond the" delay={300} />{" "}
            <span className={styles.gradient}>Portfolio</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Explore more about me, my interests, and the tools I use
          </p>
        </motion.div>

        {/* Floating Emojis */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "20%", left: "10%" }}
          variants={emojiVariants}
          animate="float"
        >
          🚀
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "30%", right: "15%" }}
          variants={emojiVariants}
          animate="float"
          transition={{ delay: 0.5 }}
        >
          ✨
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ bottom: "25%", left: "15%" }}
          variants={emojiVariants}
          animate="float"
          transition={{ delay: 1 }}
        >
          🎨
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ bottom: "20%", right: "10%" }}
          variants={emojiVariants}
          animate="float"
          transition={{ delay: 1.5 }}
        >
          💡
        </motion.div>
      </section>

      {/* Cards Grid */}
      <motion.section
        className={styles.cardsSection}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <motion.a
              key={card.id}
              href={card.link}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {/* Background Image */}
              <div
                className={styles.cardBackground}
                style={{ backgroundImage: `url(${card.image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className={styles.cardGradient}
                style={{ background: card.gradient }}
              />

              {/* Content */}
              <div className={styles.cardContent}>
                <motion.div
                  className={styles.cardIcon}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardSubtitle}>{card.subtitle}</p>
                <p className={styles.cardDescription}>{card.description}</p>

                <motion.div className={styles.cardArrow} whileHover={{ x: 5 }}>
                  →
                </motion.div>
              </div>

              {/* Shine Effect */}
              <div className={styles.cardShine} />
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.ctaContent}
        >
          <h2 className={styles.ctaTitle}>Let's Create Something Amazing</h2>
          <p className={styles.ctaText}>
            Ready to bring your ideas to life? Let's connect and make it happen.
          </p>
          <motion.a
            href="#contact"
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
