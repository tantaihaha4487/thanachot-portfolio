import type { PortfolioContent } from "./portfolio";

export function createProfilePageSchema(content: PortfolioContent) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: content.seo.canonical,
    name: content.seo.title,
    description: content.seo.description,
    mainEntity: {
      "@type": "Person",
      name: content.identity.fullName,
      alternateName: [content.identity.thaiName, content.identity.handle],
      url: content.seo.canonical,
      image: new URL(content.seo.socialImage, content.seo.canonical).href,
      nationality: {
        "@type": "Country",
        name: "Thailand",
      },
      knowsAbout: [
        "TypeScript",
        "Web development",
        "Minecraft Fabric modding",
        "Open-source software",
        "Artificial intelligence",
      ],
      sameAs: content.socials
        .filter(({ includeInSameAs }) => includeInSameAs)
        .map(({ href }) => href),
    },
  } as const;
}

export function isSitemapPage(page: string): boolean {
  const url = new URL(page);
  return url.origin === "https://thanachot.xyz" && url.pathname === "/";
}
