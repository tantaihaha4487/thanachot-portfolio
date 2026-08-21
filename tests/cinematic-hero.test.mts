import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";

import { heroCards } from "../app/lib/site-content.ts";
import { shouldShowNavbar } from "../app/components/hero-visibility.ts";

test("navbar stays available when the desktop hero is skipped", () => {
  assert.equal(shouldShowNavbar({ isDesktop: false, heroBottom: 900 }), true);
});

test("navbar is hidden while the desktop hero remains in view", () => {
  assert.equal(shouldShowNavbar({ isDesktop: true, heroBottom: 1 }), false);
});

test("navbar appears once the desktop hero has been passed", () => {
  assert.equal(shouldShowNavbar({ isDesktop: true, heroBottom: 0 }), true);
});

test("navbar remains usable if the hero is missing", () => {
  assert.equal(shouldShowNavbar({ isDesktop: true, heroBottom: null }), true);
});

test("hero keeps a stable server fallback and only loads motion when eligible", async () => {
  const gate = await readFile("app/components/HeroSection.tsx", "utf8");

  assert.match(gate, /data-cinematic-hero/);
  assert.match(gate, /hidden h-\[175dvh\] lg:block/);
  assert.match(gate, /StaticCinematicHero/);
  assert.match(gate, /data-static-cinematic-hero/);
  assert.match(gate, /matchMedia\("\(min-width: 1024px\)"\)/);
  assert.match(gate, /prefers-reduced-motion: reduce/);
  assert.match(gate, /import\("\.\/CinematicHero"\)/);
  assert.doesNotMatch(gate, /from "framer-motion"/);
});

test("hero navigation targets resolve to rendered sections", () => {
  const renderedIds = new Set([
    "home",
    "about",
    "projects",
    "mods",
    "photography",
    "mashiro",
  ]);

  for (const card of heroCards) {
    assert.equal(renderedIds.has(card.href.slice(1)), true, card.href);
  }
});

test("cinematic module retains scroll, pointer, and reduced-motion behavior", async () => {
  const source = await readFile("app/components/CinematicHero.tsx", "utf8");
  const content = await readFile("app/components/HeroContent.tsx", "utf8");

  assert.match(source, /from "framer-motion"/);
  assert.match(source, /useReducedMotion/);
  assert.match(source, /target: heroRef/);
  assert.match(source, /onPointerMove/);
  assert.match(source, /pointerEvents: prefersReducedMotion/);
  assert.match(source, /cinematic-intro/);
  assert.match(source, /cinematic-content/);
  assert.match(content, /data-cinematic-socials/);
  assert.match(content, /href="#about"/);
  assert.doesNotMatch(source, /priority/);
  assert.doesNotMatch(source, /next\/image/);
});

test("hero imagery is CSS-gated to desktop without HTML preloads", async () => {
  await access("public/images/school-bench-hero.webp");
  await access("public/images/thanachot-portrait-cutout.webp");

  const gate = await readFile("app/components/HeroSection.tsx", "utf8");
  const animated = await readFile("app/components/CinematicHero.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(styles, /@media \(min-width: 1024px\) \{[\s\S]*?school-bench-hero\.webp/);
  assert.match(styles, /thanachot-portrait-cutout\.webp/);
  assert.match(styles, /\.cinematic-hero-background[\s\S]*?filter: blur\(10px\)/);
  assert.match(animated, /cinematic-portrait/);
  assert.match(
    animated,
    /const portraitX = useTransform\(scrollYProgress, \[0, 0\.42\], \[0, 160\]\);/,
  );
  assert.doesNotMatch(`${gate}\n${animated}`, /<Image|priority/);
});

test("reduced motion has a static final-content fallback", async () => {
  const gate = await readFile("app/components/HeroSection.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(gate, /StaticCinematicHero/);
  assert.match(styles, /\.cinematic-intro\s*\{\s*display: none !important;/);
  assert.match(
    styles,
    /\.cinematic-content\s*\{[\s\S]*?opacity: 1 !important;/,
  );
});

test("navbar consumes the cinematic visibility contract", async () => {
  const source = await readFile("app/components/Navbar.tsx", "utf8");
  assert.match(source, /shouldShowNavbar/);
  assert.match(source, /data-cinematic-hero/);
  assert.match(source, /cinematic-navbar/);
});
