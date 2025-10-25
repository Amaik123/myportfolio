import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";
import styles from "../../styles/CaseStudies.module.css";

const projects = [
  {
    id: "uhc-clatter",
    title: "UHC 2.0 Clatter",
    subtitle: "AI-powered presentation maker for healthcare professionals.",
    description:
      "A comprehensive presentation creation platform designed for healthcare professionals, enabling compelling, data-driven presentations with AI assistance. Features intelligent templates, real-time collaboration, and HIPAA-compliant data handling.",
    bulletPoints: [
      "AI-powered content generation with healthcare-specific templates.",
      "Cross-platform support (Web and Mobile) with React and React Native.",
      "Real-time collaboration features with HIPAA-compliant data storage.",
    ],
    tech: ["React", "React Native", "Node.js", "MongoDB", "AWS", "Socket.io"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "clatter",
    title: "Clatter",
    subtitle: "Multi-purpose landing page maker and summary generator.",
    description:
      "A versatile content creation platform combining landing page builder with intelligent summary generation. Empowers marketers to quickly develop professional web pages and distill content into digestible summaries.",
    bulletPoints: [
      "Drag-and-drop landing page builder with live preview functionality.",
      "AI-powered content summarization for long-form articles and documents.",
      "Headless CMS integration with Strapi for flexible content management.",
    ],
    tech: ["React", "React Native", "Strapi", "Node.js", "PostgreSQL", "Redis"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "makestories",
    title: "Makestories",
    subtitle: "Interactive storytelling platform with TypeScript.",
    description:
      "An innovative storytelling platform enabling creators to build engaging, interactive narratives for web and mobile. Combines rich media support, branching storylines, and analytics to create immersive reading experiences.",
    bulletPoints: [
      "Interactive story editor with branching narrative support and rich media.",
      "Reader engagement analytics and heatmaps for content optimization.",
      "Mobile-optimized reading experience with collaboration tools for teams.",
    ],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function CaseStudiesSection() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const detailRefs = useRef([]);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [activeId, setActiveId] = useState(projects[0].id);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleViewAllWork = () => {
    router.push("/work");
  };

  // Three.js background effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 10;

      // Purple to pink gradient colors
      const t = Math.random();
      colorArray[i] = 0.7 + t * 0.3; // R
      colorArray[i + 1] = 0.3 + t * 0.3; // G
      colorArray[i + 2] = 0.9 + t * 0.1; // B
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.TorusGeometry(0.5, 0.2, 16, 100),
      new THREE.OctahedronGeometry(0.5),
      new THREE.IcosahedronGeometry(0.5),
    ];

    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.7 + i * 0.1, 0.8, 0.6),
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geometries[i], material);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xa855f7, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    sceneRef.current = { scene, camera, renderer, particlesMesh, shapes };

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.03;

      // Animate shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x = elapsedTime * (0.3 + i * 0.1);
        shape.rotation.y = elapsedTime * (0.2 + i * 0.1);
        shape.position.y = Math.sin(elapsedTime + i) * 2;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      shapes.forEach((s) => s.material.dispose());
    };
  }, []);

  // Mouse interaction with Three.js scene
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });

      if (sceneRef.current) {
        const { camera, particlesMesh } = sceneRef.current;
        gsap.to(camera.position, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 2,
          ease: "power2.out",
        });
        gsap.to(particlesMesh.rotation, {
          y: x * 0.3,
          x: y * 0.3,
          duration: 2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const items = gsap.utils.toArray("[data-case-item]");
      items.forEach((item) => {
        gsap.from(item, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { caseId } = entry.target.dataset;
            if (caseId) {
              setActiveId(caseId);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0, 0.1, 0.5, 0.9, 1],
      }
    );

    detailRefs.current = detailRefs.current.slice(0, projects.length);
    detailRefs.current
      .filter(Boolean)
      .forEach((detail) => observer.observe(detail));

    return () => observer.disconnect();
  }, [projects.length]);

  const activeProject =
    projects.find((project) => project.id === activeId) ?? projects[0];

  const handleKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveId(id);
    }
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Three.js Background Canvas */}
      <canvas
        ref={canvasRef}
        className={styles.threeCanvas}
        aria-hidden="true"
      />

      <header ref={headerRef} className={styles.sectionHeader} data-case-header>
        <span className={styles.sectionEyebrow}>Featured Projects</span>
        <h2 className={styles.sectionTitle}>
          Selected <span className={styles.sectionHighlight}>work</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Showcasing full-stack development expertise across healthcare, content
          platforms, and enterprise solutions
        </p>
        <button onClick={handleViewAllWork} className={styles.viewAllButton}>
          View All Projects →
        </button>
      </header>

      <div className={styles.layout}>
        <div className={styles.mediaColumn}>
          <div
            className={styles.mediaCard}
            style={{
              "--case-gradient": activeProject.gradient,
            }}
          >
            <div className={styles.mediaHeader}>
              <p className={styles.mediaTagline}>{activeProject.subtitle}</p>
              <span className={styles.mediaArrow} aria-hidden="true">
                →
              </span>
            </div>
            <figure className={styles.mediaFigure}>
              <img
                key={activeProject.id}
                src={activeProject.image}
                alt={`${activeProject.title} preview`}
                className={styles.mediaImage}
              />
              <div className={styles.mediaOverlay} />
            </figure>
            <div className={styles.mediaMeta}>
              <span className={styles.mediaMetaLabel}>Currently viewing</span>
              <span className={styles.mediaMetaTitle}>
                {activeProject.title}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.detailsColumn}>
          {projects.map((project, index) => {
            const isActive = project.id === activeId;
            return (
              <article
                key={project.id}
                className={`${styles.caseItem} ${isActive ? styles.caseItemActive : ""}`.trim()}
                data-case-id={project.id}
                data-case-item
                ref={(el) => {
                  detailRefs.current[index] = el;
                }}
                tabIndex={0}
                onMouseEnter={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                onClick={() => {
                  setActiveId(project.id);
                  handleViewAllWork();
                }}
                onKeyDown={(event) => {
                  handleKeyDown(event, project.id);
                  if (event.key === "Enter" || event.key === " ") {
                    handleViewAllWork();
                  }
                }}
                aria-current={isActive ? "true" : "false"}
              >
                <div className={styles.caseHeadingRow}>
                  <span
                    className={styles.caseHeadingMarker}
                    aria-hidden="true"
                  />
                  <h3 className={styles.caseTitle}>{project.title}</h3>
                </div>
                <p className={styles.caseDescription}>{project.description}</p>
                <ul className={styles.caseBulletList}>
                  {project.bulletPoints.map((bullet) => (
                    <li key={bullet} className={styles.caseBullet}>
                      <span aria-hidden="true">*</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className={styles.caseFooter}>
                  <div className={styles.caseTechList}>
                    {project.tech.map((tool) => (
                      <span key={tool} className={styles.caseTech}>
                        {tool}
                      </span>
                    ))}
                  </div>
                  <a
                    className={styles.caseLink}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
