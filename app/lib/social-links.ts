export interface SocialLink {
  name: string;
  href: string;
  /** Whether this is a stable identity/profile URL suitable for schema.org sameAs (excludes invite-style links) */
  isProfile: boolean;
}

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/tantaihaha4487", isProfile: true },
  { name: "X", href: "https://x.com/TantaiHaha", isProfile: true },
  { name: "Modrinth", href: "https://modrinth.com/user/tantaihaha4487", isProfile: true },
  { name: "Instagram", href: "https://www.instagram.com/txntai._exec/", isProfile: true },
  { name: "Facebook", href: "https://www.facebook.com/thanachot.phomthong", isProfile: true },
  { name: "Discord", href: "https://discord.gg/3R2vhgQqde", isProfile: false },
];

export const sameAsLinks = socialLinks.filter((s) => s.isProfile).map((s) => s.href);
