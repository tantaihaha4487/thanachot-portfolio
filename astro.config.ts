import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://thanachot.xyz",
  integrations: [sitemap()],
  image: {
    responsiveStyles: true,
  },
});
