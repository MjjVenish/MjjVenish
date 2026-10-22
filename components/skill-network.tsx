"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Gauge,
  Activity,
  Wrench,
  Fingerprint,
  Layers,
  Briefcase,
  TrendingUp,
  CalendarDays,
  Link2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { skillGroups } from "@/lib/profile-data";
import { ease } from "@/components/motion";

type Group = (typeof skillGroups)[number];

const groupIcons: Record<Group["key"], LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  data: Database,
  performance: Gauge,
  analytics: Activity,
  tools: Wrench,
};

const CYCLE_MS = 4200;
const DISC_RADIUS = 76; // half of the core disc (w-36) + a little air

interface Geometry {
  width: number;
  height: number;
  coreX: number;
  coreY: number;
  coreSize: number;
  sources: { x: number; y: number }[] | null; // null below lg (no lines)
  out: { x: number; y: number } | null;
}

export default function SkillNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const passportRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.3 });
  const cycling = inView && !paused && !reduceMotion;
  const group = skillGroups[active];

  // Measure node / core / passport positions to draw the connection lines
  const measure = useCallback(() => {
    const container = containerRef.current;
    const core = coreRef.current;
    if (!container || !core) return;
    const c = container.getBoundingClientRect();
    const k = core.getBoundingClientRect();
    const wide = window.innerWidth >= 1024;
    const p = passportRef.current?.getBoundingClientRect();

    setGeo({
      width: c.width,
      height: c.height,
      coreX: k.left + k.width / 2 - c.left,
      coreY: k.top + k.height / 2 - c.top,
      coreSize: core.offsetWidth,
      sources: wide
        ? nodeRefs.current.map((n) => {
            const r = n?.getBoundingClientRect();
            return r
              ? { x: r.right - c.left, y: r.top + r.height / 2 - c.top }
              : { x: 0, y: 0 };
          })
        : null,
      out: wide && p ? { x: p.left - c.left, y: p.top + p.height / 2 - c.top } : null,
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (passportRef.current) ro.observe(passportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Entry animations move things around; measure again once they settle
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(measure, 1300);
    return () => window.clearTimeout(id);
  }, [inView, measure]);

  // Auto-cycle through categories while visible and not being interacted with
  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % skillGroups.length),
      CYCLE_MS
    );
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  const orbitRadius = geo ? geo.coreSize * (geo.sources ? 0.43 : 0.37) : 0;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease }}
        className="skill-lab relative overflow-hidden rounded-3xl p-6 sm:p-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Header */}
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              Tools &amp; Skills
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              My Skill Network
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              Every skill traces back to real, shipped work. Pick a source to
              see its passport.
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-wider text-slate-500">
            {skillGroups.length} SOURCES ·{" "}
            {skillGroups.reduce((n, g) => n + g.skills.length, 0)} SKILLS
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,15rem)_1fr_minmax(0,19rem)] lg:gap-6"
        >
          {/* Connection lines (desktop) */}
          {geo?.sources && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              width={geo.width}
              height={geo.height}
            >
              <defs>
                {/* userSpaceOnUse: a perfectly straight line has a zero-height
                    bounding box, which would make a bbox-relative filter empty */}
                <filter
                  id="line-glow"
                  filterUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={geo.width}
                  height={geo.height}
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {geo.sources.map((s, i) => {
                const g = skillGroups[i];
                const ex = geo.coreX - DISC_RADIUS;
                const ey = geo.coreY + (i - (geo.sources!.length - 1) / 2) * 9;
                const dx = (ex - s.x) * 0.55;
                const d = `M ${s.x} ${s.y} C ${s.x + dx} ${s.y}, ${ex - dx} ${ey}, ${ex} ${ey}`;
                const isActive = i === active;
                return (
                  <g key={g.key}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={g.color}
                      strokeWidth={isActive ? 2 : 1.2}
                      strokeOpacity={isActive ? 0.95 : 0.28}
                      filter={isActive ? "url(#line-glow)" : undefined}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease, delay: 0.3 + i * 0.12 }}
                      style={{ transition: "stroke-opacity .5s, stroke-width .5s" }}
                    />
                    {/* Flowing dashes */}
                    <path
                      d={d}
                      fill="none"
                      stroke={g.color}
                      strokeWidth={isActive ? 2 : 1}
                      strokeOpacity={isActive ? 0.9 : 0.35}
                      strokeDasharray="3 11"
                      className="dash-flow"
                    />
                    {/* Light pulse travelling to the core */}
                    {!reduceMotion && (
                      <circle r={isActive ? 3.5 : 2.2} fill={g.color} filter="url(#line-glow)">
                        <animateMotion
                          dur={`${2.2 + i * 0.35}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Core → passport */}
              {geo.out && (
                <g>
                  <path
                    d={`M ${geo.coreX + DISC_RADIUS} ${geo.coreY} C ${geo.coreX + DISC_RADIUS + 60} ${geo.coreY}, ${geo.out.x - 60} ${geo.out.y}, ${geo.out.x} ${geo.out.y}`}
                    fill="none"
                    stroke={group.color}
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    strokeDasharray="3 11"
                    className="dash-flow"
                    filter="url(#line-glow)"
                    style={{ transition: "stroke .5s" }}
                  />
                  {!reduceMotion && (
                    <circle r={3.5} fill={group.color} filter="url(#line-glow)">
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        path={`M ${geo.coreX + DISC_RADIUS} ${geo.coreY} C ${geo.coreX + DISC_RADIUS + 60} ${geo.coreY}, ${geo.out.x - 60} ${geo.out.y}, ${geo.out.x} ${geo.out.y}`}
                      />
                    </circle>
                  )}
                </g>
              )}
            </svg>
          )}

          {/* Left: skill sources */}
          <ul className="relative -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {skillGroups.map((g, i) => {
              const Icon = groupIcons[g.key];
              const isActive = i === active;
              return (
                <motion.li
                  key={g.key}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.08 }}
                  className="shrink-0 snap-start"
                >
                  <button
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border bg-white/5 px-3 py-2.5 text-left transition-all duration-500"
                    style={{
                      borderColor: isActive ? g.color : "rgba(255,255,255,0.08)",
                      boxShadow: isActive ? `0 0 24px -6px ${g.color}` : "none",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${g.color}22`, color: g.color }}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-100">
                        {g.title}
                      </span>
                      <span className="block font-mono text-[10px] text-slate-500">
                        {g.code} · {g.skills.length} skills
                      </span>
                    </span>
                    {/* Countdown to the next auto-advance */}
                    {isActive && cycling && (
                      <motion.span
                        key={`progress-${active}`}
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                        style={{ backgroundColor: g.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>

          {/* Center: the core */}
          <div className="relative flex justify-center">
            <motion.div
              ref={coreRef}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              className="relative aspect-square w-full max-w-72 sm:max-w-80"
            >
              {/* Glow tinted by the active source */}
              <div
                className="absolute inset-[18%] rounded-full blur-3xl transition-colors duration-700"
                style={{ backgroundColor: `${group.color}55` }}
              />
              {/* Rotating rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/10 ring-spin-slow" />
              <div className="absolute inset-[9%] rounded-full border border-white/10 ring-spin-mid">
                <span
                  className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full transition-colors duration-700"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 12px ${group.color}` }}
                />
              </div>
              <div className="absolute inset-[24%] rounded-full border border-dotted border-white/15 ring-spin-fast" />

              {/* Core disc */}
              <div className="absolute top-1/2 left-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/80 backdrop-blur-md">
                <span
                  className="absolute inset-0 rounded-full motion-safe:animate-ping"
                  style={{
                    border: `1px solid ${group.color}`,
                    opacity: 0.25,
                    animationDuration: "2.6s",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={group.key}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.35, ease }}
                    className="px-3 text-center"
                  >
                    <p className="font-mono text-[10px] tracking-widest" style={{ color: group.color }}>
                      {group.code}
                    </p>
                    <p className="mt-1 text-sm leading-tight font-semibold text-white">
                      {group.title}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {group.skills.length} skills
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Skills orbiting the core — fly out from the centre */}
              <div className="absolute top-1/2 left-1/2 h-0 w-0">
                <AnimatePresence>
                  {orbitRadius > 0 &&
                    group.skills.map((skill, i) => {
                      const angle = (i / group.skills.length) * Math.PI * 2 - Math.PI / 2;
                      return (
                        <motion.span
                          key={`${group.key}-${skill}`}
                          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                          animate={{
                            opacity: 1,
                            x: Math.cos(angle) * orbitRadius,
                            y: Math.sin(angle) * orbitRadius,
                            scale: 1,
                          }}
                          exit={{ opacity: 0, x: 0, y: 0, scale: 0.4, transition: { duration: 0.3 } }}
                          transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.1 + i * 0.06 }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-slate-950/85 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-slate-100 backdrop-blur"
                          style={{ borderColor: `${group.color}66`, boxShadow: `0 0 14px -4px ${group.color}` }}
                        >
                          {skill}
                        </motion.span>
                      );
                    })}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right: skill passport */}
          <motion.div
            ref={passportRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="relative rounded-2xl border bg-slate-950/70 p-5 backdrop-blur-md transition-colors duration-700"
            style={{ borderColor: `${group.color}55` }}
            aria-live="polite"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-slate-300">
                SKILL PASSPORT
              </p>
              <span
                className="h-2 w-2 rounded-full motion-safe:animate-pulse"
                style={{ backgroundColor: group.color, boxShadow: `0 0 10px ${group.color}` }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.ol
                key={group.key}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="relative space-y-3"
              >
                {/* Vertical trace line */}
                <span className="absolute top-3 bottom-3 left-4 w-px bg-linear-to-b from-white/20 via-white/10 to-transparent" />
                {[
                  { Icon: Fingerprint, label: "SKILL_ID", value: group.code },
                  { Icon: Layers, label: "Stack", value: group.skills.join(" · ") },
                  { Icon: Briefcase, label: "Applied in", value: group.appliedIn },
                  { Icon: TrendingUp, label: "Impact", value: group.impact, highlight: true },
                  { Icon: CalendarDays, label: "In production since", value: group.since },
                ].map(({ Icon, label, value, highlight }) => (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, x: 16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                    }}
                    className="relative flex gap-3"
                  >
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                        {label}
                      </span>
                      <span
                        className={`block text-xs leading-relaxed ${highlight ? "font-semibold" : "text-slate-200"}`}
                        style={highlight ? { color: group.color } : undefined}
                      >
                        {value}
                      </span>
                    </span>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: 16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                  }}
                  className="relative flex gap-3"
                >
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-300">
                    <Link2 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                      Proof
                    </span>
                    {group.proof.href ? (
                      <a
                        href={group.proof.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-sky-300 hover:underline"
                      >
                        {group.proof.label}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="block text-xs text-slate-200">{group.proof.label}</span>
                    )}
                  </span>
                </motion.li>
              </motion.ol>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer strip */}
        <div className="relative mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <p className="text-sm font-semibold tracking-wide text-slate-200">
            Skills aren&apos;t a list —{" "}
            <span className="text-sky-300">they&apos;re a trace of shipped work.</span>
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            {["Traceable", "Measured", "In production", "Evolving"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
