import { useCallback, useState, useEffect } from "react";
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

  return null; // Disabled for performance
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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: 0,
        padding: 0,
        maxWidth: "100%",
        cursor: "auto",
      }}
    >
      {/* Custom Cursor */}
      {mounted && <CustomCursor />}

      {/* Scroll Progress */}
      <ScrollProgress />

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
