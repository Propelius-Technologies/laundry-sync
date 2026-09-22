"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { previewCardLabels, type PreviewScreen } from "@/data/customer-journey";
import { duration, easeInOut, easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Small card that names the screen currently in the phone.
 *
 * Informational only - no focus stop, and marked aria-hidden because the
 * journey buttons already carry the same text as real, focusable content.
 */
export function FloatingStepCard({
  screen,
  className,
}: {
  screen: PreviewScreen;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const label = previewCardLabels[screen];

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "pointer-events-none rounded-ls-lg border border-ls-border bg-white px-4 py-3 shadow-ls-card",
        className,
      )}
      animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 3.5, ease: easeInOut, repeat: Infinity }
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: duration.fast, ease: easeOut }}
        >
          <span className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-ls-blue" />
            <span className="text-body-sm font-semibold whitespace-nowrap text-ls-ink">
              {label.eyebrow ? `${label.eyebrow} / ` : ""}
              {label.title}
            </span>
          </span>
          <span className="mt-0.5 block pl-4 text-caption text-ls-muted">
            {label.caption}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
