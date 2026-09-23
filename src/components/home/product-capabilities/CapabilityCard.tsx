"use client";

import { motion } from "motion/react";
import { OrderingIllustration } from "./illustrations/OrderingIllustration";
import { CalendarIllustration } from "./illustrations/CalendarIllustration";
import { OrderStatusIllustration } from "./illustrations/OrderStatusIllustration";
import { BusinessAdminIllustration } from "./illustrations/BusinessAdminIllustration";
import type { ProductCapability } from "@/data/product-capabilities";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { useDemoState } from "@/lib/use-demo-state";
import { cn } from "@/lib/utils";

const illustrations = {
  "customer-experience": OrderingIllustration,
  scheduling: CalendarIllustration,
  "order-visibility": OrderStatusIllustration,
  "business-admin": BusinessAdminIllustration,
} as const;

const toneStyles = {
  sky: "border-ls-sky-200/70 bg-[linear-gradient(150deg,var(--color-ls-sky-50)_0%,var(--color-ls-aqua-50)_100%)]",
  plain: "border-ls-border bg-ls-bg-soft",
} as const;

/**
 * One capability card: a stable content layer plus an independently animated
 * miniature interface.
 *
 * Desktop drives the illustration from hover. Touch has no hover, so the card
 * plays its demonstration once when it scrolls into view and settles back -
 * and the illustration becomes a real button so the demo can be replayed.
 * Reduced motion skips all of it and renders the resting state.
 */
export function CapabilityCard({
  capability,
  revealDelay,
}: {
  capability: ProductCapability;
  revealDelay: number;
}) {
  const Illustration = illustrations[capability.id];
  const bleed = capability.layout === "bleed";
  const { ref, active, hasHover, reduceMotion, hoverProps, replay } =
    useDemoState<HTMLElement>();

  const illustration = (
    <Illustration active={active} reduceMotion={reduceMotion} />
  );

  return (
    <motion.article
      ref={ref}
      {...(reduceMotion ? {} : scrollReveal({ delay: revealDelay, amount: 0.2 }))}
      {...hoverProps}
      className={cn(
        "ls-animate relative flex flex-col overflow-hidden rounded-ls-xl border p-6 sm:p-7",
        /*
          Only the bleeding card needs a floor, because its illustration is
          out of flow and contributes no height. The inline cards are sized by
          their own content, which is what removes the dead space.
        */
        bleed ? "min-h-[17rem] sm:min-h-[19rem]" : "min-h-[14rem]",
        "transition-[border-color,box-shadow] duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
        toneStyles[capability.tone],
        active && "border-ls-sky-200 shadow-ls-card",
      )}
    >
      {/* Content layer - never moves */}
      <div className={cn("relative z-10", bleed && "sm:max-w-[58%]")}>
        <p className="ls-label text-ls-blue">
          {capability.number} / {capability.category}
        </p>
        <h3 className="ls-h3 mt-3">{capability.title}</h3>
        <p className="ls-body-sm mt-2.5">{capability.description}</p>
      </div>

      {/*
        Illustration layer.

        "bleed" is out of flow at the lower-right and runs past the card edge,
        with the copy inset so the two never meet. "inline" stays in flow and
        fully inside the card - `mt-auto` settles it against the bottom so a
        row of cards lines up, while `pt-6` guarantees a gap under the copy.
      */}
      <div
        className={cn(
          "relative z-0 w-full",
          bleed
            ? "mx-auto mt-6 max-w-[17rem] self-end sm:absolute sm:right-[-1.5rem] sm:bottom-5 sm:mt-0 sm:w-[48%] sm:max-w-none lg:right-[-2rem] lg:bottom-6"
            : "mt-auto pt-6",
        )}
      >
        {hasHover || reduceMotion ? (
          <div aria-label={capability.illustrationLabel} role="img">
            {illustration}
          </div>
        ) : (
          <button
            type="button"
            onClick={replay}
            aria-label={`Replay the ${capability.title.replace(/\.$/, "")} demonstration`}
            className="block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)"
          >
            {illustration}
          </button>
        )}
      </div>
    </motion.article>
  );
}
