"use client";

import { motion } from "motion/react";
import { IndependentLaundryPreview } from "./previews/IndependentLaundryPreview";
import { DryCleaningPreview } from "./previews/DryCleaningPreview";
import { PickupDeliveryPreview } from "./previews/PickupDeliveryPreview";
import { Calendar, Droplet, Sparkle } from "@/components/ui/Icons";
import type { Audience, AudienceId } from "@/data/target-audiences";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { useDemoState } from "@/lib/use-demo-state";
import { cn } from "@/lib/utils";

const previews = {
  "independent-laundries": IndependentLaundryPreview,
  "dry-cleaning": DryCleaningPreview,
  "pickup-delivery": PickupDeliveryPreview,
} as const;

/**
 * Each audience gets a different icon treatment, so the three headers do not
 * read as the same badge repeated three times.
 */
const iconStyles: Record<
  AudienceId,
  { icon: typeof Droplet; className: string }
> = {
  "independent-laundries": {
    icon: Droplet,
    className: "rounded-ls-md bg-ls-sky-100 text-ls-navy",
  },
  "dry-cleaning": {
    icon: Sparkle,
    className: "rounded-full bg-ls-aqua-50 text-ls-teal-ink ring-1 ring-ls-aqua/40",
  },
  "pickup-delivery": {
    icon: Calendar,
    className: "rounded-ls-md bg-white text-ls-navy ring-1 ring-ls-border",
  },
};

/**
 * One audience column.
 *
 * Deliberately not a floating card - the three panels share a single white
 * surface split by hairlines, which is what keeps this section from reading as
 * another bento grid. Emphasis on hover is a brand-coloured rule that wipes in
 * along the panel's top edge plus a faint wash, never a lift of the whole
 * panel, so neighbouring columns never shift.
 */
export function AudiencePanel({
  audience,
  revealDelay,
}: {
  audience: Audience;
  revealDelay: number;
}) {
  const Preview = previews[audience.id];
  const { icon: Icon, className: iconClassName } = iconStyles[audience.id];
  const { ref, active, hasHover, reduceMotion, hoverProps, replay } =
    useDemoState<HTMLDivElement>();

  const preview = <Preview active={active} reduceMotion={reduceMotion} />;

  return (
    <motion.div
      ref={ref}
      {...(reduceMotion ? {} : scrollReveal({ delay: revealDelay, amount: 0.2 }))}
      {...hoverProps}
      className={cn(
        "ls-animate relative flex flex-col p-6 sm:p-8",
        "transition-colors duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
        active && "bg-ls-sky-50/45",
      )}
    >
      {/* Brand rule along the top edge, wiping in from the left */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-ls-blue"
        initial={false}
        animate={{ scaleX: active && !reduceMotion ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex items-center gap-3">
        <span className="ls-label text-ls-muted">{audience.number}</span>
        <span
          aria-hidden="true"
          className={cn("grid size-9 shrink-0 place-items-center", iconClassName)}
        >
          <Icon className="size-4" />
        </span>
      </div>

      <h3 className="ls-h3 mt-5 text-[1.0625rem] sm:text-lg">
        {audience.title}
      </h3>
      <p className="ls-body-sm mt-2.5">{audience.description}</p>

      {/* Preview pinned to the panel foot so the three line up */}
      <div className="mt-auto pt-8">
        {hasHover || reduceMotion ? (
          <div role="img" aria-label={audience.previewLabel}>
            {preview}
          </div>
        ) : (
          <button
            type="button"
            onClick={replay}
            aria-label={`Replay the ${audience.title} demonstration`}
            className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)"
          >
            {preview}
          </button>
        )}
      </div>
    </motion.div>
  );
}
