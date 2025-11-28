import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import styles from "./NavBar.module.css";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "work", label: "Work", href: "/work" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "more", label: "More", href: "/more" },
  {
    id: "cta",
    label: "Book a Call",
    href: "https://cal.com/",
    variant: "cta",
    external: true,
  },
];

const getActiveFromPath = (asPath) => {
  const [pathPart, hashPart] = asPath.split("#");
  const basePath = pathPart?.split("?")[0] || "/";
  const fragmentPath = hashPart ? basePath + "#" + hashPart : null;

  const match = NAV_ITEMS.find(
    (item) => !item.external && item.href === (fragmentPath || basePath)
  );

  if (match) {
    return match.id;
  }

  if (basePath === "/about") {
    return "about";
  }

  if (basePath === "/work") {
    return "work";
  }

  if (basePath === "/blog") {
    return "blog";
  }

  if (basePath === "/more") {
    return "more";
  }

  return "home";
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function NavBar() {
  const router = useRouter();
  const [active, setActive] = useState(() => getActiveFromPath(router.asPath));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemsRef = useRef({});
  const indicatorRef = useRef(null);

  const setItemRef = useCallback((id, el) => {
    if (el) {
      itemsRef.current[id] = el;
    } else {
      delete itemsRef.current[id];
    }
  }, []);

  useEffect(() => {
    setActive(getActiveFromPath(router.asPath));
    setMobileMenuOpen(false); // Close mobile menu on route change
  }, [router.asPath]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useIsomorphicLayoutEffect(() => {
    // Capture all nav item elements
    const navInner = document.querySelector(`.${styles.navInner}`);
    if (navInner) {
      NAV_ITEMS.forEach(({ id, external }) => {
        if (!external) {
          const linkEl = navInner.querySelector(
            `a[href="${NAV_ITEMS.find((item) => item.id === id)?.href}"]`
          );
          if (linkEl) {
            setItemRef(id, linkEl);
          }
        }
      });
    }

    const activeEl = itemsRef.current[active];
    if (activeEl && indicatorRef.current) {
      gsap.set(indicatorRef.current, {
        x: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [active, setItemRef]);

  useEffect(() => {
    const activeEl = itemsRef.current[active];
    if (activeEl && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [active]);

  return (
    <nav className={styles.navbar}>
      {/* Logo - visible on mobile */}
      <div className={styles.logo}>
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logov2.png" alt="Logo" className={styles.logoImage} />
        </Link>
      </div>

      {/* Hamburger Menu Button - visible on mobile */}
      <button
        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Items */}
      <div
        className={`${styles.navInner} ${mobileMenuOpen ? styles.navInnerOpen : ""}`}
      >
        <span ref={indicatorRef} className={styles.activeIndicator} />
        {NAV_ITEMS.map(({ id, label, variant, href, external }) => {
          const className = [
            styles.navItem,
            id === active ? styles.navItemActive : "",
            variant === "cta" ? styles.navItemCTA : "",
          ]
            .join(" ")
            .trim();

          if (external) {
            return (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                ref={(el) => setItemRef(id, el)}
                className={className}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{label}</span>
              </a>
            );
          }

          return (
            <Link
              key={id}
              href={href}
              className={className}
              onClick={(e) => {
                const target = e.currentTarget;
                setItemRef(id, target);
                setActive(id);
                setMobileMenuOpen(false);
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                setItemRef(id, target);
              }}
            >
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
