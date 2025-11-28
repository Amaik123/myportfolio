import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/AIChatbot.module.css";

// Predefined questions about Aakash
const QUICK_QUESTIONS = [
  {
    id: 1,
    text: "Tell me about your experience",
    icon: "💼",
  },
  {
    id: 2,
    text: "What are your technical skills?",
    icon: "⚡",
  },
  {
    id: 3,
    text: "Show me your best projects",
    icon: "🚀",
  },
  {
    id: 4,
    text: "What certifications do you have?",
    icon: "🏆",
  },
  {
    id: 5,
    text: "How can I contact you?",
    icon: "📧",
  },
  {
    id: 6,
    text: "What technologies do you work with?",
    icon: "🛠️",
  },
];

// Predefined responses based on portfolio content
const RESPONSES = {
  experience: `I have over 6 years of hands-on experience as a Full-Stack Developer and Cloud Solutions Architect. Currently, I'm working as a Senior Software Engineer at Emtec Inc., where I deliver enterprise solutions.

I specialize in:
• Building scalable web and mobile applications
• Cloud infrastructure on AWS and Azure
• AI-powered solutions and integrations
• Full-stack development with React, Node.js, and Next.js

My work spans healthcare, fintech, and enterprise platforms, always focusing on delivering exceptional user experiences.`,

  skills: `My technical arsenal includes:

**Frontend:** React, Next.js, TypeScript, Tailwind CSS, React Native
**Backend:** Node.js, GraphQL, REST APIs, Express
**Databases:** MongoDB, PostgreSQL, Redis
**Cloud & DevOps:** AWS, Azure, Docker, Kubernetes, Terraform
**AI/ML:** OpenAI, Azure AI, TensorFlow, Machine Learning pipelines

I'm Microsoft Certified in:
• Azure Administrator (AZ-104)
• AI Engineer (AI-102)

I love working with cutting-edge technologies and am always learning!`,

  projects: `I've delivered 46+ projects across various domains:

**🏥 Healthcare Portal** - Built a comprehensive patient management system with real-time data sync and HIPAA compliance.

**📝 Enterprise Storytelling Platform** - Created a content management platform with AI-powered analytics and collaboration tools.

**💰 FinTech Solutions** - Developed secure payment processing systems with fraud detection and real-time monitoring.

**🤖 AI-Powered Applications** - Integrated GPT-4, computer vision, and NLP for intelligent automation.

Each project showcases my commitment to quality, scalability, and user-centric design.`,

  certifications: `I hold these Microsoft certifications:

🏆 **Microsoft Certified: Azure Administrator Associate (AZ-104)**
   - Cloud infrastructure management
   - Identity and governance
   - Storage and compute solutions

🏆 **Microsoft Certified: Azure AI Engineer Associate (AI-102)**
   - AI solution development
   - Natural language processing
   - Computer vision applications
   - Conversational AI

These certifications validate my expertise in cloud architecture and AI engineering, which I apply daily in building enterprise solutions.`,

  contact: `I'd love to connect with you! 

📧 **Email:** You can reach out through the contact form on this website
💼 **LinkedIn:** Connect with me for professional networking
🌐 **Portfolio:** You're already here! Feel free to explore my work

I'm currently working at Emtec Inc., but I'm always open to discussing interesting opportunities, collaborations, or just chatting about technology!

What would you like to know more about?`,

  technologies: `I work with a modern tech stack:

**Languages & Frameworks:**
React, Next.js, TypeScript, JavaScript, Node.js, Python

**Cloud Platforms:**
AWS (EC2, S3, Lambda, RDS), Azure (VMs, Functions, Cosmos DB)

**DevOps & Tools:**
Docker, Kubernetes, Terraform, GitHub Actions, CI/CD

**Databases:**
MongoDB, PostgreSQL, MySQL, Redis

**AI & Machine Learning:**
OpenAI API, Azure AI Services, TensorFlow

**Mobile:**
React Native for cross-platform development

I believe in using the right tool for the job and staying updated with industry trends!`,
};

// Avatar animation states
const AVATAR_STATES = {
  IDLE: "idle",
  LISTENING: "listening",
  THINKING: "thinking",
  TALKING: "talking",
};

