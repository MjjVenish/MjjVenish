"use client";

import { Building2, CalendarDays, MapPin, Check } from "lucide-react";
import { experience } from "@/lib/profile-data";
import { SectionShell } from "@/components/section-shell";

export default function ExperienceSection() {
  return (
    <SectionShell id="experience" eyebrow="Experience" title="Where I've Been Shipping">
      <div className="glass-strong rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 pb-5">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-500 text-white">
              <Building2 className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {experience.role}
              </h3>
              <p className="text-sm text-muted-foreground">
                {experience.company} · Client: {experience.client}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              <CalendarDays className="h-3.5 w-3.5" />
              {experience.period}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {experience.location}
            </span>
          </div>
        </div>

        <ul className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
          {experience.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {experience.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
