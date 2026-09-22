import type { Transition } from "motion/react";

/**
 * Shared motion language for LaundrySync - the JavaScript half.
 *
 * These values drive Motion entrance choreography (hero reveals, step
 * crossfades) and are deliberately slower than the CSS micro-interaction
 * durations in src/styles/tokens.css (--motion-fast / normal / slow), which
 * cover hover and focus feedback. Two sets, two jobs - see
 * docs/DESIGN_SYSTEM.md.
 *
 * Everything is transform/opacity only, restrained, and short enough that the
 * hero has settled well before a visitor finishes reading the headline.
 */

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const duration = {
  fast: 0.28,
  base: 0.5,
  slow: 0.7,
} as const;

/** Hero entrance choreography, in seconds. Header is excluded on purpose. */
export const heroSequence = {
  eyebrow: 0.05,
  heading: 0.12,
  body: 0.26,
  ctas: 0.34,
  points: 0.42,
  laptop: 0.3,
  phone: 0.48,
  notificationOne: 0.68,
  notificationTwo: 0.82,
} as const;

/**
 * Scroll-triggered reveal: a short fade with a small lift, played once when
 * the element scrolls into view. Spread onto any motion component.
 *
 * `amount` is how much of the element must be visible to trigger. Keep it low
 * for tall blocks - a section taller than the viewport would never reach a
 * high threshold.
 */
export function scrollReveal({
  delay = 0,
  distance = 14,
  amount = 0.2,
  duration: d = duration.base,
}: {
  delay?: number;
  distance?: number;
  amount?: number;
  duration?: number;
} = {}) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: d, ease: easeOut, delay },
  } as const;
}

/** Slow vertical drift for the floating notification cards (3-5px). */
export const floatTransition: Transition = {
  duration: 5.5,
  ease: easeInOut,
  repeat: Infinity,
  repeatType: "reverse",
};

