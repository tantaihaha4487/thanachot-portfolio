import type { ComponentType } from "react";
import {
  Boxes,
  Facebook,
  Github,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { heroCards } from "../lib/site-content";
import { socialLinks } from "../lib/social-links";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645z" />
    </svg>
  );
}

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: Github,
  X: XIcon,
  Modrinth: Boxes,
  Instagram,
  Facebook,
  Discord: MessageCircle,
};

export default function HeroContent() {
  return (
    <div className="w-full max-w-3xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-white/70">
        Developer · Creator · Builder
      </p>
      <p
        aria-hidden="true"
        className="font-serif text-7xl font-medium leading-[0.9] tracking-[-0.04em] text-white xl:text-8xl"
      >
        Thanachot
        <br />
        Phomthong
      </p>

      <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
        Also known online as{" "}
        <span className="font-medium text-white">tantaihaha4487</span> ({" "}
        <span className="text-white/85">tantaihaha</span>) — ธนโชติ พรมทอง,
        developer and Minecraft mod author based in Bangkok, Thailand.
      </p>

      <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
        {heroCards.map((project) => (
          <a
            key={project.href}
            href={project.href}
            className="cinematic-project-card rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/55">
              {project.eyebrow}
            </span>
            <strong className="mt-5 block font-serif text-2xl font-medium text-white">
              {project.title}
            </strong>
            <span className="mt-1 block text-xs leading-5 text-white/65">
              {project.description}
            </span>
          </a>
        ))}
      </div>

      <nav
        aria-label="Social links"
        data-cinematic-socials
        className="cinematic-social-rail mt-5 flex flex-wrap items-center gap-2"
      >
        {socialLinks.map((social) => {
          const Icon = socialIcons[social.name];
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              aria-label={social.name}
              className="cinematic-social-link flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 shadow-lg backdrop-blur-md"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </a>
          );
        })}
      </nav>

      <a
        href="#about"
        className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
      >
        About me <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
