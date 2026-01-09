import React from "react";
import NavBar from "./NavBar";
import Footer from "./components/Footer";
import styles from "../styles/Resume.module.css";
import {
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaProjectDiagram,
  FaTools,
  FaUser,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useState } from "react";

export default function Resume() {
  const [isLightTheme, setIsLightTheme] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <div>
      <NavBar />
      <div
        className={`${styles.page} ${isLightTheme ? styles.light : styles.dark}`}
      >
        <main
          className={`${styles.container} ${isLightTheme ? styles.light : styles.dark}`}
        >
          <header className={styles.hero}>
            <div className={styles.avatarWrap}>
              <img src="/mypic.jpg" alt="Aakash K." className={styles.avatar} />
            </div>

            <div className={styles.heroInfo}>
              <h1 className={styles.name}>Aakash K.</h1>
              <p className={styles.title}>
                Cloud & AI Solutions Architect — Full-Stack Engineer
              </p>

              <div className={styles.contactRow}>
                <a
                  href="mailto:your.email@example.com"
                  className={styles.contactLink}
                >
                  <FaEnvelope /> your.email@example.com
                </a>
                <a
                  href="https://linkedin.com/in/aayushbharti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaLinkedin /> linkedin.com/in/aayushbharti
                </a>
                <a
                  href="https://github.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaGithub /> github.com/YOUR_USERNAME
                </a>
              </div>

              <p className={styles.brief}>
                Privacy-forward software engineer and cloud architect with 6+
                years building data-driven products for healthcare and
                enterprise. I focus on reliable production systems, resilient AI
                integrations, and high-quality user experiences. Available for
                freelance and full-time roles.
              </p>

              <div className={styles.metaBadges}>
                <span className={styles.badge}>6+ yrs experience</span>
                <span className={styles.badge}>8 major projects</span>
                <span className={styles.badge}>15+ technologies</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {isLightTheme ? <FaMoon /> : <FaSun />}{" "}
                {isLightTheme ? "Dark" : "Light"}
              </button>
              <button
                className={styles.printButton}
                onClick={handlePrint}
                aria-label="Download Resume"
              >
                <FaDownload /> Download / Print
              </button>
            </div>
          </header>

          <nav className={styles.resumeNav}>
            <a href="#summary" className={styles.navLink}>
              Summary
            </a>
            <a href="#experience" className={styles.navLink}>
              Experience
            </a>
            <a href="#projects" className={styles.navLink}>
              Projects
            </a>
            <a href="#education" className={styles.navLink}>
              Education
            </a>
            <a href="#certifications" className={styles.navLink}>
              Certifications
            </a>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </nav>

          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <section className={styles.sectionSmall}>
                <h4>
                  <FaTools /> Technical Skills
                </h4>
                <div className={styles.skillCategory}>
                  <h5>Frontend</h5>
                  <div className={styles.skillsGrid}>
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "JavaScript",
                      "HTML5",
                      "CSS3",
                      "Tailwind CSS",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h5>Backend</h5>
                  <div className={styles.skillsGrid}>
                    {[
                      "Node.js",
                      "Express",
                      "GraphQL",
                      "REST APIs",
                      "Python",
                      "Django",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h5>Mobile</h5>
                  <div className={styles.skillsGrid}>
                    {["React Native", "Flutter", "iOS", "Android"].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h5>Databases</h5>
                  <div className={styles.skillsGrid}>
                    {["PostgreSQL", "MongoDB", "Redis", "Firebase"].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h5>Cloud & DevOps</h5>
                  <div className={styles.skillsGrid}>
                    {[
                      "AWS",
                      "Azure",
                      "Docker",
                      "Kubernetes",
                      "Terraform",
                      "CI/CD",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h5>AI & ML</h5>
                  <div className={styles.skillsGrid}>
                    {[
                      "Azure AI",
                      "OpenAI",
                      "TensorFlow",
                      "Machine Learning",
                      "NLP",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={styles.sectionSmall}>
                <h4>
                  <FaCertificate /> Certifications
                </h4>
                <ul className={styles.simpleList}>
                  <li>AZ-104: Microsoft Azure Administrator</li>
                  <li>AI-102: Azure AI Engineer</li>
                </ul>
              </section>

              <section className={styles.sectionSmall}>
                <h4>
                  <FaTools /> Tools & Infrastructure
                </h4>
                <div className={styles.toolsList}>
                  {[
                    "Docker",
                    "Kubernetes",
                    "Terraform",
                    "Grafana",
                    "Prometheus",
                    "Kafka",
                  ].map((t) => (
                    <span key={t} className={styles.tool}>
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            </aside>

            <section className={styles.main}>
              <section id="summary" className={styles.section}>
                <h2>
                  <FaUser /> Summary
                </h2>
                <p>
                  Privacy-forward software engineer and cloud architect with 6+
                  years building data-driven products for healthcare and
                  enterprise. I focus on reliable production systems, resilient
                  AI integrations, and high-quality user experiences.
                </p>
              </section>

              <section id="experience" className={styles.section}>
                <h2>
                  <FaBriefcase /> Professional Experience
                </h2>
                <div className={styles.skillCategory}>
                  <h3>Frontend Development</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "JavaScript",
                      "HTML5",
                      "CSS3",
                      "Tailwind CSS",
                      "Framer Motion",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Backend Development</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "Node.js",
                      "Express",
                      "GraphQL",
                      "REST APIs",
                      "Python",
                      "Django",
                      "Microservices",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Mobile Development</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "React Native",
                      "Flutter",
                      "iOS Development",
                      "Android Development",
                      "Expo",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Databases & Storage</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "PostgreSQL",
                      "MongoDB",
                      "Redis",
                      "Firebase",
                      "MySQL",
                      "DynamoDB",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Cloud & DevOps</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "AWS",
                      "Azure",
                      "Google Cloud",
                      "Docker",
                      "Kubernetes",
                      "Terraform",
                      "Jenkins",
                      "GitLab CI",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>AI & Machine Learning</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "Azure AI",
                      "OpenAI GPT",
                      "TensorFlow",
                      "PyTorch",
                      "NLP",
                      "Computer Vision",
                      "MLOps",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3>Tools & Others</h3>
                  <div className={styles.skillsGrid}>
                    {[
                      "Git",
                      "Jira",
                      "Figma",
                      "Adobe XD",
                      "Postman",
                      "VS Code",
                      "Linux",
                      "Agile/Scrum",
                    ].map((s) => (
                      <div key={s} className={styles.skillBadge}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <h2>Professional Experience</h2>

                <article className={styles.job}>
                  <h3>Senior Cloud & AI Solutions Architect</h3>
                  <p className={styles.jobMeta}>
                    Emtec Inc. | Full-time | 2022 - Present
                  </p>
                  <ul>
                    <li>
                      Architected and deployed scalable cloud solutions on Azure
                      and AWS, managing infrastructure for high-traffic
                      applications serving 100K+ users.
                    </li>
                    <li>
                      Integrated AI/ML models using Azure Cognitive Services and
                      custom APIs, improving user engagement by 40% through
                      personalized recommendations.
                    </li>
                    <li>
                      Led a team of 5 developers in agile methodologies,
                      implementing CI/CD pipelines with Docker and Kubernetes,
                      reducing deployment time by 60%.
                    </li>
                    <li>
                      Optimized database performance with PostgreSQL and
                      MongoDB, implementing indexing and caching strategies that
                      reduced query times by 50%.
                    </li>
                  </ul>
                </article>

                <article className={styles.job}>
                  <h3>Full-Stack Engineer</h3>
                  <p className={styles.jobMeta}>
                    TechCorp Solutions | Full-time | 2020 - 2022
                  </p>
                  <ul>
                    <li>
                      Developed full-stack web applications using React,
                      Node.js, and GraphQL, handling end-to-end feature
                      development from design to deployment.
                    </li>
                    <li>
                      Built mobile apps with React Native, integrating offline
                      capabilities and push notifications, resulting in 25%
                      increase in user retention.
                    </li>
                    <li>
                      Collaborated with cross-functional teams to deliver
                      projects on time, utilizing version control with Git and
                      code reviews for quality assurance.
                    </li>
                    <li>
                      Implemented security best practices, including OAuth2
                      authentication and data encryption, ensuring compliance
                      with GDPR and HIPAA.
                    </li>
                  </ul>
                </article>

                <article className={styles.job}>
                  <h3>Software Developer</h3>
                  <p className={styles.jobMeta}>
                    StartupXYZ | Full-time | 2019 - 2020
                  </p>
                  <ul>
                    <li>
                      Contributed to the development of a document editing
                      platform, implementing real-time collaboration features
                      using WebSockets.
                    </li>
                    <li>
                      Designed and maintained RESTful APIs, ensuring high
                      availability and scalability for enterprise clients.
                    </li>
                    <li>
                      Participated in code refactoring and performance
                      optimizations, improving application load times by 30%.
                    </li>
                    <li>
                      Conducted thorough testing with Jest and Cypress,
                      maintaining 95% code coverage and reducing bug rates.
                    </li>
                  </ul>
                </article>

                <article className={styles.job}>
                  <h3>Junior Developer</h3>
                  <p className={styles.jobMeta}>
                    LogiTech | Internship | 2018 - 2019
                  </p>
                  <ul>
                    <li>
                      Assisted in building logistics tracking systems,
                      integrating third-party APIs for real-time data updates.
                    </li>
                    <li>
                      Developed automated scripts for data reconciliation,
                      reducing manual processing time by 70%.
                    </li>
                    <li>
                      Gained experience in cloud deployments using AWS, setting
                      up monitoring with CloudWatch and ELK stack.
                    </li>
                  </ul>
                </article>
              </section>

              <section id="projects" className={styles.section}>
                <h2>
                  <FaProjectDiagram /> Key Projects & Achievements
                </h2>
                <div className={styles.projectsGrid}>
                  <article className={styles.project}>
                    <h3>YFT (Your Fitness Tracker)</h3>
                    <p>
                      AI-powered mobile app for personalized fitness tracking
                      and recommendations.
                    </p>
                    <ul>
                      <li>
                        Integrated Groq AI for real-time workout suggestions and
                        nutrition advice.
                      </li>
                      <li>
                        Implemented offline caching and background sync for
                        seamless user experience.
                      </li>
                      <li>
                        Achieved 4.8/5 rating on app stores with 10K+ downloads.
                      </li>
                    </ul>
                  </article>
                  <article className={styles.project}>
                    <h3>Medical Analytics Dashboard</h3>
                    <p>
                      Real-time platform for healthcare KPIs and operational
                      insights.
                    </p>
                    <ul>
                      <li>
                        Built with React and Node.js, handling 1M+ data points
                        daily.
                      </li>
                      <li>
                        Incorporated RBAC and audit logging for compliance.
                      </li>
                      <li>
                        Reduced reporting time from days to minutes for
                        stakeholders.
                      </li>
                    </ul>
                  </article>
                  <article className={styles.project}>
                    <h3>Patient Care Mobile App</h3>
                    <p>
                      Comprehensive healthcare app for patients and providers.
                    </p>
                    <ul>
                      <li>
                        Features include appointment scheduling, medical
                        records, and telemedicine.
                      </li>
                      <li>
                        Ensured HIPAA compliance with end-to-end encryption.
                      </li>
                      <li>
                        Improved patient engagement by 35% through user feedback
                        integration.
                      </li>
                    </ul>
                  </article>
                  <article className={styles.project}>
                    <h3>Enterprise Document Editor</h3>
                    <p>
                      Collaborative web-based editor with advanced features.
                    </p>
                    <ul>
                      <li>
                        Supports templates, versioning, and multi-format
                        exports.
                      </li>
                      <li>
                        Scalable architecture handling 1000+ concurrent users.
                      </li>
                      <li>
                        Integrated with cloud storage for seamless file
                        management.
                      </li>
                    </ul>
                  </article>
                </div>
              </section>

              <section id="education" className={styles.section}>
                <h2>
                  <FaGraduationCap /> Education
                </h2>
                <article className={styles.education}>
                  <h3>Bachelor of Technology in Computer Science</h3>
                  <p className={styles.jobMeta}>
                    University Name, Location | 2015 - 2019
                  </p>
                  <p>
                    Graduated with honors, focused on software engineering and
                    data structures.
                  </p>
                </article>
              </section>

              <section id="certifications" className={styles.section}>
                <h2>
                  <FaCertificate /> Certifications
                </h2>
                <ul className={styles.certList}>
                  <li>
                    AZ-104: Microsoft Azure Administrator Associate (2023)
                  </li>
                  <li>AI-102: Azure AI Engineer Associate (2023)</li>
                  <li>AWS Certified Solutions Architect (2022)</li>
                  <li>Certified Kubernetes Administrator (2021)</li>
                </ul>
              </section>

              <section id="contact" className={styles.section}>
                <h2>Contact</h2>
                <p>
                  Open to freelance and full-time roles. Email:
                  your.email@example.com
                </p>
              </section>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
