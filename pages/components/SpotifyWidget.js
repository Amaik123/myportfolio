import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/SpotifyWidget.module.css";

/**
 * Spotify Now Playing Widget
 *
 * To make this work with real Spotify data, you need to:
 * 1. Create a Spotify Developer App at https://developer.spotify.com/dashboard
 * 2. Set up an API route in pages/api/spotify.js
 * 3. Use the Spotify Web API with refresh tokens
 *
 * For now, this shows a stylish mock widget that you can connect later.
 */

const SpotifyWidget = ({
  alwaysShow = false,
  position = "bottom-right", // bottom-right, bottom-left, top-right, top-left
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    albumArt:
      "https://i.scdn.co/image/ab67616d0000b8738863bc11d2aa12b54f5aeb36",
    progress: 65,
    duration: "3:20",
  });

  // Simulated playlist for demo
  const demoTracks = [
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b8738863bc11d2aa12b54f5aeb36",
    },
    {
      name: "Starboy",
      artist: "The Weeknd, Daft Punk",
      album: "Starboy",
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b8734718e2b124f79258be7bc452",
    },
    {
      name: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt:
        "https://i.scdn.co/image/ab67616d0000b8738863bc11d2aa12b54f5aeb36",
    },
  ];

  // Rotate through demo tracks (for demonstration)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTrack((prev) => {
          const currentIndex = demoTracks.findIndex(
            (t) => t.name === prev.name
          );
          const nextIndex = (currentIndex + 1) % demoTracks.length;
          return {
            ...demoTracks[nextIndex],
            progress: 0,
            duration: "3:20",
          };
        });
      }
    }, 10000); // Change track every 10 seconds for demo

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTrack((prev) => ({
          ...prev,
          progress: prev.progress >= 100 ? 0 : prev.progress + 0.5,
        }));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const positionClasses = {
    "bottom-right": styles.bottomRight,
    "bottom-left": styles.bottomLeft,
    "top-right": styles.topRight,
    "top-left": styles.topLeft,
  };

  return (
    <motion.div
      className={`${styles.widget} ${positionClasses[position]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Collapsed view - just the icon */}
      <motion.button
        className={styles.spotifyIcon}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" className={styles.spotifyLogo}>
          <path
            fill="currentColor"
            d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
          />
        </svg>
        {isPlaying && (
          <span className={styles.playingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        )}
      </motion.button>

      {/* Expanded view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.expandedWidget}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Album art */}
            <div className={styles.albumArt}>
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.album}
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%23666" font-size="40">♪</text></svg>';
                }}
              />
              <motion.div
                className={styles.albumGlow}
                animate={{
                  opacity: isPlaying ? [0.5, 0.8, 0.5] : 0.3,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Track info */}
            <div className={styles.trackInfo}>
              <div className={styles.nowPlaying}>
                {isPlaying ? "NOW PLAYING" : "PAUSED"}
              </div>
              <div className={styles.trackName}>{currentTrack.name}</div>
              <div className={styles.artistName}>{currentTrack.artist}</div>

              {/* Progress bar */}
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${currentTrack.progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className={styles.controls}>
              <button
                className={styles.controlBtn}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>

            {/* Spotify link */}
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.spotifyLink}
            >
              Open Spotify ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SpotifyWidget;
