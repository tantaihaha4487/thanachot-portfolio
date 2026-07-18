# Cinematic Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop homepage hero with a scroll-driven photographic introduction while preserving the existing lower sections and skipping the hero below 1024px.

**Architecture:** `HeroSection` remains the client-side owner of hero motion and static hero content. A small pure visibility function gives `Navbar` deterministic desktop/mobile behavior and a built-in Node test covers the boundary rules; source-contract tests cover the responsive hero markers and project destinations.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, TypeScript 5.9.3, Framer Motion 12.35.2, Tailwind CSS 4, Node 26 test runner.

## Global Constraints

- Use the existing `public/AVATAR.jpg`; do not add or generate imagery.
- Render the cinematic hero only at viewport widths of 1024px and above.
- Hide navigation during the desktop hero and show it after the hero; keep it available below 1024px.
- Preserve the Mashiro, GitHub, Modrinth, and footer sections and their order.
- Honor `prefers-reduced-motion` with immediately usable final content and no pointer parallax.
- Do not modify the unrelated untracked `SALTYAOM_CLONE_SPEC.md`.

---

### Task 1: Define and test the navbar visibility contract

**Files:**
- Create: `app/components/hero-visibility.ts`
- Create: `tests/cinematic-hero.test.ts`

**Interfaces:**
- Produces: `shouldShowNavbar(input: { isDesktop: boolean; heroBottom: number | null }): boolean`
- Consumes: viewport mode and the cinematic hero's bottom edge in viewport pixels.

- [ ] **Step 1: Write the failing behavior test**

Create `tests/cinematic-hero.test.ts` with Node's built-in test runner. Cover mobile visibility, desktop intro hiding, desktop post-hero visibility, and missing-hero fallback:

```ts
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
  assert.match(source, /hidden lg:block/);
  assert.match(source, /href: "#mashiro"/);
  assert.match(source, /href: "#projects"/);
  assert.match(source, /href: "#mods"/);
  assert.match(source, /useReducedMotion/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/cinematic-hero.test.ts`

Expected: FAIL because `app/components/hero-visibility.ts` does not exist and the current hero lacks the cinematic contract markers.

- [ ] **Step 3: Add the pure visibility helper**

Create `app/components/hero-visibility.ts`:

```ts
export type HeroVisibilityInput = {
  isDesktop: boolean;
  heroBottom: number | null;
};

export function shouldShowNavbar({
  isDesktop,
  heroBottom,
}: HeroVisibilityInput): boolean {
  if (!isDesktop || heroBottom === null) return true;
  return heroBottom <= 0;
}
```

- [ ] **Step 4: Run the focused helper tests**

Run: `node --test --test-name-pattern="navbar" tests/cinematic-hero.test.ts`

Expected: four navbar tests PASS; the source-contract test is skipped by the name filter.

- [ ] **Step 5: Commit the contract**

```bash
git add app/components/hero-visibility.ts tests/cinematic-hero.test.ts
git commit -m "test: define cinematic hero visibility"
```

---

### Task 2: Replace the desktop hero

**Files:**
- Modify: `app/components/HeroSection.tsx`
- Modify: `app/globals.css`
- Test: `tests/cinematic-hero.test.ts`

**Interfaces:**
- Produces: an element with `id="home"` and `data-cinematic-hero`, internal destinations `#mashiro`, `#projects`, and `#mods`, and desktop-only `hidden lg:block` behavior.
- Consumes: `public/AVATAR.jpg`, Framer Motion scroll/pointer primitives, existing social URLs, and existing section IDs.

- [ ] **Step 1: Confirm the hero source-contract test still fails**

Run: `node --test tests/cinematic-hero.test.ts`

Expected: helper tests PASS and `hero source retains...` FAIL because the current source lacks `data-cinematic-hero`, `hidden lg:block`, and `useReducedMotion`.

- [ ] **Step 2: Rewrite `HeroSection` around a sticky photographic scene**

Implement these exact structural elements in `app/components/HeroSection.tsx`:

