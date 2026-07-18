import { access } from "node:fs/promises";
import { resolve } from "node:path";

import sharp from "sharp";
import { describe, expect, it } from "vitest";

const workspace = process.cwd();

async function expectImage(
  path: string,
  width: number,
  height: number,
  alpha = false,
) {
  const absolute = resolve(workspace, path);
  await access(absolute);
  const metadata = await sharp(absolute).metadata();
  expect(metadata.width).toBe(width);
  expect(metadata.height).toBe(height);
  expect(metadata.hasAlpha).toBe(alpha);
}

describe("local portfolio image pipeline", () => {
  it("keeps a full-resolution master and explicit content derivatives", async () => {
    await expectImage("src/assets/portfolio/avatar-master.jpg", 6000, 4000);
    await expectImage("src/assets/portfolio/hero-background.jpg", 2400, 1600);
    await expectImage("src/assets/portfolio/hero-foreground.png", 6000, 4000, true);
    await expectImage("src/assets/portfolio/profile-portrait.jpg", 1800, 1200);
  });

  it("publishes exact social and manifest image dimensions", async () => {
    await expectImage("public/social-card.jpg", 1200, 630);
    await expectImage("public/favicon-32x32.png", 32, 32, true);
    await expectImage("public/apple-touch-icon.png", 180, 180, true);
    await expectImage("public/icon-192.png", 192, 192, true);
    await expectImage("public/icon-512.png", 512, 512, true);
  });
});
