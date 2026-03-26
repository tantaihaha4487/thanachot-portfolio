import { Download, ExternalLink } from "lucide-react";
import ModrinthCards from "./ModrinthCards";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  downloads: number;
  followers: number;
  categories: string[];
  color: number;
  game_versions: string[];
  loaders: string[];
  project_type: string;
  updated: string;
}

async function getModrinthProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      "https://api.modrinth.com/v2/user/tantaihaha4487/projects",
      {
        next: { revalidate: 3600 },
        headers: {
          "Accept": "application/json",
          "User-Agent": "thanachot-portfolio/1.0 (contact@example.com)",
        },
      }
    );

    if (!res.ok) {
      console.log("Modrinth API failed, using fallback projects");
      return fallbackProjects.sort((a, b) => b.downloads - a.downloads);
    }

    const data: Project[] = await res.json();
    console.log("Fetched Modrinth projects:", data.map(p => ({
      name: p.title,
      downloads: p.downloads
    })));

    return data.sort((a, b) => b.downloads - a.downloads);
  } catch (err) {
    console.error("Error fetching Modrinth projects:", err);
    return fallbackProjects.sort((a, b) => b.downloads - a.downloads);
  }
}

const fallbackProjects: Project[] = [
  {
    id: "1",
    slug: "yurushi",
    title: "Yurushi",
    description: "Discord Integration Whitelist Mod for Fabric. Simplify your server access management.",
    icon_url: null,
    downloads: 0,
    followers: 0,
    categories: ["utility", "server"],
    color: 0xF472B6,
    game_versions: ["1.20.4", "1.21"],
    loaders: ["fabric"],
    project_type: "mod",
    updated: "2026-03-08T16:57:14Z",
  },
];

export default async function ModrinthSection() {
  const projects = await getModrinthProjects();
  const totalDownloads = projects.reduce((sum, project) => sum + project.downloads, 0);

  return (
    <section id="mods" className="relative section-pad overflow-hidden">
      <div
        className="absolute top-0 right-1/4 w-80 h-80 opacity-6 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="mono-label syn-comment">// section_04</span>
            <span className="w-12 h-px opacity-20" style={{ background: "#60A5FA" }} />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span className="syn-keyword" style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.7em", marginRight: "0.4em" }}>//</span>
              <span>Minecraft Mods</span>
            </h2>
            <a
              href="https://modrinth.com/user/tantaihaha4487"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105 flex-shrink-0"
              style={{
                color: "#60A5FA",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "0.04em",
              }}
            >
              <Download size={14} />
              <span>View all</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <ModrinthCards projects={projects} />

        <div className="mt-12 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-[#8892A4] uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-geist-mono)" }}>
              Total Profile Downloads
            </span>
            <div className="flex items-center gap-2 text-3xl font-bold" style={{ color: "#60A5FA", fontFamily: "var(--font-geist-mono)" }}>
              <Download size={24} />
              <span>{totalDownloads.toLocaleString()}</span>
            </div>
          </div>

          <a
            href="https://modrinth.com/user/tantaihaha4487"
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
            <Download size={14} />
            <span>See all mods on Modrinth</span>
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
