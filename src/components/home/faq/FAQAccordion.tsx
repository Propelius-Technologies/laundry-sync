"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FAQItem } from "./FAQItem";
import { faqEntries } from "@/data/faq";
import { scrollReveal } from "@/components/motion/motion-tokens";

/**
 * Single-open accordion. The first entry starts expanded; clicking the open
 * question closes it and leaves everything collapsed, rather than forcing
 * another one open.
 *
 * One piece of state owns which entry is open, so two answers can never be
 * expanded at once however fast the visitor clicks.
 */
export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqEntries[0].id);
  const reduceMotion = useReducedMotion() ?? false;
  const idPrefix = useId().replace(/:/g, "");

  return (
    <div className="border-t border-ls-border">
      {faqEntries.map((entry, index) => (
        <motion.div
          key={entry.id}
          {...(reduceMotion
            ? {}
            : scrollReveal({ delay: index * 0.06, distance: 12, amount: 0.15 }))}
          className="ls-animate"
        >
          <FAQItem
            entry={entry}
            open={openId === entry.id}
            onToggle={() =>
              setOpenId((current) => (current === entry.id ? null : entry.id))
            }
            reduceMotion={reduceMotion}
            idPrefix={idPrefix}
          />
        </motion.div>
      ))}
    </div>
  );
}
