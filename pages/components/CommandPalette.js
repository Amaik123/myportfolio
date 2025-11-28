import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import styles from "../../styles/CommandPalette.module.css";

const commands = [
  {
    id: "home",
    name: "Go to Home",
    shortcut: "H",
    icon: "🏠",
    category: "Navigation",
    action: (router) => router.push("/"),
  },
  {
    id: "about",
    name: "Go to About",
    shortcut: "A",
    icon: "👤",
    category: "Navigation",
    action: (router) => router.push("/about"),
  },
  {
    id: "work",
    name: "Go to Work",
    shortcut: "W",
    icon: "💼",
    category: "Navigation",
    action: (router) => router.push("/work"),
  },
  {
    id: "skills",
    name: "Go to Skills",
    shortcut: "S",
    icon: "⚡",
    category: "Navigation",
    action: (router) => router.push("/skills"),
  },
  {
    id: "blog",
    name: "Go to Blog",
    shortcut: "B",
    icon: "📝",
    category: "Navigation",
    action: (router) => router.push("/blog"),
  },
  {
    id: "more",
    name: "Go to More",
    shortcut: "M",
    icon: "✨",
    category: "Navigation",
    action: (router) => router.push("/more"),
  },
  {
    id: "guestbook",
    name: "Go to Guestbook",
    shortcut: "K",
    icon: "📖",
    category: "Navigation",
    action: (router) => router.push("/guestbook"),
  },
  {
    id: "bucketlist",
    name: "Go to Bucket List",
    shortcut: "U",
    icon: "🎯",
    category: "Navigation",
    action: (router) => router.push("/bucketlist"),
  },
  {
    id: "links",
    name: "Go to Links",
    shortcut: "I",
    icon: "🔗",
    category: "Navigation",
    action: (router) => router.push("/links"),
  },
  {
    id: "uses",
    name: "Go to Uses",
    shortcut: "T",
    icon: "🛠️",
    category: "Navigation",
    action: (router) => router.push("/uses"),
  },
  {
    id: "timeline",
    name: "Go to Timeline",
    shortcut: "J",
    icon: "📅",
    category: "Navigation",
    action: (router) => router.push("/timeline"),
  },
  {
    id: "github",
    name: "Open GitHub",
    shortcut: "G",
    icon: "🔗",
    category: "Links",
    action: () => window.open("https://github.com/Amaik123", "_blank"),
  },
  {
    id: "linkedin",
    name: "Open LinkedIn",
    shortcut: "L",
    icon: "💼",
    category: "Links",
    action: () => window.open("https://linkedin.com/in/yourprofile", "_blank"),
  },
  {
    id: "email",
    name: "Send Email",
    shortcut: "E",
    icon: "📧",
    category: "Contact",
    action: () => (window.location.href = "mailto:your@email.com"),
  },
  {
    id: "resume",
    name: "Download Resume",
    shortcut: "R",
    icon: "📄",
    category: "Actions",
    action: () => window.open("/resume.pdf", "_blank"),
  },
  {
    id: "theme",
    name: "Toggle Theme",
    shortcut: "T",
    icon: "🌙",
    category: "Settings",
    action: () => document.body.classList.toggle("light-theme"),
  },
  {
    id: "source",
    name: "View Source Code",
    shortcut: "V",
    icon: "💻",
    category: "Actions",
    action: () =>
      window.open("https://github.com/Amaik123/myportfolio", "_blank"),
  },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  const flatCommands = Object.values(groupedCommands).flat();

  const handleKeyDown = useCallback((e) => {
    // Open with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
      setSearch("");
      setSelectedIndex(0);
    }

    // Close with Escape
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flatCommands.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : flatCommands.length - 1
      );
    }

    if (e.key === "Enter" && flatCommands[selectedIndex]) {
      executeCommand(flatCommands[selectedIndex]);
    }
  };

  const executeCommand = (command) => {
    command.action(router);
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            className={styles.palette}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {/* Search input */}
            <div className={styles.searchContainer}>
              <span className={styles.searchIcon}>⌘</span>
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <kbd className={styles.escKey}>ESC</kbd>
            </div>

            {/* Commands list */}
            <div className={styles.commandsList}>
              {Object.entries(groupedCommands).map(([category, cmds]) => (
                <div key={category} className={styles.commandGroup}>
                  <div className={styles.categoryLabel}>{category}</div>
                  {cmds.map((cmd) => {
                    const globalIndex = flatCommands.indexOf(cmd);
                    return (
                      <motion.button
                        key={cmd.id}
                        className={`${styles.commandItem} ${
                          globalIndex === selectedIndex ? styles.selected : ""
                        }`}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        whileHover={{ x: 4 }}
                      >
                        <span className={styles.commandIcon}>{cmd.icon}</span>
                        <span className={styles.commandName}>{cmd.name}</span>
                        <kbd className={styles.commandShortcut}>
                          {cmd.shortcut}
                        </kbd>
                      </motion.button>
                    );
                  })}
                </div>
              ))}

              {flatCommands.length === 0 && (
                <div className={styles.noResults}>
                  No commands found for "{search}"
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className={styles.footer}>
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Trigger button component
export const CommandPaletteTrigger = () => {
  return (
    <button
      className={styles.trigger}
      onClick={() => {
        const event = new KeyboardEvent("keydown", {
          key: "k",
          ctrlKey: true,
          bubbles: true,
        });
        window.dispatchEvent(event);
      }}
    >
      <span className={styles.triggerIcon}>⌘</span>
      <span className={styles.triggerText}>Search</span>
      <kbd className={styles.triggerKey}>⌘K</kbd>
    </button>
  );
};

export default CommandPalette;
