"use client";

import { Search, PenTool, Code2, Gauge, Activity } from "lucide-react";
import { process } from "@/lib/profile-data";
import { SectionShell } from "@/components/section-shell";

const icons = [Search, PenTool, Code2, Gauge, Activity];

export default function ProcessSection() {
  return (
    <SectionShell id="process" eyebrow="My Process" title="How I Deliver">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {process.map((step, i) => {
          const Icon = icons[i];
          return (
            <li
              key={step.title}
              className="glass-strong rounded-2xl p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-2xl font-light text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
