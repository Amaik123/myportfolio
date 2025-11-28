import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Certifications.module.css";

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

export default function Certifications() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample certifications data - Replace with your actual certifications
  const certifications = [
    {
      id: 1,
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      issuerLogo: "🔶",
      date: "2024",
      expiryDate: "2027",
      credentialId: "AWS-SAA-XXXXX",
      credentialUrl: "https://aws.amazon.com/verification",
      category: "cloud",
      skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
      description:
        "Validates expertise in designing distributed systems on AWS, including compute, networking, storage, and database services.",
      badge:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      issuerLogo: "🔷",
      date: "2024",
      expiryDate: "2026",
      credentialId: "GCP-PD-XXXXX",
      credentialUrl: "https://cloud.google.com/certification",
      category: "cloud",
      skills: ["GCP", "Cloud Functions", "App Engine", "Kubernetes"],
      description:
        "Demonstrates ability to build scalable and highly available applications using Google Cloud recommended practices.",
      badge:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Meta Front-End Developer",
      issuer: "Meta (Coursera)",
      issuerLogo: "🔵",
      date: "2023",
      expiryDate: null,
      credentialId: "META-FE-XXXXX",
      credentialUrl: "https://coursera.org/verify",
      category: "development",
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX"],
      description:
        "Professional certificate covering React, JavaScript, and modern front-end development practices.",
      badge:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
      featured: false,
    },
    {
      id: 4,
      title: "MongoDB Developer Associate",
      issuer: "MongoDB",
      issuerLogo: "🍃",
      date: "2023",
      expiryDate: "2026",
      credentialId: "MDB-DA-XXXXX",
      credentialUrl: "https://university.mongodb.com",
      category: "database",
      skills: ["MongoDB", "NoSQL", "Aggregation", "Indexing"],
      description:
        "Validates skills in building and maintaining applications with MongoDB, including data modeling and query optimization.",
      badge:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "Certified Kubernetes Administrator",
      issuer: "CNCF",
      issuerLogo: "⚓",
      date: "2024",
      expiryDate: "2027",
      credentialId: "CKA-XXXXX",
      credentialUrl: "https://www.cncf.io/certification",
      category: "devops",
      skills: ["Kubernetes", "Docker", "Container Orchestration", "DevOps"],
      description:
        "Demonstrates competence in Kubernetes administration, including cluster installation, configuration, and troubleshooting.",
      badge:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=80",
      featured: true,
    },
    {
      id: 6,
      title: "GitHub Actions",
      issuer: "GitHub",
      issuerLogo: "🐙",
      date: "2023",
      expiryDate: null,
      credentialId: "GH-ACTIONS-XXXXX",
      credentialUrl: "https://github.com/skills",
      category: "devops",
      skills: ["CI/CD", "GitHub Actions", "Automation", "Workflows"],
      description:
        "Certification for mastering GitHub Actions for continuous integration and deployment workflows.",
      badge:
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80",
      featured: false,
    },
    {
      id: 7,
      title: "Python for Data Science",
      issuer: "IBM",
      issuerLogo: "🔹",
      date: "2023",
      expiryDate: null,
      credentialId: "IBM-PDS-XXXXX",
      credentialUrl: "https://www.ibm.com/training",
      category: "data",
      skills: ["Python", "Pandas", "NumPy", "Data Analysis"],
      description:
        "Professional certification covering Python programming for data science and analysis applications.",
      badge:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
      featured: false,
    },
    {
      id: 8,
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      issuerLogo: "🧠",
      date: "2024",
      expiryDate: "2027",
      credentialId: "TF-DEV-XXXXX",
      credentialUrl: "https://www.tensorflow.org/certificate",
      category: "ai",
      skills: [
        "TensorFlow",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
      ],
      description:
        "Demonstrates proficiency in using TensorFlow to build and train neural networks for various ML applications.",
      badge:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      featured: true,
    },
  ];

  const categories = [
    { id: "all", label: "All", icon: "🏆" },
    { id: "cloud", label: "Cloud", icon: "☁️" },
    { id: "development", label: "Development", icon: "💻" },
    { id: "devops", label: "DevOps", icon: "⚙️" },
    { id: "database", label: "Database", icon: "🗄️" },
    { id: "data", label: "Data Science", icon: "📊" },
    { id: "ai", label: "AI/ML", icon: "🤖" },
  ];

  const filteredCerts =
    activeFilter === "all"
      ? certifications
      : certifications.filter((cert) => cert.category === activeFilter);

  const featuredCerts = certifications.filter((cert) => cert.featured);

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

  const stats = [
    { label: "Total Certifications", value: certifications.length, icon: "🎖️" },
    {
      label: "Active Certifications",
      value: certifications.filter(
        (c) => c.expiryDate === null || new Date(c.expiryDate) > new Date()
      ).length,
      icon: "✅",
    },
    { label: "Categories", value: categories.length - 1, icon: "📁" },
    { label: "Featured", value: featuredCerts.length, icon: "⭐" },
  ];

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
            🎓 CERTIFICATIONS
          </motion.span>
          <h1 className={styles.heroTitle}>
            My <span className={styles.heroHighlight}>Credentials</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A collection of professional certifications and credentials that
            validate my expertise in various technologies and domains.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🏅
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
          📜
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
          🎯
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <motion.div
          className={styles.statsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              variants={itemVariants}
            >
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Certifications */}
      <section className={styles.featuredSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ⭐ Featured Certifications
        </motion.h2>

        <motion.div
          className={styles.featuredGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              className={styles.featuredCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedCert(cert)}
            >
              <div
                className={styles.featuredBadge}
                style={{ backgroundImage: `url(${cert.badge})` }}
              >
                <div className={styles.featuredOverlay}>
                  <span className={styles.issuerLogo}>{cert.issuerLogo}</span>
                </div>
              </div>
              <div className={styles.featuredContent}>
                <h3 className={styles.featuredTitle}>{cert.title}</h3>
                <p className={styles.featuredIssuer}>{cert.issuer}</p>
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredDate}>📅 {cert.date}</span>
                  {cert.expiryDate && (
                    <span className={styles.featuredExpiry}>
                      Valid until {cert.expiryDate}
                    </span>
                  )}
                </div>
                <div className={styles.featuredSkills}>
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className={styles.skillMore}>
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <motion.div
          className={styles.filterWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`${styles.filterBtn} ${activeFilter === category.id ? styles.active : ""}`}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* All Certifications Grid */}
      <section className={styles.certsSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          All Certifications
        </motion.h2>

        <motion.div
          className={styles.certsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeFilter}
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              className={styles.certCard}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setSelectedCert(cert)}
              layout
            >
              <div className={styles.certHeader}>
                <span className={styles.certLogo}>{cert.issuerLogo}</span>
                <div className={styles.certHeaderInfo}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                </div>
                {cert.featured && (
                  <span className={styles.certFeaturedBadge}>⭐</span>
                )}
              </div>

              <p className={styles.certDescription}>{cert.description}</p>

              <div className={styles.certSkills}>
                {cert.skills.map((skill) => (
                  <span key={skill} className={styles.certSkillTag}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className={styles.certFooter}>
                <div className={styles.certDates}>
                  <span>📅 Issued: {cert.date}</span>
                  {cert.expiryDate && (
                    <span>⏳ Expires: {cert.expiryDate}</span>
                  )}
                </div>
                <motion.button
                  className={styles.viewBtn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCerts.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className={styles.emptyIcon}>🔍</span>
            <p>No certifications found in this category.</p>
          </motion.div>
        )}
      </section>

      {/* Modal for Certification Details */}
      {selectedCert && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>

            <div
              className={styles.modalBadge}
              style={{ backgroundImage: `url(${selectedCert.badge})` }}
            >
              <div className={styles.modalBadgeOverlay}>
                <span className={styles.modalLogo}>
                  {selectedCert.issuerLogo}
                </span>
              </div>
            </div>

            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{selectedCert.title}</h2>
              <p className={styles.modalIssuer}>
                Issued by {selectedCert.issuer}
              </p>

              <p className={styles.modalDescription}>
                {selectedCert.description}
              </p>

              <div className={styles.modalMeta}>
                <div className={styles.modalMetaItem}>
                  <span className={styles.metaLabel}>Credential ID</span>
                  <span className={styles.metaValue}>
                    {selectedCert.credentialId}
                  </span>
                </div>
                <div className={styles.modalMetaItem}>
                  <span className={styles.metaLabel}>Issue Date</span>
                  <span className={styles.metaValue}>{selectedCert.date}</span>
                </div>
                {selectedCert.expiryDate && (
                  <div className={styles.modalMetaItem}>
                    <span className={styles.metaLabel}>Expiry Date</span>
                    <span className={styles.metaValue}>
                      {selectedCert.expiryDate}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.modalSkills}>
                <span className={styles.metaLabel}>Skills</span>
                <div className={styles.modalSkillTags}>
                  {selectedCert.skills.map((skill) => (
                    <span key={skill} className={styles.modalSkillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verifyBtn}
              >
                🔗 Verify Credential
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}

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
