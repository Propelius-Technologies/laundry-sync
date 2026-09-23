"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ListIcon, Tag, Users } from "@/components/ui/Icons";
import { BusinessAdminPreview } from "./BusinessAdminPreview";
import { businessCapabilities } from "@/data/admin-preview";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const capabilityIcons = [Tag, ListIcon, Users];

/**
 * Section 04 - Behind the Scenes.
 *
 * Owns the `for-businesses` id the header nav points at; the global
 * `[id] { scroll-margin-top: 6rem }` rule clears the sticky header.
 *
 * Dark navy counterpoint to the lighter sections above it, with the
 * administration workspace as the single visual focus.
 */
export function BusinessExperienceSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="for-businesses" space="lg" tone="dark">
      {/* Two-column editorial header */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end lg:gap-16 xl:gap-24">
        <div>
          <motion.div {...reveal(0, 10)} className="ls-animate">
            <Eyebrow className="text-ls-sky-200/70">
              <span>
                <span className="text-ls-aqua">04</span> / Behind the scenes
              </span>
            </Eyebrow>
          </motion.div>

          <h2 className="ls-statement mt-6 text-white">
            <motion.span {...reveal(0.08, 18)} className="ls-animate block">
              A smoother experience
            </motion.span>
            <motion.span {...reveal(0.16, 18)} className="ls-animate block">
              for the people <span className="text-ls-aqua">running it.</span>
            </motion.span>
          </h2>
        </div>

        <motion.p
          {...reveal(0.24)}
          className="ls-animate text-body-sm leading-relaxed text-ls-sky-200/75 lg:pb-2"
        >
          When a customer places an order, your team needs the details in a
          clear, usable place. LaundrySync brings essential ordering and
          administration workflows together.
        </motion.p>
      </div>

      {/* Administration workspace */}
      <div className="mt-12 lg:mt-16">
        <BusinessAdminPreview />
      </div>

      {/* Three supporting statements */}
      <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10 lg:mt-16">
        {businessCapabilities.map((capability, index) => {
          const Icon = capabilityIcons[index];
          return (
            <motion.li
              key={capability.id}
              {...reveal(0.1 + index * 0.1)}
              className="ls-animate group flex gap-3"
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-5 shrink-0 text-ls-aqua",
                  "transition-transform duration-(--motion-normal) ease-(--motion-ease)",
                  "group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
                )}
              />
              <div className="min-w-0">
                <h3 className="text-body-sm font-semibold text-white">
                  {capability.title}
                </h3>
                <p className="mt-1.5 text-body-sm leading-relaxed text-ls-sky-200/70">
                  {capability.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
