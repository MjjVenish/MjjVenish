"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Sparkles, MapPin } from "lucide-react";
import { profile } from "@/lib/profile-data";

const shipsWith = ["Next.js", "React", "Node.js", "TypeScript", "Supabase"];

export default function HeroSection() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-4 pt-28 pb-4 sm:px-6">
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: copy */}
          <div className="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Hello, I&apos;m
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {profile.name}
            </h1>
            <p className="gradient-text mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile.role}
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              I build fast, scalable e-commerce experiences with React, Next.js
              and Node.js — owning features end-to-end, from UI to REST APIs to
              relational databases.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {profile.location}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg shadow-foreground/20 transition hover:-translate-y-0.5"
              >
                View My Work
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-6 py-3 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-xs text-muted-foreground">Shipping with</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {shipsWith.map((t) => (
                  <li
                    key={t}
                    className="text-lg font-semibold tracking-tight text-foreground/35"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: photo */}
          <div
            className="fade-up relative mx-auto w-full max-w-sm"
            style={{ animationDelay: "150ms" }}
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-violet-300/50 via-indigo-200/40 to-white/0 blur-2xl" />
            <div className="relative rounded-4xl border border-white/90 bg-white/40 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} — ${profile.role}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Experience badge */}
            <div className="glass-strong animate-float absolute -top-4 -right-3 rounded-2xl px-4 py-3 text-center sm:-right-8">
              <p className="text-3xl font-semibold text-foreground">3+</p>
              <p className="text-[11px] leading-tight text-muted-foreground">
                Years of
                <br />
                Experience
              </p>
            </div>

            {/* Sparkle orb */}
            <div className="glass-strong absolute top-1/2 -left-5 flex h-12 w-12 items-center justify-center rounded-full sm:-left-7">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            {/* Impact card */}
            <div className="glass-strong animate-float-delayed absolute -right-3 -bottom-5 w-44 rounded-2xl p-3 sm:-right-10">
              <p className="text-[11px] text-muted-foreground">Page load time</p>
              <p className="text-lg font-semibold text-foreground">−35%</p>
              <svg viewBox="0 0 120 32" className="mt-1 h-8 w-full" aria-hidden>
                <defs>
                  <linearGradient id="spark" x1="0" x2="1">
                    <stop offset="0" stopColor="hsl(258 84% 62%)" />
                    <stop offset="1" stopColor="hsl(222 92% 66%)" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 6 L18 9 L32 7 L46 14 L60 12 L74 19 L88 18 L102 25 L118 28"
                  fill="none"
                  stroke="url(#spark)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
