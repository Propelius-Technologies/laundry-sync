"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

/**
 * Site-wide smooth (inertial) scrolling.
 *
 * Wheel input is eased rather than applied instantly, so flicking the wheel
 * hard produces a settled glide instead of a jump. Lenis drives the real
 * window scroll position rather than transforming a wrapper element, which is
 * why the sticky pebble header, `position: sticky` and every
 * IntersectionObserver on the site keep working unchanged.
 *
 * Deliberate option choices:
 *
 * - `syncTouch` stays OFF (the default). Touch devices already have excellent
 *   native momentum, and hijacking it costs responsiveness and fights
 *   pull-to-refresh. This smooths the wheel and keyboard, not fingers.
 *
 * - `respectReducedMotion` stays ON (the default). With
 *   `prefers-reduced-motion: reduce` Lenis forces `lerp` to 1, so scrolling
 *   tracks the input device 1:1 and programmatic scrolls become instant. The
 *   whole effect disappears for anyone who has asked for less motion, which
 *   matches how the rest of the site behaves.
 *
 * - `anchors` on, with no offset, so in-page links (`/#features`, the legal
 *   table of contents) glide to their target. Lenis's `scrollTo` already
 *   subtracts the target's `scroll-margin-top` (6rem in globals.css), the same
 *   rule native anchor jumps use to clear the sticky header. An offset here
 *   as well would apply that clearance twice.
 *
 * Nested scrollers opt out with `data-lenis-prevent`; see the cookie
 * preferences dialog and the mobile menu panel.
 */

/** Anchor glide on touch devices: fixed-length, so it always lands in < 1s. */
const TOUCH_ANCHOR_DURATION = 0.6;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const COARSE = "(pointer: coarse)";
const REDUCED = "(prefers-reduced-motion: reduce)";

type AnchorMode = "default" | "touch" | "reduced";

function subscribeAnchorMode(onChange: () => void) {
  const queries = [COARSE, REDUCED].map((query) => window.matchMedia(query));
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () =>
    queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getAnchorMode(): AnchorMode {
  if (window.matchMedia(REDUCED).matches) return "reduced";
  if (window.matchMedia(COARSE).matches) return "touch";
  return "default";
}

/**
 * How in-page anchor links scroll, per device:
 *
 * - Desktop: Lenis's default lerp glide, unchanged.
 * - Touch (`pointer: coarse`): the lerp glide's long tail made long jumps
 *   take seconds to settle, so they use a fixed 0.6s eased scroll instead.
 * - Reduced motion: an instant jump.
 *
 * No offset in any case - `scroll-margin-top` still sets the 96px landing.
 * The server snapshot is the desktop default; a changed mode re-creates the
 * Lenis instance once, straight after hydration.
 */
function anchorOptions(mode: AnchorMode) {
  if (mode === "reduced") return { immediate: true };
  if (mode === "touch")
    return { duration: TOUCH_ANCHOR_DURATION, easing: easeOutCubic };
  return true;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const anchorMode = useSyncExternalStore(
    subscribeAnchorMode,
    getAnchorMode,
    () => "default" as const,
  );

  return (
    <ReactLenis
      root
      options={{
        /*
         * Frame-rate independent easing factor. 0.1 is Lenis's default and
         * reads as "settled but not sluggish"; lower drifts, higher feels
         * closer to a raw native scroll.
         */
        lerp: 0.1,
        smoothWheel: true,
        anchors: anchorOptions(anchorMode),
        /* Lenis runs its own rAF loop; nothing else needs to drive it. */
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
