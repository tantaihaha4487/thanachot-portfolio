"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

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

interface Props {
  repos: Repo[];
  langColors: Record<string, string>;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function GithubCards({ repos, langColors }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo, i) => (
        <motion.div
          key={repo.id}
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
              href={repo.html_url}
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
                    {repo.name}
                  </span>
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="mono-label px-1.5 py-0.5 rounded"
                          style={{
                            background: "rgba(244,114,182,0.07)",
                            color: "rgba(244,114,182,0.6)",
                            fontSize: "0.6rem",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ExternalLink
                  size={13}
                  className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{ color: "#F472B6" }}
                />
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed flex-1"
                style={{ color: "#6B7280" }}
              >
                {repo.description ?? "No description provided."}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: langColors[repo.language] ?? "#8892A4" }}
                      />
                      <span
                        className="mono-label"
                        style={{ color: "#505D6D" }}
                      >
                        {repo.language}
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star size={10} style={{ color: "#505D6D" }} />
                    <span className="mono-label" style={{ color: "#505D6D" }}>
                      {repo.stargazers_count}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={10} style={{ color: "#505D6D" }} />
                    <span className="mono-label" style={{ color: "#505D6D" }}>
                      {repo.forks_count}
                    </span>
                  </span>
                </div>
                <span
                  className="mono-label"
                  style={{ color: "#3C4452", fontSize: "0.62rem" }}
                >
                  {timeAgo(repo.pushed_at)}
                </span>
              </div>
            </a>

            {/* Pink corner accent on hover */}
            <div
              className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              style={{
                borderTop: "1px solid #F472B6",
                borderLeft: "1px solid #F472B6",
              }}
            />
          </TiltCard>
        </motion.div>
      ))}
    </div>
  );
}