export default function AIChatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm Aakash's AI assistant. I can tell you all about my experience, skills, and projects. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [avatarState, setAvatarState] = useState(AVATAR_STATES.IDLE);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate avatar talking animation
  useEffect(() => {
    if (avatarState === AVATAR_STATES.TALKING) {
      const timer = setTimeout(() => {
        setAvatarState(AVATAR_STATES.IDLE);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [avatarState]);

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("work") ||
      lowerMessage.includes("background")
    ) {
      return RESPONSES.experience;
    }

    if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("technical") ||
      lowerMessage.includes("expertise")
    ) {
      return RESPONSES.skills;
    }

    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio") ||
      lowerMessage.includes("work")
    ) {
      return RESPONSES.projects;
    }

    if (
      lowerMessage.includes("certificate") ||
      lowerMessage.includes("certification") ||
      lowerMessage.includes("azure") ||
      lowerMessage.includes("microsoft")
    ) {
      return RESPONSES.certifications;
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach")
    ) {
      return RESPONSES.contact;
    }

    if (
      lowerMessage.includes("technolog") ||
      lowerMessage.includes("stack") ||
      lowerMessage.includes("tools")
    ) {
      return RESPONSES.technologies;
    }

    // Default response
    return `That's a great question! I can help you with information about:

• My professional experience and current role
• Technical skills and expertise
• Projects and portfolio work
• Certifications (Azure & AI)
• Contact information
• Technologies I work with

Try asking about any of these topics, or use the quick questions above!`;
  };

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      text: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Update avatar state
    setAvatarState(AVATAR_STATES.LISTENING);

    // Simulate thinking
    setTimeout(() => {
      setAvatarState(AVATAR_STATES.THINKING);
      setIsTyping(true);
    }, 500);

    // Generate and add bot response
    setTimeout(() => {
      const responseText = getResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setAvatarState(AVATAR_STATES.TALKING);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.chatbotOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.chatbotContainer}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Avatar */}
            <div className={styles.chatHeader}>
              <div className={styles.avatarSection}>
                <div
                  className={`${styles.avatar} ${styles[avatarState]}`}
                  style={{
                    backgroundImage: "url(/mypic.png)",
                  }}
                >
                  {/* Animated border ring */}
                  <div className={styles.avatarRing}></div>

                  {/* Status indicator */}
                  <div className={styles.avatarStatus}>
                    {avatarState === AVATAR_STATES.LISTENING && (
                      <motion.div
                        className={styles.listeningIndicator}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        👂
                      </motion.div>
                    )}
                    {avatarState === AVATAR_STATES.THINKING && (
                      <motion.div
                        className={styles.thinkingIndicator}
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        🤔
                      </motion.div>
                    )}
                    {avatarState === AVATAR_STATES.TALKING && (
                      <motion.div
                        className={styles.talkingIndicator}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      >
                        💬
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className={styles.headerInfo}>
                  <h3>Aakash K.</h3>
                  <p>AI Assistant • Always Ready to Help</p>
                </div>
              </div>

              <button className={styles.closeButton} onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Quick Questions */}
            <div className={styles.quickQuestions}>
              {QUICK_QUESTIONS.map((question) => (
                <motion.button
                  key={question.id}
                  className={styles.quickQuestionBtn}
                  onClick={() => handleQuickQuestion(question)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.questionIcon}>{question.icon}</span>
                  <span className={styles.questionText}>{question.text}</span>
                </motion.button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className={styles.chatMessages} ref={chatContainerRef}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${
                    message.type === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.type === "bot" && (
                    <div className={styles.messageAvatar}>🤖</div>
                  )}
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{message.text}</p>
                  </div>
                  {message.type === "user" && (
                    <div className={styles.messageAvatar}>👤</div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className={`${styles.message} ${styles.botMessage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={styles.messageAvatar}>🤖</div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Ask me anything about Aakash..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className={styles.inputField}
              />
              <motion.button
                className={styles.sendButton}
                onClick={() => handleSendMessage(inputValue)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputValue.trim()}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
