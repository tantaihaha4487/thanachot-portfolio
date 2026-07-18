import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";

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

test("hero source retains the responsive and navigation contract", async () => {
  const source = await readFile("app/components/HeroSection.tsx", "utf8");
  assert.match(source, /data-cinematic-hero/);
  assert.match(source, /hidden h-\[175dvh\] lg:block/);
  assert.match(source, /href: "#mashiro"/);
  assert.match(source, /href: "#projects"/);
  assert.match(source, /href: "#mods"/);
  assert.match(source, /useReducedMotion/);
  assert.match(source, /const \{ scrollY \} = useScroll\(\);/);
});

test("navbar consumes the cinematic visibility contract", async () => {
  const source = await readFile("app/components/Navbar.tsx", "utf8");
  assert.match(source, /shouldShowNavbar/);
  assert.match(source, /data-cinematic-hero/);
  assert.match(source, /cinematic-navbar/);
});

test("reduced motion has a CSS fallback for final hero content", async () => {
  const hero = await readFile("app/components/HeroSection.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");
  assert.match(hero, /cinematic-intro/);
  assert.match(hero, /cinematic-content/);
  assert.match(styles, /\.cinematic-intro\s*\{\s*display: none !important;/);
  assert.match(
    styles,
    /\.cinematic-content\s*\{[\s\S]*?opacity: 1 !important;/,
  );
});

test("hero layers the supplied portrait cutout above a blurred background", async () => {
  await access("public/AVARTAR_object.png");
  const source = await readFile("app/components/HeroSection.tsx", "utf8");
  assert.match(source, /src="\/AVARTAR_object\.png"/);
  assert.match(source, /cinematic-portrait/);
  assert.match(source, /blur-\[10px\]/);
  assert.match(
    source,
    /const portraitX = useTransform\(scrollY, \[0, 480\], \[0, 160\]\);/,
  );
});
