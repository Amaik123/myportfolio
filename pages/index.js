import { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import NavBar from "./NavBar";
import Wave from "./WaveSection";
import { SkillsSection } from "./skills";
import CaseStudiesSection from "./components/CaseStudiesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import AIChatbotEnhanced from "./components/AIChatbotEnhanced";
import ChatbotButton from "./components/ChatbotButton";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

  // Hide on mobile
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
        animate={{
          scale: isHovering ? 0 : 1,
        }}
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

export default function Home() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: 0,
        padding: 0,
        maxWidth: "100%",
        cursor:
          mounted && typeof window !== "undefined" && window.innerWidth >= 768
            ? "none"
            : "auto",
      }}
    >
      {/* Custom Cursor */}
      {mounted && <CustomCursor />}

      {/* Scroll Progress */}
      <ScrollProgress />

      <Particles
        id="tsparticles"
        init={particlesInit}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fullScreen: {
            enable: false,
          },
          fpsLimit: 120,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 900,
              },
            },
            color: {
              value: ["#a855f7", "#ec4899", "#8b5cf6", "#d946ef", "#06b6d4"],
            },
            shape: {
              type: ["circle", "triangle", "star"],
            },
            opacity: {
              value: 0.7,
              random: true,
              animation: {
                enable: true,
                speed: 0.8,
                minimumValue: 0.2,
                sync: false,
              },
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 1,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 120,
              color: "#a855f7",
              opacity: 0.25,
              width: 1,
              triangles: {
                enable: true,
                opacity: 0.05,
                color: "#ec4899",
              },
            },
            move: {
              enable: true,
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: ["grab", "bubble"],
                parallax: {
                  enable: true,
                  force: 60,
                  smooth: 10,
                },
              },
              onClick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 180,
                links: {
                  opacity: 0.6,
                  color: "#ec4899",
                },
              },
              bubble: {
                distance: 200,
                size: 8,
                duration: 0.4,
                opacity: 0.8,
              },
              repulse: {
                distance: 150,
                duration: 0.6,
                speed: 1,
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
          responsive: [
            {
              maxWidth: 768,
              options: {
                particles: {
                  number: {
                    value: 40,
                  },
                  move: {
                    speed: 0.2,
                  },
                },
              },
            },
            {
              maxWidth: 480,
              options: {
                particles: {
                  number: {
                    value: 20,
                  },
                  move: {
                    speed: 0.15,
                  },
                },
              },
            },
          ],
        }}
      />

      <div
        style={{
          background:
            "linear-gradient(180deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%)",
          minHeight: "100vh",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <NavBar />
        <Wave />
        <SkillsSection />
        <CaseStudiesSection />
        <CTASection />

        {/* <ExperienceTimeline /> */}
      </div>
      <Footer />

      {/* AI Chatbot */}
      <ChatbotButton onClick={() => setIsChatbotOpen(true)} />
      <AIChatbotEnhanced
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
}
