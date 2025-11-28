import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/AIChatbot.module.css";

// API Configuration - Set these in your .env.local file
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Default voice

// Predefined questions
const QUICK_QUESTIONS = [
  { id: 1, text: "Tell me about your experience", icon: "💼" },
  { id: 2, text: "What are your technical skills?", icon: "⚡" },
  { id: 3, text: "Show me your best projects", icon: "🚀" },
  { id: 4, text: "What certifications do you have?", icon: "🏆" },
  { id: 5, text: "How can I contact you?", icon: "📧" },
  { id: 6, text: "What technologies do you work with?", icon: "🛠️" },
];

// Fallback responses
const FALLBACK_RESPONSES = {
  experience: `I have over 6 years of hands-on experience as a Full-Stack Developer and Cloud Solutions Architect. Currently, I'm working as a Senior Software Engineer at Emtec Inc., where I deliver enterprise solutions.

I specialize in building scalable web and mobile applications, cloud infrastructure on AWS and Azure, AI-powered solutions, and full-stack development with React, Node.js, and Next.js. My work spans healthcare, fintech, and enterprise platforms.`,

  skills: `My technical arsenal includes:

Frontend: React, Next.js, TypeScript, Tailwind CSS, React Native
Backend: Node.js, GraphQL, REST APIs, Express
Databases: MongoDB, PostgreSQL, Redis
Cloud & DevOps: AWS, Azure, Docker, Kubernetes, Terraform
AI/ML: OpenAI, Azure AI, TensorFlow

I'm Microsoft Certified in Azure Administrator (AZ-104) and AI Engineer (AI-102).`,

  projects: `I've delivered 46+ projects including:
- Healthcare Portal with HIPAA compliance
- Enterprise Storytelling Platform with AI analytics
- FinTech Solutions with fraud detection
- AI-Powered Applications using GPT-4 and computer vision`,

  certifications: `I hold Microsoft Certified: Azure Administrator Associate (AZ-104) and Azure AI Engineer Associate (AI-102) certifications, validating my expertise in cloud architecture and AI engineering.`,

  contact: `You can reach out through the contact form on this website, connect with me on LinkedIn, or explore my portfolio right here!`,

  technologies: `I work with React, Next.js, TypeScript, Node.js, Python, AWS, Azure, Docker, Kubernetes, MongoDB, PostgreSQL, and AI technologies like OpenAI and TensorFlow.`,
};

// Avatar states
const AVATAR_STATES = {
  IDLE: "idle",
  LISTENING: "listening",
  THINKING: "thinking",
  TALKING: "talking",
};

