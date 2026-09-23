"use client";

import { AnimatePresence, motion } from "motion/react";
import { MiniPanel } from "@/components/home/product-capabilities/illustrations/MiniPanel";
import { ChevronDown } from "@/components/ui/Icons";
import { pricingGroups } from "@/data/preview-services";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/** Shirt, dry cleaning and duvet - the first three real pricing groups. */
const groups = pricingGroups.slice(0, 3);
const tier = pricingGroups[0].tiers?.[1];

/**
 * Panel 02 - garment care and its pricing.
 *
 * Reuses the section 02 pricing taxonomy, so the tier names and prices are the
 * same illustrative figures shown elsewhere. Active state expands the first
 * category to reveal one tier and its price: the interaction demonstrates how
 * service information is organised, not a transaction.
 */
export function DryCleaningPreview({
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
      <MiniPanel active={active} className="overflow-hidden p-3.5">
        <span className="block text-caption font-semibold tracking-[0.06em] text-ls-muted uppercase">
          Garment care
        </span>

        <ul className="mt-2.5 flex flex-col gap-1.5">
          {groups.map((group, index) => {
            const expanded = live && index === 0;
            return (
              <li key={group.id}>
                <span
                  className={cn(
                    "flex items-center gap-2 rounded-ls-md border px-2.5 py-2",
                    "transition-colors duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
                    expanded
                      ? "border-ls-sky-200 bg-ls-sky-50"
                      : "border-ls-border bg-white",
                  )}
                >
                  <group.icon
                    className={cn(
                      "size-3.5 shrink-0 transition-colors duration-(--motion-slow)",
                      expanded ? "text-ls-navy" : "text-ls-muted",
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate text-caption font-medium text-ls-ink">
                    {group.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-3 shrink-0 text-ls-muted transition-transform duration-(--motion-slow) motion-reduce:transition-none",
                      expanded && "rotate-180",
                    )}
                  />
                </span>

                {/* One pricing detail, revealed for the open category */}
                <AnimatePresence initial={false}>
                  {expanded && tier && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1.5 rounded-ls-md bg-ls-bg-soft px-2.5 py-2">
                        <span className="block text-[0.625rem] font-semibold text-ls-navy">
                          {tier.name}
                        </span>
                        <span className="mt-1 flex items-baseline gap-1.5 text-caption">
                          <span className="shrink-0 text-ls-muted">
                            {tier.items[0].name}
                          </span>
                          <span className="min-w-0 flex-1 translate-y-[-2px] border-b border-dotted border-ls-border" />
                          <span className="shrink-0 font-semibold text-ls-ink">
                            {tier.items[0].price}
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </MiniPanel>
    </motion.div>
  );
}
