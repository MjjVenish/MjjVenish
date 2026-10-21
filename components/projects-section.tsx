"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { profile, projects } from "@/lib/profile-data";
import { SectionShell } from "@/components/section-shell";
import { MotionGroup, MotionItem } from "@/components/motion";

type Preview = (typeof projects)[number]["preview"];

// Lightweight illustrated previews (no screenshots needed)
function ProjectPreview({ kind }: { kind: Preview }) {
  if (kind === "cricket") {
    return (
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex items-center justify-between rounded-lg bg-surface/90 px-3 py-2 shadow-sm">
          <span className="text-[10px] font-semibold text-foreground">IND XI vs CSK XI</span>
          <span className="flex items-center gap-1 text-[9px] font-semibold text-red-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            LIVE
          </span>
        </div>
        <div className="rounded-lg bg-surface/90 px-3 py-2 shadow-sm">
          <p className="text-xl font-bold text-foreground">
            142/4 <span className="text-xs font-normal text-muted-foreground">(16.3)</span>
          </p>
          <div className="mt-2 flex gap-1">
            {["1", "4", "•", "6", "Nb", "2"].map((b, i) => (
              <span
                key={i}
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
                  b === "6" || b === "4"
                    ? "bg-primary text-primary-foreground"
                    : b === "Nb"
                      ? "bg-amber-400 text-white"
                      : "bg-secondary text-foreground"
                }`}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex h-8 items-end gap-1">
          {[30, 45, 25, 60, 40, 75, 55, 90].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-primary/60" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "shop") {
    return (
      <div className="grid h-full grid-cols-3 gap-2 p-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col rounded-lg bg-surface/90 p-1.5 shadow-sm">
            <div className="flex-1 rounded-md bg-linear-to-br from-accent/20 to-primary/35" />
            <div className="mt-1 h-1 w-3/4 rounded bg-foreground/15" />
            <div className="mt-0.5 h-1 w-1/3 rounded bg-primary/60" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="relative h-full p-4">
      {["UK", "IE", "FR", "DE"].map((c, i) => (
        <div
          key={c}
          className="absolute w-3/5 rounded-lg bg-surface/95 p-2 shadow-md"
          style={{ left: `${10 + i * 9}%`, top: `${12 + i * 16}%` }}
        >
          <div className="flex items-center gap-1.5">
            <span className="rounded bg-primary px-1 text-[8px] font-bold text-white">{c}</span>
            <span className="h-1 flex-1 rounded bg-foreground/15" />
          </div>
          <div className="mt-1.5 h-1 w-2/3 rounded bg-foreground/10" />
        </div>
      ))}
    </div>
  );
}

const previewBg: Record<Preview, string> = {
  cricket: "from-primary/25 via-accent/10 to-surface",
  shop: "from-accent/25 via-primary/10 to-surface",
  tenants: "from-primary/15 via-accent/15 to-primary/10",
};

export default function ProjectsSection() {
  return (
    <SectionShell
      id="work"
      eyebrow="Featured Projects"
      title="Selected Work"
      action={
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-surface bg-surface/70 px-5 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-surface"
        >
          View GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      }
    >
      <MotionGroup stagger={0.15} delay={0.2} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const href = p.live ?? p.repo;
          return (
            <MotionItem
              as="article"
              key={p.title}
              effect="up"
              lift
              className="glass-strong lift group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className={`h-48 bg-linear-to-br ${previewBg[p.preview]}`}>
                <ProjectPreview kind={p.preview} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.type}</p>
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface shadow-sm transition group-hover:bg-foreground group-hover:text-background"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-medium text-primary hover:underline">
                      Live demo
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                </div>
              </div>
            </MotionItem>
          );
        })}
      </MotionGroup>
    </SectionShell>
  );
}
