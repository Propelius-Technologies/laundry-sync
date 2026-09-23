"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { AudiencePanel } from "./AudiencePanel";
import { audiences } from "@/data/target-audiences";
import { scrollReveal } from "@/components/motion/motion-tokens";

/**
 * Section 06 - Who It's For.
 *
 * A centred introduction over three editorial business-profile columns. The
 * columns share one white surface divided by hairlines rather than sitting as
 * separate cards, which keeps this distinct from the Product Capabilities
 * bento grid while staying inside the same design system.
 */
export function WhoItsForSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="who-its-for" space="lg" tone="soft">
      {/* Centred introduction */}
      <div className="mx-auto max-w-[46rem] text-center">
        <motion.div {...reveal(0, 10)} className="ls-animate flex justify-center">
          <Eyebrow>
            <span>
              <span className="text-ls-blue">06</span> / Who it&rsquo;s for
            </span>
          </Eyebrow>
        </motion.div>

        <h2 className="ls-statement mt-6">
          <motion.span {...reveal(0.08, 18)} className="ls-animate block">
            For the laundry businesses
          </motion.span>
          <motion.span {...reveal(0.16, 18)} className="ls-animate block">
            that want to <span className="text-ls-muted">move forward.</span>
          </motion.span>
        </h2>
      </div>

      {/*
        One surface, three columns. `divide-*` draws the hairlines between
        panels, switching axis at lg so the rules follow the layout.
      */}
      <div className="mt-14 overflow-hidden rounded-ls-xl border border-ls-border bg-white shadow-ls-sm lg:mt-20">
        <div className="grid divide-y divide-ls-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {audiences.map((audience, index) => (
            <AudiencePanel
              key={audience.id}
              audience={audience}
              revealDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
