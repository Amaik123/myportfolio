import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CaseStudiesSection from "./components/CaseStudiesSection";
import styles from "../styles/ThreeDCard.module.css"; // Ensure correct path

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiSvelte,
  SiFigma,
  SiStorybook,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiPrisma,
  SiSupabase,
  SiDocker,
  SiAwslambda,
  SiLinux,
  SiFirebase,
  SiRedis,
  SiStripe,
  SiSentry,
  SiGithub,
  SiTensorflow,
  SiOpenai,
  SiHuggingface,
  SiPytorch,
  SiGooglecloud,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React", Icon: SiReact, accent: "#61dafb" },
      { name: "Next.js", Icon: SiNextdotjs, accent: "#ffffff" },
      { name: "TypeScript", Icon: SiTypescript, accent: "#2f74c0" },
      { name: "Tailwind", Icon: SiTailwindcss, accent: "#38bdf8" },
      { name: "React Native", Icon: SiReact, accent: "#61dafb" },
      { name: "Framer", Icon: SiFramer, accent: "#9d5cff" },
      { name: "Svelte", Icon: SiSvelte, accent: "#ff3e00" },
      { name: "Figma", Icon: SiFigma, accent: "#a259ff" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, accent: "#7fc728" },
      { name: "Express", Icon: SiExpress, accent: "#f5f5f5" },
      { name: "MongoDB", Icon: SiMongodb, accent: "#00ed64" },
      { name: "PostgreSQL", Icon: SiPostgresql, accent: "#2f6792" },
      { name: "GraphQL", Icon: SiGraphql, accent: "#e535ab" },
      { name: "Prisma", Icon: SiPrisma, accent: "#0c344b" },
      { name: "Supabase", Icon: SiSupabase, accent: "#3ecf8e" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "Azure", Icon: TbBrandAzure, accent: "#0078d4" },
      { name: "Docker", Icon: SiDocker, accent: "#0db7ed" },
      { name: "Kubernetes", Icon: SiDocker, accent: "#326ce5" },
      { name: "Terraform", Icon: SiDocker, accent: "#844fba" },
      { name: "AWS", Icon: SiAwslambda, accent: "#ff9900" },
      { name: "Firebase", Icon: SiFirebase, accent: "#ffa000" },
      { name: "Redis", Icon: SiRedis, accent: "#d82c20" },
      { name: "GitHub", Icon: SiGithub, accent: "#ffffff" },
    ],
  },
  {
    category: "AI & Data",
    skills: [
      { name: "Azure AI", Icon: TbBrandAzure, accent: "#0078d4" },
      { name: "OpenAI", Icon: SiOpenai, accent: "#ffffff" },
      { name: "TensorFlow", Icon: SiTensorflow, accent: "#ff9f00" },
      { name: "HuggingFace", Icon: SiHuggingface, accent: "#ffcc4d" },
      { name: "PyTorch", Icon: SiPytorch, accent: "#ee4c2c" },
      { name: "Strapi CMS", Icon: SiStripe, accent: "#8b5cf6" },
    ],
  },
];

