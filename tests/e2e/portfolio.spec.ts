import { expect, test } from "@playwright/test";

const biographyLead = "I code, build, and experiment with things that interest me.";

test.describe("responsive portfolio", () => {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    test(`${viewport.width}x${viewport.height} has no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("desktop renders a 175dvh sticky hero, projects, and socials", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const hero = page.locator("[data-desktop-hero]");
    await expect(hero).toBeVisible();
    expect(await hero.evaluate((node) => node.getBoundingClientRect().height)).toBeCloseTo(1575, -1);
    await expect(page.locator("[data-hero-sticky]")).toHaveCSS("position", "sticky");
    await expect(hero.locator("[data-project-link]")).toHaveCount(3);
    await expect(hero.locator("[data-social-link]")).toHaveCount(6);
  });

  test("mobile omits the desktop hero and begins with the profile story", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.locator("[data-desktop-hero]")).toBeHidden();
    const story = page.locator("[data-profile-story]");
    await expect(story).toBeVisible();
    await expect(story.locator("[data-story-copy] p").first()).toHaveText(biographyLead);
    await expect(page.locator("[data-profile-portrait]")).toBeVisible();
  });

  test("all links are keyboard focusable with a visible focus treatment", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
  const firstProject = page.locator("[data-desktop-hero] [data-project-link]").first();
    await firstProject.focus();
    await expect(firstProject).toBeFocused();
    expect(await firstProject.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  });
});

test("approved metadata and crawl outputs are rendered", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Thanachot Phomthong (tantaihaha4487) | Developer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://thanachot.xyz/",
  );
  await expect(page.locator('meta[name="twitter:creator"]')).toHaveAttribute(
    "content",
    "@TantaiHaha",
  );
  const schema = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "null",
  );
  expect(schema).toMatchObject({ "@type": "ProfilePage", mainEntity: { "@type": "Person" } });

  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Sitemap: https://thanachot.xyz/sitemap-index.xml",
  );
  expect(await (await request.get("/sitemap-0.xml")).text()).toContain(
    "<loc>https://thanachot.xyz/</loc>",
  );
  await page.goto("/404/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
});

test("content remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.getByText(biographyLead)).toBeVisible();
  await expect(page.locator("[data-desktop-hero] [data-project-link]")).toHaveCount(3);
  await expect(page.locator("[data-desktop-hero] [data-social-link]")).toHaveCount(6);
  await context.close();
});

test("reduced motion keeps the static final composition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("[data-desktop-hero]")).not.toHaveAttribute("data-enhanced", "true");
  await expect(page.locator("[data-desktop-hero] [data-project-link]")).toHaveCount(3);
});
