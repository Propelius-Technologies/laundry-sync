"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { JourneySteps } from "./JourneySteps";
import { CustomerPhonePreview } from "./CustomerPhonePreview";
import { FloatingStepCard } from "./FloatingStepCard";
import { scrollReveal } from "@/components/motion/motion-tokens";
import type { PreviewScreen } from "@/data/customer-journey";

/**
 * "The Customer Experience" - five journey steps driving one phone preview,
 * with two extra product screens available alongside them.
 *
 * Owns the `how-it-works` id that the header nav and the hero's secondary CTA
 * already point at. The global `[id] { scroll-margin-top: 6rem }` rule in
 * globals.css keeps the sticky header clear of the heading.
 */
export function CustomerExperienceSection() {
  const [screen, setScreen] = useState<PreviewScreen>("services");
  const reduceMotion = useReducedMotion();

  /** Spread onto a motion element; collapses to nothing for reduced motion. */
  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="how-it-works" space="lg" tone="soft">
      {/* Centred section header */}
      <div className="mx-auto max-w-[44rem] text-center">
        <motion.div {...reveal(0, 10)} className="ls-animate flex justify-center">
          <Eyebrow>
            <span>
              <span className="text-ls-blue">02</span> / The customer experience
            </span>
          </Eyebrow>
        </motion.div>

        <motion.h2
          {...reveal(0.08, 18)}
          className="ls-animate ls-statement mt-6"
        >
          <span className="block">From first tap</span>
          <span className="text-ls-muted">to fresh delivery.</span>
        </motion.h2>

        <motion.p
          {...reveal(0.18)}
          className="ls-animate ls-body mx-auto mt-6 max-w-[34rem]"
        >
          Explore the key moments of a LaundrySync order. Select any step to see
          the customer experience.
        </motion.p>
      </div>

      {/* Journey list + phone preview */}
      <div className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)] lg:gap-12 xl:gap-16">
        <motion.div {...reveal(0.1)} className="ls-animate min-w-0">
          <JourneySteps active={screen} onSelect={setScreen} />
        </motion.div>

        <div className="relative min-w-0">
          <CustomerPhonePreview screen={screen} />

          {/*
            Above the phone on small screens, floating at its top-right from lg
            up - where it has room without covering the product UI.
          */}
          <FloatingStepCard
            screen={screen}
            className="mx-auto mt-6 w-fit lg:absolute lg:top-[14%] lg:right-0 lg:z-10 lg:mt-0 xl:right-4"
          />
        </div>
      </div>
    </Section>
  );
}
