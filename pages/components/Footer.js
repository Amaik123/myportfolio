import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const linkVariants = {
    rest: { x: 0 },
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      className={styles.footer}
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY,
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className={styles.gradientOrb}
        style={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
      />

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Section - Brand & Description */}
        <motion.div className={styles.brandSection} variants={itemVariants}>
          <motion.div
            className={styles.logo}
            whileHover={{
              scale: 1.1,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/logov2.png" alt="Logo" className={styles.logoImage} />
          </motion.div>
          <motion.p className={styles.description} variants={itemVariants}>
            I'm Aakash K. - a certified cloud & AI solutions architect,
            full-stack developer & problem solver. Thanks for checking out my
            site!
          </motion.p>
        </motion.div>

        {/* Navigation Columns */}
        <motion.div className={styles.navColumns} variants={containerVariants}>
          {/* General Column */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>General</h3>
            <ul className={styles.linkList}>
              {["Home", "About", "Projects", "Blog"].map((item, index) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <a
                    href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  >
                    <motion.span
                      initial={{ backgroundSize: "0% 2px" }}
                      whileHover={{ backgroundSize: "100% 2px" }}
                      transition={{ duration: 0.3 }}
                    >
                      {item}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Specifics Column */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>Specifics</h3>
            <ul className={styles.linkList}>
              {[
                { name: "Guestbook", href: "/guestbook" },
                { name: "Bucket List", href: "/bucketlist" },
                { name: "Timeline", href: "/timeline" },
                { name: "Uses", href: "/uses" },
              ].map((item) => (
                <motion.li
                  key={item.name}
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <a href={item.href}>{item.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* More Column */}
          <motion.div className={styles.column} variants={itemVariants}>
            <h3 className={styles.columnTitle}>More</h3>
            <ul className={styles.linkList}>
              {[
                { name: "Book a call", href: "/contact" },
                { name: "Links", href: "/links" },
                { name: "RSS", href: "/rss" },
              ].map((item) => (
                <motion.li
                  key={item.name}
                  variants={linkVariants}
                  whileHover="hover"
                  initial="rest"
                >
                  <a href={item.href}>{item.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className={styles.bottomSection}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.bottomContainer}>
          <div className={styles.copyright}>
            © 2025 Aakash K. All rights reserved
            <span className={styles.divider}>•</span>
            <motion.a
              href="/privacy"
              whileHover={{ color: "#a855f7", scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <span className={styles.divider}>•</span>
            <motion.a
              href="/terms"
              whileHover={{ color: "#a855f7", scale: 1.05 }}
            >
              Terms & Conditions
            </motion.a>
            <span className={styles.divider}>•</span>
            <motion.a
              href="/resume"
              whileHover={{ color: "#a855f7", scale: 1.05 }}
            >
              Resume
            </motion.a>
          </div>

          <div className={styles.socialIcons}>
            <motion.button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {isDark ? <MdLightMode /> : <MdDarkMode />}
            </motion.button>

            {[
              {
                Icon: FaLinkedin,
                href: "https://linkedin.com/in/aayushbharti",
                label: "LinkedIn",
              },
              {
                Icon: FaGithub,
                href: "https://github.com/aayushbharti",
                label: "GitHub",
              },
              {
                Icon: FaTwitter,
                href: "https://twitter.com/aayushbharti",
                label: "Twitter",
              },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.socialIcon}
                whileHover={{
                  scale: 1.2,
                  y: -5,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}
