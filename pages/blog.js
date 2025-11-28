import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Blog.module.css";
import { FaClock, FaCalendar, FaTag, FaSearch } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import ScrambleText from "./components/ScrambleText";

gsap.registerPlugin(ScrollTrigger);

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

const blogPosts = [
  {
    id: 1,
    title: "Building HIPAA-Compliant Healthcare Applications with React",
    excerpt:
      "Learn how to architect and develop healthcare applications that meet HIPAA compliance requirements. From secure data handling to encryption best practices, discover the essential patterns for building medical software with React and Node.js.",
    date: "Oct 15, 2025",
    readTime: "8 min read",
    category: "Healthcare",
    tags: ["react", "healthcare", "security", "compliance"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Azure AI Services: Building Intelligent Applications",
    excerpt:
      "Explore Azure's AI capabilities and learn how to integrate AI-102 certified services into your applications. From cognitive services to custom ML models, discover practical implementations for real-world projects.",
    date: "Oct 10, 2025",
    readTime: "10 min read",
    category: "Cloud & AI",
    tags: ["azure", "ai", "machine-learning", "cloud"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Infrastructure as Code with Terraform and Azure",
    excerpt:
      "Master cloud infrastructure automation using Terraform on Azure. Learn how to define, deploy, and manage scalable cloud resources with code, ensuring consistency and reproducibility across environments.",
    date: "Oct 5, 2025",
    readTime: "7 min read",
    category: "DevOps",
    tags: ["terraform", "azure", "devops", "infrastructure"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "Full-Stack Development with Next.js and MongoDB",
    excerpt:
      "Build production-ready full-stack applications using Next.js and MongoDB. Explore API routes, server-side rendering, and database integration patterns for modern web development.",
    date: "Sep 28, 2025",
    readTime: "9 min read",
    category: "Full-Stack",
    tags: ["nextjs", "mongodb", "fullstack", "react"],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "React Native: Cross-Platform Mobile Development",
    excerpt:
      "Dive into mobile app development with React Native. Learn how to build performant, native-feeling mobile applications for iOS and Android using a single codebase.",
    date: "Sep 20, 2025",
    readTime: "6 min read",
    category: "Mobile",
    tags: ["react-native", "mobile", "cross-platform"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "TypeScript Best Practices for Enterprise Applications",
    excerpt:
      "Discover advanced TypeScript patterns and best practices for building large-scale enterprise applications. From type safety to code organization, learn how to leverage TypeScript effectively.",
    date: "Sep 15, 2025",
    readTime: "8 min read",
    category: "TypeScript",
    tags: ["typescript", "enterprise", "best-practices"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    featured: false,
  },
];

const topics = [
  "azure",
  "react",
  "nodejs",
  "typescript",
  "cloud",
  "ai",
  "devops",
  "terraform",
  "mongodb",
  "nextjs",
  "react-native",
  "healthcare",
  "fullstack",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const postsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Animate hero section
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }

    // Animate blog posts
    postsRef.current.forEach((post, index) => {
      if (post) {
        gsap.from(post, {
          scrollTrigger: {
            trigger: post,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      }
    });
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || post.tags.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    return new Date(a.date) - new Date(b.date);
  });

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

      <NavBar />

      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>THE BLOG</span>
          <h1 className={styles.heroTitle}>
            <ScrambleText text="Handpicked insights" delay={300} />
            <br />
            from <span className={styles.heroHighlight}>the pensieve</span>
          </h1>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.searchShortcut}>
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Blog Posts */}
          <div className={styles.postsSection}>
            {sortedPosts.map((post, index) => (
              <article
                key={post.id}
                ref={(el) => (postsRef.current[index] = el)}
                className={`${styles.postCard} ${
                  post.featured ? styles.featuredPost : ""
                }`}
              >
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>
                      <FaCalendar /> {post.date}
                    </span>
                    {post.featured && (
                      <span className={styles.featuredBadge}>
                        Recently released
                      </span>
                    )}
                  </div>

                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>

                  <div className={styles.postFooter}>
                    <span className={styles.readTime}>
                      <FaClock /> {post.readTime}
                    </span>
                    <div className={styles.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {post.image && (
                  <div className={styles.postImageWrapper}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.postImage}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Sort Options */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <FaCalendar className={styles.sidebarIcon} />
                <h3 className={styles.sidebarTitle}>Newest First</h3>
              </div>
              <p className={styles.sidebarText}>Most recent posts first</p>
            </div>

            {/* Topics */}
            <div className={styles.sidebarCard}>
              <div className={styles.sidebarHeader}>
                <FaTag className={styles.sidebarIcon} />
                <h3 className={styles.sidebarTitle}>Topics</h3>
              </div>
              <div className={styles.topicsGrid}>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    className={`${styles.topicTag} ${
                      selectedTopic === topic ? styles.topicTagActive : ""
                    }`}
                    onClick={() =>
                      setSelectedTopic(selectedTopic === topic ? null : topic)
                    }
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
