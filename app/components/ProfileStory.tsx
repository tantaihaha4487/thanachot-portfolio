import type React from "react";
import Image from "next/image";
import { PROFILE_IMAGE, SITE_TITLE } from "../lib/site-content";

function AccentLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`editorial-link ${className}`}>
      {children}
    </a>
  );
}

export default function ProfileStory() {
  return (
    <section id="about" className="editorial-story">
      <div className="editorial-story__content">
        <p className="editorial-kicker">A little about me</p>
        <h1>{SITE_TITLE}</h1>
        <div className="editorial-story__copy">
          <p>
            I&apos;m Thanachot Phomthong, or{" "}
            <span lang="th" className="whitespace-nowrap">
              ธนโชติ พรมทอง
            </span>{" "}
            in Thai. Online, I&apos;m known as tantaihaha4487 and tantaihaha.
            I&apos;m a Bangkok-based developer building Fabric Minecraft mods,
            TypeScript tools, and Next.js experiences as practical open-source
            software.
          </p>
          <p>
            I like projects that solve a real workflow problem while still
            leaving room to experiment. You can follow the code on{" "}
            <AccentLink
              href="https://github.com/tantaihaha4487"
              className="accent-violet"
            >
              GitHub
            </AccentLink>{" "}
            and install my Minecraft work from{" "}
            <AccentLink
              href="https://modrinth.com/user/tantaihaha4487"
              className="accent-emerald"
            >
              Modrinth
            </AccentLink>
            .
          </p>
          <p>
            Project Mashiro is my creative corner: an AI VTuber experiment and
            a reminder that useful engineering can also be playful, personal,
            and a little strange.
          </p>
        </div>
        <Image
          src={PROFILE_IMAGE}
          alt="Thanachot Phomthong sitting on a white bench outside a school building"
          width={1920}
          height={1280}
          sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
          className="editorial-story__portrait"
        />
      </div>
    </section>
  );
}
