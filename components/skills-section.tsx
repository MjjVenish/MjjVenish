"use client";

import { ArrowUpRight, Code2, Server, Gauge, Plug } from "lucide-react";
import { services, technologies, toolbelt } from "@/lib/profile-data";
import { SectionShell } from "@/components/section-shell";

const serviceStyle = {
  frontend: { Icon: Code2, tint: "bg-amber-100 text-amber-600" },
  backend: { Icon: Server, tint: "bg-violet-100 text-violet-600" },
  performance: { Icon: Gauge, tint: "bg-indigo-100 text-indigo-600" },
  integrations: { Icon: Plug, tint: "bg-teal-100 text-teal-600" },
} as const;

export function ServicesSection() {
  return (
    <SectionShell id="services" eyebrow="What I Do" title="Services I Offer">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const { Icon, tint } = serviceStyle[s.key];
          return (
            <div
              key={s.key}
              className="glass-strong group relative flex flex-col rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <span
                className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <ArrowUpRight className="mt-4 h-4 w-4 self-end text-muted-foreground transition group-hover:text-primary" />
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export default function SkillsSection() {
  return (
    <SectionShell id="skills" eyebrow="Tools & Skills" title="Technologies I Use">
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {technologies.map((t) => (
          <li
            key={t.name}
            className="glass-strong flex flex-col items-center gap-2 rounded-2xl px-2 py-4 transition hover:-translate-y-1"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: t.color }}
            >
              {t.short}
            </span>
            <span className="text-center text-xs text-muted-foreground">
              {t.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {toolbelt.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white bg-white/60 px-3 py-1 text-xs text-muted-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </SectionShell>
  );
}
