"use client";

import { motion } from "framer-motion";
import { Download, Users, ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

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

interface Props {
  projects: Project[];
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function ModrinthCards({ projects }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
        >
          <TiltCard
            className="glass rounded-xl h-full group cursor-pointer"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              minHeight: 180,
            }}
            maxTilt={12}
          >
            <a
              href={`https://modrinth.com/project/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col h-full p-5 gap-4 relative z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className="text-sm font-semibold truncate"
                    style={{
                      color: "#E2E8F0",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {project.title}
                  </span>
                  {project.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="mono-label px-1.5 py-0.5 rounded"
                          style={{
                            background: "rgba(96,165,250,0.07)",
                            color: "rgba(96,165,250,0.6)",
                            fontSize: "0.6rem",
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ExternalLink
                  size={13}
                  className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{ color: "#60A5FA" }}
                />
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed flex-1"
                style={{ color: "#6B7280" }}
              >
                {project.description ?? "No description provided."}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  {project.loaders.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#60A5FA" }}
                      />
                      <span
                        className="mono-label"
                        style={{ color: "#505D6D" }}
                      >
                        {project.loaders[0]}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Download size={10} style={{ color: "#505D6D" }} />
                    <span className="mono-label" style={{ color: "#505D6D" }}>
                      {formatNumber(project.downloads)}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={10} style={{ color: "#505D6D" }} />
                    <span className="mono-label" style={{ color: "#505D6D" }}>
                      {formatNumber(project.followers)}
                    </span>
                  </span>
                </div>
                <span
                  className="mono-label"
                  style={{ color: "#3C4452", fontSize: "0.62rem" }}
                >
                  {timeAgo(project.updated)}
                </span>
              </div>
            </a>

            {/* Blue corner accent on hover */}
            <div
              className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              style={{
                borderTop: "1px solid #60A5FA",
                borderLeft: "1px solid #60A5FA",
              }}
            />
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
