"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Mashiro", href: "#mashiro" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "mashiro", "projects"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto relative px-4 sm:px-6 py-2 sm:py-3 rounded-full"
        style={{
          background: scrolled
            ? "rgba(30, 33, 40, 0.88)"
            : "rgba(30, 33, 40, 0.65)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          border: "1px solid rgba(244,114,182,0.18)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(244,114,182,0.12)"
            : "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full transition-colors"
              style={{
                color: active === link.href.replace("#", "")
                  ? "#F472B6"
                  : "#94A3B8",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.03em",
              }}
            >
              {active === link.href.replace("#", "") && (
                <motion.span
                  layoutId="pill-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(244,114,182,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Ping ring on scroll */}
        {scrolled && (
          <span
            className="absolute -inset-0.5 rounded-full opacity-0 animate-pulse-ring"
            style={{ border: "1px solid rgba(244,114,182,0.3)" }}
          />
        )}
      </nav>
    </div>
  );
}
