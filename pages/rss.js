import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/RSS.module.css";

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

export default function RSSPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rssFeeds = [
    {
      id: "blog",
      title: "Blog Posts",
      description: "Get notified about new blog posts, tutorials, and articles",
      url: "/feed/blog.xml",
      icon: "📝",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      items: [
        "Technical tutorials",
        "Project case studies",
        "Career insights",
        "Industry thoughts",
      ],
    },
    {
      id: "projects",
      title: "Projects",
      description: "Stay updated on new projects and releases",
      url: "/feed/projects.xml",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      items: [
        "New project launches",
        "Major updates",
        "Open source releases",
        "Side projects",
      ],
    },
    {
      id: "all",
      title: "Everything",
      description: "All updates from my portfolio in one feed",
      url: "/feed/all.xml",
      icon: "📡",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      items: [
        "Blog posts",
        "Project updates",
        "Timeline events",
        "Site changes",
      ],
    },
  ];

  const rssReaders = [
    {
      name: "Feedly",
      icon: "🌿",
      url: "https://feedly.com",
      description: "Popular web-based RSS reader",
    },
    {
      name: "Inoreader",
      icon: "📰",
      url: "https://inoreader.com",
      description: "Feature-rich RSS aggregator",
    },
    {
      name: "NewsBlur",
      icon: "📑",
      url: "https://newsblur.com",
      description: "Open source news reader",
    },
    {
      name: "Reeder",
      icon: "🍎",
      url: "https://reederapp.com",
      description: "Beautiful RSS reader for Apple devices",
    },
    {
      name: "NetNewsWire",
      icon: "📲",
      url: "https://netnewswire.com",
      description: "Free and open source for Mac/iOS",
    },
    {
      name: "Thunderbird",
      icon: "🦅",
      url: "https://thunderbird.net",
      description: "Email client with RSS support",
    },
  ];

  const handleCopyUrl = async (url, id) => {
    const fullUrl =
      typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
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
          <motion.span
            className={styles.heroLabel}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            📡 RSS FEEDS
          </motion.span>
          <h1 className={styles.heroTitle}>
            Stay <span className={styles.heroHighlight}>Updated</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Subscribe to my RSS feeds and never miss a new post, project, or
            update. Old school? Maybe. Reliable? Absolutely.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          📰
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "25%", right: "15%" }}
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          🔔
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ bottom: "20%", left: "15%" }}
          animate={{ y: [0, -18, 0], rotate: [0, 15, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          ✨
        </motion.div>
      </section>

      {/* What is RSS Section */}
      <section className={styles.infoSection}>
        <motion.div
          className={styles.infoCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>What is RSS?</h2>
          <p>
            RSS (Really Simple Syndication) is a web feed that allows you to
            subscribe to websites and receive updates automatically in your
            favorite feed reader. No algorithms, no tracking, just content
            delivered directly to you.
          </p>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🎯</span>
              <span>No algorithm deciding what you see</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🔒</span>
              <span>Privacy-friendly, no tracking</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>⚡</span>
              <span>Instant updates when new content is published</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>📱</span>
              <span>Read anywhere, on any device</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* RSS Feeds Section */}
      <section className={styles.feedsSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Available Feeds
        </motion.h2>

        <motion.div
          className={styles.feedsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {rssFeeds.map((feed) => (
            <motion.div
              key={feed.id}
              className={styles.feedCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div
                className={styles.feedHeader}
                style={{ background: feed.gradient }}
              >
                <span className={styles.feedIcon}>{feed.icon}</span>
                <h3 className={styles.feedTitle}>{feed.title}</h3>
              </div>
              <div className={styles.feedBody}>
                <p className={styles.feedDescription}>{feed.description}</p>
                <ul className={styles.feedItems}>
                  {feed.items.map((item, index) => (
                    <li key={index}>
                      <span className={styles.checkmark}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.feedActions}>
                  <a
                    href={feed.url}
                    className={styles.subscribeBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.rssIcon}>📡</span>
                    Subscribe
                  </a>
                  <button
                    className={`${styles.copyBtn} ${copied === feed.id ? styles.copied : ""}`}
                    onClick={() => handleCopyUrl(feed.url, feed.id)}
                  >
                    {copied === feed.id ? "✓ Copied!" : "📋 Copy URL"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RSS Readers Section */}
      <section className={styles.readersSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Recommended RSS Readers
        </motion.h2>
        <p className={styles.sectionSubtitle}>
          Not sure where to start? Here are some great RSS readers to try:
        </p>

        <motion.div
          className={styles.readersGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {rssReaders.map((reader) => (
            <motion.a
              key={reader.name}
              href={reader.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readerCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={styles.readerIcon}>{reader.icon}</span>
              <h4 className={styles.readerName}>{reader.name}</h4>
              <p className={styles.readerDescription}>{reader.description}</p>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* How to Subscribe Section */}
      <section className={styles.howToSection}>
        <motion.div
          className={styles.howToCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>How to Subscribe</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Choose an RSS Reader</h4>
                <p>
                  Pick one from the list above or use any RSS reader you prefer
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Copy the Feed URL</h4>
                <p>Click the "Copy URL" button next to the feed you want</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Add to Your Reader</h4>
                <p>Paste the URL in your RSS reader's "Add Feed" option</p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>Stay Updated!</h4>
                <p>New content will automatically appear in your reader</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Back to More */}
      <motion.div
        className={styles.backSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Link href="/more" className={styles.backLink}>
          ← Back to More
        </Link>
      </motion.div>

      <Footer />
    </div>
  );
}
