"use client";

import { ArrowUpRight, Code2, Server, Gauge, Plug } from "lucide-react";
import { services } from "@/lib/profile-data";
import { SectionShell } from "@/components/section-shell";
import { MotionGroup, MotionItem } from "@/components/motion";

const serviceStyle = {
  frontend: { Icon: Code2, tint: "bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300" },
  backend: { Icon: Server, tint: "bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300" },
  performance: { Icon: Gauge, tint: "bg-indigo-100 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300" },
  integrations: { Icon: Plug, tint: "bg-teal-100 text-teal-600 dark:bg-teal-400/15 dark:text-teal-300" },
} as const;

export function ServicesSection() {
  return (
    <SectionShell id="services" eyebrow="What I Do" title="Services I Offer">
      {/* Cards rise in left-to-right */}
      <MotionGroup stagger={0.12} delay={0.2} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const { Icon, tint } = serviceStyle[s.key];
          return (
            <MotionItem
              key={s.key}
              effect="up"
              lift
              className="glass-strong lift group relative flex flex-col rounded-2xl p-5"
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
            </MotionItem>
          );
        })}
      </MotionGroup>
    </SectionShell>
  );
}
