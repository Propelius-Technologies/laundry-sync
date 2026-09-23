"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ArrowUpRight } from "@/components/ui/Icons";
import { FAQAccordion } from "./FAQAccordion";
import { faqAside } from "@/data/faq";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Section 07 - FAQ.
 *
 * Owns the `faq` id the header nav points at; the global
 * `[id] { scroll-margin-top: 6rem }` rule clears the sticky header.
 *
 * Two-column editorial layout: the heading and contact route on the left, the
 * accordion on the right. The accordion carries its own reveal triggers so a
 * section taller than the viewport still animates row by row.
 */
export function FAQSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="faq" space="lg">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 xl:gap-24">
        {/* Left column - heading and contact route */}
        <div>
          <motion.div {...reveal(0, 10)} className="ls-animate">
            <Eyebrow>
              <span>
                <span className="text-ls-blue">07</span> / Good to know
              </span>
            </Eyebrow>
          </motion.div>

          <h2 className="ls-statement mt-6">
            <motion.span {...reveal(0.08, 18)} className="ls-animate block">
              A few things
            </motion.span>
            <motion.span {...reveal(0.14, 18)} className="ls-animate block">
              you might be
            </motion.span>
            <motion.span
              {...reveal(0.2, 18)}
              className="ls-animate block text-ls-muted"
            >
              wondering.
            </motion.span>
          </h2>

          <motion.p
            {...reveal(0.28)}
            className="ls-animate ls-body-sm mt-8 max-w-[26rem]"
          >
            {faqAside.supporting}
          </motion.p>

          <motion.div {...reveal(0.34)} className="ls-animate mt-6">
            <Link
              href={faqAside.ctaHref}
              className={cn(
                "group inline-flex items-center gap-2 border-b-2 border-ls-sky-200 pb-1.5 text-button font-semibold text-ls-navy",
                "transition-colors duration-(--motion-normal) ease-(--motion-ease) hover:border-ls-blue hover:text-ls-blue",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
              )}
            >
              {faqAside.ctaLabel}
              <ArrowUpRight
                className={cn(
                  "size-4 transition-transform duration-(--motion-normal) ease-(--motion-ease)",
                  "group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* Right column - accordion */}
        <div className="min-w-0">
          <FAQAccordion />
        </div>
      </div>
    </Section>
  );
}
