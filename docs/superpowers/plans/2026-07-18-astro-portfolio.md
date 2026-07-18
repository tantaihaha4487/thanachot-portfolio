# Astro Portfolio Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Next.js site with a static, photography-led Astro portfolio for Thanachot.

**Architecture:** Astro renders a single static page from typed content through focused `.astro` components. Scoped CSS owns the editorial layouts; a small vanilla TypeScript controller progressively enhances only the desktop hero. Astro's image pipeline produces responsive derivatives from local source photography.

**Tech Stack:** Astro 7.x, strict TypeScript, `@astrojs/sitemap`, Vitest, Playwright, ESLint, npm, Node.js >=22.12.0.

## Global Constraints

- Preserve `SALTYAOM_CLONE_SPEC.md`; never add, modify, or delete it.
- Use exactly three projects, six visible social links, five biography paragraphs, and one semantic `h1`.
- Do not add remote fonts, runtime APIs, analytics, dark mode, navigation, cursor glow, dot grids, or tilt cards.
- Omit gallery sections until seven distinct user photographs are supplied and approved.
- Keep all final content usable with JavaScript disabled and with reduced motion enabled.
- Do not merge to `main` until Preview, gallery, Lighthouse, and production-domain gates pass.

---

### Task 1: Static Astro foundation and contract tests

**Files:**
- Replace: `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs`
- Create: `astro.config.ts`, `src/env.d.ts`, `vitest.config.ts`, `tests/content.test.ts`
- Remove after replacement: Next.js-only configuration and application files

**Interfaces:**
- Produces npm scripts `dev`, `build`, `preview`, `lint`, `check`, `test`, and `test:e2e`.
- Produces `PortfolioContent`, `ProjectLink`, and gallery record types from `src/data/portfolio.ts`.

- [ ] **Step 1: Write the content-contract tests**

Assert exact identity and biography copy, three unique valid projects, six unique HTTPS socials, five `sameAs` entries, no SaltyAom asset URL, and empty interim galleries.

- [ ] **Step 2: Run the test and verify RED**

Run `npm test -- tests/content.test.ts`; expect failure because the Astro test runner and content module do not exist.

- [ ] **Step 3: Replace the package foundation**

Pin Astro 7.x-compatible dependencies, require Node `>=22.12.0`, commit npm's lockfile, enable strict TypeScript, and configure Astro's official sitemap integration with `site: 'https://thanachot.xyz'`.

- [ ] **Step 4: Implement the typed content module**

Create `src/data/portfolio.ts` with the exact approved strings and URLs. Model project links as `` `https://${string}` | `#${string}` `` and gallery entries with `ImageMetadata`, alt, crop position, and slot.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run `npm test -- tests/content.test.ts`; expect all content-contract tests to pass.

### Task 2: SEO shell and crawlable static page

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/components/Metadata.astro`, `src/pages/index.astro`, `src/pages/404.astro`, `public/robots.txt`, `public/site.webmanifest`, `vercel.json`
- Test: `tests/seo.test.ts`, `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- `BaseLayout` accepts `title`, `description`, `canonical`, `image`, and optional `noindex` props.
- `Metadata` emits canonical, Open Graph, X, favicon, manifest, and JSON-LD metadata.

- [ ] **Step 1: Write failing SEO tests**

Assert the exact title/description/canonical, five-entry `sameAs`, Thailand nationality, correct X creator, one `h1`, robots sitemap reference, internal sitemap URLs, and no-index 404.

- [ ] **Step 2: Run tests and verify RED**

Run the Vitest SEO suite and the focused Playwright metadata scenario; expect missing pages and metadata.

- [ ] **Step 3: Implement the layout and metadata**

Render an English document with canonical cards and a `ProfilePage` JSON-LD object. Keep every link as a normal anchor.

- [ ] **Step 4: Add crawl controls and redirect**

Create the robots, manifest, 404, and host-conditioned permanent Vercel redirect without an Astro server adapter.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run `npm test -- tests/seo.test.ts` and the focused Playwright metadata scenario.

### Task 3: Responsive editorial content

**Files:**
- Create: `src/components/Hero.astro`, `ProjectTiles.astro`, `SocialLinks.astro`, `ProfileStory.astro`, `Gallery.astro`, `SectionSeparator.astro`, `Footer.astro`, `src/styles/global.css`
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- All components consume slices of `portfolio` and render static semantic HTML.
- `Gallery` returns no markup for an empty entry list.

- [ ] **Step 1: Write failing responsive and accessibility scenarios**

At 390×844, 768×1024, 1024×768, and 1440×900, assert the desktop hero breakpoint, story ordering, visible projects/socials, focusable links, one `h1`, and no horizontal overflow.

