"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { duration, easeOut, scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Section content. Kept next to the markup rather than in src/data because it
 * is used exactly once and has no other consumer.
 */
const benefits = [
  {
    number: "01",
    title: "Customer-first",
    description: "Ordering from a familiar, branded experience.",
  },
  {
    number: "02",
    title: "Team-connected",
    description: "Order details available in the business admin.",
  },
  {
    number: "03",
    title: "Less back-and-forth",
    description: "Clearer service, scheduling and status information.",
  },
];

/**
 * Pending destination: the Customer Journey section has not been built yet, so
 * this anchor currently resolves to the placeholder in app/page.tsx. It will
 * land on the real section once that takes over the id.
 */
const JOURNEY_HREF = "/#how-it-works";

/** Stagger for the three benefit statements, in seconds. */
const BENEFIT_STAGGER = 0.12;

const benefitsListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: BENEFIT_STAGGER, delayChildren: 0.1 } },
} as const;

const benefitItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeOut },
  },
} as const;

/**
 * "The Opportunity" - the first content section, an editorial two-column
 * statement that gives the page room to breathe after the product-heavy hero.
 *
 * Reveals on scroll rather than on load, in three independently triggered
 * groups (heading block, divider, benefits) so a section taller than the
 * viewport never sits behind one trigger waiting to appear.
 */
export function OpportunitySection() {
  const reduceMotion = useReducedMotion();

  /** Spread onto a motion element; collapses to nothing for reduced motion. */
  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="opportunity" space="lg">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        {/* Left column - label and statement */}
        <div>
          <motion.div {...reveal(0, 10)} className="ls-animate">
            <Eyebrow>
              <span>
                <span className="text-ls-blue">01</span> / The opportunity
              </span>
            </Eyebrow>
          </motion.div>

          <h2 className="ls-statement mt-6 lg:mt-8">
            <motion.span
              {...reveal(0.08, 20)}
              className="ls-animate block"
            >
              <span className="block">Your service is</span>
              <span className="block">personal.</span>
            </motion.span>
            <motion.span
              {...reveal(0.18, 20)}
              className="ls-animate block text-ls-muted"
            >
              <span className="block">Your ordering should</span>
              <span className="block">be, too.</span>
            </motion.span>
          </h2>
        </div>

        {/* Right column - supporting copy and the editorial CTA */}
        <div className="flex flex-col items-start lg:pt-2">
          <motion.p {...reveal(0.22)} className="ls-animate ls-body">
            Great garment care doesn&rsquo;t end at the counter. Customers want
            an easier way to book, choose a pickup time and know what&rsquo;s
            happening with their order.
          </motion.p>

          <motion.p {...reveal(0.3)} className="ls-animate ls-body mt-6">
            <strong>
              LaundrySync connects that customer experience with the people
              managing it.
            </strong>{" "}
            One branded digital touchpoint for customers, and a practical
            administration experience for your team.
          </motion.p>

          <motion.div {...reveal(0.38)} className="ls-animate mt-8">
            <Link
              href={JOURNEY_HREF}
              className={cn(
                "group inline-flex items-center gap-2 border-b-2 border-ls-sky-200 pb-1.5 text-button font-semibold text-ls-blue",
                "transition-colors duration-(--motion-normal) ease-(--motion-ease) hover:border-ls-blue",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
              )}
            >
              See the customer journey
              <ArrowRight
                className={cn(
                  "size-4 transition-transform duration-(--motion-normal) ease-(--motion-ease)",
                  "group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
                )}
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Divider - wipes in from the left */}
      <motion.div
        aria-hidden="true"
        className="ls-animate mt-16 h-px w-full origin-left bg-ls-border lg:mt-24"
        {...(reduceMotion
          ? {}
          : {
              initial: { scaleX: 0, opacity: 0 },
              whileInView: { scaleX: 1, opacity: 1 },
              viewport: { once: true, amount: 0.5 },
              transition: { duration: duration.slow, ease: easeOut },
            })}
      />

      {/* Three editorial benefit statements - not cards */}
      <motion.ol
        className="mt-10 grid gap-y-7 md:grid-cols-3 md:gap-x-10 md:gap-y-0 lg:mt-12"
        variants={reduceMotion ? undefined : benefitsListVariants}
        initial={reduceMotion ? undefined : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
      >
        {benefits.map((benefit) => (
          <motion.li
            key={benefit.number}
            variants={reduceMotion ? undefined : benefitItemVariants}
            className={cn(
              "ls-animate flex gap-4",
              "max-md:border-t max-md:border-ls-border max-md:pt-7",
              "max-md:first:border-t-0 max-md:first:pt-0",
            )}
          >
            <span
              aria-hidden="true"
              className="ls-label shrink-0 pt-1 text-ls-blue"
            >
              {benefit.number}
            </span>
            <span className="min-w-0">
              <span className="block text-body font-semibold text-ls-ink">
                {benefit.title}
              </span>
              <span className="ls-body-sm mt-2 block">
                {benefit.description}
              </span>
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
