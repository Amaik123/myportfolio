import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Guestbook.module.css";

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

// Sample messages (in a real app, these would come from a database)
const sampleMessages = [
  {
    id: 1,
    name: "Sarah Chen",
    message:
      "Love the portfolio design! The animations are so smooth. Keep up the amazing work! 🚀",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    date: "2025-11-25",
    emoji: "🎉",
  },
  {
    id: 2,
    name: "Alex Kumar",
    message:
      "The 3D effects are incredible. Definitely inspired me to level up my own portfolio.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    date: "2025-11-24",
    emoji: "✨",
  },
  {
    id: 3,
    name: "Jordan Lee",
    message:
      "Found this through GitHub. The code quality is top-notch. Would love to collaborate sometime!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    date: "2025-11-23",
    emoji: "💻",
  },
  {
    id: 4,
    name: "Emma Wilson",
    message:
      "The attention to detail here is amazing. The micro-interactions make it feel so polished.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    date: "2025-11-22",
    emoji: "💜",
  },
  {
    id: 5,
    name: "Dev Community",
    message:
      "Featured this on our weekly newsletter! Great example of modern web development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevCom",
    date: "2025-11-21",
    emoji: "🔥",
  },
];

const emojis = ["🎉", "✨", "💜", "🚀", "💻", "🔥", "⭐", "👏", "🙌", "💯"];

export default function GuestbookPage() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("guestbookMessages");
    if (savedMessages) {
      setMessages([...JSON.parse(savedMessages), ...sampleMessages]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !name.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      message: newMessage.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.trim()}`,
      date: new Date().toISOString().split("T")[0],
      emoji: selectedEmoji,
    };

    const updatedMessages = [newEntry, ...messages];
    setMessages(updatedMessages);

    // Save to localStorage (in real app, save to database)
    const userMessages = updatedMessages.filter(
      (m) => !sampleMessages.find((s) => s.id === m.id)
    );
    localStorage.setItem("guestbookMessages", JSON.stringify(userMessages));

    setNewMessage("");
    setName("");
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

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
          <span className={styles.heroLabel}>✍️ GUESTBOOK</span>
          <h1 className={styles.heroTitle}>
            Leave Your <span className={styles.heroHighlight}>Mark</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Sign the guestbook and share your thoughts, feedback, or just say
            hello! Your message will be displayed below for everyone to see.
          </p>
        </motion.div>

        {/* Floating emojis */}
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "20%", left: "10%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ top: "30%", right: "15%" }}
          animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          💜
        </motion.div>
        <motion.div
          className={styles.floatingEmoji}
          style={{ bottom: "30%", left: "8%" }}
          animate={{ y: [0, -25, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
        >
          🚀
        </motion.div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Sign Form */}
        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.formTitle}>Sign the Guestbook</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={styles.input}
                  required
                  maxLength={50}
                />
              </div>
              <div className={styles.emojiGroup}>
                <label className={styles.label}>Pick an Emoji</label>
                <div className={styles.emojiPicker}>
                  {emojis.map((emoji) => (
                    <motion.button
                      key={emoji}
                      type="button"
                      className={`${styles.emojiBtn} ${
                        selectedEmoji === emoji ? styles.emojiBtnActive : ""
                      }`}
                      onClick={() => setSelectedEmoji(emoji)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>
                Your Message
              </label>
              <textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts, feedback, or just say hello..."
                className={styles.textarea}
                required
                maxLength={500}
                rows={4}
              />
              <span className={styles.charCount}>{newMessage.length}/500</span>
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting || !newMessage.trim() || !name.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className={styles.submitting}>
                  <span className={styles.spinner}></span>
                  Signing...
                </span>
              ) : (
                <>
                  <span>Sign Guestbook</span>
                  <span className={styles.btnEmoji}>{selectedEmoji}</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Success message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✅ Thanks for signing the guestbook!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages Section */}
        <section className={styles.messagesSection}>
          <div className={styles.messagesHeader}>
            <h2 className={styles.messagesTitle}>
              <span className={styles.messageCount}>{messages.length}</span>
              Messages from Visitors
            </h2>
          </div>

          <motion.div
            className={styles.messagesList}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                className={styles.messageCard}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className={styles.messageHeader}>
                  <div className={styles.messageAvatar}>
                    <img src={msg.avatar} alt={msg.name} />
                    <span className={styles.messageEmoji}>{msg.emoji}</span>
                  </div>
                  <div className={styles.messageInfo}>
                    <span className={styles.messageName}>{msg.name}</span>
                    <span className={styles.messageDate}>{msg.date}</span>
                  </div>
                </div>
                <p className={styles.messageText}>{msg.message}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.section
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Want to connect further?</h3>
            <p className={styles.ctaText}>
              Feel free to reach out on social media or send me an email!
            </p>
            <div className={styles.ctaButtons}>
              <motion.a
                href="https://github.com/Amaik123"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
