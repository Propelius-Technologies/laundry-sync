"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { CapabilityCard } from "./CapabilityCard";
import {
  capabilitiesCta,
  productCapabilities,
} from "@/data/product-capabilities";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Section 03 - Product Capabilities.
 *
 * Owns the `features` id the header nav points at; the global
 * `[id] { scroll-margin-top: 6rem }` rule keeps the sticky header clear.
 *
 * The header, each card and the CTA carry their own viewport triggers, so a
 * section this tall never holds content back waiting for one of them.
 */
export function ProductCapabilitiesSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="features" space="lg">
      {/* Two-column header: statement left, supporting copy right */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end lg:gap-16 xl:gap-24">
        <div>
          <motion.div {...reveal(0, 10)} className="ls-animate">
            <Eyebrow>
              <span>
                <span className="text-ls-blue">03</span> / Product capabilities
              </span>
            </Eyebrow>
          </motion.div>

          <h2 className="ls-statement mt-6">
            <motion.span {...reveal(0.08, 18)} className="ls-animate block">
              Thoughtful tools.
            </motion.span>
            <motion.span
              {...reveal(0.16, 18)}
              className="ls-animate block text-ls-muted"
            >
              Connected moments.
            </motion.span>
          </h2>
        </div>

        <motion.p
          {...reveal(0.24)}
          className="ls-animate ls-body-sm lg:pb-2"
        >
          Every part of the experience works toward a simpler way to take an
          order and keep it moving.
        </motion.p>
      </div>

      {/* 2 x 2 capability grid */}
      <div className="mt-14 grid gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-2">
        {productCapabilities.map((capability, index) => (
          <CapabilityCard
            key={capability.id}
            capability={capability}
            /* Row-paired: cards 01/02 enter together, then 03/04. */
            revealDelay={Math.floor(index / 2) * 0.12}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.p
        {...reveal(0.1)}
        className="ls-animate mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center lg:mt-14"
      >
        <span className="ls-body-sm">{capabilitiesCta.lead}</span>
        <Link
          href={capabilitiesCta.href}
          className={cn(
            "group inline-flex items-center gap-1.5 text-body-sm font-semibold text-ls-navy",
            "transition-colors duration-(--motion-normal) ease-(--motion-ease) hover:text-ls-blue",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
          )}
        >
          {capabilitiesCta.label}
          <ArrowRight
            className={cn(
              "size-4 transition-transform duration-(--motion-normal) ease-(--motion-ease)",
              "group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
            )}
          />
        </Link>
      </motion.p>
    </Section>
  );
}
