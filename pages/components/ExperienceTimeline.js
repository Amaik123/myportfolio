import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./ExperienceTimeline.module.css";

const DEFAULT_EXPERIENCE = [
  {
    company: "Emtec Inc.",
    role: "Senior Software Engineer",
    start: "Feb 2022",
    end: "Present",
    location: "Pune, Maharashtra, India",
    isRemote: false,
    avatar:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    highlights: [
      "Leading full-stack development initiatives for enterprise-grade applications using React, Node.js, and modern cloud technologies.",
      "Architecting scalable cloud solutions on Azure, leveraging AZ-104 certification to implement robust infrastructure and DevOps practices.",
      "Implementing AI-driven features and integrations using Azure AI services, applying AI-102 certification expertise to deliver intelligent solutions.",
      "Mentoring junior developers and establishing coding standards, improving team productivity and code quality across multiple projects.",
      "Delivering production-ready applications with focus on performance, security, and maintainability for healthcare and enterprise clients.",
    ],
  },
  {
    company: "Eszmeletlen Holding Co.",
    role: "Full Stack Developer",
    start: "Apr 2021",
    end: "Feb 2022",
    location: "Thane, Maharashtra, India",
    isRemote: false,
    avatar:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80",
    highlights: [
      "Developed and maintained multiple web applications using React, Next.js, and Node.js, serving diverse client needs across industries.",
      "Implemented CI/CD pipelines and cloud infrastructure solutions, improving deployment efficiency by 40% and reducing downtime.",
      "Built responsive, performant user interfaces with focus on cross-browser compatibility and mobile-first design principles.",
      "Collaborated with product teams to translate business requirements into technical solutions, delivering projects on time and within budget.",
      "Enhanced application reliability through comprehensive testing strategies and monitoring implementation.",
    ],
  },
  {
    company: "Axioned",
    role: "Senior Frontend Developer",
    start: "Sep 2019",
    end: "Apr 2021",
    location: "Thane, Maharashtra, India",
    isRemote: false,
    avatar:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80",
    highlights: [
      "Spearheaded frontend development for multiple client projects, creating responsive and performant user interfaces with React and modern JavaScript.",
      "Collaborated with design teams to deliver pixel-perfect implementations while maintaining code quality and adhering to best practices.",
      "Implemented component libraries and design systems, improving development efficiency and ensuring consistency across projects.",
      "Optimized application performance through code splitting, lazy loading, and advanced rendering techniques, achieving significant load time improvements.",
      "Mentored junior developers and conducted code reviews, fostering a culture of continuous learning and quality engineering.",
    ],
  },
];

const clamp = (value) => Math.min(Math.max(value, 0), 1);

export default function ExperienceTimeline({ entries = DEFAULT_EXPERIENCE }) {
  const data = useMemo(
    () => (entries.length ? entries : DEFAULT_EXPERIENCE),
    [entries]
  );
  const containerRef = useRef(null);
  const progressTrackRef = useRef(null);
  const progressBarRef = useRef(null);
  const thumbRef = useRef(null);
  const entryRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    entryRefs.current = entryRefs.current.slice(0, data.length);
  }, [data.length]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const progressTrack = progressTrackRef.current;
      const progressEl = progressBarRef.current;
      const thumb = thumbRef.current;
      if (!container || !progressTrack || !progressEl || !thumb || !data.length)
        return;

      const viewportHeight = window.innerHeight;

      const distances = entryRefs.current.map((ref) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        return Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
      });

      const minDistance = Math.min.apply(null, distances);
      const index = distances.indexOf(minDistance);

      const targetEntry = entryRefs.current[index];
      if (targetEntry) {
        const entryRect = targetEntry.getBoundingClientRect();
        const trackRect = progressTrack.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();
        const entryCenter = entryRect.top + entryRect.height / 2;
        const ratio = clamp((entryCenter - trackRect.top) / trackRect.height);
        const maxTravel = Math.max(trackRect.height - thumbRect.height, 0);
        const targetY = ratio * maxTravel;

        gsap.to(progressEl, {
          height: ratio * 100 + "%",
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(thumb, {
          y: targetY,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.length, activeIndex]);

  return (
    <section className={styles.timelineSection} ref={containerRef}>
      <header className={styles.sectionHeading}>
        <span>Experience</span>
        <h2>
          Experience that brings <em>ideas to life</em>
        </h2>
      </header>

      <div className={styles.entriesWrapper}>
        <div className={styles.verticalRail} aria-hidden="true">
          <div ref={progressTrackRef} className={styles.progressTrack}>
            <div ref={progressBarRef} className={styles.progressBar} />
            <div ref={thumbRef} className={styles.progressThumb}>
              <img
                src={data[activeIndex]?.avatar}
                alt={(data[activeIndex]?.company || "experience") + " avatar"}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className={styles.entryList}>
          {data.map((item, index) => {
            const entryClass = [
              styles.entry,
              index === activeIndex ? styles.active : "",
            ]
              .join(" ")
              .trim();
            return (
              <article
                key={item.company + "-" + item.role}
                className={entryClass}
                ref={(el) => {
                  entryRefs.current[index] = el;
                }}
              >
                <div className={styles.entryMeta}>
                  <span>
                    {item.start} — {item.end}
                  </span>
                  <h3 className={styles.companyName}>{item.company}</h3>
                  <div className={styles.locationRow}>
                    <span role="img" aria-label="location">
                      📍
                    </span>
                    <span>{item.location}</span>
                  </div>
                  {item.isRemote && (
                    <div className={styles.locationRow}>
                      <span role="img" aria-label="remote work">
                        💼
                      </span>
                      <span>Remote work</span>
                    </div>
                  )}
                </div>

                <div className={styles.entryDetails}>
                  <h4 className={styles.roleTitle}>{item.role}</h4>
                  <ul className={styles.highlightsList}>
                    {item.highlights.map((point, idx) => (
                      <li key={item.company + "-highlight-" + idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
