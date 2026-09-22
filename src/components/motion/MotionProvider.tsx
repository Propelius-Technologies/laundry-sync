"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Applies the site-wide motion policy. `reducedMotion="user"` makes every
 * Motion component honour `prefers-reduced-motion` without per-component code.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
