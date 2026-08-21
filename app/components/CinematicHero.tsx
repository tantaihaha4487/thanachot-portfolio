"use client";

import type { RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroContent from "./HeroContent";

export default function CinematicHero({
  heroRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20 });
  const portraitPointerX = useTransform(smoothX, (value) => value * -0.35);
  const portraitPointerY = useTransform(smoothY, (value) => value * -0.35);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const introOpacity = useTransform(scrollYProgress, (progress) =>
    progress <= 0.14
      ? 1
      : progress >= 0.32
        ? 0
        : 1 - (progress - 0.14) / 0.18,
  );
  const introScale = useTransform(scrollYProgress, [0, 0.32], [1, 2]);
  const contentOpacity = useTransform(scrollYProgress, (progress) =>
    progress <= 0.18
      ? 0
      : progress >= 0.42
        ? 1
        : (progress - 0.18) / 0.24,
  );
  const contentScale = useTransform(scrollYProgress, [0.18, 0.42], [0.88, 1]);
  const contentX = useTransform(scrollYProgress, [0.18, 0.42], [-72, 0]);
  const contentPointerEvents = useTransform(
    scrollYProgress,
    [0.32, 0.42],
    ["none", "auto"],
  );
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.02]);
  const portraitX = useTransform(scrollYProgress, [0, 0.42], [0, 160]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.42], [1, 1.02]);
  const shadeOpacity = useTransform(scrollYProgress, [0, 0.42], [0.14, 0.58]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * -24);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * -16);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="sticky top-0 h-dvh overflow-hidden bg-slate-200 text-white"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        aria-hidden="true"
        className="cinematic-hero-background absolute -inset-8"
        style={{
          x: prefersReducedMotion ? 0 : smoothX,
          y: prefersReducedMotion ? 0 : smoothY,
          scale: prefersReducedMotion ? 1.02 : photoScale,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent"
        style={{ opacity: prefersReducedMotion ? 0.58 : shadeOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />

      <motion.p
        aria-hidden="true"
        className="cinematic-intro absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-none tracking-[-0.08em] text-white mix-blend-overlay"
        style={{
          opacity: prefersReducedMotion ? 0 : introOpacity,
          scale: prefersReducedMotion ? 2 : introScale,
        }}
      >
        Thanachot
      </motion.p>

      <motion.div
        aria-hidden="true"
        className="cinematic-portrait pointer-events-none absolute inset-0 z-20"
        style={{
          x: prefersReducedMotion ? 0 : portraitX,
          scale: prefersReducedMotion ? 1 : portraitScale,
        }}
      >
        <motion.div
          className="cinematic-hero-portrait-layer absolute -inset-8"
          style={{
            x: prefersReducedMotion ? 0 : portraitPointerX,
            y: prefersReducedMotion ? 0 : portraitPointerY,
          }}
        />
      </motion.div>

      <motion.div
        className="cinematic-content relative z-30 flex h-full max-w-7xl items-center px-12 xl:px-20"
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          scale: prefersReducedMotion ? 1 : contentScale,
          x: prefersReducedMotion ? 0 : contentX,
          pointerEvents: prefersReducedMotion ? "auto" : contentPointerEvents,
        }}
      >
        <HeroContent />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 left-12 z-20 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/65 xl:left-20"
        style={{ opacity: prefersReducedMotion ? 0 : introOpacity }}
      >
        <span className="cinematic-scroll-line h-8 w-px bg-white/70" />
        Scroll to explore
      </motion.div>

      <div className="absolute bottom-7 right-8 z-20 font-serif text-sm italic text-white/55">
        ธนโชติ พรมทอง
      </div>
    </div>
  );
}
