import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Timeline.module.css";

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
        e.target.closest("button") ||
        e.target.closest("[data-interactive]")
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

// ============================================
// SUPER CUTE CHIBI AVATAR - Interactive & Adorable!
// ============================================

// Ultra cute chibi-style character with big head and expressive features
const CuteAvatar = ({ mousePosition, isWaving, isTalking, mood }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const mouthRef = useRef();
  const leftEarRef = useRef();
  const rightEarRef = useRef();
  const blushLeftRef = useRef();
  const blushRightRef = useRef();
  const sparklesRef = useRef();
  const heartRef = useRef();

  // Super cute pastel color palette
  const skinColor = "#FFE4D6";
  const skinShadow = "#FFCEBA";
  const hairColor = "#4A3728";
  const hairHighlight = "#6B5344";
  const eyeWhite = "#FFFFFF";
  const eyeColor = "#5D9CEC"; // Sparkly blue
  const pupilColor = "#2C3E50";
  const blushColor = "#FFB6C1";
  const mouthColor = "#FF7B9C";
  const outfitColor = "#9B59B6"; // Purple hoodie
  const outfitLight = "#B370CF";

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // ===== BOUNCY FLOATING - Cute bobbing motion =====
    const bounce = Math.sin(time * 2) * 0.08 + Math.sin(time * 3.5) * 0.03;
    groupRef.current.position.y = bounce;

    // ===== FOLLOW MOUSE - Smooth and cute =====
    const targetRotY = mousePosition.x * 0.6;
    const targetRotX = mousePosition.y * -0.15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.1
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.08
    );

    // ===== HEAD FOLLOWS CURSOR - Extra expressive =====
    if (headRef.current) {
      const headY = mousePosition.x * 0.4;
      const headX = mousePosition.y * -0.3;
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        headY,
        0.15
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        headX,
        0.12
      );
      // Cute head tilt
      headRef.current.rotation.z =
        Math.sin(time * 1.2) * 0.08 + mousePosition.x * 0.1;

      if (isTalking) {
        headRef.current.rotation.x += Math.sin(time * 12) * 0.04;
      }
    }

    // ===== WAVING ARM =====
    if (leftArmRef.current) {
      if (isWaving) {
        leftArmRef.current.rotation.z = Math.sin(time * 15) * 0.5 + 2.5;
        leftArmRef.current.rotation.x = Math.sin(time * 10) * 0.3;
      } else {
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
          leftArmRef.current.rotation.z,
          0.4 + Math.sin(time * 1.5) * 0.1,
          0.1
        );
      }
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        -0.4 + Math.sin(time * 1.5 + Math.PI) * 0.1;
    }

    // ===== EYE ANIMATIONS =====
    // Blinking
    const blinkCycle = time % 3.5;
    const blinkScale = blinkCycle > 3.3 ? 0.1 : 1;

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = blinkScale;
      rightEyeRef.current.scale.y = blinkScale;
    }

    // Pupils follow mouse
    if (leftPupilRef.current && rightPupilRef.current) {
      const pupilX = mousePosition.x * 0.03;
      const pupilY = mousePosition.y * 0.02;
      leftPupilRef.current.position.x = pupilX;
      leftPupilRef.current.position.y = pupilY;
      rightPupilRef.current.position.x = pupilX;
      rightPupilRef.current.position.y = pupilY;

      // Sparkle effect when excited
      if (mood === "excited") {
        const sparkle = 1 + Math.sin(time * 10) * 0.15;
        leftPupilRef.current.scale.setScalar(sparkle);
        rightPupilRef.current.scale.setScalar(sparkle);
      }
    }

    // ===== MOUTH EXPRESSIONS =====
    if (mouthRef.current) {
      if (isTalking) {
        mouthRef.current.scale.y = 0.7 + Math.abs(Math.sin(time * 20)) * 0.8;
      } else if (mood === "excited") {
        mouthRef.current.scale.x = 1.5;
        mouthRef.current.scale.y = 1.3;
      } else {
        mouthRef.current.scale.x = 1.2;
        mouthRef.current.scale.y = 1;
      }
    }

    // ===== BLUSH INTENSITY =====
    if (blushLeftRef.current && blushRightRef.current) {
      const blushPulse =
        mood === "excited" ? 0.6 + Math.sin(time * 4) * 0.2 : 0.4;
      blushLeftRef.current.material.opacity = blushPulse;
      blushRightRef.current.material.opacity = blushPulse;
    }

    // ===== EAR WIGGLE =====
    if (leftEarRef.current && rightEarRef.current) {
      const earWiggle = Math.sin(time * 3) * 0.1;
      leftEarRef.current.rotation.z = earWiggle;
      rightEarRef.current.rotation.z = -earWiggle;
    }

    // ===== SPARKLES ROTATION =====
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = time * 1.5;
    }

    // ===== FLOATING HEART =====
    if (heartRef.current) {
      heartRef.current.position.y = 1.8 + Math.sin(time * 2) * 0.1;
      heartRef.current.rotation.z = Math.sin(time * 1.5) * 0.2;
      heartRef.current.scale.setScalar(
        mood === "excited" ? 1 + Math.sin(time * 5) * 0.2 : 0.8
      );
    }

    // ===== BODY SWAY =====
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(time * 1.8) * 0.05;
    }

    // ===== BREATHING SCALE =====
    const breathe = 1 + Math.sin(time * 3) * 0.02;
    const excited = mood === "excited" ? 1.05 + Math.sin(time * 8) * 0.03 : 1;
    groupRef.current.scale.setScalar(1.0 * breathe * excited);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* ===== GLOW AURA ===== */}
      <mesh position={[0, 0.5, -0.8]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#E8D5FF" transparent opacity={0.3} />
      </mesh>

      {/* ===== BODY - Chibi style (small and round) ===== */}
      <group ref={bodyRef}>
        {/* Main body */}
        <mesh position={[0, -0.3, 0]}>
          <capsuleGeometry args={[0.28, 0.35, 16, 32]} />
          <meshStandardMaterial color={outfitColor} roughness={0.5} />
        </mesh>

        {/* Hoodie pocket */}
        <mesh position={[0, -0.35, 0.22]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshStandardMaterial color={outfitLight} roughness={0.5} />
        </mesh>

        {/* Hoodie strings */}
        <mesh position={[-0.06, -0.05, 0.28]}>
          <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.06, -0.05, 0.28]}>
          <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* ===== BIG CHIBI HEAD ===== */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        {/* Main head - extra round */}
        <mesh>
          <sphereGeometry args={[0.55, 64, 64]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* ===== FLUFFY HAIR ===== */}
        {/* Main hair dome */}
        <mesh position={[0, 0.15, -0.05]}>
          <sphereGeometry
            args={[0.58, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]}
          />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>

        {/* Cute front bangs */}
        <mesh position={[-0.2, 0.35, 0.35]} rotation={[0.4, 0.2, 0.3]}>
          <capsuleGeometry args={[0.08, 0.15, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.38, 0.38]} rotation={[0.5, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.12, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 0.35, 0.35]} rotation={[0.4, -0.2, -0.3]}>
          <capsuleGeometry args={[0.08, 0.15, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>

        {/* Hair highlight */}
        <mesh position={[0.2, 0.4, 0.1]} rotation={[0.3, -0.2, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={hairHighlight} roughness={0.6} />
        </mesh>

        {/* Side hair tufts */}
        <mesh position={[-0.45, 0.1, 0.2]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.45, 0.1, 0.2]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>

        {/* ===== BIG SPARKLY EYES ===== */}
        <group position={[0, 0, 0.4]}>
          {/* Left eye */}
          <group position={[-0.18, 0.05, 0]} ref={leftEyeRef}>
            {/* Eye white */}
            <mesh>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color={eyeWhite} roughness={0.1} />
            </mesh>
            {/* Iris */}
            <mesh position={[0, 0, 0.06]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial
                color={eyeColor}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
            {/* Pupil */}
            <group ref={leftPupilRef}>
              <mesh position={[0, 0, 0.11]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color={pupilColor} />
              </mesh>
              {/* Eye sparkle 1 */}
              <mesh position={[-0.03, 0.04, 0.13]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Eye sparkle 2 */}
              <mesh position={[0.02, -0.02, 0.13]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
              </mesh>
            </group>
          </group>

          {/* Right eye */}
          <group position={[0.18, 0.05, 0]} ref={rightEyeRef}>
            <mesh>
              <sphereGeometry args={[0.13, 32, 32]} />
              <meshStandardMaterial color={eyeWhite} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial
                color={eyeColor}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
            <group ref={rightPupilRef}>
              <mesh position={[0, 0, 0.11]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color={pupilColor} />
              </mesh>
              <mesh position={[-0.03, 0.04, 0.13]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0.02, -0.02, 0.13]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
              </mesh>
            </group>
          </group>
        </group>

        {/* Cute eyebrows */}
        <mesh position={[-0.18, 0.22, 0.42]} rotation={[0.1, 0, 0.15]}>
          <capsuleGeometry args={[0.015, 0.06, 4, 8]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[0.18, 0.22, 0.42]} rotation={[0.1, 0, -0.15]}>
          <capsuleGeometry args={[0.015, 0.06, 4, 8]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>

        {/* ===== ROSY BLUSH CIRCLES ===== */}
        <mesh ref={blushLeftRef} position={[-0.32, -0.05, 0.4]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={blushColor} transparent opacity={0.5} />
        </mesh>
        <mesh ref={blushRightRef} position={[0.32, -0.05, 0.4]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color={blushColor} transparent opacity={0.5} />
        </mesh>

        {/* Tiny nose */}
        <mesh position={[0, -0.02, 0.52]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={skinShadow} roughness={0.5} />
        </mesh>

        {/* ===== CUTE SMILE ===== */}
        <group ref={mouthRef} position={[0, -0.15, 0.48]}>
          <mesh>
            <capsuleGeometry args={[0.04, 0.06, 8, 16]} />
            <meshStandardMaterial color={mouthColor} roughness={0.3} />
          </mesh>
        </group>

        {/* ===== CAT EARS (optional cute accessory) ===== */}
        <group ref={leftEarRef} position={[-0.35, 0.45, 0]}>
          <mesh rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.12, 0.2, 3]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, 0.3]}>
            <coneGeometry args={[0.07, 0.12, 3]} />
            <meshStandardMaterial color="#FFB6C1" roughness={0.5} />
          </mesh>
        </group>
        <group ref={rightEarRef} position={[0.35, 0.45, 0]}>
          <mesh rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.12, 0.2, 3]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[0, 0, -0.3]}>
            <coneGeometry args={[0.07, 0.12, 3]} />
            <meshStandardMaterial color="#FFB6C1" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ===== TINY ARMS ===== */}
      <group ref={leftArmRef} position={[-0.35, -0.15, 0]}>
        <mesh position={[-0.08, -0.08, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.06, 0.18, 8, 16]} />
          <meshStandardMaterial color={outfitColor} roughness={0.5} />
        </mesh>
        <mesh position={[-0.18, -0.18, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.35, -0.15, 0]}>
        <mesh position={[0.08, -0.08, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.06, 0.18, 8, 16]} />
          <meshStandardMaterial color={outfitColor} roughness={0.5} />
        </mesh>
        <mesh position={[0.18, -0.18, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* ===== TINY LEGS ===== */}
      <mesh position={[-0.1, -0.65, 0]}>
        <capsuleGeometry args={[0.06, 0.12, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.6} />
      </mesh>
      <mesh position={[0.1, -0.65, 0]}>
        <capsuleGeometry args={[0.06, 0.12, 8, 16]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.6} />
      </mesh>

      {/* Tiny shoes */}
      <mesh position={[-0.1, -0.78, 0.03]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#E74C3C" roughness={0.5} />
      </mesh>
      <mesh position={[0.1, -0.78, 0.03]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#E74C3C" roughness={0.5} />
      </mesh>

      {/* ===== FLOATING SPARKLES ===== */}
      <group ref={sparklesRef}>
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin(i * 0.8) * 1,
              0.5 + Math.cos(i * 1.2) * 0.6,
              Math.sin(i * 1.1) * 0.4,
            ]}
          >
            <octahedronGeometry args={[0.03, 0]} />
            <meshBasicMaterial
              color={["#FFD700", "#FF69B4", "#87CEEB", "#98FB98"][i % 4]}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* ===== FLOATING HEART ===== */}
      <group ref={heartRef} position={[0.5, 1.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#FF69B4" />
        </mesh>
        <mesh position={[-0.06, 0.03, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FF69B4" />
        </mesh>
        <mesh position={[0.06, 0.03, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FF69B4" />
        </mesh>
      </group>
    </group>
  );
};

// Fallback animated character if GLB fails (attractive anime-style)
const FallbackAvatar = ({ mousePosition, isWaving, isTalking, mood }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const mouthRef = useRef();
  const sparkleRef = useRef();
  const glowRef = useRef();

  // Modern color palette - soft and appealing
  const skinColor = "#FFECD2";
  const skinHighlight = "#FFE4C4";
  const hairColor = "#2D1B4E"; // Deep purple-black
  const hairHighlight = "#6B4C9A";
  const shirtColor = "#A855F7"; // Primary purple
  const shirtHighlight = "#C084FC";
  const eyeWhite = "#FFFFFF";
  const eyeColor = "#3B82F6"; // Beautiful blue eyes
  const eyeHighlight = "#60A5FA";
  const cheekColor = "#FFB7C5"; // Cute blush
  const lipColor = "#FF8FAB";

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!groupRef.current) return;

    // ===== SMOOTH FLOATING - Like floating in space =====
    const floatY = Math.sin(time * 1.5) * 0.1 + Math.sin(time * 0.7) * 0.05;
    const floatX = Math.sin(time * 1.1) * 0.03;
    groupRef.current.position.y = floatY;
    groupRef.current.position.x = floatX;

    // ===== SMOOTH MOUSE FOLLOWING =====
    const targetRotY = mousePosition.x * 0.4;
    const targetRotX = mousePosition.y * -0.1;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );

    // ===== HEAD FOLLOWS CURSOR - Big expressive movements =====
    if (headRef.current) {
      const headTargetY = mousePosition.x * 0.35;
      const headTargetX = mousePosition.y * -0.25;
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        headTargetY,
        0.12
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        headTargetX,
        0.1
      );
      // Cute head tilt
      headRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;

      if (isTalking) {
        headRef.current.rotation.x += Math.sin(time * 10) * 0.03;
      }
    }

    // ===== ARM ANIMATIONS =====
    if (leftArmRef.current) {
      if (isWaving) {
        // Enthusiastic wave!
        leftArmRef.current.rotation.z = Math.sin(time * 12) * 0.6 + 2.2;
        leftArmRef.current.rotation.x = Math.sin(time * 8) * 0.2;
        leftArmRef.current.position.y = 0.1 + Math.sin(time * 6) * 0.05;
      } else {
        // Relaxed idle
        leftArmRef.current.rotation.z = 0.3 + Math.sin(time * 1.2) * 0.08;
        leftArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.05;
        leftArmRef.current.position.y = 0;
      }
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        -0.3 + Math.sin(time * 1.2 + Math.PI) * 0.08;
      rightArmRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.05;
    }

    // ===== EXPRESSIVE EYES =====
    if (eyeLeftRef.current && eyeRightRef.current) {
      // Natural blinking
      const blinkCycle = time % 4;
      const blink = blinkCycle > 3.85 ? 0.1 : 1;
      eyeLeftRef.current.scale.y = blink;
      eyeRightRef.current.scale.y = blink;

      // Eyes follow mouse smoothly
      const eyeFollowX = mousePosition.x * 0.04;
      const eyeFollowY = mousePosition.y * 0.03;
      eyeLeftRef.current.position.x = -0.18 + eyeFollowX;
      eyeRightRef.current.position.x = 0.18 + eyeFollowX;
      eyeLeftRef.current.position.y = 0.08 + eyeFollowY;
      eyeRightRef.current.position.y = 0.08 + eyeFollowY;

      // Excited = sparkly eyes
      if (mood === "excited") {
        const sparkle = 1 + Math.sin(time * 8) * 0.1;
        eyeLeftRef.current.scale.x = sparkle;
        eyeRightRef.current.scale.x = sparkle;
      }
    }

    // ===== MOUTH EXPRESSIONS =====
    if (mouthRef.current) {
      if (isTalking) {
        mouthRef.current.scale.y = 0.8 + Math.abs(Math.sin(time * 18)) * 0.6;
        mouthRef.current.scale.x = 1 + Math.sin(time * 12) * 0.1;
      } else if (mood === "excited") {
        mouthRef.current.scale.x = 1.4;
        mouthRef.current.scale.y = 1.2;
      } else {
        mouthRef.current.scale.x = 1;
        mouthRef.current.scale.y = 0.8;
      }
    }

    // ===== BODY SWAY =====
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(time * 1.2) * 0.04;
      bodyRef.current.rotation.x = Math.sin(time * 0.8) * 0.02;
    }

    // ===== BREATHING & PULSE =====
    const breathe = 1 + Math.sin(time * 2.5) * 0.015;
    const excitement = mood === "excited" ? Math.sin(time * 6) * 0.02 : 0;
    groupRef.current.scale.setScalar(1.1 * (breathe + excitement));

    // ===== SPARKLE EFFECTS =====
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = time * 2;
      sparkleRef.current.rotation.z = time * 1.5;
    }

    // ===== GLOW PULSE =====
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Ambient glow behind character */}
      <mesh ref={glowRef} position={[0, 0.3, -0.5]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.15} />
      </mesh>

      {/* ===== BODY ===== */}
      <group ref={bodyRef}>
        {/* Main torso - rounded and cute */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.32, 0.5, 16, 32]} />
          <meshStandardMaterial
            color={shirtColor}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* Shirt collar / neckline */}
        <mesh position={[0, 0.35, 0.15]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* Hoodie hood behind */}
        <mesh position={[0, 0.3, -0.2]}>
          <sphereGeometry
            args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial color={shirtHighlight} roughness={0.5} />
        </mesh>

        {/* Hoodie string details */}
        <mesh position={[-0.08, 0.15, 0.32]}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.08, 0.15, 0.32]}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* ===== HEAD - Anime proportions (bigger head = cuter) ===== */}
      <group ref={headRef} position={[0, 0.75, 0]}>
        {/* Main head - smooth sphere */}
        <mesh>
          <sphereGeometry args={[0.42, 64, 64]} />
          <meshStandardMaterial
            color={skinColor}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* ===== STYLISH HAIR ===== */}
        {/* Main hair volume */}
        <mesh position={[0, 0.12, -0.08]}>
          <sphereGeometry
            args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]}
          />
          <meshStandardMaterial
            color={hairColor}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Stylish side bangs - left */}
        <mesh position={[-0.28, 0.15, 0.25]} rotation={[0.3, 0.3, 0.4]}>
          <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>

        {/* Stylish side bangs - right */}
        <mesh position={[0.28, 0.15, 0.25]} rotation={[0.3, -0.3, -0.4]}>
          <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>

        {/* Front fringe/bangs */}
        <mesh position={[0, 0.3, 0.28]} rotation={[0.8, 0, 0]}>
          <boxGeometry args={[0.35, 0.15, 0.08]} />
          <meshStandardMaterial color={hairColor} roughness={0.6} />
        </mesh>

        {/* Hair highlight streak */}
        <mesh position={[0.15, 0.32, 0.2]} rotation={[0.5, -0.2, 0]}>
          <boxGeometry args={[0.08, 0.1, 0.05]} />
          <meshStandardMaterial color={hairHighlight} roughness={0.5} />
        </mesh>

        {/* ===== EXPRESSIVE ANIME EYES ===== */}
        <group position={[0, 0.02, 0.32]}>
          {/* Left eye - large anime style */}
          <group position={[-0.14, 0, 0]}>
            {/* Eye white/sclera */}
            <mesh>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color={eyeWhite} roughness={0.1} />
            </mesh>
            {/* Iris */}
            <mesh ref={eyeLeftRef} position={[0, 0, 0.06]}>
              <sphereGeometry args={[0.065, 32, 32]} />
              <meshStandardMaterial
                color={eyeColor}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
            {/* Pupil */}
            <mesh position={[0, 0, 0.09]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
            {/* Eye shine - top */}
            <mesh position={[-0.02, 0.03, 0.1]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            {/* Eye shine - bottom */}
            <mesh position={[0.02, -0.02, 0.1]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Right eye */}
          <group position={[0.14, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial color={eyeWhite} roughness={0.1} />
            </mesh>
            <mesh ref={eyeRightRef} position={[0, 0, 0.06]}>
              <sphereGeometry args={[0.065, 32, 32]} />
              <meshStandardMaterial
                color={eyeColor}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
            <mesh position={[0, 0, 0.09]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshStandardMaterial color="#1a1a2e" />
            </mesh>
            <mesh position={[-0.02, 0.03, 0.1]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.02, -0.02, 0.1]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
            </mesh>
          </group>
        </group>

        {/* Eyebrows - expressive */}
        <mesh position={[-0.14, 0.16, 0.35]} rotation={[0.1, 0, 0.15]}>
          <capsuleGeometry args={[0.015, 0.08, 4, 8]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[0.14, 0.16, 0.35]} rotation={[0.1, 0, -0.15]}>
          <capsuleGeometry args={[0.015, 0.08, 4, 8]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>

        {/* Cute blush marks */}
        <mesh position={[-0.22, -0.05, 0.32]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={cheekColor}
            transparent
            opacity={0.5}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.22, -0.05, 0.32]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={cheekColor}
            transparent
            opacity={0.5}
            roughness={0.8}
          />
        </mesh>

        {/* Nose - subtle */}
        <mesh position={[0, -0.05, 0.4]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color={skinHighlight} roughness={0.4} />
        </mesh>

        {/* Mouth - cute smile */}
        <group ref={mouthRef} position={[0, -0.15, 0.38]}>
          <mesh>
            <capsuleGeometry args={[0.025, 0.08, 8, 16]} />
            <meshStandardMaterial color={lipColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Ears - anime style */}
        <mesh position={[-0.4, -0.02, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0.4, -0.02, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* ===== ARMS ===== */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.4, 0.15, 0]}>
        <mesh position={[-0.12, -0.15, 0]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.07, 0.28, 8, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.25, -0.3, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.4, 0.15, 0]}>
        <mesh position={[0.12, -0.15, 0]} rotation={[0, 0, -0.4]}>
          <capsuleGeometry args={[0.07, 0.28, 8, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.4} />
        </mesh>
        <mesh position={[0.25, -0.3, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
      </group>

      {/* ===== FLOATING SPARKLES ===== */}
      <group ref={sparkleRef} position={[0, 0.5, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin(i * 1.2) * 0.8,
              Math.cos(i * 1.5) * 0.6 + 0.3,
              Math.sin(i * 0.8) * 0.3,
            ]}
          >
            <octahedronGeometry args={[0.03, 0]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#FFD700" : "#A855F7"}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Floating Rings around avatar
const FloatingRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = state.clock.elapsedTime * 0.35;
      ring3Ref.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} position={[0, -0.5, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0, -0.5, 0]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.7}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={ring3Ref} position={[0, -0.5, 0]} rotation={[0.6, 0.6, 0]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
    </>
  );
};

// Floating Tech Icons
const FloatingTechIcons = () => {
  return (
    <>
      {[
        { pos: [-2.5, 0.8, -0.5], emoji: "💻" },
        { pos: [2.5, 0.5, -0.3], emoji: "🚀" },
        { pos: [-2, -1, 0.3], emoji: "⚡" },
        { pos: [2.2, -0.8, 0], emoji: "🎯" },
        { pos: [0, 1.5, -0.8], emoji: "✨" },
        { pos: [-2.3, -2, -0.3], emoji: "🔥" },
      ].map((item, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={0.15}
          floatIntensity={0.3}
        >
          <Html position={item.pos} center transform distanceFactor={8}>
            <div
              style={{
                fontSize: "2rem",
                cursor: "default",
                filter: "drop-shadow(0 0 12px rgba(168, 85, 247, 0.5))",
                opacity: 0.9,
              }}
            >
              {item.emoji}
            </div>
          </Html>
        </Float>
      ))}
    </>
  );
};

// Loading Spinner for 3D model
const LoadingSpinner = () => (
  <Html center>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "3px solid rgba(168, 85, 247, 0.3)",
          borderTop: "3px solid #a855f7",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Loading 3D Avatar...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </Html>
);

// 3D Scene Component - Clean, focused on avatar only
const Avatar3DScene = ({
  mood,
  isWaving,
  isTalking,
  onAvatarClick,
  scrollProgress = 0,
  currentSection = "hero",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = (touch.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
      }
    };

    // Device orientation for mobile (optional fun interaction)
    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-right tilt (-90 to 90)
        // beta is front-back tilt (-180 to 180)
        const x = Math.max(-1, Math.min(1, e.gamma / 45));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Only add orientation listener on mobile
    if (window.innerWidth <= 768 && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.3, 2.2], fov: 50 }}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        touchAction: "none",
      }}
      onClick={onAvatarClick}
      onTouchEnd={onAvatarClick}
    >
      {/* Soft pastel lighting for cute character */}
      <ambientLight intensity={0.7} />
      {/* Main warm light */}
      <directionalLight position={[3, 4, 5]} intensity={1} color="#FFF8E7" />
      {/* Pink accent light */}
      <directionalLight position={[-3, 2, 2]} intensity={0.6} color="#FFB6C1" />
      {/* Purple rim light */}
      <directionalLight position={[0, 2, -3]} intensity={0.4} color="#DDA0DD" />
      {/* Face fill light */}
      <pointLight position={[0, 0.5, 2.5]} intensity={0.5} color="#FFFFFF" />
      {/* Top highlight */}
      <spotLight
        position={[0, 4, 2]}
        angle={0.6}
        penumbra={0.8}
        intensity={0.8}
        color="#FFFFFF"
      />

      <Suspense fallback={<LoadingSpinner />}>
        {/* Super Cute Chibi Avatar */}
        <group>
          <CuteAvatar
            mousePosition={mousePosition}
            isWaving={isWaving}
            isTalking={isTalking}
            mood={mood}
          />
        </group>

        {/* Simple subtle glow under avatar */}
        <ContactShadows
          position={[0, -1.3, 0]}
          opacity={0.5}
          scale={4}
          blur={2}
          far={3}
          color="#E8D5FF"
        />

        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0.3, 0]}
      />
    </Canvas>
  );
};

// Simple Error Boundary for 3D model loading
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Interactive 3D Character Wrapper - STICKY SIDEBAR VERSION (Mobile Friendly)
const StickyAvatarCompanion = ({
  onInteract,
  currentMood,
  message,
  isTyping,
  scrollProgress,
  currentSection,
  isMinimized,
  onToggleMinimize,
}) => {
  const [isWaving, setIsWaving] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prevSectionRef = useRef(currentSection);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initial greeting wave
  useEffect(() => {
    setTimeout(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 500);
  }, []);

  // Wave when section changes (scroll interaction!)
  useEffect(() => {
    if (prevSectionRef.current !== currentSection) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
      prevSectionRef.current = currentSection;
    }
  }, [currentSection]);

  // Talking animation when message changes
  useEffect(() => {
    if (isTyping) {
      setIsTalking(true);
    } else {
      setTimeout(() => setIsTalking(false), 300);
    }
  }, [isTyping]);

  const handleClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1500);
    onInteract();
  };

  // Handle touch events for mobile
  const handleTouch = (e) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <motion.div
      className={`${styles.stickyAvatarWrapper} ${isMinimized ? styles.minimized : ""}`}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isMinimized ? 0.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Minimize/Expand Button */}
      <motion.button
        className={styles.avatarToggleBtn}
        onClick={onToggleMinimize}
        onTouchEnd={(e) => {
          e.preventDefault();
          onToggleMinimize();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMinimized ? "Show avatar" : "Hide avatar"}
      >
        {isMinimized ? "👁️" : "−"}
      </motion.button>

      {/* Speech Bubble - Shorter messages on mobile */}
      <AnimatePresence>
        {message && !isMinimized && (
          <motion.div
            className={styles.stickyBubble}
            initial={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p>
              {isMobile && message.length > 50
                ? message.substring(0, 50) + "..."
                : message}
              {isTyping && <span className={styles.typingCursor}>|</span>}
            </p>
            <div className={styles.stickyBubbleTail} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean 3D Avatar Canvas - CHARACTER FOCUS */}
      <motion.div
        className={styles.stickyAvatarCanvas}
        data-interactive
        whileHover={!isMobile ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        onTouchEnd={handleTouch}
        animate={{
          borderColor:
            currentMood === "excited"
              ? "rgba(168, 85, 247, 0.8)"
              : "rgba(168, 85, 247, 0.3)",
        }}
      >
        <Avatar3DScene
          mood={currentMood}
          isWaving={isWaving}
          isTalking={isTalking}
          onAvatarClick={handleClick}
          scrollProgress={scrollProgress}
          currentSection={currentSection}
        />
      </motion.div>

      {/* Hint - Hidden on mobile via CSS */}
      {!isMinimized && (
        <motion.div
          className={styles.avatarHints}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👆 Click me!
          </motion.span>
        </motion.div>
      )}

      {/* Scroll progress indicator */}
      <motion.div
        className={styles.avatarScrollProgress}
        style={{ scaleY: scrollProgress }}
      />
    </motion.div>
  );
};

// Timeline Event Component
const TimelineEvent = ({ event, index, isActive, onClick, side }) => {
  return (
    <motion.div
      className={`${styles.timelineEvent} ${styles[side]} ${isActive ? styles.active : ""}`}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      data-interactive
    >
      <div className={styles.eventDot} style={{ "--event-color": event.color }}>
        <span className={styles.eventIcon}>{event.icon}</span>
      </div>

      <motion.div
        className={styles.eventCard}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        style={{ "--event-color": event.color }}
      >
        <span className={styles.eventYear}>{event.year}</span>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDescription}>{event.shortDesc}</p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className={styles.eventDetails}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{event.fullDesc}</p>
              {event.achievements && (
                <ul className={styles.achievementsList}>
                  {event.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className={styles.achievementIcon}>✦</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              )}
              {event.skills && (
                <div className={styles.skillTags}>
                  {event.skills.map((skill, i) => (
                    <span key={i} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <span className={styles.expandHint}>
          {isActive ? "Click to collapse" : "Click to expand"}
        </span>
      </motion.div>
    </motion.div>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className={styles.particlesContainer}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={styles.particle}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// Journey data - placeholder for user's actual journey
const journeyData = [
  {
    id: 1,
    year: "2018",
    title: "The Beginning",
    icon: "🌱",
    color: "#10b981",
    shortDesc: "Where it all started...",
    fullDesc:
      "This is where your journey begins. Share your origin story - what sparked your interest in technology or your field?",
    achievements: [
      "First achievement or milestone",
      "Something memorable from this period",
      "A key learning moment",
    ],
    skills: ["Skill 1", "Skill 2"],
    characterMood: "excited",
    characterMessage:
      "Hey! This is where my story begins. Click on any milestone to learn more about my journey!",
  },
  {
    id: 2,
    year: "2019",
    title: "Learning & Growth",
    icon: "📚",
    color: "#3b82f6",
    shortDesc: "Diving deep into learning...",
    fullDesc:
      "Share what you learned during this period. What courses did you take? What skills did you develop?",
    achievements: [
      "Completed important course or certification",
      "Built first significant project",
      "Joined a community or group",
    ],
    skills: ["New Skill 1", "New Skill 2", "New Skill 3"],
    characterMood: "thinking",
    characterMessage:
      "This was a time of intense learning. I was absorbing everything I could!",
  },
  {
    id: 3,
    year: "2020",
    title: "First Breakthrough",
    icon: "🚀",
    color: "#a855f7",
    shortDesc: "Making things happen...",
    fullDesc:
      "Describe your first major breakthrough. What project or achievement made you proud?",
    achievements: [
      "Landed first opportunity",
      "Completed a major project",
      "Received recognition",
    ],
    skills: ["Professional Skill 1", "Professional Skill 2"],
    characterMood: "proud",
    characterMessage:
      "This was a breakthrough moment! Everything started to click.",
  },
  {
    id: 4,
    year: "2021",
    title: "Building Experience",
    icon: "🔨",
    color: "#f59e0b",
    shortDesc: "Hands-on experience...",
    fullDesc:
      "Share your professional experiences. What roles did you take on? What did you build?",
    achievements: [
      "Worked on significant project",
      "Collaborated with teams",
      "Expanded skill set",
    ],
    skills: ["Advanced Skill 1", "Advanced Skill 2", "Tool 1"],
    characterMood: "excited",
    characterMessage:
      "Building, creating, and making an impact. These were exciting times!",
  },
  {
    id: 5,
    year: "2022",
    title: "Leveling Up",
    icon: "⚡",
    color: "#ec4899",
    shortDesc: "Taking it to the next level...",
    fullDesc:
      "Describe how you leveled up. New responsibilities? Bigger projects? Leadership roles?",
    achievements: [
      "Took on leadership role",
      "Mentored others",
      "Delivered high-impact work",
    ],
    skills: ["Leadership", "Advanced Tech 1", "Advanced Tech 2"],
    characterMood: "proud",
    characterMessage:
      "Leveling up and taking on bigger challenges. Growth never stops!",
  },
  {
    id: 6,
    year: "2023",
    title: "Major Milestone",
    icon: "🏆",
    color: "#6366f1",
    shortDesc: "Achieving big goals...",
    fullDesc:
      "Share a major milestone or achievement from this year. What made it special?",
    achievements: [
      "Achieved significant goal",
      "Recognition or award",
      "Career milestone",
    ],
    skills: ["Expert Skill 1", "Expert Skill 2"],
    characterMood: "excited",
    characterMessage:
      "A year of major achievements! Hard work really does pay off.",
  },
  {
    id: 7,
    year: "2024",
    title: "Expanding Horizons",
    icon: "🌟",
    color: "#8b5cf6",
    shortDesc: "Exploring new territories...",
    fullDesc:
      "What new areas did you explore? New technologies, domains, or opportunities?",
    achievements: [
      "Explored new technology",
      "Started new venture",
      "Expanded network",
    ],
    skills: ["Emerging Tech 1", "Emerging Tech 2", "New Domain"],
    characterMood: "thinking",
    characterMessage:
      "Always exploring, always learning. The horizon keeps expanding!",
  },
  {
    id: 8,
    year: "2025",
    title: "Present & Future",
    icon: "🔮",
    color: "#14b8a6",
    shortDesc: "Where I am now and where I'm headed...",
    fullDesc:
      "Share your current focus and future aspirations. What's next on your journey?",
    achievements: ["Current focus area", "Ongoing project", "Future goal"],
    skills: ["Current Tech Stack"],
    characterMood: "excited",
    characterMessage:
      "And here we are today! The journey continues, and the best is yet to come. Thanks for exploring my story with me! 🚀",
  },
];

// Character messages for different interactions
const idleMessages = [
  "Click on any milestone to see the details! 📍",
  "My journey has been quite an adventure! 🎢",
  "Scroll down to see more of my story! 👇",
  "Each milestone shaped who I am today! ✨",
  "Want to know a secret? Click on me! 🤫",
];

const randomFacts = [
  "Fun fact: I've written over 100,000 lines of code! 💻",
  "I believe in learning something new every day! 📚",
  "Coffee is my fuel for coding! ☕",
  "I love building things that help people! 🛠️",
  "Open source is close to my heart! ❤️",
];

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [characterMood, setCharacterMood] = useState("happy");
  const [characterMessage, setCharacterMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isAvatarMinimized, setIsAvatarMinimized] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  const timelineRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Track scroll progress and current section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      // Determine current section
      const scrollY = window.scrollY + window.innerHeight / 2;

      if (ctaRef.current && scrollY >= ctaRef.current.offsetTop) {
        setCurrentSection("cta");
      } else if (statsRef.current && scrollY >= statsRef.current.offsetTop) {
        setCurrentSection("stats");
      } else if (
        timelineRef.current &&
        scrollY >= timelineRef.current.offsetTop
      ) {
        setCurrentSection("timeline");
      } else {
        setCurrentSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section-based messages - avatar reacts to scrolling!
  const sectionMessages = {
    hero: [
      "Welcome! 👋 I'm your guide!",
      "Scroll down to explore my journey!",
      "Move your cursor, I'll follow! 👀",
    ],
    timeline: [
      "Here's my story! 📅",
      "Click on any milestone!",
      "Each moment shaped who I am! ✨",
    ],
    stats: [
      "Look at these numbers! 📊",
      "Proud of my achievements! 🏆",
      "Still growing every day! 🌱",
    ],
    cta: [
      "Thanks for visiting! 🙏",
      "Let's connect! 🚀",
      "Ready to collaborate? 💪",
    ],
  };

  // Trigger message on section change
  const prevSectionRef = useRef("hero");
  useEffect(() => {
    if (prevSectionRef.current !== currentSection && mounted) {
      const messages = sectionMessages[currentSection];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      typeMessage(randomMsg);

      // Set mood based on section
      if (currentSection === "cta") setCharacterMood("excited");
      else if (currentSection === "stats") setCharacterMood("proud");
      else if (currentSection === "timeline") setCharacterMood("thinking");
      else setCharacterMood("happy");

      prevSectionRef.current = currentSection;
    }
  }, [currentSection, mounted]);

  useEffect(() => {
    setMounted(true);
    // Initial greeting
    setTimeout(() => {
      typeMessage("Hey! 👋 I'm Aakash! Move your cursor around - I'll follow!");
    }, 500);
  }, []);

  const typeMessage = (message) => {
    setIsTyping(true);
    setCharacterMessage("");
    let index = 0;
    const interval = setInterval(() => {
      setCharacterMessage(message.slice(0, index + 1));
      index++;
      if (index >= message.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
  };

  const handleEventClick = (event) => {
    if (activeEvent === event.id) {
      setActiveEvent(null);
      typeMessage(
        idleMessages[Math.floor(Math.random() * idleMessages.length)]
      );
      setCharacterMood("happy");
    } else {
      setActiveEvent(event.id);
      setCharacterMood(event.characterMood);
      typeMessage(event.characterMessage);
    }
  };

  const handleCharacterClick = () => {
    setInteractionCount((prev) => prev + 1);

    if (interactionCount % 3 === 0) {
      typeMessage(randomFacts[Math.floor(Math.random() * randomFacts.length)]);
      setCharacterMood("excited");
    } else if (interactionCount % 3 === 1) {
      typeMessage("Hehe, that tickles! 😄 Keep exploring my journey!");
      setCharacterMood("surprised");
    } else {
      typeMessage(
        idleMessages[Math.floor(Math.random() * idleMessages.length)]
      );
      setCharacterMood("happy");
    }
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
      <FloatingParticles />

      <NavBar />

      {/* STICKY 3D Avatar Companion - Fixed on right side */}
      {mounted && (
        <StickyAvatarCompanion
          onInteract={handleCharacterClick}
          currentMood={characterMood}
          message={characterMessage}
          isTyping={isTyping}
          scrollProgress={scrollProgress}
          currentSection={currentSection}
          isMinimized={isAvatarMinimized}
          onToggleMinimize={() => setIsAvatarMinimized(!isAvatarMinimized)}
        />
      )}

      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.heroLabel}>📅 TIMELINE</span>
          <h1 className={styles.heroTitle}>
            My <span className={styles.heroHighlight}>Journey</span>
          </h1>
          <p className={styles.heroSubtitle}>
            An interactive exploration of my path from curious beginner to where
            I am today. Meet my guide and discover the milestones that shaped my
            story!
          </p>

          {/* Arrow pointing to avatar */}
          <motion.div
            className={styles.avatarPointer}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span>👉 Meet your guide!</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection} ref={timelineRef}>
        <div className={styles.timelineLine} />

        <div className={styles.timelineContainer}>
          {journeyData.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isActive={activeEvent === event.id}
              onClick={() => handleEventClick(event)}
              side={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          className={styles.timelineEnd}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.endIcon}>🚀</span>
          <p>The journey continues...</p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection} ref={statsRef}>
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.statCard}>
            <span className={styles.statEmoji}>📅</span>
            <span className={styles.statValue}>{journeyData.length}</span>
            <span className={styles.statTitle}>Years of Journey</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statEmoji}>🏆</span>
            <span className={styles.statValue}>
              {journeyData.reduce(
                (acc, e) => acc + (e.achievements?.length || 0),
                0
              )}
            </span>
            <span className={styles.statTitle}>Achievements</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statEmoji}>⚡</span>
            <span className={styles.statValue}>
              {new Set(journeyData.flatMap((e) => e.skills || [])).size}
            </span>
            <span className={styles.statTitle}>Skills Gained</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statEmoji}>🎯</span>
            <span className={styles.statValue}>∞</span>
            <span className={styles.statTitle}>Goals Ahead</span>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection} ref={ctaRef}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.ctaTitle}>
            Want to be part of my next chapter?
          </h2>
          <p className={styles.ctaSubtitle}>
            Let's connect and create something amazing together!
          </p>
          <div className={styles.ctaButtons}>
            <motion.a
              href="/links"
              className={styles.ctaBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Me
            </motion.a>
            <motion.a
              href="/work"
              className={`${styles.ctaBtn} ${styles.secondary}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
