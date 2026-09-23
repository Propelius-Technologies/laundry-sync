"use client";

import { AnimatePresence, motion } from "motion/react";
import { MiniPanel } from "./MiniPanel";
import { CheckCircle } from "@/components/ui/Icons";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Card 03 - the order moves one stage forward.
 *
 * The bar fills from its resting in-progress position toward ready and the
 * status label crossfades to a success tone. A single short run, not a looping
 * progress bar, and no live order data is implied.
 */
export function OrderStatusIllustration({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const live = active && !reduceMotion;

  return (
    <motion.div
      className="w-full"
      initial={false}
      animate={live ? { y: -8 } : { y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <MiniPanel active={active} className="p-3.5">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-caption font-semibold text-ls-ink">
            Order #{capabilitySample.orderId}
          </span>

          <span className="flex shrink-0 items-center gap-1.5">
            <AnimatePresence mode="wait" initial={false}>
              {live ? (
                <motion.span
                  key="ready"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                  className="flex items-center gap-1 text-caption font-semibold text-ls-success"
                >
                  <CheckCircle className="size-3.5" />
                  Ready
                </motion.span>
              ) : (
                <motion.span
                  key="in-progress"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: easeOut }}
                  className="text-caption font-semibold text-ls-navy-600"
                >
                  In progress
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>

        {/* Progress track */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-ls-pill bg-ls-subtle">
          <motion.div
            className={cn(
              "h-full rounded-ls-pill transition-colors duration-(--motion-slow)",
              live ? "bg-ls-success" : "bg-ls-blue",
            )}
            initial={false}
            animate={{ width: live ? "82%" : "46%" }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.6, ease: easeOut }
            }
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[0.5625rem] text-ls-muted">
          {capabilitySample.statusTrack.map((label, index) => (
            <span
              key={label}
              className={cn(
                "transition-colors duration-(--motion-slow)",
                index === 1 && !live && "font-semibold text-ls-navy-600",
                index === 2 && live && "font-semibold text-ls-success",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </MiniPanel>
    </motion.div>
  );
}
