import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Attribution.module.css";

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

export default function Attribution() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const attributions = [
    {
      category: "Frameworks & Libraries",
      icon: "⚛️",
      items: [
        {
          name: "Next.js",
          description: "The React framework for production",
          url: "https://nextjs.org",
          icon: "▲",
        },
        {
          name: "React",
          description: "A JavaScript library for building user interfaces",
          url: "https://react.dev",
          icon: "⚛️",
        },
        {
          name: "Framer Motion",
          description: "Production-ready motion library for React",
          url: "https://www.framer.com/motion",
          icon: "🎬",
        },
        {
          name: "Three.js",
          description: "3D library for JavaScript",
          url: "https://threejs.org",
          icon: "🎮",
        },
        {
          name: "React Three Fiber",
          description: "React renderer for Three.js",
          url: "https://docs.pmnd.rs/react-three-fiber",
          icon: "🧊",
        },
      ],
    },
    {
      category: "Design & Icons",
      icon: "🎨",
      items: [
        {
          name: "Unsplash",
          description: "Beautiful free images & pictures",
          url: "https://unsplash.com",
          icon: "📷",
        },
        {
          name: "Google Fonts",
          description: "Free and open-source fonts",
          url: "https://fonts.google.com",
          icon: "🔤",
        },
        {
          name: "Heroicons",
          description: "Beautiful hand-crafted SVG icons",
          url: "https://heroicons.com",
          icon: "✨",
        },
      ],
    },
    {
      category: "Tools & Services",
      icon: "🛠️",
      items: [
        {
          name: "Vercel",
          description: "Deploy web projects with ease",
          url: "https://vercel.com",
          icon: "▲",
        },
        {
          name: "GitHub",
          description: "Where the world builds software",
          url: "https://github.com",
          icon: "🐙",
        },
        {
          name: "VS Code",
          description: "Code editing. Redefined.",
          url: "https://code.visualstudio.com",
          icon: "💻",
        },
        {
          name: "Figma",
          description: "The collaborative interface design tool",
          url: "https://figma.com",
          icon: "🎨",
        },
      ],
    },
    {
      category: "Inspiration",
      icon: "💡",
      items: [
        {
          name: "Awwwards",
          description: "Website awards & web design inspiration",
          url: "https://awwwards.com",
          icon: "🏆",
        },
        {
          name: "Dribbble",
          description: "Discover the world's top designers",
          url: "https://dribbble.com",
          icon: "🏀",
        },
        {
          name: "CodePen",
          description: "Social development environment",
          url: "https://codepen.io",
          icon: "✏️",
        },
      ],
    },
    {
      category: "Special Thanks",
      icon: "❤️",
      items: [
        {
          name: "Open Source Community",
          description: "For all the amazing libraries and tools",
          url: "https://opensource.org",
          icon: "🌍",
        },
        {
          name: "Stack Overflow",
          description: "For solving countless problems",
          url: "https://stackoverflow.com",
          icon: "📚",
        },
        {
          name: "Dev.to",
          description: "For tutorials and inspiration",
          url: "https://dev.to",
          icon: "👩‍💻",
        },
      ],
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

      {/* Floating Background Elements */}
      <div className={styles.bgElements}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingShape}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className={styles.heroEmoji}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🙏
          </motion.span>
          <span className={styles.heroLabel}>CREDITS & THANKS</span>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroHighlight}>Attribution</span>
          </h1>
          <p className={styles.heroSubtitle}>
            This portfolio wouldn't be possible without these amazing resources,
            tools, and the incredible open-source community. Thank you all! ❤️
          </p>
        </motion.div>
      </section>

      {/* Attribution Categories */}
      <section className={styles.attributionSection}>
        <motion.div
          className={styles.categoriesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {attributions.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className={styles.categoryCard}
              variants={itemVariants}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <h2 className={styles.categoryTitle}>{category.category}</h2>
              </div>

              <div className={styles.itemsList}>
                {category.items.map((item, itemIndex) => (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.attributionItem}
                    whileHover={{
                      x: 10,
                      backgroundColor: "rgba(168, 85, 247, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemDescription}>
                        {item.description}
                      </p>
                    </div>
                    <span className={styles.itemArrow}>→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* License Section */}
      <section className={styles.licenseSection}>
        <motion.div
          className={styles.licenseCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.licenseIcon}>📜</div>
          <h2 className={styles.licenseTitle}>Open Source</h2>
          <p className={styles.licenseText}>
            This portfolio is open source and available on GitHub. Feel free to
            use it as inspiration for your own projects, but please give credit
            where it's due!
          </p>
          <div className={styles.licenseButtons}>
            <motion.a
              href="https://github.com/Amaik123/myportfolio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.licenseBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>⭐</span> Star on GitHub
            </motion.a>
            <motion.a
              href="https://github.com/Amaik123/myportfolio/fork"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.licenseBtn} ${styles.licenseBtnSecondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>🍴</span> Fork Project
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Thank You Section */}
      <section className={styles.thankYouSection}>
        <motion.div
          className={styles.thankYouContent}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles.heartEmoji}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.div>
          <h2 className={styles.thankYouTitle}>Thank You!</h2>
          <p className={styles.thankYouText}>
            To everyone who has contributed to the open-source community, shared
            their knowledge, and inspired developers around the world. You make
            the web a better place!
          </p>
          <Link href="/more" className={styles.backLink}>
            ← Back to More
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