export function SkillsSection({
  className,
  eyebrow = "Tech Stack",
  title = "Tools & ",
  highlight = "Technologies",
}) {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const rootClassName = [styles.skillsSection, className]
    .filter(Boolean)
    .join(" ");

  // Featured tech icons to display inside the circle
  const featuredTechs = [
    { Icon: SiReact, accent: "#61dafb", angle: 0 },
    { Icon: SiTypescript, accent: "#2f74c0", angle: 60 },
    { Icon: SiNodedotjs, accent: "#7fc728", angle: 120 },
    { Icon: SiMongodb, accent: "#00ed64", angle: 180 },
    { Icon: SiDocker, accent: "#0db7ed", angle: 240 },
    { Icon: SiOpenai, accent: "#ffffff", angle: 300 },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const hero = gsap.utils.toArray("[data-skills-hero]");
      const eyebrowEl = gsap.utils.toArray("[data-skills-eyebrow]");
      const headingFragments = gsap.utils.toArray("[data-heading-fragment]");
      const cards = gsap.utils.toArray("[data-skill-card]");
      const circleIcons = gsap.utils.toArray("[data-circle-icon]");
      const particles = gsap.utils.toArray("[data-particle]");

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      if (hero.length) {
        reveal.fromTo(
          hero,
          { scale: 1.12, opacity: 0 },
          {
            scale: 1,
            opacity: 0.9,
            duration: 1.1,
            ease: "power3.out",
            immediateRender: false,
          }
        );

        gsap.to(hero, {
          rotate: 26,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      }

      // Animate circle icons in a rotating pattern
      if (circleIcons.length) {
        gsap.from(circleIcons, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });

        // Continuous rotation animation
        gsap.to(circleIcons, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1,
          stagger: {
            each: 0.2,
            from: "start",
          },
        });

        // Floating animation
        gsap.to(circleIcons, {
          y: "+=15",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.3,
            from: "random",
          },
        });
      }

      // Animate particles
      if (particles.length) {
        particles.forEach((particle, i) => {
          const delay = i * 0.1;
          const duration = 3 + Math.random() * 2;

          gsap.to(particle, {
            y: "+=30",
            x: "+=20",
            opacity: 0.8,
            duration: duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: delay,
          });
        });
      }

      if (eyebrowEl.length) {
        reveal.from(
          eyebrowEl,
          {
            y: 18,
            opacity: 0,
            duration: 0.48,
            ease: "power2.out",
            immediateRender: false,
          },
          hero.length ? "-=0.6" : undefined
        );
      }

      if (headingFragments.length) {
        reveal.from(
          headingFragments,
          {
            y: 46,
            opacity: 0,
            duration: 0.82,
            ease: "power3.out",
            stagger: 0.12,
            immediateRender: false,
          },
          "-=0.3"
        );
      }

      let floatTween;
      if (cards.length) {
        reveal.from(
          cards,
          {
            y: 38,
            opacity: 0,
            rotateX: -12,
            transformOrigin: "50% 100%",
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            immediateRender: false,
          },
          "-=0.4"
        );

        floatTween = gsap.to(cards, {
          y: "+=8",
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.18, from: "random" },
          paused: true,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom top",
          onEnter: () => floatTween?.play(),
          onEnterBack: () => floatTween?.play(),
          onLeave: () => floatTween?.pause(),
          onLeaveBack: () => floatTween?.pause(),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={rootClassName}>
      <div className={styles.skillsHeader}>
        <div
          ref={circleRef}
          className={styles.skillsHero}
          aria-hidden="true"
          data-skills-hero
        >
          {/* Floating particles inside the circle */}
          <div className={styles.circleParticles}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={styles.particle}
                data-particle
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Rotating tech icons around the circle */}
          <div className={styles.circleIcons}>
            {featuredTechs.map(({ Icon, accent, angle }, index) => {
              const radius = 35; // percentage
              const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

              return (
                <div
                  key={index}
                  className={styles.circleIcon}
                  data-circle-icon
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    "--icon-accent": accent,
                  }}
                >
                  <Icon />
                </div>
              );
            })}
          </div>

          {/* Center glow effect */}
          <div className={styles.centerGlow} />

          {/* Center text */}
          <div className={styles.circleCenter}>
            <div className={styles.circleCenterText}>
              <span className={styles.circleCenterNumber}>15+</span>
              <span className={styles.circleCenterLabel}>
                Core Technologies
              </span>
            </div>
          </div>
        </div>
        <p className={styles.skillsEyebrow} data-skills-eyebrow>
          {eyebrow}
        </p>
        <h2 className={styles.skillsHeading}>
          <span className={styles.skillsHeadingLine} data-heading-fragment>
            {title}
          </span>
          <span className={styles.skillsHighlight} data-heading-fragment>
            {highlight}
          </span>
        </h2>
        <p className={styles.skillsDescription} data-heading-fragment>
          Leveraging cutting-edge technologies to build scalable cloud solutions
          and AI-driven applications
        </p>
        <div className={styles.skillsGrid}>
          {skillGroups.map(({ category, skills }) => (
            <section key={category} className={styles.skillsGroup}>
              <div className={styles.skillsGroupHeader}>
                <h3 className={styles.skillsGroupTitle}>{category}</h3>
              </div>
              <div className={styles.skillsGroupItems}>
                {skills.map(({ name, Icon, accent }) => (
                  <div
                    key={name}
                    className={styles.skillCard}
                    data-skill-card
                    style={{ "--skill-accent": accent }}
                    title={name}
                  >
                    <Icon className={styles.skillIcon} aria-hidden="true" />
                    <span className={styles.skillLabel}>{name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SkillsPage() {
  return (
    <>
      <Head>
        <title>Skills | Aakash</title>
        <meta
          name="description"
          content="Aakash's core toolkit across frontend, backend, and platform technologies."
        />
      </Head>
      <main className={styles.skillsPage}>
        <div className={styles.skillsPageInner}>
          <SkillsSection />
        </div>
        <CaseStudiesSection />
      </main>
    </>
  );
}
