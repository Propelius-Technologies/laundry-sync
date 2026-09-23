"use client";

import { AnimatePresence, motion } from "motion/react";
import { MiniPanel } from "@/components/home/product-capabilities/illustrations/MiniPanel";
import { Calendar, CheckCircle } from "@/components/ui/Icons";
import { pickupSelection } from "@/data/preview-services";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Panel 03 - pickup window and order status.
 *
 * Reuses the section 02 pickup slot and the same three-stage status track the
 * Product Capabilities card uses, so the states line up across the page.
 * Active state highlights the window and advances the order one stage. No
 * tracking, no routing, no delivery predictions - just the status the product
 * actually reports.
 */
export function PickupDeliveryPreview({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const live = active && !reduceMotion;

  return (
    <motion.div
      initial={false}
      animate={live ? { y: -6 } : { y: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <MiniPanel active={active} className="p-3.5">
        <span className="block text-caption font-semibold tracking-[0.06em] text-ls-muted uppercase">
          Pickup scheduled
        </span>

        {/* Pickup window */}
        <span
          className={cn(
            "mt-2.5 flex items-center gap-2 rounded-ls-md border px-2.5 py-2",
            "transition-colors duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
            live
              ? "border-ls-sky-200 bg-ls-sky-50"
              : "border-ls-border bg-white",
          )}
        >
          <Calendar
            className={cn(
              "size-3.5 shrink-0 transition-colors duration-(--motion-slow)",
              live ? "text-ls-navy" : "text-ls-muted",
            )}
          />
          <span className="truncate text-caption font-semibold text-ls-ink">
            {pickupSelection.selectedSlot}
          </span>
        </span>

        {/* Order status */}
        <div className="mt-3">
          <span className="flex items-center justify-between gap-2">
            <span className="text-[0.625rem] tracking-[0.06em] text-ls-muted uppercase">
              Order status
            </span>

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
                  <CheckCircle className="size-3" />
                  Ready
                </motion.span>
              ) : (
                <motion.span
                  key="progress"
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

          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-ls-pill bg-ls-subtle">
            <motion.div
              className={cn(
                "h-full rounded-ls-pill transition-colors duration-(--motion-slow)",
                live ? "bg-ls-success" : "bg-ls-blue",
              )}
              initial={false}
              animate={{ width: live ? "80%" : "45%" }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.55, ease: easeOut }
              }
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[0.5625rem] text-ls-muted">
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
        </div>
      </MiniPanel>
    </motion.div>
  );
}
