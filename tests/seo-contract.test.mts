import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";

import {
  absoluteUrl,
  galleryImages,
  minecraftMods,
  PROFILE_IMAGE,
  selectedWork,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "../app/lib/site-content.ts";

test("canonical identity metadata is concise and consistent", async () => {
  assert.equal(SITE_URL, "https://www.thanachot.xyz");
  assert.equal(
    SITE_TITLE,
    "Thanachot Phomthong — Minecraft Mod & Web Developer",
  );
  assert.equal(
    SITE_DESCRIPTION,
    "Thanachot Phomthong is a Bangkok-based developer known as tantaihaha4487, building Fabric Minecraft mods, TypeScript tools, and practical open-source software.",
  );

  const layout = await readFile("app/layout.tsx", "utf8");
  assert.match(layout, /metadataBase: new URL\(SITE_URL\)/);
  assert.match(layout, /canonical: SITE_URL/);
  assert.match(layout, /site: "@TantaiHaha"/);
  assert.match(layout, /creator: "@TantaiHaha"/);
  assert.doesNotMatch(layout, /keywords:|alternateLocale|geo\.region|ICBM|classification/);
});

test("structured data graph describes only the site, profile, and real person", async () => {
  const schema = await readFile("app/lib/structured-data.ts", "utf8");
  const graphTypes = [...schema.matchAll(/^\s{6}"@type": "([^"]+)",$/gm)].map(
    (match) => match[1],
  );

  assert.deepEqual(graphTypes, ["WebSite", "ProfilePage", "Person"]);
  assert.match(schema, /"@graph"/);
  assert.match(schema, /PROFILE_IMAGE/);
  assert.match(schema, /sameAs: sameAsLinks/);
  assert.doesNotMatch(schema, /Organization|dateCreated|dateModified/);
});

test("robots and sitemap expose crawlable www URLs without invented freshness", async () => {
  const robots = await readFile("app/robots.ts", "utf8");
  const sitemap = await readFile("app/sitemap.ts", "utf8");

  assert.match(robots, /userAgent: "\*"/);
  assert.match(robots, /allow: "\/"/);
  assert.doesNotMatch(robots, /disallow|host:/i);
  assert.doesNotMatch(robots, /_next/);
  assert.match(sitemap, /PROFILE_IMAGE/);
  assert.match(sitemap, /galleryImages/);
  assert.match(sitemap, /mashiroImage/);
  assert.doesNotMatch(sitemap, /lastModified|changeFrequency|priority/);
});

test("the page has five curated projects and every section is rendered", async () => {
  assert.equal(selectedWork.length, 2);
  assert.equal(minecraftMods.length, 3);
  assert.deepEqual(
    [...selectedWork, ...minecraftMods].map((item) => item.title),
    [
      "Mashiro",
      "LabGate",
      "SuperPickaxe",
      "AutoItemInActionBar",
      "DeathSound Broadcast",
    ],
  );

  const page = await readFile("app/page.tsx", "utf8");
  const work = await readFile("app/components/SelectedWork.tsx", "utf8");
  const mods = await readFile("app/components/MinecraftMods.tsx", "utf8");
  const gallery = await readFile("app/components/PhotoGallery.tsx", "utf8");
  assert.match(page, /<SelectedWork \/>/);
  assert.match(page, /<MinecraftMods \/>/);
  assert.match(work, /id="projects"/);
  assert.match(mods, /id="mods"/);
  assert.match(gallery, /id="photography"/);
});

test("one descriptive H1 carries identity and niche terms", async () => {
  const files = [
    "app/components/HeroSection.tsx",
    "app/components/CinematicHero.tsx",
    "app/components/HeroContent.tsx",
    "app/components/ProfileStory.tsx",
    "app/components/SelectedWork.tsx",
    "app/components/MinecraftMods.tsx",
    "app/components/PhotoGallery.tsx",
  ];
  const sources = await Promise.all(files.map((file) => readFile(file, "utf8")));
  const h1Count = sources.join("\n").match(/<h1\b/g)?.length ?? 0;
  const profile = sources[3];

  assert.equal(h1Count, 1);
  assert.match(profile, /<h1>\{SITE_TITLE\}<\/h1>/);
  for (const term of [
    "tantaihaha4487",
    "tantaihaha",
    "ธนโชติ พรมทอง",
    "Bangkok",
    "Fabric",
    "TypeScript",
    "Next.js",
    "open-source",
  ]) {
    assert.match(profile, new RegExp(term.replace(".", "\\.")));
  }
});

test("optimized content images have unique filenames and useful alt text", async () => {
  assert.equal(galleryImages.length, 7);
  assert.equal(new Set(galleryImages.map((image) => image.src)).size, 7);
  assert.equal(new Set(galleryImages.map((image) => image.alt)).size, 7);

  const mashiroImage = selectedWork.find((work) => work.id === "mashiro")?.image;
  assert.ok(mashiroImage);
  const contentImages = [
    PROFILE_IMAGE,
    mashiroImage.src,
    ...galleryImages.map((image) => image.src),
  ];
  assert.equal(contentImages.length, 9);

  await Promise.all(contentImages.map((src) => access(`public${src}`)));
  for (const image of galleryImages) {
    assert.match(image.src, /^\/images\/[a-z0-9-]+\.webp$/);
    assert.ok(image.alt.length >= 40, image.alt);
    assert.equal(absoluteUrl(image.src).startsWith(`${SITE_URL}/images/`), true);
  }
});
