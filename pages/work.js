import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";
import styles from "../styles/Work.module.css";
import Footer from "./components/Footer";
import NavBar from "./NavBar";

gsap.registerPlugin(ScrollTrigger);

const portfolioProjects = [
  {
    id: "uhc-clatter",
    title: "UHC 2.0 Clatter",
    category: "Healthcare Platform",
    subtitle: "AI-powered presentation maker for healthcare professionals.",
    description:
      "A comprehensive presentation creation platform designed specifically for healthcare professionals, enabling them to create compelling, data-driven presentations with AI assistance. Features intelligent templates, real-time collaboration, and HIPAA-compliant data handling.",
    fullDescription: `UHC 2.0 Clatter revolutionizes how healthcare professionals create and share critical information. Built with React, React Native, and Node.js, this cross-platform solution streamlines the presentation creation process while maintaining strict compliance with healthcare regulations.`,
    keyFeatures: [
      "AI-powered content generation with healthcare-specific templates",
      "Cross-platform support (Web and Mobile) with React and React Native",
      "Real-time collaboration features for team-based presentations",
      "HIPAA-compliant data storage and transmission",
      "Intelligent slide recommendations based on content analysis",
      "Export to multiple formats (PDF, PowerPoint, Web)",
    ],
    results: [
      "Adopted by multiple healthcare organizations",
      "Reduced presentation creation time by 60%",
      "100% HIPAA compliance maintained",
    ],
    tech: ["React", "React Native", "Node.js", "MongoDB", "AWS", "Socket.io"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "clatter",
    title: "Clatter",
    category: "Content Creation Platform",
    subtitle: "Multi-purpose tool for creating landing pages and summaries.",
    description:
      "A versatile content creation platform combining landing page builder with intelligent summary generation. Empowers marketers and content creators to quickly develop professional web pages and distill complex content into digestible summaries.",
    fullDescription: `Clatter is a comprehensive content creation ecosystem built with React, React Native, Strapi CMS, and Node.js. It combines visual page building with AI-powered summarization to deliver a complete solution for modern content teams.`,
    keyFeatures: [
      "Drag-and-drop landing page builder with live preview",
      "AI-powered content summarization for long-form articles",
      "Headless CMS integration with Strapi for content management",
      "Mobile app for on-the-go content creation and editing",
      "SEO optimization tools and analytics dashboard",
      "Template library with 50+ professional designs",
    ],
    results: [
      "5,000+ landing pages created",
      "50,000+ summaries generated",
      "4.7/5 user satisfaction rating",
    ],
    tech: ["React", "React Native", "Strapi", "Node.js", "PostgreSQL", "Redis"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "boltech",
    title: "Boltech",
    category: "Dynamic Business Website",
    subtitle: "Content-driven corporate site with DatoCMS integration.",
    description:
      "A modern, performant corporate website built with React and Gatsby, featuring seamless DatoCMS integration for dynamic content management. Delivers blazing-fast page loads and an exceptional user experience across all devices.",
    fullDescription: `Boltech showcases the power of static site generation combined with headless CMS flexibility. Built on Gatsby and React with DatoCMS as the content backend, it achieves perfect Lighthouse scores while providing content editors with an intuitive management interface.`,
    keyFeatures: [
      "Static site generation with Gatsby for optimal performance",
      "Headless CMS architecture using DatoCMS",
      "Advanced image optimization with lazy loading",
      "Multi-language support for global audience",
      "Custom GraphQL queries for efficient data fetching",
      "Automated deployment pipeline with incremental builds",
    ],
    results: [
      "100/100 Lighthouse performance score",
      "Sub-second page load times globally",
      "40% increase in organic traffic",
    ],
    tech: ["React", "Gatsby", "DatoCMS", "GraphQL", "Netlify", "Tailwind CSS"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "merchantcentos",
    title: "MerchantCentos",
    category: "Data Visualization Platform",
    subtitle: "Interactive map-based merchant analytics and insights.",
    description:
      "A sophisticated merchant analytics platform featuring interactive map visualizations and real-time data processing. Enables businesses to understand merchant distribution, performance metrics, and geographical trends through intuitive visual interfaces.",
    fullDescription: `MerchantCentos transforms complex merchant data into actionable insights through powerful map-based visualizations. Built with Preact and Node.js, it processes millions of data points to deliver real-time analytics in an elegant, performant interface.`,
    keyFeatures: [
      "Interactive map visualizations with clustering and heatmaps",
      "Real-time merchant performance metrics and analytics",
      "Advanced filtering and search capabilities",
      "Custom reporting with export functionality",
      "Responsive design optimized for desktop and tablet use",
      "Integration with multiple payment gateway APIs",
    ],
    results: [
      "Processing 1M+ merchant transactions daily",
      "Used by 200+ enterprise clients",
      "Improved decision-making speed by 70%",
    ],
    tech: ["Preact", "Node.js", "Express", "MongoDB", "Mapbox", "D3.js"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "landpagemaker",
    title: "LandPageMaker",
    category: "Web Page Customization Platform",
    subtitle: "Professional landing page builder with advanced customization.",
    description:
      "A comprehensive web page creation and customization platform that empowers users to build professional landing pages without coding. Features drag-and-drop interface, rich template library, and powerful customization options powered by React, Strapi, and Node.js.",
    fullDescription: `LandPageMaker democratizes web design by providing an intuitive yet powerful platform for creating stunning landing pages. With Strapi headless CMS integration and a React-based editor, it bridges the gap between simplicity and professional-grade customization.`,
    keyFeatures: [
      "Visual drag-and-drop editor with real-time preview",
      "100+ professionally designed templates",
      "Advanced customization with CSS and JavaScript support",
      "Form builder with integration to popular email services",
      "A/B testing capabilities for conversion optimization",
      "Custom domain support and SEO tools",
    ],
    results: [
      "10,000+ pages created by users",
      "Average conversion rate increase of 35%",
      "Featured in top marketing tool lists",
    ],
    tech: ["React", "Strapi", "Node.js", "MongoDB", "AWS S3", "Stripe"],
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "makestories",
    title: "Makestories",
    category: "Storytelling Platform",
    subtitle: "Interactive story creation with TypeScript and modern tools.",
    description:
      "An innovative storytelling platform that enables creators to build engaging, interactive narratives for web and mobile. Combines rich media support, branching storylines, and analytics to create immersive reading experiences.",
    fullDescription: `Makestories reimagines digital storytelling with a focus on interactivity and engagement. Built with React, Node.js, and TypeScript, it provides authors and content creators with powerful tools to craft compelling narratives that captivate audiences.`,
    keyFeatures: [
      "Interactive story editor with branching narrative support",
      "Rich media integration (images, video, audio, animations)",
      "Reader engagement analytics and heatmaps",
      "Mobile-optimized reading experience",
      "Collaboration tools for team-based story creation",
      "Monetization options with subscription and pay-per-story models",
    ],
    results: [
      "50,000+ stories published",
      "2M+ monthly readers",
      "Average reading time: 8 minutes per story",
    ],
    tech: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "makeemail",
    title: "Makeemail",
    category: "Email Campaign Platform",
    subtitle: "Next.js-powered email design and campaign management.",
    description:
      "A modern email campaign platform built with React, Next.js, and TypeScript that simplifies email marketing. Features visual email builder, automation workflows, and comprehensive analytics to help businesses create effective email campaigns.",
    fullDescription: `Makeemail combines beautiful design with powerful automation to deliver a best-in-class email marketing platform. Leveraging Next.js for optimal performance and TypeScript for reliability, it provides marketers with everything needed to create, send, and track successful campaigns.`,
    keyFeatures: [
      "Drag-and-drop email template builder",
      "Marketing automation with trigger-based workflows",
      "Advanced segmentation and personalization",
      "A/B testing for subject lines and content",
      "Comprehensive analytics and reporting dashboard",
      "Integration with major CRM and e-commerce platforms",
    ],
    results: [
      "1M+ emails sent monthly",
      "Average open rate of 28%",
      "99.9% email deliverability",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "SendGrid"],
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dicom-viewer",
    title: "DICOM Viewer",
    category: "Medical Imaging Application",
    subtitle: "Advanced medical image viewer built with React.",
    description:
      "A professional-grade DICOM medical imaging viewer built with React, enabling healthcare professionals to view, analyze, and annotate medical images. Features advanced visualization tools, measurement capabilities, and seamless PACS integration.",
    fullDescription: `DICOM Viewer brings enterprise-level medical imaging capabilities to the web browser. Built entirely with React and modern web technologies, it provides radiologists and healthcare professionals with powerful tools for medical image analysis while maintaining HIPAA compliance and optimal performance.`,
    keyFeatures: [
      "Full DICOM image format support (CT, MRI, X-Ray, etc.)",
      "Advanced visualization tools (windowing, MPR, 3D rendering)",
      "Measurement and annotation capabilities",
      "PACS integration for seamless workflow",
      "Multi-series comparison and synchronization",
      "HIPAA-compliant data handling and storage",
    ],
    results: [
      "Deployed in 15+ healthcare facilities",
      "Processing 100,000+ studies annually",
      "100% HIPAA compliance certification",
    ],
    tech: ["React", "Cornerstone.js", "DICOM Web", "WebGL", "Node.js", "Docker"],
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function WorkPage() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const projectRefs = useRef([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Fix body scroll
  useEffect(() => {
    // Store original styles
    const originalBodyDisplay = document.body.style.display;
    const originalBodyMinHeight = document.body.style.minHeight;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyJustifyContent = document.body.style.justifyContent;
    const originalBodyAlignItems = document.body.style.alignItems;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Also handle Next.js wrapper
    const nextDiv = document.getElementById("__next");
    const originalNextHeight = nextDiv ? nextDiv.style.height : "";
    const originalNextMinHeight = nextDiv ? nextDiv.style.minHeight : "";

    // Apply work page styles to enable scrolling
    document.body.style.setProperty("display", "block", "important");
    document.body.style.setProperty("min-height", "auto", "important");
    document.body.style.setProperty("overflow", "auto", "important");
    document.body.style.setProperty("justify-content", "initial", "important");
    document.body.style.setProperty("align-items", "initial", "important");
    document.documentElement.style.setProperty("overflow", "auto", "important");
    document.documentElement.style.scrollBehavior = "smooth";

    if (nextDiv) {
      nextDiv.style.height = "auto";
      nextDiv.style.minHeight = "100vh";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.display = originalBodyDisplay;
      document.body.style.minHeight = originalBodyMinHeight;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.justifyContent = originalBodyJustifyContent;
      document.body.style.alignItems = originalBodyAlignItems;
      document.documentElement.style.overflow = originalHtmlOverflow;

      if (nextDiv) {
        nextDiv.style.height = originalNextHeight;
        nextDiv.style.minHeight = originalNextMinHeight;
      }
    };
  }, []);

  // Three.js ambient background
  useEffect(() => {
    if (!canvasRef.current) return;

    let animationId;
    try {
      const canvas = canvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.innerWidth > 768,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = window.innerWidth > 768 ? 200 : 80;
      const posArray = new Float32Array(particlesCount * 3);
      const colorArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 10;

        const t = Math.random();
        colorArray[i] = 0.6 + t * 0.4;
        colorArray[i + 1] = 0.3 + t * 0.4;
        colorArray[i + 2] = 0.9 + t * 0.1;
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
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      scene.add(particlesMesh);

      sceneRef.current = { scene, camera, renderer, particlesMesh };

      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.03;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationId) cancelAnimationFrame(animationId);
        renderer.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };
    } catch (error) {
      console.error("Three.js initialization error:", error);
    }
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });

      if (sceneRef.current) {
        const { camera } = sceneRef.current;
        gsap.to(camera.position, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Project cards stagger
      gsap.from(projectRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: projectRefs.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <NavBar />

      {/* Three.js Background */}
      <canvas
        ref={canvasRef}
        className={styles.backgroundCanvas}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Portfolio</span>
          <h1 className={styles.heroTitle}>
            Featured <span className={styles.heroHighlight}>Projects</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A comprehensive portfolio showcasing 6+ years of full-stack development across healthcare, 
            content platforms, and enterprise solutions. Each project demonstrates expertise in React, 
            Node.js, cloud architecture, and modern development practices - delivering scalable, 
            production-ready applications.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>8</div>
              <div className={styles.statLabel}>Major Projects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>6+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.projectsGrid}>
          {portfolioProjects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={styles.projectCard}
              onClick={() => setSelectedProject(project)}
              style={{ "--project-gradient": project.gradient }}
            >
              <div className={styles.projectImageWrapper}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                />
                <div className={styles.projectOverlay}>
                  <button className={styles.viewDetailsBtn}>
                    View Details <FaRocket />
                  </button>
                </div>
              </div>
              <div className={styles.projectContent}>
                <span className={styles.projectCategory}>
                  {project.category}
                </span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>
                <div className={styles.projectTechStack}>
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className={styles.techBadge}>
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                <div className={styles.projectLinks}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section - Let's Work Together */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <FaCode className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Let's Work Together</h2>
          <p className={styles.ctaSubtitle}>
            Have an exciting project in mind? I'm always open to discussing new
            opportunities, creative ideas, and innovative solutions.
          </p>
          <div className={styles.ctaButtons}>
            <a
              href="mailto:your.email@example.com"
              className={styles.ctaPrimary}
            >
              Get In Touch
            </a>
            <a href="/about" className={styles.ctaSecondary}>
              About Me
            </a>
          </div>
          <div className={styles.ctaInfo}>
            <p className={styles.ctaInfoText}>
              📧 your.email@example.com | 📱 +1 (555) 123-4567
            </p>
            <p className={styles.ctaInfoText}>
              Currently available for freelance projects and full-time
              opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className={styles.modal} onClick={() => setSelectedProject(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{ "--modal-gradient": selectedProject.gradient }}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className={styles.modalHeader}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalBody}>
              <span className={styles.modalCategory}>
                {selectedProject.category}
              </span>
              <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
              <p className={styles.modalDescription}>
                {selectedProject.fullDescription}
              </p>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Key Features</h3>
                <ul className={styles.modalList}>
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <li key={idx} className={styles.modalListItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Results</h3>
                <ul className={styles.modalList}>
                  {selectedProject.results.map((result, idx) => (
                    <li key={idx} className={styles.modalListItem}>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Technology Stack</h3>
                <div className={styles.modalTechGrid}>
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className={styles.modalTechBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.modalActions}>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalButton}
                >
                  <FaGithub /> View Code
                </a>
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalButton}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
