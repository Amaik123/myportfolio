import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Links.module.css";

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

// Social/Link data
const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    username: "@Amaik123",
    description: "Check out my open source projects and contributions",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    url: "https://github.com/Amaik123",
    color: "#333",
    hoverColor: "#6e5494",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: "Connect with me",
    description: "Let's grow our professional network together",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    url: "https://linkedin.com/in/yourprofile",
    color: "#0077b5",
    hoverColor: "#00a0dc",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    username: "@yourhandle",
    description: "Follow me for tech insights and random thoughts",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    url: "https://twitter.com/yourhandle",
    color: "#000",
    hoverColor: "#1da1f2",
  },
  {
    id: "instagram",
    name: "Instagram",
    username: "@yourhandle",
    description: "Behind the scenes and life moments",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    url: "https://instagram.com/yourhandle",
    color: "#E4405F",
    hoverColor: "#fd1d1d",
  },
  {
    id: "youtube",
    name: "YouTube",
    username: "Your Channel",
    description: "Tutorials, vlogs, and tech content",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    url: "https://youtube.com/@yourchannel",
    color: "#FF0000",
    hoverColor: "#cc0000",
  },
  {
    id: "discord",
    name: "Discord",
    username: "Join my server",
    description: "Chat with me and the community",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    url: "https://discord.gg/yourserver",
    color: "#5865F2",
    hoverColor: "#7289da",
  },
];

const quickLinks = [
  {
    id: "email",
    name: "Email Me",
    icon: "📧",
    url: "mailto:your@email.com",
    description: "Get in touch directly",
  },
  {
    id: "resume",
    name: "Resume/CV",
    icon: "📄",
    url: "/resume.pdf",
    description: "Download my resume",
  },
  {
    id: "calendar",
    name: "Book a Call",
    icon: "📅",
    url: "https://cal.com/",
    description: "Schedule a meeting",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    icon: "💼",
    url: "/work",
    description: "View my projects",
  },
];

export default function LinksPage() {
  const [mounted, setMounted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <div
      className={styles.container}
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

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image */}
          <motion.div
            className={styles.profileImage}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aakash"
              alt="Profile"
            />
            <span className={styles.statusDot} />
          </motion.div>

          <span className={styles.heroLabel}>🔗 LINKS</span>
          <h1 className={styles.heroTitle}>
            Connect With <span className={styles.heroHighlight}>Me</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Find me across the internet. Follow, connect, or reach out — I'd
            love to hear from you!
          </p>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "8%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌐
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "25%", right: "10%" }}
          animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          💬
        </motion.div>
      </section>

      {/* Social Links Section */}
      <section className={styles.linksSection}>
        <motion.div
          className={styles.linksGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkCard}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: `0 20px 40px ${link.color}20`,
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                "--link-color": link.color,
                "--link-hover": link.hoverColor,
              }}
            >
              <div className={styles.linkIcon}>{link.icon}</div>
              <div className={styles.linkInfo}>
                <h3 className={styles.linkName}>{link.name}</h3>
                <span className={styles.linkUsername}>{link.username}</span>
                <p className={styles.linkDescription}>{link.description}</p>
              </div>
              <div className={styles.linkArrow}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className={styles.quickSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Quick Links
        </motion.h2>
        <motion.div
          className={styles.quickGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {quickLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              className={styles.quickCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.quickIcon}>{link.icon}</span>
              <span className={styles.quickName}>{link.name}</span>
              <span className={styles.quickDesc}>{link.description}</span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Share Section */}
      <section className={styles.shareSection}>
        <motion.div
          className={styles.shareContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.shareIcon}>🔗</span>
          <h2 className={styles.shareTitle}>Share This Page</h2>
          <p className={styles.shareSubtitle}>
            Know someone who might want to connect? Share this page with them!
          </p>
          <div className={styles.shareButtons}>
            <motion.button
              className={styles.shareBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleCopyLink(
                  typeof window !== "undefined" ? window.location.href : "",
                  "page"
                )
              }
            >
              {copiedLink === "page" ? "✓ Copied!" : "Copy Link"}
            </motion.button>
            <motion.a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=Check out this awesome portfolio!`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share on X
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
