import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/BucketList.module.css";

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

// Bucket list categories with items
const bucketListData = [
  {
    id: "travel",
    title: "Travel & Adventure",
    icon: "🌍",
    color: "#3b82f6",
    items: [
      {
        id: 1,
        text: "Visit Japan during cherry blossom season",
        completed: true,
        year: "2024",
      },
      { id: 2, text: "See the Northern Lights in Iceland", completed: false },
      { id: 3, text: "Road trip across New Zealand", completed: false },
      { id: 4, text: "Explore the temples of Angkor Wat", completed: false },
      { id: 5, text: "Hike Machu Picchu in Peru", completed: false },
      { id: 6, text: "Safari in Tanzania", completed: false },
      { id: 7, text: "Visit the Swiss Alps", completed: true, year: "2023" },
    ],
  },
  {
    id: "career",
    title: "Career & Learning",
    icon: "🚀",
    color: "#a855f7",
    items: [
      { id: 1, text: "Launch a successful SaaS product", completed: false },
      { id: 2, text: "Speak at a major tech conference", completed: false },
      {
        id: 3,
        text: "Contribute to a major open source project",
        completed: true,
        year: "2024",
      },
      { id: 4, text: "Learn Rust programming language", completed: false },
      {
        id: 5,
        text: "Build an AI-powered application",
        completed: true,
        year: "2025",
      },
      { id: 6, text: "Mentor 10 aspiring developers", completed: false },
      { id: 7, text: "Write a technical book", completed: false },
    ],
  },
  {
    id: "personal",
    title: "Personal Growth",
    icon: "✨",
    color: "#ec4899",
    items: [
      { id: 1, text: "Learn to play the piano", completed: false },
      { id: 2, text: "Run a marathon", completed: false },
      { id: 3, text: "Learn a third language", completed: false },
      {
        id: 4,
        text: "Start a daily meditation practice",
        completed: true,
        year: "2024",
      },
      { id: 5, text: "Read 50 books in a year", completed: false },
      { id: 6, text: "Learn photography", completed: true, year: "2023" },
    ],
  },
  {
    id: "experiences",
    title: "Unique Experiences",
    icon: "🎯",
    color: "#f59e0b",
    items: [
      { id: 1, text: "Skydiving", completed: true, year: "2022" },
      {
        id: 2,
        text: "Scuba diving in the Great Barrier Reef",
        completed: false,
      },
      { id: 3, text: "Attend the Olympics", completed: false },
      { id: 4, text: "Hot air balloon ride", completed: false },
      { id: 5, text: "Sleep under the stars in a desert", completed: false },
      {
        id: 6,
        text: "Attend a music festival abroad",
        completed: true,
        year: "2024",
      },
    ],
  },
  {
    id: "giving",
    title: "Giving Back",
    icon: "💜",
    color: "#10b981",
    items: [
      {
        id: 1,
        text: "Volunteer for a cause I care about",
        completed: true,
        year: "2023",
      },
      {
        id: 2,
        text: "Build a free tool that helps thousands",
        completed: false,
      },
      {
        id: 3,
        text: "Donate to education initiatives",
        completed: true,
        year: "2024",
      },
      { id: 4, text: "Plant 100 trees", completed: false },
      { id: 5, text: "Teach coding to underprivileged kids", completed: false },
    ],
  },
];

export default function BucketListPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = bucketListData.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const completedItems = bucketListData.reduce(
    (acc, cat) => acc + cat.items.filter((item) => item.completed).length,
    0
  );
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  const filteredData =
    activeCategory === "all"
      ? bucketListData
      : bucketListData.filter((cat) => cat.id === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          <span className={styles.heroLabel}>🎯 BUCKET LIST</span>
          <h1 className={styles.heroTitle}>
            Dreams & <span className={styles.heroHighlight}>Goals</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Life is short, and the world is wide. Here are the experiences I'm
            chasing, the skills I want to master, and the dreams I'm turning
            into reality.
          </p>

          {/* Progress Stats */}
          <motion.div
            className={styles.progressContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={styles.progressStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{completedItems}</span>
                <span className={styles.statLabel}>Completed</span>
              </div>
              <div className={styles.progressCircle}>
                <svg viewBox="0 0 100 100" className={styles.progressSvg}>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={283}
                    initial={{ strokeDashoffset: 283 }}
                    animate={{
                      strokeDashoffset: 283 - (283 * progressPercent) / 100,
                    }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className={styles.progressPercent}>
                  {progressPercent}%
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {totalItems - completedItems}
                </span>
                <span className={styles.statLabel}>Remaining</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "8%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌟
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "25%", right: "10%" }}
          animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          ✈️
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ bottom: "20%", left: "15%" }}
          animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        >
          🎨
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterWrapper}>
          <div className={styles.categoryFilters}>
            <button
              className={`${styles.filterBtn} ${activeCategory === "all" ? styles.active : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
            </button>
            {bucketListData.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.title.split(" ")[0]}
              </button>
            ))}
          </div>
          <button
            className={styles.toggleBtn}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? "Hide" : "Show"} Completed
          </button>
        </div>
      </section>

      {/* Bucket List Grid */}
      <section className={styles.listSection}>
        <motion.div
          className={styles.categoriesGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredData.map((category) => (
              <motion.div
                key={category.id}
                className={styles.categoryCard}
                variants={itemVariants}
                layout
              >
                <div
                  className={styles.categoryHeader}
                  style={{ "--category-color": category.color }}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <h2 className={styles.categoryTitle}>{category.title}</h2>
                  <span className={styles.categoryCount}>
                    {category.items.filter((i) => i.completed).length}/
                    {category.items.length}
                  </span>
                </div>

                <ul className={styles.itemsList}>
                  {category.items
                    .filter((item) => showCompleted || !item.completed)
                    .map((item, index) => (
                      <motion.li
                        key={item.id}
                        className={`${styles.listItem} ${item.completed ? styles.completed : ""}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span
                          className={styles.checkbox}
                          style={{
                            borderColor: item.completed
                              ? category.color
                              : "rgba(255,255,255,0.2)",
                            backgroundColor: item.completed
                              ? category.color
                              : "transparent",
                          }}
                        >
                          {item.completed && "✓"}
                        </span>
                        <span className={styles.itemText}>{item.text}</span>
                        {item.completed && item.year && (
                          <span className={styles.yearBadge}>{item.year}</span>
                        )}
                      </motion.li>
                    ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection}>
        <motion.div
          className={styles.quoteContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.quoteIcon}>💭</span>
          <blockquote className={styles.quote}>
            "The biggest adventure you can take is to live the life of your
            dreams."
          </blockquote>
          <cite className={styles.quoteAuthor}>— Oprah Winfrey</cite>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
