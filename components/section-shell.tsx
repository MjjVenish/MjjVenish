"use client";

import type { ReactNode } from "react";
import { MotionGroup, MotionItem } from "@/components/motion";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </p>
  );
}

/** Animated section heading: eyebrow slides in, title rises, accent bar draws. */
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <div>
      <MotionItem effect="left">
        <Eyebrow>{eyebrow}</Eyebrow>
      </MotionItem>
      <MotionItem as="h2" className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </MotionItem>
      <MotionItem
        as="span"
        effect="line"
        aria-hidden
        className="mt-3 block h-0.5 w-12 origin-left rounded-full bg-linear-to-r from-primary to-accent"
      />
    </div>
  );
}

export function SectionShell({
  id,
  eyebrow,
  title,
  action,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      {/* Panel rises in, then the heading pieces cascade */}
      <MotionGroup
        effect="up"
        stagger={0.1}
        delay={0.15}
        amount={0.12}
        className="glass rounded-3xl p-6 sm:p-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={eyebrow} title={title} />
          {action && <MotionItem effect="right">{action}</MotionItem>}
        </div>
        {children}
      </MotionGroup>
    </section>
  );
}
