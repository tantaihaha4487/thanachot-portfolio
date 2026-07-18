import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { createProfilePageSchema, isSitemapPage } from "../src/data/seo";
import { portfolio } from "../src/data/portfolio";

describe("search metadata inputs", () => {
  it("describes one Thai person through a ProfilePage", () => {
    const schema = createProfilePageSchema(portfolio);

    expect(schema["@type"]).toBe("ProfilePage");
    expect(schema.mainEntity).toMatchObject({
      "@type": "Person",
      name: "Thanachot Phomthong",
      alternateName: ["ธนโชติ พรมทอง", "tantaihaha4487"],
      nationality: { "@type": "Country", name: "Thailand" },
    });
    expect(schema.mainEntity.sameAs).toEqual(
      portfolio.socials
        .filter(({ includeInSameAs }) => includeInSameAs)
        .map(({ href }) => href),
    );
    expect(schema.mainEntity.sameAs).toHaveLength(5);
    expect(JSON.stringify(schema)).not.toContain("Organization");
  });

  it("includes only the canonical home page in the sitemap", () => {
    expect(isSitemapPage("https://thanachot.xyz/")).toBe(true);
    expect(isSitemapPage("https://thanachot.xyz/404/")).toBe(false);
    expect(isSitemapPage("https://github.com/tantaihaha4487")).toBe(false);
  });

  it("publishes crawl controls and a host-conditioned www redirect", () => {
    const robots = readFileSync(resolve("public/robots.txt"), "utf8");
    const vercel = JSON.parse(readFileSync(resolve("vercel.json"), "utf8")) as {
      framework: string;
      buildCommand: string;
      installCommand: string;
      outputDirectory: string;
      redirects: unknown[];
    };

    expect(robots).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://thanachot.xyz/sitemap-index.xml\n",
    );
    expect(vercel).toMatchObject({
      framework: "astro",
      buildCommand: "npm run build",
      installCommand: "npm ci",
      outputDirectory: "dist",
    });
    expect(vercel.redirects).toEqual([
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.thanachot.xyz" }],
        destination: "https://thanachot.xyz/:path*",
        permanent: true,
      },
    ]);
  });
});
