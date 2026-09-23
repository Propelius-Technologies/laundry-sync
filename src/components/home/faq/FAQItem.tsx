"use client";

import { motion } from "motion/react";
import type { FaqEntry } from "@/data/faq";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * One question and its answer panel.
 *
 * The panel stays mounted at height 0 rather than unmounting, for three
 * reasons: every answer ships in the server-rendered HTML, `aria-controls`
 * always points at a real element, and there is no AnimatePresence exit to
 * race when someone clicks quickly. `inert` keeps the collapsed copy out of
 * the tab order and away from assistive tech.
 */
export function FAQItem({
  entry,
  open,
  onToggle,
  reduceMotion,
  idPrefix,
}: {
  entry: FaqEntry;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
  idPrefix: string;
}) {
  const buttonId = `${idPrefix}-q-${entry.id}`;
  const panelId = `${idPrefix}-a-${entry.id}`;
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: easeOut };

  return (
    <div className="border-b border-ls-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "group flex w-full items-start justify-between gap-6 py-5 text-left",
            "transition-colors duration-(--motion-normal) ease-(--motion-ease) motion-reduce:transition-none",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
            open ? "text-ls-ink" : "text-ls-text hover:text-ls-navy",
          )}
        >
          <span className="text-body-sm font-semibold sm:text-base">
            {entry.question}
          </span>

          {/*
            Plus that morphs into a minus - the vertical bar rotates away and
            collapses. Avoids swapping two icons mid-transition.
          */}
          <span
            aria-hidden="true"
            className="relative mt-0.5 grid size-5 shrink-0 place-items-center text-ls-blue"
          >
            <span className="absolute h-px w-3.5 rounded-full bg-current" />
            <motion.span
              className="absolute h-3.5 w-px rounded-full bg-current"
              initial={false}
              animate={{ scaleY: open ? 0 : 1 }}
              transition={transition}
            />
          </span>
        </button>
      </h3>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={open ? undefined : true}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={transition}
        className="overflow-hidden"
      >
        {/* Inner wrapper so the padding collapses with the panel */}
        <p className="ls-body-sm pr-10 pb-6">{entry.answer}</p>
      </motion.div>
    </div>
  );
}
