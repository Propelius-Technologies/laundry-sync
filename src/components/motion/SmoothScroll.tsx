"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

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
 * - `anchors` with a negative offset so in-page links (`/#features`, the legal
 *   table of contents) glide to their target and still clear the sticky
 *   header. It mirrors the `scroll-margin-top: 6rem` rule in globals.css,
 *   which the browser applies to native anchor jumps but Lenis's own
 *   `scrollTo` does not.
 *
 * Nested scrollers opt out with `data-lenis-prevent`; see the cookie
 * preferences dialog and the mobile menu panel.
 */

/** Matches `scroll-margin-top: 6rem` in globals.css. Negative = stop above. */
const HEADER_OFFSET = -96;

export function SmoothScroll({ children }: { children: ReactNode }) {
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
        anchors: { offset: HEADER_OFFSET },
        /* Lenis runs its own rAF loop; nothing else needs to drive it. */
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
