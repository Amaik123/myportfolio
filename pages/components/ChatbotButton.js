import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/ChatbotButton.module.css";

export default function ChatbotButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div className={styles.chatbotButtonContainer}>
      <motion.button
        className={styles.chatbotButton}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1,
        }}
      >
        {/* Pulsing ring */}
        <div className={styles.pulseRing}></div>

        {/* Avatar */}
        <div
          className={styles.avatar}
          style={{ backgroundImage: "url(/mypic.png)" }}
        >
          <div className={styles.statusDot}></div>
        </div>

        {/* AI Sparkle effect */}
        <motion.div
          className={styles.sparkle}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ✨
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <p>Ask me anything!</p>
            <span>Powered by AI 🤖</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
