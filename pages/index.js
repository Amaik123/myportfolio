import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import NavBar from "./NavBar";
import Wave from "./WaveSection";
import { SkillsSection } from "./skills";
import CaseStudiesSection from "./components/CaseStudiesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
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
      }}
    >
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
            color: { value: "#1a1a1a" },
          },
          fullScreen: {
            enable: false,
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: { value: ["#4b86b4", "#ff3f81"] },
            size: { value: 2 },
            move: {
              enable: true,
              speed: 0.3,
              outModes: { default: "out" },
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
          backgroundColor: "#1a1a1a",
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
    </div>
  );
}
