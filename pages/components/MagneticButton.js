import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/MagneticButton.module.css";

const MagneticButton = ({
  children,
  className = "",
  strength = 40,
  borderStrength = 60,
  onClick,
  href,
  target,
  as = "button",
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [borderPosition, setBorderPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Content moves less
    setPosition({
      x: deltaX * (strength / 100),
      y: deltaY * (strength / 100),
    });

    // Border/glow moves more for parallax effect
    setBorderPosition({
      x: deltaX * (borderStrength / 100),
      y: deltaY * (borderStrength / 100),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setBorderPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Component = as === "a" ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      className={`${styles.magneticWrapper} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Magnetic glow effect */}
      <motion.div
        className={styles.magneticGlow}
        animate={{
          x: borderPosition.x,
          y: borderPosition.y,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />

      {/* Main button content */}
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 15,
          mass: 0.1,
        }}
      >
        <Component
          className={styles.magneticButton}
          onClick={onClick}
          href={href}
          target={target}
        >
          <span className={styles.magneticText}>{children}</span>
          <motion.span
            className={styles.magneticArrow}
            animate={{
              x: isHovered ? 5 : 0,
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            →
          </motion.span>
        </Component>
      </motion.div>
    </motion.div>
  );
};

export default MagneticButton;
