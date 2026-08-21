export const SITE_URL = "https://www.thanachot.xyz";
export const SITE_NAME = "Thanachot Phomthong";
export const SITE_TITLE =
  "Thanachot Phomthong — Minecraft Mod & Web Developer";
export const SITE_DESCRIPTION =
  "Thanachot Phomthong is a Bangkok-based developer known as tantaihaha4487, building Fabric Minecraft mods, TypeScript tools, and practical open-source software.";

export const PROFILE_IMAGE =
  "/images/thanachot-phomthong-school-portrait.webp";
export const HERO_BACKGROUND_IMAGE = "/images/school-bench-hero.webp";
export const HERO_PORTRAIT_IMAGE =
  "/images/thanachot-portrait-cutout.webp";
export const SOCIAL_PREVIEW_BACKGROUND =
  "/images/social-preview-background.jpg";

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  links: readonly WorkLink[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const selectedWork = [
  {
    id: "mashiro",
    title: "Mashiro",
    category: "Creative AI project",
    summary:
      "A creative AI VTuber and chatbot experiment built around a consistent, playful character persona.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/tantaihaha4487/Discord-AI-Chat-Bot",
      },
    ],
    image: {
      src: "/mashiro.png",
      alt: "Mashiro, an AI VTuber character with white and purple hair",
      width: 387,
      height: 645,
    },
  },
  {
    id: "labgate",
    title: "LabGate",
    category: "TypeScript utility",
    summary:
      "A TypeScript system for reserving shared Ubuntu lab machines and issuing temporary guest credentials.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/tantaihaha4487/LabGate",
      },
    ],
    image: undefined,
  },
] as const satisfies readonly WorkItem[];

export const minecraftMods = [
  {
    id: "superpickaxe",
    title: "SuperPickaxe",
    category: "Fabric mod",
    summary:
      "A server-friendly Fabric mod that gives pickaxes balanced 3×3 block breaking.",
    links: [
      {
        label: "Modrinth",
        href: "https://modrinth.com/project/superpickaxemod",
      },
      {
        label: "GitHub",
        href: "https://github.com/tantaihaha4487/SuperPickaxeMod",
      },
    ],
  },
  {
    id: "auto-item-in-action-bar",
    title: "AutoItemInActionBar",
    category: "Fabric and Paper utility",
    summary:
      "A client-optional Fabric/Paper utility that refills used hotbar and off-hand items from inventory.",
    links: [
      {
        label: "Modrinth",
        href: "https://modrinth.com/project/autoiteminactionbar",
      },
      {
        label: "GitHub",
        href: "https://github.com/tantaihaha4487/AutoItemInActionbar-fabric",
      },
    ],
  },
  {
    id: "deathsound-broadcast",
    title: "DeathSound Broadcast",
    category: "Server-side Fabric mod",
    summary:
      "A server-side Fabric mod that broadcasts a configurable sound to nearby players when a player dies.",
    links: [
      {
        label: "Modrinth",
        href: "https://modrinth.com/project/deathsound-broadcast",
      },
      {
        label: "GitHub",
        href: "https://github.com/tantaihaha4487/DeathSound-Broadcast",
      },
    ],
  },
] as const satisfies readonly WorkItem[];

export const heroCards = [
  {
    eyebrow: "Project",
    title: "Mashiro",
    description: "My featured creative project",
    href: "#mashiro",
  },
  {
    eyebrow: "Open source",
    title: "GitHub",
    description: "Repositories and experiments",
    href: "#projects",
  },
  {
    eyebrow: "Minecraft",
    title: "Modrinth",
    description: "Mods built for the community",
    href: "#mods",
  },
] as const;

export interface GalleryImage {
  src: string;
  alt: string;
  layout: "wide" | "tall" | "small" | "strip";
  position: string;
}

export const galleryImages = [
  {
    src: "/images/woodworking-classroom.webp",
    alt: "Woodworking classroom with a chalk-covered blackboard, timber offcuts, and two finished stools",
    layout: "wide",
    position: "center",
  },
  {
    src: "/images/sunlit-lake-fishing-rafts.webp",
    alt: "Fishing rigs and a floating shelter silhouetted on a sunlit lake",
    layout: "wide",
    position: "center",
  },
  {
    src: "/images/thanachot-sunglasses-portrait.webp",
    alt: "Thanachot Phomthong wearing sunglasses in a dimly lit room",
    layout: "tall",
    position: "center",
  },
  {
    src: "/images/thanachot-school-open-house-electronics.webp",
    alt: "Thanachot Phomthong beside an electronics project at a school open house",
    layout: "small",
    position: "center",
  },
  {
    src: "/images/backlit-pink-rose.webp",
    alt: "A pale pink rose backlit by sunlight against green foliage",
    layout: "strip",
    position: "center",
  },
  {
    src: "/images/pink-mechanical-keyboard.webp",
    alt: "A pink mechanical keyboard on a floral desk mat",
    layout: "strip",
    position: "center",
  },
  {
    src: "/images/fabric-mod-development-workspace.webp",
    alt: "A widescreen monitor showing four terminal sessions for Fabric mod development",
    layout: "strip",
    position: "center",
  },
] as const satisfies readonly GalleryImage[];
