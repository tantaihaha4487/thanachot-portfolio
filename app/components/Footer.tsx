"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";

const socials = [
  { label: "GitHub", href: "https://github.com/tantaihaha4487" },
  { label: "Modrinth", href: "https://modrinth.com/user/tantaihaha4487" },
  { label: "Instagram", href: "https://www.instagram.com/txntai._exec/" },
  { label: "Facebook", href: "https://www.facebook.com/thanachot.phomthong" },
  { label: "Discord", href: "https://discord.gg/3R2vhgQqde" },
];

export default function Footer() {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;
    const chars = quoteRef.current.querySelectorAll(".q-char");
    animate(chars, {
      opacity: [0, 1],
      delay: stagger(30, { start: 600 }),
      duration: 400,
      ease: "outQuad",
    });
  }, []);

  return (
    <footer
      id="contact"
      className="relative section-pad overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 dot-grid opacity-40 pointer-events-none"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-3xl opacity-5 pointer-events-none rounded-full"
        style={{ background: "radial-gradient(ellipse, #F472B6 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center gap-8 sm:gap-12 text-center">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-8 h-px opacity-20" style={{ background: "#F472B6" }} />
          <span className="mono-label syn-comment">// Footer</span>
          <span className="w-8 h-px opacity-20" style={{ background: "#F472B6" }} />
        </motion.div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative glass-pink rounded-2xl px-6 sm:px-10 py-8 sm:py-10 w-full max-w-2xl"
          style={{
            boxShadow: "0 4px 60px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(244,114,182,0.1)",
          }}
        >
          {/* Wireframe corners */}
          <div
            className="absolute top-0 left-0 w-10 h-10"
            style={{ borderTop: "1px solid rgba(244,114,182,0.5)", borderLeft: "1px solid rgba(244,114,182,0.5)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-10 h-10"
            style={{ borderBottom: "1px solid rgba(244,114,182,0.5)", borderRight: "1px solid rgba(244,114,182,0.5)" }}
          />

          <div className="mono-label syn-comment mb-4">// quote</div>

          {/* Animated quote */}
          <div ref={quoteRef}>
            <blockquote
              className="text-xl sm:text-2xl lg:text-3xl font-light leading-snug"
              style={{ color: "#E2E8F0", fontFamily: "var(--font-geist-sans)" }}
            >
              {`"Fake it until you make it."`
                .split("")
                .map((ch, i) => (
                  <span
                    key={i}
                    className="q-char opacity-0 inline-block"
                    style={{ whiteSpace: ch === " " ? "pre" : undefined }}
                  >
                    {ch}
                  </span>
                ))}
            </blockquote>
          </div>

          <div
            className="mt-4 mono-label"
            style={{ color: "#505D6D" }}
          >
            — unknown
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#505D6D",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#F472B6";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(244,114,182,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#505D6D";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className="mono-label text-xs sm:text-sm"
            style={{ color: "#6B7280" }}
          >
            Built with Next.js · Framer Motion · Tailwind
          </div>
          <div
            className="mono-label text-xs sm:text-sm"
            style={{ color: "#6B7280" }}
          >
            © {new Date().getFullYear()} Thanachot Phomthong · tantaihaha4487
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
