import { sameAsLinks } from "./social-links";
import {
  absoluteUrl,
  PROFILE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "./site-content";

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: ["tantaihaha4487", "tantaihaha", "thanachot.xyz"],
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: ["tantaihaha4487", "tantaihaha", "ธนโชติ พรมทอง"],
      url: SITE_URL,
      image: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#portrait`,
        url: absoluteUrl(PROFILE_IMAGE),
        width: 1920,
        height: 1280,
        caption:
          "Thanachot Phomthong sitting on a white bench outside a school building",
      },
      jobTitle: "Software Developer",
      description: SITE_DESCRIPTION,
      sameAs: sameAsLinks,
      knowsAbout: [
        "Fabric Minecraft mod development",
        "TypeScript",
        "Next.js",
        "React",
        "Open-source software",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangkok",
        addressCountry: "TH",
      },
      nationality: {
        "@type": "Country",
        name: "Thailand",
      },
    },
  ],
} as const;
