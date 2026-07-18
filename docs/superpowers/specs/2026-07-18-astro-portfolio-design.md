# Astro Portfolio Design Specification

## Purpose

Replace the existing Next.js portfolio with a static, photography-led Astro site that feels editorial and personal. SaltyAom is a mood and interaction reference only: the implementation must use Thanachot's content, photographs, identity, and original visual treatment.

## Identity and copy

The hero presents “Thanachot” and “Code, Mods, and Making Things,” supported by “Thanachot Phomthong,” “ธนโชติ พรมทอง,” and `tantaihaha4487`.

The profile story uses these paragraphs verbatim:

1. “I code, build, and experiment with things that interest me.”
2. “I make Minecraft mods, web applications, and small tools that solve problems in my own workflow.”
3. “One of those experiments is Mashiro, a Thai AI VTuber project with a playful personality. Development is currently on hiatus while I explore new ideas and work within resource limits.”
4. “Most of my work lives around TypeScript, web development, Fabric modding, and open source. You can find my projects on GitHub and my mods on Modrinth.”
5. “Outside of building things, I enjoy gaming, music, and anime.”

The three featured project tiles are Mashiro, Yurushi, and Open Source. Mashiro points to `#mashiro`; Yurushi points to `https://github.com/tantaihaha4487/Yurushi`; Open Source points to `https://github.com/tantaihaha4487?tab=repositories`.

All six existing profiles remain visible: GitHub, X, Modrinth, Instagram, Facebook, and Discord. Discord is excluded from structured-data identity profiles. The footer reads “Fake it until you make it.” and “© 2026 Thanachot Phomthong”.

## Responsive experience

At 1024px and above, a 175dvh hero stage holds a sticky full-viewport composition. The source portrait becomes a softly treated background plate and a foreground portrait layer. Three project tiles and the social links remain crawlable and keyboard accessible. Pointer parallax and scroll progress are progressive enhancements driven by one animation frame loop.

Below 1024px, the desktop hero is omitted from rendering and the page begins with the editorial profile story beside a 3:2 portrait. No content relies on JavaScript for visibility or navigation. Reduced-motion users receive the final static composition.

The body is white and editorial, using system sans and serif stacks. Thin rules, generous spacing, and restrained blue/red inline links provide hierarchy. There is no navigation, dark mode, API-fed grid, cursor glow, dot grid, card tilt, or remote font request.

## Photography

Transformable images live in `src/assets/portfolio` and render through Astro image components with explicit dimensions and responsive AVIF/WebP sources. `AVATAR.jpg` is copied there as the master. The hero background plate, foreground portrait presentation, mobile portrait, and 1200×630 social image are derived from that master without changing Thanachot's appearance.

The seven-image mosaic and strip are omitted until the user supplies and approves seven additional photographs, their alt text, and crop positions. No duplicate or invented gallery images are permitted.

## Content contract

`src/data/portfolio.ts` exports a strict `PortfolioContent` value. It contains identity, exactly three projects, six socials, five biography paragraphs, optional gallery entries with imported local images, footer copy, and SEO. Project destinations accept only an HTTPS URL or an internal fragment. Each social declares whether it belongs in `Person.sameAs`.

## Search and delivery

The canonical URL is `https://thanachot.xyz/`. The page title is “Thanachot Phomthong (tantaihaha4487) | Developer” and its description is “Portfolio of Thanachot Phomthong, a Thai developer building web apps, Minecraft Fabric mods, open-source tools, and the Project Mashiro AI VTuber.”

The document has one semantic `h1`, canonical Open Graph and X metadata, `@TantaiHaha` as creator, and a `ProfilePage` JSON-LD graph whose main entity is a Thai `Person`. The five non-Discord profiles populate `sameAs`. The internal-only sitemap contains the home page and excludes the no-index 404 page. `robots.txt` references that sitemap. Vercel permanently redirects `www.thanachot.xyz/*` to the apex host.

## Acceptance gates

Local acceptance requires lint, Astro type checking, Vitest, Playwright, and a production build. Browser checks cover desktop, tablet, mobile, reduced motion, JavaScript-disabled content, keyboard focus, no horizontal overflow, metadata, structured data, robots, sitemap, and the 404 page.

Preview approval, production Lighthouse scores, live canonical-domain checks, and final gallery approval remain deployment/user gates. The feature branch must not merge to `main` until all seven additional photographs and those external checks are complete.
