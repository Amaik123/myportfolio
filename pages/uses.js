import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Uses.module.css";

// Interactive 3D Tech Setup Component
const TechSetup3D = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + 0.5,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (e.clientX - centerX) / 10;
    setRotation({ x: -rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setAutoRotate(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setAutoRotate(true);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={styles.techSetupContainer}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.techSetupScene}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Main Monitor */}
        <div className={styles.monitor}>
          <div className={styles.monitorScreen}>
            <div className={styles.screenContent}>
              <div className={styles.codeLines}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.codeLine}
                    style={{
                      width: `${40 + Math.random() * 50}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <div className={styles.terminal}>
                <span className={styles.terminalPrompt}>$</span>
                <span className={styles.terminalCursor} />
              </div>
            </div>
          </div>
          <div className={styles.monitorStand} />
          <div className={styles.monitorBase} />
        </div>

        {/* Laptop */}
        <div className={styles.laptop}>
          <div className={styles.laptopScreen}>
            <div className={styles.laptopContent}>
              <div className={styles.browserBar}>
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
              </div>
              <div className={styles.browserContent} />
            </div>
          </div>
          <div className={styles.laptopKeyboard}>
            <div className={styles.keyboardKeys}>
              {[...Array(30)].map((_, i) => (
                <span key={i} className={styles.key} />
              ))}
            </div>
            <div className={styles.trackpad} />
          </div>
        </div>

        {/* Keyboard */}
        <div className={styles.keyboard3d}>
          {[...Array(4)].map((_, row) => (
            <div key={row} className={styles.keyboardRow}>
              {[...Array(row === 3 ? 8 : 12)].map((_, key) => (
                <span
                  key={key}
                  className={`${styles.mechanicalKey} ${
                    Math.random() > 0.7 ? styles.keyActive : ""
                  }`}
                  style={{
                    width: row === 3 && key === 4 ? "60px" : "20px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mouse */}
        <div className={styles.mouse3d}>
          <div className={styles.mouseBody}>
            <div className={styles.mouseScroll} />
          </div>
        </div>

        {/* Coffee Cup */}
        <div className={styles.coffeeCup}>
          <div className={styles.cupBody} />
          <div className={styles.cupHandle} />
          <div className={styles.steam}>
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Floating Icons */}
        <div className={styles.floatingIcons}>
          <span
            className={styles.floatIcon}
            style={{ "--delay": "0s", "--x": "-60px", "--y": "-40px" }}
          >
            ⚛️
          </span>
          <span
            className={styles.floatIcon}
            style={{ "--delay": "0.5s", "--x": "70px", "--y": "-30px" }}
          >
            🚀
          </span>
          <span
            className={styles.floatIcon}
            style={{ "--delay": "1s", "--x": "-50px", "--y": "20px" }}
          >
            💻
          </span>
          <span
            className={styles.floatIcon}
            style={{ "--delay": "1.5s", "--x": "60px", "--y": "30px" }}
          >
            ⚡
          </span>
        </div>
      </div>

      <p className={styles.interactHint}>
        {isHovered ? "👆 Move to rotate" : "✨ Hover to interact"}
      </p>
    </div>
  );
};

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

// Uses data organized by category
const usesData = [
  {
    id: "hardware",
    title: "Hardware",
    icon: "💻",
    color: "#3b82f6",
    items: [
      {
        name: 'MacBook Pro 16" M3 Max',
        description:
          "My main development machine. The M3 Max chip handles everything I throw at it.",
        link: "https://apple.com/macbook-pro",
      },
      {
        name: 'Dell UltraSharp 32" 4K Monitor',
        description:
          "Crisp display for coding and design work. Color accuracy is excellent.",
        link: "https://dell.com",
      },
      {
        name: "Keychron Q1 Pro",
        description:
          "Mechanical keyboard with Gateron Brown switches. Perfect typing feel.",
        link: "https://keychron.com",
      },
      {
        name: "Logitech MX Master 3S",
        description:
          "Best mouse for productivity. The scroll wheel is a game changer.",
        link: "https://logitech.com",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise cancelling headphones for focused work sessions.",
        link: "https://sony.com",
      },
      {
        name: "Autonomous ErgoChair Pro",
        description:
          "Ergonomic chair that keeps me comfortable during long coding sessions.",
        link: "https://autonomous.ai",
      },
    ],
  },
  {
    id: "development",
    title: "Development",
    icon: "⚡",
    color: "#a855f7",
    items: [
      {
        name: "VS Code",
        description:
          "My go-to code editor. Extended with GitHub Copilot, ESLint, and Prettier.",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Warp Terminal",
        description:
          "Modern terminal with AI built-in. Makes CLI work much faster.",
        link: "https://warp.dev",
      },
      {
        name: "GitHub",
        description:
          "Where all my code lives. Also using GitHub Actions for CI/CD.",
        link: "https://github.com",
      },
      {
        name: "Vercel",
        description:
          "Deployment platform for all my Next.js projects. Zero config deploys.",
        link: "https://vercel.com",
      },
      {
        name: "Docker",
        description:
          "Containerization for consistent development environments.",
        link: "https://docker.com",
      },
      {
        name: "Postman",
        description:
          "API testing and documentation. Essential for backend work.",
        link: "https://postman.com",
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    icon: "🎨",
    color: "#ec4899",
    items: [
      {
        name: "Figma",
        description:
          "UI/UX design and prototyping. Collaborative and powerful.",
        link: "https://figma.com",
      },
      {
        name: "Framer",
        description: "Interactive prototypes and website building.",
        link: "https://framer.com",
      },
      {
        name: "Adobe Creative Cloud",
        description: "Photoshop for image editing, Illustrator for vectors.",
        link: "https://adobe.com",
      },
      {
        name: "Spline",
        description: "3D design tool for creating interactive web experiences.",
        link: "https://spline.design",
      },
    ],
  },
  {
    id: "productivity",
    title: "Productivity",
    icon: "📱",
    color: "#f59e0b",
    items: [
      {
        name: "Notion",
        description: "Second brain for notes, docs, and project management.",
        link: "https://notion.so",
      },
      {
        name: "Linear",
        description:
          "Issue tracking that doesn't get in the way. Beautiful and fast.",
        link: "https://linear.app",
      },
      {
        name: "Raycast",
        description:
          "Spotlight replacement with superpowers. Snippets, clipboard history, and more.",
        link: "https://raycast.com",
      },
      {
        name: "Arc Browser",
        description:
          "The browser I switched to. Spaces and split view are amazing.",
        link: "https://arc.net",
      },
      {
        name: "Cron Calendar",
        description:
          "Beautiful calendar app with keyboard shortcuts and time zones.",
        link: "https://cron.com",
      },
      {
        name: "Spark Mail",
        description: "Smart email client with great organization features.",
        link: "https://sparkmailapp.com",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Tools",
    icon: "🤖",
    color: "#10b981",
    items: [
      {
        name: "GitHub Copilot",
        description: "AI pair programmer. Speeds up coding significantly.",
        link: "https://github.com/features/copilot",
      },
      {
        name: "ChatGPT Plus",
        description: "For brainstorming, writing, and problem solving.",
        link: "https://openai.com/chatgpt",
      },
      {
        name: "Claude",
        description: "Great for longer conversations and nuanced analysis.",
        link: "https://claude.ai",
      },
      {
        name: "Midjourney",
        description: "AI image generation for concepts and inspiration.",
        link: "https://midjourney.com",
      },
    ],
  },
  {
    id: "stack",
    title: "Tech Stack",
    icon: "🛠️",
    color: "#6366f1",
    items: [
      {
        name: "Next.js",
        description:
          "React framework for production. Using App Router for new projects.",
        link: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        description:
          "Type safety for JavaScript. Can't imagine coding without it now.",
        link: "https://typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS. Makes styling fast and consistent.",
        link: "https://tailwindcss.com",
      },
      {
        name: "Framer Motion",
        description: "Animation library for React. Powers all my animations.",
        link: "https://framer.com/motion",
      },
      {
        name: "Prisma",
        description: "ORM for Node.js. Makes database work enjoyable.",
        link: "https://prisma.io",
      },
      {
        name: "PostgreSQL",
        description: "Database of choice. Reliable and feature-rich.",
        link: "https://postgresql.org",
      },
    ],
  },
];

export default function UsesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredData =
    activeCategory === "all"
      ? usesData
      : usesData.filter((cat) => cat.id === activeCategory);

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
          <span className={styles.heroLabel}>🛠️ USES</span>
          <h1 className={styles.heroTitle}>
            My <span className={styles.heroHighlight}>Setup</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A comprehensive list of the tools, apps, and hardware I use daily
            for development, design, and productivity. Updated regularly.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{usesData.length}</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>
              {usesData.reduce((acc, cat) => acc + cat.items.length, 0)}
            </span>
            <span className={styles.statLabel}>Tools</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>2025</span>
            <span className={styles.statLabel}>Updated</span>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "8%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⚙️
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "25%", right: "10%" }}
          animate={{ y: [0, 15, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          🔧
        </motion.div>
      </section>

      {/* 3D Tech Setup Section */}
      <section className={styles.techSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TechSetup3D />
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterWrapper}>
          <button
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.active : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {usesData.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              style={{ "--cat-color": cat.color }}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Uses Grid */}
      <section className={styles.usesSection}>
        <motion.div
          className={styles.categoriesContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredData.map((category) => (
            <motion.div
              key={category.id}
              className={styles.categoryBlock}
              variants={itemVariants}
            >
              <div
                className={styles.categoryHeader}
                style={{ "--cat-color": category.color }}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <span className={styles.categoryCount}>
                  {category.items.length} items
                </span>
              </div>

              <div className={styles.itemsGrid}>
                {category.items.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.itemCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    style={{ "--cat-color": category.color }}
                  >
                    <div className={styles.itemHeader}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <svg
                        className={styles.itemArrow}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Disclaimer */}
      <section className={styles.disclaimerSection}>
        <motion.div
          className={styles.disclaimerContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.disclaimerIcon}>💡</span>
          <p className={styles.disclaimerText}>
            Some links may be affiliate links. I only recommend products I
            actually use and love. This page is inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              uses.tech
            </a>
            .
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
