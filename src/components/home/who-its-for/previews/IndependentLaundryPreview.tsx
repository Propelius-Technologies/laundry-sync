"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  MiniIconTile,
  MiniPanel,
} from "@/components/home/product-capabilities/illustrations/MiniPanel";
import { Check, Droplet, Sparkle } from "@/components/ui/Icons";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const icons = [Droplet, Sparkle];

/**
 * Panel 01 - service selection.
 *
 * Uses the same two services as the section 02 phone previews. Active state
 * marks the first row as chosen and reveals its quantity picker: the point is
 * that a customer picks services directly, not that an order is finished.
 */
export function IndependentLaundryPreview({
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
          Services
        </span>

        <ul className="mt-2.5 flex flex-col gap-1.5">
          {capabilitySample.services.map((service, index) => {
            const Icon = icons[index];
            const selected = live && index === 0;
            return (
              <li
                key={service.name}
                className={cn(
                  "flex items-center gap-2.5 rounded-ls-md border px-2.5 py-2",
                  "transition-colors duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
                  selected
                    ? "border-ls-sky-200 bg-ls-sky-50"
                    : "border-ls-border bg-white",
                )}
              >
                <MiniIconTile className="size-5">
                  <Icon className="size-3" />
                </MiniIconTile>

                <span className="min-w-0 flex-1 truncate text-caption font-medium text-ls-ink">
                  {service.name}
                </span>

                <AnimatePresence initial={false} mode="wait">
                  {selected ? (
                    /* Quantity picker appears only once the row is chosen */
                    <motion.span
                      key="qty"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      className="flex shrink-0 items-center gap-1.5 rounded-ls-pill bg-white px-1.5 py-0.5 ring-1 ring-ls-sky-200"
                    >
                      <span className="text-[0.625rem] text-ls-muted">−</span>
                      <span className="text-[0.625rem] font-semibold text-ls-ink">
                        2
                      </span>
                      <span className="text-[0.625rem] font-semibold text-ls-navy">
                        +
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="dot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      className="size-3.5 shrink-0 rounded-full border border-ls-border"
                    />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <span
          className={cn(
            "mt-2.5 flex items-center justify-center gap-1.5 rounded-ls-md py-1.5 text-caption font-semibold",
            "transition-colors duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
            live ? "bg-ls-navy text-white" : "bg-ls-subtle text-ls-muted",
          )}
        >
          {live && <Check className="size-3" strokeWidth={3} />}
          Select service
        </span>
      </MiniPanel>
    </motion.div>
  );
}
