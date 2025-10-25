import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutCarousel.module.css";

const DEFAULT_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1517940310602-26535839fe37?auto=format&fit=crop&w=1200&q=80",
    alt: "Designer at a workstation",
    caption: "I Design",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Mountain trail under cloudy skies",
    caption: "I Explore",
  },
  {
    src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
    alt: "Training session at the gym",
    caption: "I Lift",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    alt: "Creative studio session",
    caption: "I Build",
  },
];

const clampOffset = (offset, total) => {
  if (total <= 1) return 0;
  if (offset > total / 2) return offset - total;
  if (offset < -total / 2) return offset + total;
  return offset;
};

const buildStyle = (offset) => {
  const distance = Math.abs(offset);
  const clamped = Math.min(distance, 2);
  const translate = offset * 160;
  const scale = offset === 0 ? 1 : 1 - clamped * 0.16;
  const baseOpacity = offset === 0 ? 1 : 0.55 - clamped * 0.15;
  const opacity = Math.min(Math.max(baseOpacity, 0.28), 1);
  const blur = clamped >= 1 ? 0.8 * clamped : 0;

  return {
    transform: 'translate3d(calc(-50% + ' + translate + 'px), 0, 0) scale(' + scale + ')',
    zIndex: 30 - Math.round(distance * 4),
    opacity,
    filter: 'blur(' + blur + 'px)',
  };
};

export default function AboutCarousel({ slides = DEFAULT_SLIDES, autoPlayInterval = 5200 }) {
  const normalizedSlides = useMemo(() => (slides?.length ? slides : DEFAULT_SLIDES), [slides]);
  const total = normalizedSlides.length;
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!autoPlayInterval || total <= 1) return undefined;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, total]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  const onTouchStart = (event) => {
    if (!event.changedTouches?.[0]) return;
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current == null || !event.changedTouches?.[0]) return;
    const delta = touchStartX.current - event.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const activeSlide = normalizedSlides[active] ?? normalizedSlides[0];

  return (
    <div className={styles.carousel}>
      <div
        className={styles.frame}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="group"
        aria-roledescription="carousel"
        aria-label="About highlights"
      >
        {normalizedSlides.map(({ src, alt }, index) => {
          const offset = clampOffset(index - active, total);
          const style = buildStyle(offset);
          const isActive = index === active;

          return (
            <div
              key={src + "-" + index}
              className={[styles.slide, isActive ? styles.isActive : ""].join(" ").trim()}
              style={style}
              aria-hidden={!isActive}
            >
              <img src={src} alt={alt} loading="lazy" />
            </div>
          );
        })}
        {total > 1 && (
          <>
            <button
              type="button"
              className={[styles.hitArea, styles.hitAreaLeft].join(" ").trim()}
              onClick={handlePrev}
              aria-label="Show previous photo"
            />
            <button
              type="button"
              className={[styles.hitArea, styles.hitAreaRight].join(" ").trim()}
              onClick={handleNext}
              aria-label="Show next photo"
            />
          </>
        )}
      </div>
      {activeSlide && (
        <p className={styles.caption} aria-live="polite">
          {activeSlide.caption ?? activeSlide.alt}
        </p>
      )}
    </div>
  );
}
