import { Star, GitFork, ExternalLink } from "lucide-react";
import GithubCards from "./GithubCards";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
}

const langColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Java: "#B07219",
  Go: "#00ADD8",
  Python: "#3572A5",
  Rust: "#DEA584",
  Kotlin: "#A97BFF",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
};

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/tantaihaha4487/repos?per_page=50",
      {
        next: { revalidate: 3600 },
        headers: { "Accept": "application/vnd.github.v3+json" },
      }
    );
    if (!res.ok) {
      console.log("GitHub API failed, using fallback repos");
      return fallbackRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
    }
    const data: Repo[] = await res.json();
    console.log("Fetched repos:", data.map(r => ({ name: r.name, stars: r.stargazers_count })));
    return data
      .filter((r) => !r.name.startsWith(".") && r.name !== "tantaihaha4487")
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);
  } catch (err) {
    console.error("Error fetching repos:", err);
    return fallbackRepos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  }
}

const fallbackRepos: Repo[] = [
  {
    id: 1,
    name: "Yurushi",
    html_url: "https://github.com/tantaihaha4487/Yurushi",
    description: "Discord Integration Whitelist Mod for Fabric. Simplify your server access management.",
    language: "Java",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["minecraft", "fabric", "discord"],
    pushed_at: "2026-03-08T16:57:14Z",
  },
  {
    id: 2,
    name: "thanachot-portfolio",
    html_url: "https://github.com/tantaihaha4487/thanachot-portfolio",
    description: "Personal portfolio — this site. Built with Next.js, Tailwind, Framer Motion.",
    language: "TypeScript",
    stargazers_count: 3,
    forks_count: 0,
    topics: ["portfolio", "nextjs", "typescript"],
    pushed_at: "2026-03-09T00:00:00Z",
  },
  {
    id: 3,
    name: "fabric-cli-go",
    html_url: "https://github.com/tantaihaha4487/fabric-cli-go",
    description: "CLI tool for Fabric mod development",
    language: "Go",
    stargazers_count: 2,
    forks_count: 0,
    topics: ["cli", "go", "fabric"],
    pushed_at: "2026-03-07T08:23:56Z",
  },
  {
    id: 4,
    name: "valentine-site",
    html_url: "https://github.com/tantaihaha4487/valentine-site",
    description: "Valentine's Day interactive web experience",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    topics: ["nextjs", "typescript"],
    pushed_at: "2026-02-13T21:18:53Z",
  },
  {
    id: 5,
    name: "mashiro-bot",
    html_url: "https://github.com/tantaihaha4487",
    description: "Discord bot with AI persona — calm, strategic, and respectful communication archetype.",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["discord", "bot", "ai"],
    pushed_at: "2025-07-24T23:55:00Z",
  },
  {
    id: 6,
    name: "advance-article",
    html_url: "https://github.com/tantaihaha4487",
    description: "AI-powered article summarizer targeting advanced vocabulary for IELTS 8.5 reading prep.",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["ai", "nlp", "ielts"],
    pushed_at: "2025-05-02T10:44:00Z",
  },
];

export default async function GithubSection() {
  const repos = await getRepos();

  return (
    <section id="projects" className="relative section-pad overflow-hidden">
      {/* Ambient blob */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 opacity-6 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.25) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="mono-label syn-comment">// section_03</span>
            <span className="w-12 h-px opacity-20" style={{ background: "#F472B6" }} />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="syn-keyword" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7em", marginRight: "0.4em" }}>//</span>
              <span>Projects</span>
            </h2>
            <a
              href="https://github.com/tantaihaha4487"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105 flex-shrink-0"
              style={{
                color: "#F472B6",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.04em",
              }}
            >
              <Star size={14} />
              <span>View all</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Cards grid — client component for tilt */}
        <GithubCards repos={repos} langColors={langColors} />

        {/* See more */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/tantaihaha4487?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#8892A4",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            <GitFork size={14} />
            <span>See all repositories</span>
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
