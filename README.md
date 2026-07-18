# Thanachot Portfolio

Static, photography-led portfolio for Thanachot Phomthong, built with Astro 7 and strict TypeScript.

## Requirements

- Node.js 22.12.0 or newer
- npm (the committed `package-lock.json` is authoritative)

## Local development

```bash
npm install
npm run dev
```

Astro prints the local URL and manages the development process. Use `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop` to inspect or stop that process.

## Verification

```bash
npm run lint
npm run check
npm test
npm run build
npm run test:e2e
```

Playwright uses system Chromium at `/usr/bin/chromium` in this development environment. Update `playwright.config.ts` when running on a machine with a different browser path.

## Content and images

Portfolio copy and destinations live in `src/data/portfolio.ts`. Transformable source photographs live in `src/assets/portfolio`; Astro produces responsive AVIF/WebP output at build time. Stable crawler and card assets live in `public`.

The optional gallery remains empty until seven distinct photographs, alt text, and crop positions are supplied and approved.

## Deployment

`npm run build` writes the static site to `dist`. Vercel can deploy it without an Astro adapter. `vercel.json` permanently redirects `www.thanachot.xyz` requests to the canonical apex host.
