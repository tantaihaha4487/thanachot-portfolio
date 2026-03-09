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

export const metadata: Metadata = {
  title: "Thanachot Phomthong | tantaihaha4487",
  description:
    "Portfolio of Thanachot Phomthong (tantaihaha4487, ธนโชติ พรมทอง) — developer, creator, and builder. Minecraft mod author on Modrinth, open-source contributor on GitHub.",
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
  metadataBase: new URL("https://tantaihaha4487.vercel.app"),
  openGraph: {
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder.",
    url: "https://tantaihaha4487.vercel.app",
    siteName: "Thanachot Phomthong",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thanachot Phomthong | tantaihaha4487",
    description:
      "Portfolio of Thanachot Phomthong — developer, creator, and builder.",
    creator: "@tantaihaha4487",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://tantaihaha4487.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
