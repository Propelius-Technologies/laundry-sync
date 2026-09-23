"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Badge";
import { ArrowRight } from "@/components/ui/Icons";
import { PageIllustration } from "@/components/illustrations/PageIllustration";
import { easeOut } from "@/components/motion/motion-tokens";

/**
 * App Router not-found page.
 *
 * Renders inside the root layout, so it inherits the global header and footer
 * and returns a real 404 status - no separate /404 marketing route, and no
 * extra navigation cards or search box competing with the two recovery links.
 */
export default function NotFound() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: easeOut, delay },
        };

  return (
    <Section space="page">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <div>
          <motion.div {...enter(0)}>
            <Eyebrow withRule>
              <span>Page not found</span>
            </Eyebrow>
          </motion.div>

          <motion.p
            {...enter(0.06)}
            className="mt-6 text-[clamp(4rem,12vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.045em] text-ls-ink"
          >
            404
          </motion.p>

          <motion.h1
            {...enter(0.12)}
            className="ls-h2 mt-5 max-w-[18ch] text-balance"
          >
            Looks like this page got lost in{" "}
            <span className="text-ls-blue">the wash.</span>
          </motion.h1>

          <motion.p {...enter(0.18)} className="ls-body mt-5 max-w-[34rem]">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have
            moved. Let&rsquo;s get you back on track.
          </motion.p>

          <motion.div
            {...enter(0.24)}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Button href="/" size="lg">
              Back to homepage
              <ArrowRight className="size-4" />
            </Button>

            <Link
              href="/contact"
              className="group inline-flex items-center border-b-2 border-ls-sky-200 pb-1 text-button font-semibold text-ls-navy transition-colors duration-(--motion-normal) hover:border-ls-blue hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)"
            >
              Contact us
            </Link>
          </motion.div>
        </div>

        <PageIllustration
          src="/images/404-illustration.svg"
          delay={0.16}
          priority
          className="mx-auto max-w-[26rem] lg:max-w-none"
        />
      </div>
    </Section>
  );
}
