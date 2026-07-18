import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

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
});
