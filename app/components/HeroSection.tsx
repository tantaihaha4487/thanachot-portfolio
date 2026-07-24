"use client";

import Image from "next/image";
import {
  Boxes,
  Facebook,
  Github,
  Instagram,
  MessageCircle,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { socialLinks } from "../lib/social-links";

const projects = [
  {
    eyebrow: "Project",
    title: "Mashiro",
    description: "My featured creative project",
    href: "#mashiro",
  },
  {
    eyebrow: "Open source",
    title: "GitHub",
    description: "Repositories and experiments",
    href: "#projects",
  },
  {
    eyebrow: "Minecraft",
    title: "Modrinth",
    description: "Mods built for the community",
    href: "#mods",
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  X: XIcon,
  Modrinth: Boxes,
  Instagram: Instagram,
  Facebook: Facebook,
  Discord: MessageCircle,
};

const socials = socialLinks.map((s) => ({
  label: s.name,
  href: s.href,
  icon: socialIcons[s.name],
}));

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20 });
  const portraitPointerX = useTransform(smoothX, (value) => value * -0.35);
  const portraitPointerY = useTransform(smoothY, (value) => value * -0.35);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const introOpacity = useTransform(scrollYProgress, (progress) =>
    progress <= 0.14
      ? 1
      : progress >= 0.32
        ? 0
        : 1 - (progress - 0.14) / 0.18,
  );
  const introScale = useTransform(scrollYProgress, [0, 0.32], [1, 2]);
  const contentOpacity = useTransform(scrollYProgress, (progress) =>
    progress <= 0.18
      ? 0
      : progress >= 0.42
        ? 1
        : (progress - 0.18) / 0.24,
  );
  const contentScale = useTransform(
    scrollYProgress,
    [0.18, 0.42],
    [0.88, 1],
  );
  const contentX = useTransform(scrollYProgress, [0.18, 0.42], [-72, 0]);
  const contentPointerEvents = useTransform(
    scrollYProgress,
    [0.32, 0.42],
    ["none", "auto"],
  );
  const photoScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1.02]);
  const portraitX = useTransform(scrollYProgress, [0, 0.42], [0, 160]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.42], [1, 1.02]);
  const shadeOpacity = useTransform(
    scrollYProgress,
    [0, 0.42],
    [0.14, 0.58],
  );

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    pointerX.set((event.clientX / window.innerWidth - 0.5) * -24);
    pointerY.set((event.clientY / window.innerHeight - 0.5) * -16);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      data-cinematic-hero
      className="relative hidden h-[175dvh] lg:block"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-slate-200 text-white">
        <motion.div
          className="absolute -inset-8"
          style={{
            x: prefersReducedMotion ? 0 : smoothX,
            y: prefersReducedMotion ? 0 : smoothY,
            scale: prefersReducedMotion ? 1.02 : photoScale,
          }}
        >
          <Image
            src="/hero-background.png"
            alt="White bench in front of a school building"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_48%] blur-[10px]"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent"
          style={{
            opacity: prefersReducedMotion ? 0.58 : shadeOpacity,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

        <motion.p
          aria-hidden
          className="cinematic-intro absolute inset-0 z-10 flex items-center justify-center whitespace-nowrap text-[18vw] font-bold leading-none tracking-[-0.08em] text-white mix-blend-overlay"
          style={{
            opacity: prefersReducedMotion ? 0 : introOpacity,
            scale: prefersReducedMotion ? 2 : introScale,
          }}
        >
          Thanachot
        </motion.p>

        <motion.div
          aria-hidden
          className="cinematic-portrait pointer-events-none absolute inset-0 z-20"
          style={{
            x: prefersReducedMotion ? 0 : portraitX,
            scale: prefersReducedMotion ? 1 : portraitScale,
          }}
        >
          <motion.div
            className="absolute -inset-8"
            style={{
              x: prefersReducedMotion ? 0 : portraitPointerX,
              y: prefersReducedMotion ? 0 : portraitPointerY,
            }}
          >
            <Image
              src="/AVARTAR_object.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_48%]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="cinematic-content relative z-30 flex h-full max-w-7xl items-center px-12 xl:px-20"
          style={{
            opacity: prefersReducedMotion ? 1 : contentOpacity,
            scale: prefersReducedMotion ? 1 : contentScale,
            x: prefersReducedMotion ? 0 : contentX,
            pointerEvents: prefersReducedMotion ? "auto" : contentPointerEvents,
          }}
        >
          <div className="w-full max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-white/70">
              Developer · Creator · Builder
            </p>
            <h1 className="font-serif text-7xl font-medium leading-[0.9] tracking-[-0.04em] text-white xl:text-8xl">
              Thanachot
              <br />
              Phomthong
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Also known online as{" "}
              <span className="font-medium text-white">tantaihaha4487</span> (
              <span className="text-white/85">tantaihaha</span>) — ธนโชติ พรมทอง,
              developer and Minecraft mod author based in Bangkok, Thailand.
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {projects.map((project) => (
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
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    aria-label={social.label}
                    className="cinematic-social-link flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 shadow-lg backdrop-blur-md"
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                  </a>
                );
              })}
            </nav>

            <a
              href="#about"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
            >
              About me <span aria-hidden>↗</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute bottom-10 left-12 z-20 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/65 xl:left-20"
          style={{ opacity: prefersReducedMotion ? 0 : introOpacity }}
        >
          <span className="cinematic-scroll-line h-8 w-px bg-white/70" />
          Scroll to explore
        </motion.div>

        <div className="absolute bottom-7 right-8 z-20 font-serif text-sm italic text-white/55">
          ธนโชติ พรมทอง
        </div>
      </div>
    </section>
  );
}
