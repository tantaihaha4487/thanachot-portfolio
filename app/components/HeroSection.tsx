"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { animate, stagger } from "animejs";
import Image from "next/image";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/tantaihaha4487",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Modrinth",
    href: "https://modrinth.com/user/tantaihaha4487",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 512 514" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M503.16 323.56C514.55 281.47 515.32 235.91 503.2 190.76C466.57 54.2299 326.04 -26.8001 189.33 9.77991C83.8101 38.0199 11.3899 128.07 0.689941 230.47H43.99C54.29 147.33 113.74 74.7298 199.75 51.7098C306.05 23.2598 415.13 80.6699 453.17 181.38L411.03 192.65C391.64 145.8 352.57 111.45 306.3 96.8198L298.56 140.66C335.09 154.13 364.72 184.5 375.56 224.91C391.36 283.8 361.94 344.14 308.56 369.17L320.09 412.16C390.25 383.21 432.4 310.3 422.43 235.14L464.41 223.91C468.91 252.62 467.35 281.16 460.55 308.07L503.16 323.56Z" fill="currentColor" />
        <path d="M321.99 504.22C185.27 540.8 44.7501 459.77 8.11011 323.24C3.84011 307.31 1.17 291.33 0 275.46H43.27C44.36 287.37 46.4699 299.35 49.6799 311.29C53.0399 323.8 57.45 335.75 62.79 347.07L101.38 323.92C98.1299 316.42 95.39 308.6 93.21 300.47C69.17 210.87 122.41 118.77 212.13 94.7601C229.13 90.2101 246.23 88.4401 262.93 89.1501L255.19 133C244.73 133.05 234.11 134.42 223.53 137.25C157.31 154.98 118.01 222.95 135.75 289.09C136.85 293.16 138.13 297.13 139.59 300.99L188.94 271.38L174.07 231.95L220.67 184.08L279.57 171.39L296.62 192.38L269.47 219.88L245.79 227.33L228.87 244.72L237.16 267.79C237.16 267.79 253.95 285.63 253.98 285.64L277.7 279.33L294.58 260.79L331.44 249.12L342.42 273.82L304.39 320.45L240.66 340.63L212.08 308.81L162.26 338.7C187.8 367.78 226.2 383.93 266.01 380.56L277.54 423.55C218.13 431.41 160.1 406.82 124.05 361.64L85.6399 384.68C136.25 451.17 223.84 484.11 309.61 461.16C371.35 444.64 419.4 402.56 445.42 349.38L488.06 364.88C457.17 431.16 398.22 483.82 321.99 504.22Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/txntai._exec/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/thanachot.phomthong",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.gg/3R2vhgQqde",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    if (!nameRef.current) return;
    const spans = nameRef.current.querySelectorAll("span.char");
    animate(spans, {
      opacity: [0, 1],
      translateY: ["18px", "0px"],
      delay: stagger(38),
      duration: 700,
      ease: "outExpo",
    });
  }, []);

  const firstName = "Thanachot".split("").map((ch, i) => (
    <span key={`f-${i}`} className="char inline-block opacity-0">{ch}</span>
  ));
  const lastName = "Phomthong".split("").map((ch, i) => (
    <span key={`l-${i}`} className="char inline-block opacity-0">{ch}</span>
  ));

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F472B6 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)" }}
      />

      {/* Geometric overlay lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-0 w-full h-px opacity-5"
          style={{ background: "linear-gradient(90deg, transparent, #F472B6 50%, transparent)" }}
        />
        <div
          className="absolute top-2/3 left-0 w-full h-px opacity-5"
          style={{ background: "linear-gradient(90deg, transparent, #A78BFA 50%, transparent)" }}
        />
        <div
          className="absolute top-0 left-1/4 w-px h-full opacity-5"
          style={{ background: "linear-gradient(180deg, transparent, #F472B6 50%, transparent)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">

          {/* ── LEFT: Text + Socials ── */}
          <motion.div
            style={{ y: yText, opacity }}
            className="flex-1 flex flex-col items-start gap-6"
          >
            {/* Mono label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="mono-label syn-keyword">const</span>
              <span className="mono-label syn-string">"developer"</span>
              <span className="mono-label syn-comment">= tantaihaha4487</span>
            </motion.div>

            {/* Name */}
            <h1
              ref={nameRef}
              className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <div>{firstName}</div>
              <div>{lastName}</div>
            </h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col gap-1"
            >
              <span
                className="text-lg font-light tracking-wide"
                style={{ color: "#8892A4" }}
              >
                Developer · Creator · Builder
              </span>
              <span className="text-base" style={{ color: "#94A3B8", fontFamily: "var(--font-geist-sans)" }}>
                ธนโชติ พรมทอง
              </span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex gap-4 mt-2"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(244,114,182,0.15)",
                  border: "1px solid rgba(244,114,182,0.35)",
                  color: "#F472B6",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(30, 34, 42, 0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#8892A4",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                Contact
              </button>
            </motion.div>

            {/* Social Icons — centered row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-row flex-wrap justify-center gap-3 mt-2"
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="group flex items-center gap-2.5 transition-all duration-200 hover:scale-105"
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#6B7280",
                    }}
                  >
                    <span className="group-hover:text-pink-400 transition-colors duration-200 w-5 h-5">
                      {s.icon}
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Avatar ── */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 relative w-64 h-64 lg:w-80 lg:h-80"
          >
            {/* Outer wireframe ring */}
            <div
              className="absolute -inset-5 rounded-3xl opacity-20"
              style={{
                border: "1px dashed rgba(244,114,182,0.5)",
                animation: "hero-spin 20s linear infinite",
              }}
            />
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-2xl animate-pulse-ring"
              style={{ border: "1px solid rgba(244,114,182,0.25)" }}
            />

            {/* Avatar container */}
            <div
              className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(30,34,42,0.9)",
                border: "1px solid rgba(244,114,182,0.25)",
                boxShadow: "0 0 60px rgba(244,114,182,0.15), 0 0 120px rgba(244,114,182,0.07), inset 0 0 60px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="/AVATAR.jpg"
                alt="Thanachot Phomthong"
                fill
                className="object-cover"
                priority
              />

              {/* Overlay glare */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 45%)",
                }}
              />
            </div>

            {/* Corner decorations */}
            <div
              className="absolute -top-3 -right-3 w-6 h-6 opacity-60"
              style={{
                borderTop: "1px solid #F472B6",
                borderRight: "1px solid #F472B6",
              }}
            />
            <div
              className="absolute -bottom-3 -left-3 w-6 h-6 opacity-60"
              style={{
                borderBottom: "1px solid #F472B6",
                borderLeft: "1px solid #F472B6",
              }}
            />

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full flex items-center gap-2"
              style={{
                background: "rgba(30, 34, 42, 0.95)",
                border: "1px solid rgba(244,114,182,0.3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="mono-label syn-value">available</span>
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <span className="mono-label">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: "linear-gradient(180deg, rgba(244,114,182,0.5), transparent)" }}
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes hero-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