export default function AIChatbotEnhanced({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm Aakash's AI assistant with voice capability. Ask me anything about my experience, skills, and projects!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [avatarState, setAvatarState] = useState(AVATAR_STATES.IDLE);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Audio visualization for lip-sync
  const startAudioVisualization = () => {
    if (!audioRef.current || !audioContextRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const analyze = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalizedLevel = Math.min(average / 128, 1);
      setAudioLevel(normalizedLevel);

      if (isSpeaking) {
        animationFrameRef.current = requestAnimationFrame(analyze);
      }
    };

    analyze();
  };

  // ElevenLabs Text-to-Speech
  const synthesizeSpeech = async (text) => {
    if (!voiceEnabled || !ELEVENLABS_API_KEY) {
      return null;
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("ElevenLabs API error");
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error("Voice synthesis error:", error);
      return null;
    }
  };

  // Play audio with lip-sync
  const playAudioWithLipSync = async (audioUrl) => {
    if (!audioUrl) return;

    try {
      setIsSpeaking(true);
      setAvatarState(AVATAR_STATES.TALKING);

      // Setup audio context for visualization
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const source = audioContextRef.current.createMediaElementSource(audio);
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;

      source.connect(analyser);
      analyser.connect(audioContextRef.current.destination);
      analyserRef.current = analyser;

      audio.addEventListener("play", startAudioVisualization);
      audio.addEventListener("ended", () => {
        setIsSpeaking(false);
        setAvatarState(AVATAR_STATES.IDLE);
        setAudioLevel(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      });

      await audio.play();
    } catch (error) {
      console.error("Audio playback error:", error);
      setIsSpeaking(false);
      setAvatarState(AVATAR_STATES.IDLE);
    }
  };

  // OpenAI GPT-4 Integration
  const getAIResponse = async (userMessage) => {
    if (!OPENAI_API_KEY) {
      return getFallbackResponse(userMessage);
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: `You are Aakash K., a Senior Software Engineer at Emtec Inc. with 6+ years of experience. You are a Full-Stack Developer and Cloud Solutions Architect certified in Azure (AZ-104) and AI (AI-102). 

Your expertise includes:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, React Native
- Backend: Node.js, GraphQL, REST APIs, Express
- Cloud: AWS, Azure, Docker, Kubernetes, Terraform
- AI/ML: OpenAI, Azure AI, TensorFlow
- Databases: MongoDB, PostgreSQL, Redis

You've delivered 46+ projects in healthcare, fintech, and enterprise platforms. You're passionate about building scalable, user-centric solutions. Keep responses concise (2-3 paragraphs max) and friendly.`,
              },
              {
                role: "user",
                content: userMessage,
              },
            ],
            temperature: 0.7,
            max_tokens: 300,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("OpenAI API error");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI error:", error);
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback response logic
  const getFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
      return FALLBACK_RESPONSES.experience;
    }
    if (lowerMessage.includes("skill") || lowerMessage.includes("technical")) {
      return FALLBACK_RESPONSES.skills;
    }
    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio")
    ) {
      return FALLBACK_RESPONSES.projects;
    }
    if (lowerMessage.includes("certif") || lowerMessage.includes("azure")) {
      return FALLBACK_RESPONSES.certifications;
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("email")) {
      return FALLBACK_RESPONSES.contact;
    }
    if (lowerMessage.includes("technolog") || lowerMessage.includes("stack")) {
      return FALLBACK_RESPONSES.technologies;
    }

    return `That's a great question! I can help you with information about my experience, skills, projects, certifications, contact details, and technologies. Try asking about any of these topics!`;
  };

  const handleSendMessage = async (messageText) => {
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

    // Get AI response
    const responseText = await getAIResponse(messageText);

    // Add bot response
    setTimeout(async () => {
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      // Generate and play voice
      if (voiceEnabled) {
        const audioUrl = await synthesizeSpeech(responseText);
        if (audioUrl) {
          await playAudioWithLipSync(audioUrl);
        } else {
          setAvatarState(AVATAR_STATES.IDLE);
        }
      } else {
        setAvatarState(AVATAR_STATES.IDLE);
      }
    }, 1000);
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

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
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
            {/* Header with 3D Avatar */}
            <div className={styles.chatHeader}>
              <div className={styles.avatarSection}>
                {/* 3D Avatar with Lip-Sync */}
                <div className={styles.avatar3DContainer}>
                  <div
                    className={`${styles.avatar} ${styles[avatarState]}`}
                    style={{
                      backgroundImage: "url(/mypic.png)",
                      transform: `scale(${1 + audioLevel * 0.1})`,
                    }}
                  >
                    {/* Animated border ring */}
                    <div className={styles.avatarRing}></div>

                    {/* Mouth animation overlay for lip-sync */}
                    {isSpeaking && (
                      <div
                        className={styles.mouthAnimation}
                        style={{
                          transform: `scaleY(${0.5 + audioLevel * 0.5})`,
                        }}
                      ></div>
                    )}

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
                          transition={{ repeat: Infinity, duration: 0.3 }}
                        >
                          🎤
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Audio visualizer */}
                  {isSpeaking && (
                    <div className={styles.audioVisualizer}>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={styles.visualizerBar}
                          animate={{
                            scaleY: [
                              0.3,
                              0.3 + audioLevel * (i + 1) * 0.15,
                              0.3,
                            ],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.headerInfo}>
                  <h3>Aakash K.</h3>
                  <p>
                    {OPENAI_API_KEY ? "GPT-4 Powered" : "AI Assistant"} •{" "}
                    {voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
                  </p>
                </div>
              </div>

              <div className={styles.headerControls}>
                <button
                  className={styles.voiceToggle}
                  onClick={toggleVoice}
                  title={voiceEnabled ? "Disable Voice" : "Enable Voice"}
                >
                  {voiceEnabled ? "🔊" : "🔇"}
                </button>
                <button className={styles.closeButton} onClick={onClose}>
                  ✕
                </button>
              </div>
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
