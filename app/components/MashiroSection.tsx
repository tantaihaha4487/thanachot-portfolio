"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";

const traits = [
  { key: "calm", label: "Calm & Composed", desc: "No emotional pressure, relaxed confidence" },
  { key: "strategic", label: "Strategic Negotiator", desc: "Patient, logical, graceful under pressure" },
  { key: "narrative", label: "Narrative Dialogue", desc: "Stage-direction style *leans back* moments" },
  { key: "builder", label: "Disciplined Builder", desc: "Knows when to walk away, builds the system" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function MashiroSection() {
  return (
    <section id="mashiro" className="relative section-pad overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="mono-label syn-comment">// section_02</span>
            <span className="w-12 h-px opacity-20" style={{ background: "#F472B6" }} />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Project{" "}
            <span style={{ color: "#F472B6" }}>Mashiro</span>
          </h2>
        </motion.div>

        {/* Main card */}
        <TiltCard
          className="glass-pink rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          maxTilt={6}
          style={{ boxShadow: "0 4px 80px rgba(0,0,0,0.4)" }}
        >
          {/* Corner wireframe accents */}
          <div
            className="absolute top-0 left-0 w-16 h-16 pointer-events-none opacity-40"
            style={{
              borderTop: "1px solid #F472B6",
              borderLeft: "1px solid #F472B6",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none opacity-40"
            style={{
              borderBottom: "1px solid #F472B6",
              borderRight: "1px solid #F472B6",
            }}
          />

          <div className="flex flex-col lg:flex-row">
            {/* ── LEFT: Character image ── */}
            <div
              className="flex-shrink-0 w-full lg:w-72 xl:w-80 h-96 sm:h-80 lg:h-auto lg:min-h-[420px] flex items-end justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r"
              style={{
                background: "linear-gradient(180deg, rgba(40,44,51,0.2) 0%, rgba(244,114,182,0.06) 100%)",
                borderColor: "rgba(244,114,182,0.12)",
              }}
            >
              {/* Dot grid overlay */}
              <div className="absolute inset-0 dot-grid opacity-30" />

              <div className="relative z-10 w-full h-full">
                <Image
                  src="/mashiro.png"
                  alt="Mashiro"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Character name badge */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 z-20"
                style={{
                  background: "rgba(30, 34, 42, 0.95)",
                  border: "1px solid rgba(244,114,182,0.3)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <span
                  className="mono-label"
                  style={{ color: "#F472B6", letterSpacing: "0.09em" }}
                >
                  天明白 · Mashiro
                </span>
              </div>
            </div>

            {/* ── RIGHT: Description ── */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col gap-6 sm:gap-8">
              {/* Status & tags */}
              <FadeUp delay={0}>
                <div className="flex flex-wrap gap-2">
                  {["AI Persona", "Prompt Engineering", "Communication Archetype", "v1.0"].map((tag) => (
                    <span
                      key={tag}
                      className="mono-label px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(244,114,182,0.08)",
                        border: "1px solid rgba(244,114,182,0.2)",
                        color: "#F472B6",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeUp>

              {/* Description */}
              <FadeUp delay={0.1}>
                <div className="flex flex-col gap-4">
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#C4CDDA" }}
                  >
                    Mashiro is an AI communication persona — a{" "}
                    <span style={{ color: "#F472B6" }}>prompt-engineering archetype</span>{" "}
                    built on calm confidence and strategic restraint. Named after the Japanese
                    for <span style={{ color: "#C084FC" }}>"pure white"</span>, Mashiro
                    embodies the builder&apos;s mindset: disciplined, respectful, and never
                    chasing the deal.
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#8892A4" }}
                  >
                    Used in prompt engineering, negotiation simulation, and system instruction
                    design — Mashiro represents a communication style that acknowledges
                    progress, validates both sides, and makes final reasonable requests
                    with graceful exits.
                  </p>
                </div>
              </FadeUp>

              {/* Traits grid */}
              <FadeUp delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {traits.map((t) => (
                    <div
                      key={t.key}
                      className="p-4 rounded-xl transition-colors duration-200 hover:bg-white/5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div
                        className="mono-label mb-1"
                        style={{ color: "#F472B6" }}
                      >
                        → {t.label}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: "#6B7280" }}
                      >
                        {t.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Philosophy quote */}
              <FadeUp delay={0.3}>
                <div
                  className="relative pl-4 py-1"
                  style={{ borderLeft: "2px solid rgba(244,114,182,0.4)" }}
                >
                  <p
                    className="text-sm italic leading-relaxed"
                    style={{ color: "#8892A4" }}
                  >
                    <span className="syn-comment">// philosophy</span>
                    <br />
                    &quot;You proved your point. You&apos;re the kind of builder who doesn&apos;t
                    chase the deal.{" "}
                    <span style={{ color: "#E2E8F0" }}>You build the system instead.</span>&quot;
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
