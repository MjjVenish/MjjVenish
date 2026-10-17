"use client";

import { ArrowUpRight, Briefcase, Layers, Bug } from "lucide-react";
import { stats, impact } from "@/lib/profile-data";
import { Reveal, Eyebrow } from "@/components/section-shell";

const statIcons = [Briefcase, Layers, Bug];

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <Reveal className="glass grid gap-10 rounded-3xl p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <Eyebrow>About Me</Eyebrow>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Building for Performance,
            <br />
            Shipping with Confidence
          </h2>

          <div className="glass-strong mt-8 grid grid-cols-3 gap-2 rounded-2xl p-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <div key={s.label} className="px-2">
                  <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-2xl font-semibold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="leading-relaxed text-muted-foreground">
            I&apos;m a full-stack developer with{" "}
            <strong className="font-semibold text-foreground">
              3+ years of production experience
            </strong>{" "}
            building and scaling e-commerce platforms. At BM e-Solutions I
            maintain a multi-tenant Next.js codebase that runs nine localised
            storefronts for Rocaba Group.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I care about measurable outcomes — fast pages, quick APIs and happy
            customers — and I&apos;m comfortable owning a feature from the UI
            through REST APIs down to PostgreSQL or MySQL.
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {impact.map((m) => (
              <div key={m.label} className="rounded-xl bg-white/60 p-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="gradient-text text-xl font-semibold">{m.value}</dd>
                <dd className="text-[11px] leading-tight text-muted-foreground">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#experience"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-white"
          >
            See My Experience
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