- [ ] **Step 2: Run Playwright and verify RED**

Run the focused responsive suite; expect missing regions and breakpoint behavior.

- [ ] **Step 3: Implement components and scoped styling**

Build the 175dvh sticky desktop hero and the mobile/tablet profile-first layout with system typography, white editorial body, thin rules, and restrained link colors.

- [ ] **Step 4: Run Playwright and verify GREEN**

Run the focused responsive suite at every required local viewport.

### Task 4: Progressive desktop hero motion

**Files:**
- Create: `src/scripts/hero-controller.ts`
- Modify: `src/components/Hero.astro`
- Test: `tests/hero-controller.test.ts`, `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Export `createHeroController(root: HTMLElement): { destroy(): void }`.
- The controller writes only documented CSS custom properties and has deterministic teardown.

- [ ] **Step 1: Write controller and browser tests**

Assert no initialization below 1024px or under reduced motion, one scheduled animation frame for batched pointer/scroll updates, static final content on initialization failure, and teardown of listeners/frame work.

- [ ] **Step 2: Run tests and verify RED**

Run controller tests and reduced-motion/JavaScript-disabled browser scenarios; expect the controller module and behavior to be absent.

- [ ] **Step 3: Implement minimal progressive enhancement**

Use passive pointer/scroll listeners, one `requestAnimationFrame` loop, CSS variables, `matchMedia`, and Astro lifecycle cleanup. Never toggle link availability or default content visibility.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run controller tests plus desktop, reduced-motion, and JavaScript-disabled Playwright scenarios.

### Task 5: Local image pipeline

**Files:**
- Create: `src/assets/portfolio/avatar-master.jpg`, `hero-background.jpg`, `hero-foreground.png`, `profile-portrait.jpg`
- Create: `public/social-card.jpg` and the favicon/manifest icon family
- Modify: image-consuming Astro components
- Test: `tests/images.test.ts`, `tests/e2e/portfolio.spec.ts`

**Interfaces:**
- Astro components use imported `ImageMetadata` with explicit width/height and responsive AVIF/WebP output.
- Direct metadata files use stable public paths.

- [ ] **Step 1: Write failing image tests**

Assert every content image is local, has descriptive alt text, emits explicit dimensions and modern sources, and the social card is exactly 1200×630.

- [ ] **Step 2: Run tests and verify RED**

Run the image suite; expect derivatives and rendered image metadata to be absent.

- [ ] **Step 3: Derive and review image assets**

Copy the master source losslessly, create non-generative crops/plates without facial or body alteration, create a transparent presentation layer where feasible, and inspect every derivative before wiring it into the page.

- [ ] **Step 4: Implement responsive image markup**

Use Astro `Picture`/`Image` with explicit dimensions, sizes, loading priority, alt text, and approved crop positions.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run image tests and browser image scenarios, then inspect screenshots at all required viewports.

### Task 6: Legacy cleanup and full verification

**Files:**
- Remove: `app/`, Next.js-only public assets, `next.config.ts`, `postcss.config.mjs`, `proxy.ts`, `next-env.d.ts`
- Update: `README.md`

**Interfaces:**
- Final repository is an npm-managed static Astro project with no Next.js runtime or React dependency.

- [ ] **Step 1: Add failing absence/build assertions**

Assert the dependency graph and generated output contain no Next.js, React, SaltyAom assets, external font requests, external API calls, or unsupported schema types.

- [ ] **Step 2: Run assertions and verify RED**

Run the repository-policy suite; expect legacy files/dependencies to fail it.

- [ ] **Step 3: Remove legacy files and update operator docs**

Delete only tracked Next.js artifacts, retain approved favicon assets and `SALTYAOM_CLONE_SPEC.md`, and document Node/npm commands plus static Vercel deployment.

- [ ] **Step 4: Run complete local verification**

Run `npm run lint`, `npm run check`, `npm test`, `npm run build`, and `npm run test:e2e`. Confirm a clean console and review screenshots at 390×844, 768×1024, 1024×768, 1440×900, and 1920×1080.

- [ ] **Step 5: Push for external acceptance**

Push `feat/astro-portfolio` without force. Record Preview, Lighthouse, apex/www, robots, sitemap, social-card, and gallery gates as pending until independently verified.

## Self-review record

- Spec coverage: identity, exact copy, breakpoints, static fallback, typed data, SEO, images, redirects, tests, preservation, and deferred gates each map to a task.
- Placeholder scan: no deferred implementation placeholders are present; only the explicitly approved external/gallery gates remain pending.
- Type consistency: the content, layout, metadata, gallery, and controller interfaces use the same names in their producing and consuming tasks.
- Scope control: the plan excludes every deferred product feature and does not authorize merging to `main`.
