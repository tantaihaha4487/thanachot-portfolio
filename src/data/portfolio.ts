import type { ImageMetadata } from "astro";

export type ProjectLink = `https://${string}` | `#${string}`;
export type GallerySlot = "mosaic" | "strip";

export interface GalleryEntry {
  image: ImageMetadata;
  alt: string;
  cropPosition: `${number}% ${number}%`;
  slot: GallerySlot;
}

export interface PortfolioContent {
  identity: {
    displayName: string;
    fullName: string;
    thaiName: string;
    handle: string;
    tagline: string;
  };
  projects: readonly [
    { name: string; description: string; href: ProjectLink; accent: string },
    { name: string; description: string; href: ProjectLink; accent: string },
    { name: string; description: string; href: ProjectLink; accent: string },
  ];
  socials: readonly {
    label: string;
    href: `https://${string}`;
    includeInSameAs: boolean;
  }[];
  biography: readonly [string, string, string, string, string];
  gallery: readonly GalleryEntry[];
  footer: {
    quote: string;
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: `https://${string}/`;
    socialImage: `/${string}`;
    xCreator: `@${string}`;
  };
}

export const portfolio = {
  identity: {
    displayName: "Thanachot",
    fullName: "Thanachot Phomthong",
    thaiName: "ธนโชติ พรมทอง",
    handle: "tantaihaha4487",
    tagline: "Code, Mods, and Making Things",
  },
  projects: [
    {
      name: "Mashiro",
      description: "A Thai AI VTuber experiment with a playful, expressive personality.",
      href: "#mashiro",
      accent: "violet",
    },
    {
      name: "Yurushi",
      description: "Discord-integrated access management for Fabric servers.",
      href: "https://github.com/tantaihaha4487/Yurushi",
      accent: "blue",
    },
    {
      name: "Open Source",
      description: "Projects, tools, and experiments published on GitHub.",
      href: "https://github.com/tantaihaha4487?tab=repositories",
      accent: "coral",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/tantaihaha4487", includeInSameAs: true },
    { label: "X", href: "https://x.com/TantaiHaha", includeInSameAs: true },
    {
      label: "Modrinth",
      href: "https://modrinth.com/user/tantaihaha4487",
      includeInSameAs: true,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/txntai._exec/",
      includeInSameAs: true,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/thanachot.phomthong",
      includeInSameAs: true,
    },
    { label: "Discord", href: "https://discord.gg/3R2vhgQqde", includeInSameAs: false },
  ],
  biography: [
    "I code, build, and experiment with things that interest me.",
    "I make Minecraft mods, web applications, and small tools that solve problems in my own workflow.",
    "One of those experiments is Mashiro, a Thai AI VTuber project with a playful personality. Development is currently on hiatus while I explore new ideas and work within resource limits.",
    "Most of my work lives around TypeScript, web development, Fabric modding, and open source. You can find my projects on GitHub and my mods on Modrinth.",
    "Outside of building things, I enjoy gaming, music, and anime.",
  ],
  gallery: [],
  footer: {
    quote: "Fake it until you make it.",
    copyright: "© 2026 Thanachot Phomthong",
  },
  seo: {
    title: "Thanachot Phomthong (tantaihaha4487) | Developer",
    description:
      "Portfolio of Thanachot Phomthong, a Thai developer building web apps, Minecraft Fabric mods, open-source tools, and the Project Mashiro AI VTuber.",
    canonical: "https://thanachot.xyz/",
    socialImage: "/social-card.jpg",
    xCreator: "@TantaiHaha",
  },
} as const satisfies PortfolioContent;
