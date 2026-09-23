"use client";

import { useEffect, useState } from "react";

/**
 * True only on devices with a real pointer that can hover.
 *
 * Optimistically starts TRUE, then resolves in an effect.
 *
 * The server cannot know the pointer type, so something has to be assumed.
 * Assuming hover means the markup shipped to no-JS and to desktop is the
 * pointer-capable variant - no touch-only affordances (replay buttons and the
 * like) are rendered for people who cannot use them, and desktop never
 * flashes a different element on hydration. Touch devices simply swap once
 * the effect runs, and nothing gated on this can misfire in the meantime:
 * a touch device never emits a hover event regardless of the flag.
 */
export function useHasHover() {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hasHover;
}
