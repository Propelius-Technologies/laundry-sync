"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CustomerBrandPreview } from "./CustomerBrandPreview";
import { AdminBrandPreview } from "./AdminBrandPreview";
import {
  previewViewLabels,
  previewViews,
  type BrandPresetId,
  type PreviewView,
} from "@/data/brand-preview";
import { easeOut } from "@/components/motion/motion-tokens";
import { useHasHover } from "@/lib/use-has-hover";
import { cn } from "@/lib/utils";

/**
 * The preview frame: stationary chrome with a swappable body.
 *
 * `data-brand` on this element is what scopes the selected preset - every
 * --preview-brand-* lookup inside resolves here and nowhere else on the page.
 * The frame, the view switcher and the business name all survive a view
 * change, because only the inner body is keyed to the view.
 */
export function BrandPreview({
  businessName,
  brand,
  view,
  onViewChange,
}: {
  businessName: string;
  brand: BrandPresetId;
  view: PreviewView;
  onViewChange: (view: PreviewView) => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const hasHover = useHasHover();

  return (
    <motion.div
      data-brand={brand}
      className={cn(
        "ls-brand-preview rounded-ls-xl border border-ls-border bg-ls-bg-soft p-3 sm:p-4",
        "transition-shadow duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
        "shadow-ls-sm hover:shadow-ls-card",
      )}
      whileHover={hasHover && !reduceMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {/* Frame chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3">
        <span className="ls-label text-ls-muted">Brand preview / concept</span>

        {/*
          View switcher. Plain buttons with aria-pressed rather than a tab
          pattern: the two views are alternative renderings of one preview,
          and a tablist would need panel semantics this frame does not have.
        */}
        <div className="flex items-center gap-1 rounded-ls-pill bg-white p-1 ring-1 ring-ls-border">
          {previewViews.map((option) => {
            const selected = option === view;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => onViewChange(option)}
                className={cn(
                  "rounded-ls-pill px-3 py-1.5 text-caption font-semibold whitespace-nowrap",
                  "transition-colors duration-(--motion-normal) ease-(--motion-ease)",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
                  selected
                    ? "bg-ls-ink text-white"
                    : "text-ls-muted hover:text-ls-ink",
                )}
              >
                {previewViewLabels[option]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Swappable body - the frame above never moves */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.24, ease: easeOut }}
        >
          {view === "customer" ? (
            <CustomerBrandPreview
              businessName={businessName}
              reduceMotion={reduceMotion}
            />
          ) : (
            <AdminBrandPreview businessName={businessName} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
