"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

/**
 * Locks page scrolling while an overlay is open.
 *
 * `overflow: hidden` on the body alone is not enough once smooth scrolling is
 * running: Lenis listens for wheel events and drives `window.scrollTo`
 * directly, so without stopping it the page behind an open sheet or dialog can
 * still be scrolled with the wheel.
 *
 * `lenis.stop()` also applies `overflow: clip` to the root through Lenis's own
 * stylesheet, so the lock holds even where the body rule does not.
 *
 * Scroll position is preserved: Lenis resumes exactly where it paused, so
 * closing an overlay does not jump the page to the top.
 *
 * Safe when Lenis is absent - `useLenis()` returns undefined before the
 * provider mounts, and the body rule still applies on its own.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [locked, lenis]);
}
