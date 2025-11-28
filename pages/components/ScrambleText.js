import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/ScrambleText.module.css";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const ScrambleText = ({
  text,
  className = "",
  scrambleSpeed = 30,
  revealSpeed = 50,
  triggerOnView = true,
  triggerOnHover = false,
  delay = 0,
  as: Tag = "span",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const originalText = text;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            // Keep spaces as spaces
            if (char === " ") return " ";

            // Already revealed characters stay revealed
            if (index < iteration) {
              return originalText[index];
            }

            // Scramble remaining characters
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iteration += 1 / (revealSpeed / scrambleSpeed);
    }, scrambleSpeed);
  }, [text, scrambleSpeed, revealSpeed, isScrambling]);

  useEffect(() => {
    if (!triggerOnView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setTimeout(() => scramble(), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, [triggerOnView, scramble, delay]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble();
    }
  };

  return (
    <Tag
      ref={ref}
      className={`${styles.scrambleText} ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Tag>
  );
};

// Hero title variant with bigger effect
export const ScrambleTitle = ({ text, className = "" }) => {
  return (
    <ScrambleText
      text={text}
      className={`${styles.scrambleTitle} ${className}`}
      scrambleSpeed={25}
      revealSpeed={40}
      delay={500}
      as="h1"
    />
  );
};

// Hover scramble for links/buttons
export const ScrambleLink = ({ text, href, className = "", onClick }) => {
  return (
    <a href={href} onClick={onClick} className={className}>
      <ScrambleText
        text={text}
        triggerOnView={false}
        triggerOnHover={true}
        scrambleSpeed={20}
        revealSpeed={30}
      />
    </a>
  );
};

export default ScrambleText;
