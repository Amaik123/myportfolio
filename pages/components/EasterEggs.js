import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/EasterEggs.module.css";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

// Dev mode: type "dev" quickly
const DEV_CODE = ["KeyD", "KeyE", "KeyV"];

// Party mode: type "party"
const PARTY_CODE = ["KeyP", "KeyA", "KeyR", "KeyT", "KeyY"];

const EasterEggs = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [devModeActivated, setDevModeActivated] = useState(false);
  const [partyModeActivated, setPartyModeActivated] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const konamiIndex = useRef(0);
  const devIndex = useRef(0);
  const partyIndex = useRef(0);
  const codeTimeout = useRef(null);

  const triggerConfetti = () => {
    // Create confetti particles
    const colors = [
      "#a855f7",
      "#ec4899",
      "#8b5cf6",
      "#06b6d4",
      "#22c55e",
      "#eab308",
    ];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = styles.confetti;
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  };

  const triggerMatrixRain = () => {
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      setTimeout(() => {
        const column = document.createElement("div");
        column.className = styles.matrixColumn;
        column.style.left = i * 20 + "px";

        let text = "";
        for (let j = 0; j < 30; j++) {
          text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
        }
        column.innerHTML = text;

        document.body.appendChild(column);
        setTimeout(() => column.remove(), 5000);
      }, i * 50);
    }
  };

  const triggerPartyMode = () => {
    document.body.classList.add("party-mode");

    // Add disco lights
    const disco = document.createElement("div");
    disco.className = styles.discoLights;
    document.body.appendChild(disco);

    setTimeout(() => {
      document.body.classList.remove("party-mode");
      disco.remove();
    }, 10000);
  };

  const showAchievementNotification = (title, description, icon) => {
    setShowAchievement({ title, description, icon });
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const handleKeyDown = useCallback((e) => {
    // Clear timeout on new keypress
    clearTimeout(codeTimeout.current);
    codeTimeout.current = setTimeout(() => {
      konamiIndex.current = 0;
      devIndex.current = 0;
      partyIndex.current = 0;
    }, 2000);

    // Check Konami code
    if (e.code === KONAMI_CODE[konamiIndex.current]) {
      konamiIndex.current++;
      if (konamiIndex.current === KONAMI_CODE.length) {
        setKonamiActivated(true);
        triggerConfetti();
        triggerMatrixRain();
        showAchievementNotification(
          "🎮 Konami Code Activated!",
          "You found the secret! You're a true gamer.",
          "🕹️"
        );
        konamiIndex.current = 0;
      }
    } else {
      konamiIndex.current = 0;
    }

    // Check Dev code
    if (e.code === DEV_CODE[devIndex.current]) {
      devIndex.current++;
      if (devIndex.current === DEV_CODE.length) {
        setDevModeActivated(true);
        showAchievementNotification(
          "💻 Developer Mode",
          "Debug info is now visible. Nice find!",
          "🔧"
        );
        devIndex.current = 0;
      }
    } else {
      devIndex.current = 0;
    }

    // Check Party code
    if (e.code === PARTY_CODE[partyIndex.current]) {
      partyIndex.current++;
      if (partyIndex.current === PARTY_CODE.length) {
        setPartyModeActivated(true);
        triggerPartyMode();
        triggerConfetti();
        showAchievementNotification(
          "🎉 Party Mode!",
          "Let's get this party started!",
          "🪩"
        );
        partyIndex.current = 0;
        setTimeout(() => setPartyModeActivated(false), 10000);
      }
    } else {
      partyIndex.current = 0;
    }
  }, []);

  // Logo click easter egg
  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount === 4) {
      showAchievementNotification(
        "🔍 Curious One",
        "You clicked the logo 5 times!",
        "👀"
      );
      setClickCount(0);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(codeTimeout.current);
    };
  }, [handleKeyDown]);

  // Add click listener to logo
  useEffect(() => {
    const logo = document.querySelector("[data-logo]");
    if (logo) {
      logo.addEventListener("click", handleLogoClick);
      return () => logo.removeEventListener("click", handleLogoClick);
    }
  }, [clickCount]);

  return (
    <>
      {/* Achievement notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            className={styles.achievement}
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={styles.achievementIcon}>{showAchievement.icon}</div>
            <div className={styles.achievementContent}>
              <div className={styles.achievementTitle}>
                {showAchievement.title}
              </div>
              <div className={styles.achievementDesc}>
                {showAchievement.description}
              </div>
            </div>
            <motion.div
              className={styles.achievementProgress}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dev mode info panel */}
      <AnimatePresence>
        {devModeActivated && (
          <motion.div
            className={styles.devPanel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className={styles.devHeader}>
              <span>🔧 Dev Info</span>
              <button onClick={() => setDevModeActivated(false)}>×</button>
            </div>
            <div className={styles.devContent}>
              <div>Next.js: 15.1.5</div>
              <div>React: 19.0.0</div>
              <div>Framer Motion: 11.x</div>
              <div>Build: Production</div>
              <div>
                FPS: <span id="fps">60</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hints overlay (shows after 30 seconds of inactivity) */}
      <SecretHint />
    </>
  );
};

// Secret hint that appears after inactivity
const SecretHint = () => {
  const [showHint, setShowHint] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimer = useCallback(() => {
    setShowHint(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowHint(true);
    }, 60000); // Show after 60 seconds of inactivity
  }, []);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          className={styles.secretHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>Psst... try the Konami Code 🎮</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggs;
