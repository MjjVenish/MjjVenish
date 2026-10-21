"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

/*
 * Scroll-triggered entry animations built on framer-motion.
 * Only transform + opacity are animated (GPU composited, 60fps).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in components/providers.tsx (transforms are skipped, content just fades).
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export type Effect = "up" | "left" | "right" | "pop" | "fade" | "line";

const effects: Record<Effect, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
  },
  pop: {
    hidden: { opacity: 0, scale: 0.8, y: 14 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease } },
  },
  line: {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.1, ease } },
  },
};

const hoverLift = {
  y: -6,
  transition: { type: "spring", stiffness: 320, damping: 22 },
} as const;

type Tag = "div" | "ul" | "ol" | "li" | "dl" | "article" | "form" | "span" | "p" | "h2";

type BaseProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  as?: Tag;
};

// Static lookup so components are never created during render
const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  article: motion.article,
  form: motion.form,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
} as unknown as Record<Tag, typeof motion.div>;

/**
 * Stagger container: plays when it scrolls into view and cascades its
 * <MotionItem> children one after another.
 */
export function MotionGroup({
  as = "div",
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  effect,
  ...props
}: BaseProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
  /** Optional entrance for the container itself */
  effect?: Effect;
}) {
  const Comp = tags[as];
  const own = effect ? effects[effect] : { hidden: {}, show: {} };
  const variants: Variants = {
    hidden: own.hidden,
    show: {
      ...(own.show as object),
      transition: {
        ...((own.show as { transition?: object }).transition ?? {}),
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
      {...props}
    />
  );
}

/** Child of a MotionGroup — inherits the group's timing. */
export function MotionItem({
  as = "div",
  effect = "up",
  lift = false,
  ...props
}: BaseProps & { effect?: Effect; lift?: boolean }) {
  const Comp = tags[as];
  const reduceMotion = useReducedMotion();
  return (
    <Comp
      variants={effects[effect]}
      whileHover={lift && !reduceMotion ? hoverLift : undefined}
      {...props}
    />
  );
}
