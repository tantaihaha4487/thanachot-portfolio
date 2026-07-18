import { describe, expect, it } from "vitest";

import { portfolio } from "../src/data/portfolio";

const biography = [
  "I code, build, and experiment with things that interest me.",
  "I make Minecraft mods, web applications, and small tools that solve problems in my own workflow.",
  "One of those experiments is Mashiro, a Thai AI VTuber project with a playful personality. Development is currently on hiatus while I explore new ideas and work within resource limits.",
  "Most of my work lives around TypeScript, web development, Fabric modding, and open source. You can find my projects on GitHub and my mods on Modrinth.",
  "Outside of building things, I enjoy gaming, music, and anime.",
] as const;

describe("portfolio content contract", () => {
  it("keeps the approved identity and biography verbatim", () => {
    expect(portfolio.identity).toEqual({
      displayName: "Thanachot",
      fullName: "Thanachot Phomthong",
      thaiName: "ธนโชติ พรมทอง",
      handle: "tantaihaha4487",
      tagline: "Code, Mods, and Making Things",
    });
    expect(portfolio.biography).toEqual(biography);
  });

  it("defines exactly three uniquely linked featured projects", () => {
    expect(portfolio.projects).toHaveLength(3);
    expect(portfolio.projects.map(({ name }) => name)).toEqual([
      "Mashiro",
      "Yurushi",
      "Open Source",
    ]);
    expect(new Set(portfolio.projects.map(({ href }) => href)).size).toBe(3);
    for (const project of portfolio.projects) {
      expect(project.href).toMatch(/^(https:\/\/|#[a-z][\w-]*$)/);
    }
  });

  it("keeps six visible profiles and five person identity profiles", () => {
    expect(portfolio.socials).toHaveLength(6);
    expect(new Set(portfolio.socials.map(({ href }) => href)).size).toBe(6);
    for (const social of portfolio.socials) {
      expect(social.href).toMatch(/^https:\/\//);
    }
    expect(portfolio.socials.filter(({ includeInSameAs }) => includeInSameAs)).toHaveLength(5);
    expect(portfolio.socials.find(({ label }) => label === "Discord")?.includeInSameAs).toBe(false);
  });

  it("does not invent gallery content or reuse the reference site's assets", () => {
    expect(portfolio.gallery).toEqual([]);
    expect(JSON.stringify(portfolio).toLowerCase()).not.toContain("saltyaom");
  });
});
