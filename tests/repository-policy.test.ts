import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();

function collectTextFiles(directory: string): string[] {
  const absolute = resolve(root, directory);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute).flatMap((entry) => {
    const path = join(absolute, entry);
    if (statSync(path).isDirectory()) return collectTextFiles(path.slice(root.length + 1));
    return [".astro", ".css", ".html", ".js", ".json", ".md", ".ts", ".tsx"].includes(
      extname(path),
    )
      ? [path]
      : [];
  });
}

describe("static Astro repository policy", () => {
  it("contains no Next.js or React runtime foundation", () => {
    const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    const packages = { ...packageJson.dependencies, ...packageJson.devDependencies };

    for (const dependency of [
      "next",
      "react",
      "react-dom",
      "framer-motion",
      "animejs",
      "lucide-react",
      "tailwindcss",
    ]) {
      expect(packages).not.toHaveProperty(dependency);
    }
    for (const path of ["app", "next.config.ts", "proxy.ts", "postcss.config.mjs"]) {
      expect(existsSync(resolve(root, path)), `${path} should be removed`).toBe(false);
    }
  });

  it("contains no reference assets, remote fonts, or runtime project APIs", () => {
    const text = collectTextFiles("src")
      .concat(collectTextFiles("public"))
      .map((path) => readFileSync(path, "utf8"))
      .join("\n")
      .toLowerCase();

    expect(text).not.toContain("saltyaom");
    expect(text).not.toContain("fonts.googleapis.com");
    expect(text).not.toContain("fonts.gstatic.com");
    expect(text).not.toContain("api.github.com");
    expect(text).not.toContain("api.modrinth.com");
    expect(text).not.toMatch(/from ["'](?:next|react)/);
  });
});
