import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { isSitemapPage } from "./src/data/seo";

export default defineConfig({
  output: "static",
  site: "https://thanachot.xyz",
  integrations: [sitemap({ filter: isSitemapPage })],
  image: {
    responsiveStyles: true,
  },
});
