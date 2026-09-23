"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useHasHover } from "@/lib/use-has-hover";

/** How long the touch-device demonstration runs before settling back. */
const DEMO_MS = 2300;

/**
 * Drives a miniature product illustration's "active" state.
 *
 * Desktop uses hover (and focus, so keyboard users see it too). Touch has no
 * hover, so the demonstration plays once when the element scrolls into view
 * and settles back, with `replay` available behind a real button. Reduced
 * motion never activates it at all, leaving the resting state on screen.
 *
 * Extracted from the Product Capabilities cards so the Who It's For panels
 * share one implementation rather than a second copy of the same effect.
 */
export function useDemoState<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const hasHover = useHasHover();
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  useEffect(() => {
    if (hasHover || reduceMotion) return;
    if (!inView && replayToken === 0) return;

    const start = window.setTimeout(() => setActive(true), 200);
    const end = window.setTimeout(() => setActive(false), DEMO_MS);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, [hasHover, reduceMotion, inView, replayToken]);

  const hoverProps =
    hasHover && !reduceMotion
      ? {
          onPointerEnter: () => setActive(true),
          onPointerLeave: () => setActive(false),
          onFocusCapture: () => setActive(true),
          onBlurCapture: () => setActive(false),
        }
      : {};

  return {
    ref,
    active,
    hasHover,
    reduceMotion,
    hoverProps,
    replay: () => setReplayToken((token) => token + 1),
  };
}
