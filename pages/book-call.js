import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/BookCall.module.css";

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

export default function BookCall() {
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    timezone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get user's timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData((prev) => ({ ...prev, timezone: tz }));
  }, []);

  const callTypes = [
    {
      id: "intro",
      title: "Intro Call",
      duration: "15 min",
      icon: "👋",
      description: "Quick introduction and see if we're a good fit",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "consultation",
      title: "Project Consultation",
      duration: "30 min",
      icon: "💼",
      description: "Discuss your project requirements and ideas",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: "technical",
      title: "Technical Discussion",
      duration: "45 min",
      icon: "🛠️",
      description: "Deep dive into technical architecture and solutions",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: "mentorship",
      title: "Mentorship Session",
      duration: "60 min",
      icon: "🎓",
      description: "Career guidance, code review, or learning session",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const availableSlots = [
    { day: "Monday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Tuesday", slots: ["9:00 AM", "11:00 AM", "3:00 PM"] },
    { day: "Wednesday", slots: ["10:00 AM", "1:00 PM", "5:00 PM"] },
    { day: "Thursday", slots: ["9:00 AM", "2:00 PM", "4:00 PM"] },
    { day: "Friday", slots: ["10:00 AM", "12:00 PM", "3:00 PM"] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
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
            📞 SCHEDULE A CALL
          </motion.span>
          <h1 className={styles.heroTitle}>
            Let's <span className={styles.heroHighlight}>Connect</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Book a call with me to discuss your project, get career advice, or
            just have a friendly chat about technology and development.
          </p>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "15%", left: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          📅
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
          💬
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
          🚀
        </motion.div>
      </section>

      {submitted ? (
        /* Success Message */
        <motion.section
          className={styles.successSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.successCard}>
            <motion.div
              className={styles.successIcon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              ✅
            </motion.div>
            <h2>Booking Request Sent!</h2>
            <p>
              Thank you for your interest! I'll review your request and get back
              to you within 24 hours with available time slots.
            </p>
            <motion.div className={styles.successActions}>
              <Link href="/more" className={styles.backBtn}>
                ← Back to More
              </Link>
              <button
                className={styles.newBookingBtn}
                onClick={() => {
                  setSubmitted(false);
                  setSelectedType(null);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    message: "",
                    timezone: formData.timezone,
                  });
                }}
              >
                Book Another Call
              </button>
            </motion.div>
          </div>
        </motion.section>
      ) : (
        <>
          {/* Call Types Section */}
          <section className={styles.typesSection}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose a Call Type
            </motion.h2>

            <motion.div
              className={styles.typesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {callTypes.map((type) => (
                <motion.div
                  key={type.id}
                  className={`${styles.typeCard} ${selectedType === type.id ? styles.selected : ""}`}
                  variants={itemVariants}
                  onClick={() => setSelectedType(type.id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ background: type.gradient }}
                >
                  <div className={styles.typeIcon}>{type.icon}</div>
                  <h3 className={styles.typeTitle}>{type.title}</h3>
                  <span className={styles.typeDuration}>{type.duration}</span>
                  <p className={styles.typeDescription}>{type.description}</p>
                  {selectedType === type.id && (
                    <motion.div
                      className={styles.selectedBadge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓ Selected
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Availability Preview */}
          <section className={styles.availabilitySection}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              My Availability
            </motion.h2>
            <p className={styles.timezoneNote}>
              Times shown in your timezone: <strong>{formData.timezone}</strong>
            </p>

            <motion.div
              className={styles.availabilityGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {availableSlots.map((day, index) => (
                <motion.div
                  key={day.day}
                  className={styles.dayCard}
                  variants={itemVariants}
                >
                  <h4 className={styles.dayName}>{day.day}</h4>
                  <div className={styles.slots}>
                    {day.slots.map((slot) => (
                      <span key={slot} className={styles.slot}>
                        {slot}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Booking Form */}
          <section className={styles.formSection}>
            <motion.div
              className={styles.formContainer}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.formTitle}>Book Your Call</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and I'll get back to you with available
                time slots.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="company">Company / Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc. (Optional)"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">
                    What would you like to discuss? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me a bit about what you'd like to talk about..."
                    rows={5}
                    required
                  />
                </div>

                <div className={styles.selectedInfo}>
                  {selectedType ? (
                    <p>
                      📌 Selected:{" "}
                      <strong>
                        {callTypes.find((t) => t.id === selectedType)?.title}
                      </strong>{" "}
                      ({callTypes.find((t) => t.id === selectedType)?.duration})
                    </p>
                  ) : (
                    <p className={styles.warning}>
                      ⚠️ Please select a call type above
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!selectedType || isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className={styles.loading}>
                      <span className={styles.spinner}></span>
                      Sending Request...
                    </span>
                  ) : (
                    <>📅 Request Booking</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </section>

          {/* Alternative Contact */}
          <section className={styles.alternativeSection}>
            <motion.div
              className={styles.alternativeCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Prefer Email?</h3>
              <p>
                If you'd rather send me an email directly, you can reach me at:
              </p>
              <a href="mailto:hello@aakash.dev" className={styles.emailLink}>
                hello@aakash.dev
              </a>
            </motion.div>
          </section>
        </>
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
