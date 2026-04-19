import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  weight: "200",
  subsets: ["latin", "thai"],
});

const BASE_URL = "https://thanachot.xyz";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/tantaihaha4487" },
  { name: "X", url: "https://x.com/TantaiHaha" },
  { name: "Modrinth", url: "https://modrinth.com/user/tantaihaha4487" },
  { name: "Instagram", url: "https://www.instagram.com/txntai._exec/" },
  { name: "Facebook", url: "https://www.facebook.com/thanachot.phomthong" },
  { name: "Discord", url: "https://discord.gg/3R2vhgQqde" },
];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Thanachot Phomthong | tantaihaha4487",
    template: "%s | Thanachot Phomthong",
  },
  description:
    "Portfolio of Thanachot Phomthong (tantaihaha4487) — developer & builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
  keywords: [
    "tantaihaha",
    "tantaihaha4487",
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
    images: [
      {
        url: `${BASE_URL}/AVATAR.jpg`,
        width: 1200,
        height: 630,
        alt: "Thanachot Phomthong — Developer & Builder",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tantaihaha4487",
    creator: "@tantaihaha4487",
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    images: [`${BASE_URL}/AVATAR.jpg`],
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "th-TH": `${BASE_URL}/th`,
    },
  },
  category: "technology",
  classification: "portfolio",
  other: {
    "geo.region": "TH",
    "geo.placename": "Bangkok, Thailand",
    "ICBM": "13.7563, 100.5018",
    "theme-color": "#282C33",
    "color-scheme": "dark",
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
    alternateName: "tantaihaha4487",
    url: BASE_URL,
    jobTitle: "Developer",
    description: "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    image: `${BASE_URL}/AVATAR.jpg`,
    sameAs: socialLinks.map((s) => s.url),
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
    logo: `${BASE_URL}/AVATAR.jpg`,
    sameAs: socialLinks.map((s) => s.url),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Developer",
      availableLanguage: ["English", "Thai"],
    },
  };

  const schemas = [personSchema, profilePageSchema, organizationSchema];

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
        {children}
      </body>
    </html>
  );
}
