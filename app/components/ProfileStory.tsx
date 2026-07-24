import type React from "react";
import Image from "next/image";

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
        <h1>Code, Mods, and Making Things</h1>
        <div className="editorial-story__copy">
          <p>
            I&apos;m Thanachot (tantaihaha4487) — I code, build, and experiment
            with things that interest me. Most of my work lives around
            TypeScript, Next.js, React, and Fabric.
          </p>
          <p>
            I make web applications, Minecraft mods, and small tools that solve
            problems in my own workflow. You can find my projects on{" "}
            <AccentLink href="https://github.com/tantaihaha4487" className="accent-violet">
              GitHub
            </AccentLink>{" "}
            and{" "}
            <AccentLink href="https://modrinth.com/user/tantaihaha4487" className="accent-emerald">
              Modrinth
            </AccentLink>
            .
          </p>
          <p>
            Project Mashiro is my creative corner: an AI VTuber experiment and
            a reminder that the best work can be playful, personal, and a little
            strange.
          </p>
        </div>
        <Image
          src="/AVATAR_FULL.jpg"
          alt="White bench in front of a school building"
          width={1536}
          height={1024}
          sizes="(max-width: 1023px) calc(100vw - 2rem), 48rem"
          className="editorial-story__portrait"
        />
      </div>
    </section>
  );
}
