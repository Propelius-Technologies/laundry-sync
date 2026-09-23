"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Confirmation mark for the thank-you page: the ring settles in and the tick
 * draws once. Decorative - the heading carries the meaning.
 */
export function SuccessMark({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden="true"
      className={cn("size-16", className)}
      fill="none"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <circle cx="32" cy="32" r="30" fill="var(--color-ls-success-soft)" />
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="var(--color-ls-success)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <motion.path
        d="M20.5 33.5 28 41l15.5-17"
        stroke="var(--color-ls-success)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      />
    </motion.svg>
  );
}
