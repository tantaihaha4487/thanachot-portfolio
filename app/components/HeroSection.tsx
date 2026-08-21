"use client";

import type { ComponentType, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import HeroContent from "./HeroContent";

type CinematicHeroComponent = ComponentType<{
  heroRef: RefObject<HTMLElement | null>;
}>;

function StaticCinematicHero() {
  return (
    <div
      data-static-cinematic-hero
      className="sticky top-0 h-dvh overflow-hidden bg-slate-200 text-white"
    >
      <div
        aria-hidden="true"
        className="cinematic-hero-background absolute -inset-8"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent opacity-[0.58]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="cinematic-portrait pointer-events-none absolute inset-0 z-20"
      >
        <div className="cinematic-hero-portrait-layer absolute -inset-8" />
      </div>
      <div className="cinematic-content relative z-30 flex h-full max-w-7xl items-center px-12 xl:px-20">
        <HeroContent />
      </div>
      <div className="absolute bottom-7 right-8 z-20 font-serif text-sm italic text-white/55">
        ธนโชติ พรมทอง
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [AnimatedHero, setAnimatedHero] =
    useState<CinematicHeroComponent | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let cancelled = false;

    const loadForEligibleViewport = () => {
      if (!desktop.matches || reducedMotion.matches || AnimatedHero) return;

      void import("./CinematicHero").then((module) => {
        if (!cancelled && desktop.matches && !reducedMotion.matches) {
          setAnimatedHero(() => module.default);
        }
      });
    };

    loadForEligibleViewport();
    desktop.addEventListener("change", loadForEligibleViewport);
    reducedMotion.addEventListener("change", loadForEligibleViewport);

    return () => {
      cancelled = true;
      desktop.removeEventListener("change", loadForEligibleViewport);
      reducedMotion.removeEventListener("change", loadForEligibleViewport);
    };
  }, [AnimatedHero]);

  return (
    <section
      id="home"
      ref={heroRef}
      data-cinematic-hero
      className="relative hidden h-[175dvh] lg:block"
    >
      {AnimatedHero ? (
        <AnimatedHero heroRef={heroRef} />
      ) : (
        <StaticCinematicHero />
      )}
    </section>
  );
}
