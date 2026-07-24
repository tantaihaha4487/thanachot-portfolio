import type { Metadata } from "next";
import "./globals.css";
import { sameAsLinks } from "./lib/social-links";

const BASE_URL = "https://thanachot.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Thanachot Phomthong | tantaihaha4487",
    template: "%s | Thanachot Phomthong",
  },
  description:
    "Portfolio of Thanachot Phomthong (tantaihaha4487) — developer & builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
  keywords: [
    "tantaihaha4487",
    "thanachot phomthong",
    "thanachot",
    "tantaihaha",
    "Thanachot P.",
    "Thanachot Phomthong",
    "ธนโชติ",
    "ธนโชติ พรมทอง",
    "thanachot developer",
    "thanachot portfolio",
    "tantaihaha4487 github",
    "tantaihaha4487 modrinth",
    "Minecraft mod developer Thailand",
    "Thai developer portfolio",
    "Fabric mod developer",
    "Web developer Bangkok",
  ],
  authors: [
    { name: "Thanachot Phomthong", url: "https://github.com/tantaihaha4487" },
  ],
  creator: "Thanachot Phomthong",
  publisher: "Thanachot Phomthong",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "th_TH",
    url: BASE_URL,
    siteName: "Thanachot Phomthong",
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tantaihaha4487",
    creator: "@tantaihaha4487",
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
  classification: "portfolio",
  other: {
    "geo.region": "TH",
    "geo.placename": "Bangkok, Thailand",
    "ICBM": "13.7563, 100.5018",
    "theme-color": "#ffffff",
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Thanachot Phomthong",
    alternateName: ["tantaihaha4487", "tantaihaha", "ธนโชติ พรมทอง"],
    url: BASE_URL,
    jobTitle: "Developer",
    description: "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    image: `${BASE_URL}/hero-background.png`,
    sameAs: sameAsLinks,
    knowsAbout: [
      "Web Development",
      "Minecraft Modding",
      "Open Source",
      "TypeScript",
      "Next.js",
      "React",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Bangkok",
      addressCountry: "TH",
    },
    nationality: {
      "@type": "Country",
      name: "Thailand",
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@id": `${BASE_URL}/#person`,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Thanachot Phomthong Portfolio",
    url: BASE_URL,
    logo: `${BASE_URL}/hero-background.png`,
    sameAs: sameAsLinks,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Developer",
      availableLanguage: ["English", "Thai"],
    },
  };

  const schemas = [personSchema, profilePageSchema, organizationSchema];
  const jsonLd = JSON.stringify(schemas)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
