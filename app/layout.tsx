import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://thanachot.xyz";

export const metadata: Metadata = {
  title: "Thanachot Phomthong | tantaihaha4487",
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
  ],
  authors: [
    { name: "Thanachot Phomthong", url: "https://github.com/tantaihaha4487" },
  ],
  creator: "Thanachot Phomthong",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    url: BASE_URL,
    siteName: "Thanachot Phomthong",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/AVATAR.jpg`,
        width: 1200,
        height: 630,
        alt: "Thanachot Phomthong — Developer & Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    creator: "@tantaihaha4487",
    images: [`${BASE_URL}/AVATAR.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thanachot Phomthong",
    alternateName: "tantaihaha4487",
    url: BASE_URL,
    jobTitle: "Developer",
    description: "Portfolio of Thanachot Phomthong — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
    sameAs: [
      "https://github.com/tantaihaha4487",
      "https://modrinth.com/user/tantaihaha4487",
    ],
    knowsAbout: [
      "Web Development",
      "Minecraft Modding",
      "Open Source",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
