import { MetadataRoute } from "next";

const BASE_URL = "https://thanachot.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://github.com/tantaihaha4487",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: "https://modrinth.com/user/tantaihaha4487",
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: "https://www.instagram.com/txntai._exec/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: "https://www.facebook.com/thanachot.phomthong",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
