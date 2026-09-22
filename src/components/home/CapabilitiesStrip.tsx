"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { capabilities, capabilitiesLabel } from "@/data/capabilities";
import { duration, easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";
import styles from "./CapabilitiesStrip.module.css";

/**
 * How many copies of the capability group the track renders.
 *
 * The loop only looks seamless while the copies that remain on screen can
 * still cover the viewport, i.e. (COPIES - 1) x groupWidth >= viewportWidth.
 * One group is roughly 800px and the strip is capped by the 1440px container,
 * so four copies leaves a wide margin at every breakpoint - including when the
 * group is narrower than the viewport, which is the case that usually produces
 * a gap.
 */
const COPIES = 4;

const groups = Array.from({ length: COPIES }, (_, index) => index);

/**
 * Same entrance language as the hero: a short fade with a small lift, label
 * first and the moving row just behind it.
 *
 * `whileInView` with `once` covers both cases - the strip sits right under the
 * hero, so on a tall screen it is already visible on load and plays straight
 * away, and on a short one it waits until it is scrolled to. Reduced motion is
 * handled globally by MotionConfig in MotionProvider.
 */
function enter(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: duration.base, ease: easeOut, delay },
  } as const;
}

/**
 * Slim capabilities strip that sits directly under the hero.
 *
 * Client component only for the Motion entrance - the marquee itself, the
 * hover highlight and the reduced-motion fallback are all CSS.
 */
export function CapabilitiesStrip() {
  return (
    <Section
      space="xs"
      className="border-y border-ls-border"
      aria-label={capabilitiesLabel}
    >
      <div className={styles.row}>
        <motion.div {...enter(0)} className={cn("ls-animate", styles.label)}>
          <Eyebrow>{capabilitiesLabel}</Eyebrow>
        </motion.div>

        <motion.div
          {...enter(0.12)}
          className={cn("ls-animate", styles.viewport)}
        >
          <div
            className={styles.track}
            style={{ "--ls-marquee-copies": COPIES } as CSSProperties}
          >
            {groups.map((groupIndex) => (
              <ul
                key={groupIndex}
                className={styles.group}
                /* Only the first copy is real content; the rest are visual. */
                aria-hidden={groupIndex > 0 ? true : undefined}
              >
                {capabilities.map(({ id, label, icon: Icon }) => (
                  <li key={id} className={styles.item}>
                    <Icon className={styles.icon} />
                    {label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
