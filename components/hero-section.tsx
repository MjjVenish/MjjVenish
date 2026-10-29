"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download, Sparkles, MapPin } from "lucide-react";
import { profile } from "@/lib/profile-data";

const shipsWith = ["Next.js", "React", "Node.js", "TypeScript", "Supabase"];

// Staggered CSS entrance delay
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function HeroSection() {
  // As the next section scrolls up, the hero eases back: drifts up, shrinks a
  // touch and fades, while the photo moves slower for a gentle parallax.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="home"
      className="mx-auto max-w-7xl px-4 pt-28 pb-4 sm:px-6"
    >
      <motion.div
        style={reduceMotion ? undefined : { y, scale, opacity }}
        className="origin-top"
      >
        <div className="glass zoom-in relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* Left: copy */}
            <div>
              <p
                className="fade-up mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                style={delay(150)}
              >
                Hello, I&apos;m
              </p>
              <h1
                className="fade-up text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
                style={delay(250)}
              >
                {profile.name}
              </h1>
              <p
                className="fade-up gradient-text mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                style={delay(350)}
              >
                {profile.role}
              </p>
              <p
                className="fade-up mt-5 max-w-md leading-relaxed text-muted-foreground"
                style={delay(450)}
              >
                I build fast, scalable e-commerce experiences with React,
                Next.js and Node.js — owning features end-to-end, from UI to
                REST APIs to relational databases.
              </p>
              <p
                className="fade-up mt-3 flex items-center gap-1.5 text-sm text-muted-foreground"
                style={delay(520)}
              >
                <MapPin className="h-4 w-4 text-primary" />
                {profile.location}
              </p>

              <div
                className="fade-up mt-8 flex flex-wrap gap-3"
                style={delay(600)}
              >
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-lg shadow-foreground/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  View My Work
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={profile.resume}
                  download="Venish_M_Resume.pdf"
                  className="group inline-flex items-center gap-2 rounded-full border border-surface bg-surface/70 px-6 py-3 text-sm font-medium text-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-surface"
                >
                  Download CV
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>

              <div className="fade-up mt-10" style={delay(700)}>
                <p className="mb-3 text-xs text-muted-foreground">
                  Shipping with
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {shipsWith.map((t) => (
                    <li
                      key={t}
                      className="text-lg font-semibold tracking-tight text-foreground/35 transition-colors duration-300 hover:text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: photo */}
            <motion.div style={reduceMotion ? undefined : { y: photoY }}>
              <div
                className="zoom-in relative mx-auto w-full max-w-sm"
                style={delay(300)}
              >
                <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />
                <div className="group relative rounded-4xl border border-surface/90 bg-surface/40 p-3 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                  <div className="relative aspect-3/4 overflow-hidden rounded-3xl">
                    <Image
                      src={profile.photo}
                      alt={`${profile.name} — ${profile.role}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 384px, 90vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Experience badge */}
                <div
                  className="fade-up absolute -top-4 -right-3 sm:-right-8"
                  style={delay(800)}
                >
                  <div className="glass-strong animate-float rounded-2xl px-4 py-3 text-center">
                    <p className="text-3xl font-semibold text-foreground">3+</p>
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      Years of
                      <br />
                      Experience
                    </p>
                  </div>
                </div>

                {/* Sparkle orb */}
                <div
                  className="fade-up absolute top-1/2 -left-5 sm:-left-7"
                  style={delay(900)}
                >
                  <div className="glass-strong flex h-12 w-12 items-center justify-center rounded-full">
                    <Sparkles className="h-5 w-5 animate-pulse text-primary" />
                  </div>
                </div>

                {/* Impact card */}
                <div
                  className="fade-up absolute -right-3 -bottom-5 sm:-right-10"
                  style={delay(1000)}
                >
                  <div className="glass-strong animate-float-delayed w-44 rounded-2xl p-3">
                    <p className="text-[11px] text-muted-foreground">
                      Page load time
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      −35%
                    </p>
                    <svg
                      viewBox="0 0 120 32"
                      className="mt-1 h-8 w-full"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id="spark" x1="0" x2="1">
                          <stop offset="0" stopColor="var(--grad-1)" />
                          <stop offset="1" stopColor="var(--grad-3)" />
                        </linearGradient>
                      </defs>
                      <path
                        className="draw-line"
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