```tsx
"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const projects = [
  { eyebrow: "Project", title: "Mashiro", description: "My featured creative project", href: "#mashiro" },
  { eyebrow: "Open source", title: "GitHub", description: "Repositories and experiments", href: "#projects" },
  { eyebrow: "Minecraft", title: "Modrinth", description: "Mods built for the community", href: "#mods" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/tantaihaha4487" },
  { label: "X", href: "https://x.com/TantaiHaha" },
  { label: "Modrinth", href: "https://modrinth.com/user/tantaihaha4487" },
  { label: "Instagram", href: "https://www.instagram.com/txntai._exec/" },
  { label: "Facebook", href: "https://www.facebook.com/thanachot.phomthong" },
  { label: "Discord", href: "https://discord.gg/3R2vhgQqde" },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.18, 0.48], [1, 1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.48], [1, 2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32, 0.62], [0, 0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.32, 0.62], [0.88, 1]);
  const photoScale = useTransform(scrollYProgress, [0, 0.7], [1.1, 1.02]);
  const shadeOpacity = useTransform(scrollYProgress, [0, 0.62], [0.15, 0.56]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * -24);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * -16);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      data-cinematic-hero
      className="relative hidden h-[175dvh] lg:block"
      onPointerMove={onPointerMove}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-slate-200 text-white">
        <motion.div className="absolute -inset-8" style={{ x: prefersReducedMotion ? 0 : smoothX, y: prefersReducedMotion ? 0 : smoothY, scale: prefersReducedMotion ? 1.02 : photoScale }}>
          <Image src="/AVATAR.jpg" alt="Thanachot Phomthong seated outdoors" fill priority sizes="100vw" className="object-cover object-[center_48%]" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" style={{ opacity: prefersReducedMotion ? 0.56 : shadeOpacity }} />
        <motion.p aria-hidden className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-none tracking-[-0.08em] mix-blend-overlay" style={{ opacity: prefersReducedMotion ? 0 : introOpacity, scale: prefersReducedMotion ? 2 : introScale }}>
          Thanachot
        </motion.p>
        <motion.div className="relative z-10 flex h-full max-w-7xl items-center px-12 xl:px-20" style={{ opacity: prefersReducedMotion ? 1 : contentOpacity, scale: prefersReducedMotion ? 1 : contentScale }}>
          <div className="w-full max-w-3xl">
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-white/70">Developer · Creator · Builder</p>
            <h1 className="font-serif text-7xl font-medium leading-none xl:text-8xl">Thanachot<br />Phomthong</h1>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {projects.map((project) => (
                <a key={project.href} href={project.href} className="cinematic-project-card rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/55">{project.eyebrow}</span>
                  <strong className="mt-5 block font-serif text-2xl font-medium">{project.title}</strong>
                  <span className="mt-1 block text-xs leading-5 text-white/65">{project.description}</span>
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  aria-label={social.label}
                  className="text-xs uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div aria-hidden className="absolute bottom-10 left-12 z-20 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/65" style={{ opacity: prefersReducedMotion ? 0 : introOpacity }}>
          <span className="h-8 w-px animate-pulse bg-white/70" /> Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
```

Retain all six existing social destinations in module-level data and render them after the project grid using their current SVG icons or equivalent accessible text/icon links. Every link must retain `target="_blank"`, `rel="noopener noreferrer"`, `title`, and an accessible label.

- [ ] **Step 3: Add focused cinematic styles**

Append to `app/globals.css`:

```css
.cinematic-project-card {
  transform: translateY(0);
  transition:
    transform 700ms cubic-bezier(.16, 1, .3, 1),
    background-color 700ms cubic-bezier(.16, 1, .3, 1),
    border-color 700ms cubic-bezier(.16, 1, .3, 1);
}

.cinematic-project-card:hover {
  transform: translateY(-6px);
  background-color: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  .cinematic-project-card {
    transition: none;
  }
}
```

- [ ] **Step 4: Run the contract test, lint, and inspect the diff**

Run: `node --test tests/cinematic-hero.test.ts && npm run lint && git diff --check`

Expected: all tests PASS, ESLint exits 0, and diff check emits no errors.

- [ ] **Step 5: Commit the hero**

```bash
git add app/components/HeroSection.tsx app/globals.css tests/cinematic-hero.test.ts
git commit -m "feat: add cinematic desktop hero"
```

---

### Task 3: Reveal the navbar after the hero

**Files:**
- Modify: `app/components/Navbar.tsx`
- Modify: `app/globals.css`
- Test: `tests/cinematic-hero.test.ts`

**Interfaces:**
- Consumes: `shouldShowNavbar`, `[data-cinematic-hero]`, and the `(min-width: 1024px)` media query.
- Produces: a navbar that is non-visible and non-interactive during the desktop hero, visible after its bottom reaches the viewport top, and always available when the hero is skipped.

- [ ] **Step 1: Add a failing navbar source-contract test**

Append to `tests/cinematic-hero.test.ts`:

```ts
test("navbar consumes the cinematic visibility contract", async () => {
  const source = await readFile("app/components/Navbar.tsx", "utf8");
  assert.match(source, /shouldShowNavbar/);
  assert.match(source, /data-cinematic-hero/);
  assert.match(source, /cinematic-navbar/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test --test-name-pattern="navbar consumes" tests/cinematic-hero.test.ts`

Expected: FAIL because `Navbar.tsx` does not yet import the helper or expose the cinematic navbar marker.

- [ ] **Step 3: Integrate visibility state into `Navbar`**

Import `shouldShowNavbar`, add `const [visible, setVisible] = useState(false)`, and extend the existing scroll effect with this synchronization:

```tsx
const media = window.matchMedia("(min-width: 1024px)");

const syncVisibility = () => {
  const hero = document.querySelector<HTMLElement>("[data-cinematic-hero]");
  setVisible(
    shouldShowNavbar({
      isDesktop: media.matches,
      heroBottom: hero?.getBoundingClientRect().bottom ?? null,
    }),
  );
};

const onScroll = () => {
  setScrolled(window.scrollY > 50);
  syncVisibility();
  // Retain the current active-section loop unchanged.
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", syncVisibility, { passive: true });
media.addEventListener("change", syncVisibility);

return () => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", syncVisibility);
  media.removeEventListener("change", syncVisibility);
};
```

Apply the visibility state to the outer fixed container:

```tsx
<div
  aria-hidden={!visible}
  className="cinematic-navbar fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
  style={{
    opacity: visible ? 1 : 0,
    visibility: visible ? "visible" : "hidden",
    transition: "opacity 500ms cubic-bezier(.16, 1, .3, 1), visibility 500ms",
  }}
>
```

Set the inner navigation's `pointerEvents` to `visible ? "auto" : "none"` so hidden links cannot receive pointer input.

- [ ] **Step 4: Guarantee mobile visibility before and after hydration**

Append to `app/globals.css`:

```css
@media (max-width: 1023px) {
  .cinematic-navbar {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .cinematic-navbar nav {
    pointer-events: auto !important;
  }
}
```

- [ ] **Step 5: Run focused and full verification**

Run: `node --test tests/cinematic-hero.test.ts && npm run lint && npm run build && git diff --check`

Expected: all six tests PASS, lint exits 0, Next production build exits 0, and diff check emits no errors.

- [ ] **Step 6: Commit the navbar integration**

```bash
git add app/components/Navbar.tsx app/globals.css tests/cinematic-hero.test.ts
git commit -m "feat: reveal navigation after cinematic hero"
```

---

### Task 4: Browser-level acceptance and final verification

**Files:**
- Modify only if an acceptance check exposes a defect in the files above.

**Interfaces:**
- Consumes: the completed hero and navbar behavior.
- Produces: verification evidence at desktop, mobile, and reduced-motion settings.

- [ ] **Step 1: Start the development server**

Run: `npm run dev`

Expected: Next.js reports a local URL and serves `/` without runtime errors.

- [ ] **Step 2: Verify desktop behavior**

At a 1440×900 viewport, confirm the initial giant wordmark, photographic cover crop, scroll reveal, project cards, social links, and hidden navbar. Scroll past the hero and confirm the navbar appears and the existing sections remain ordered Mashiro → GitHub → Modrinth → footer.

- [ ] **Step 3: Verify mobile and reduced motion**

At a 390×844 viewport, confirm the hero consumes zero layout height and navigation remains visible. At desktop width with reduced motion enabled, confirm the final identity panel is immediately visible and pointer movement does not move the photograph.

- [ ] **Step 4: Re-run the completion gate**

Run: `node --test tests/cinematic-hero.test.ts && npm run lint && npm run build && git status --short`

Expected: all tests PASS, lint and build exit 0, and status shows only the pre-existing untracked `SALTYAOM_CLONE_SPEC.md` plus any intentionally uncommitted plan document.
