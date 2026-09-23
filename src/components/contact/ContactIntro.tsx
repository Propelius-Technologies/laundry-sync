"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "@/components/ui/Badge";
import { PageIllustration } from "@/components/illustrations/PageIllustration";
import { easeOut } from "@/components/motion/motion-tokens";

/**
 * Left column of the contact page: message, then the approved illustration.
 *
 * On small screens the illustration is hidden entirely - it is decorative, and
 * letting it sit between the copy and the form would push the form, which is
 * the whole point of the page, below the fold.
 */
export function ContactIntro() {
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
    <div className="lg:pt-4">
      <motion.div {...enter(0)}>
        <Eyebrow withRule>
          <span>Get in touch</span>
        </Eyebrow>
      </motion.div>

      <motion.h1 {...enter(0.07)} className="ls-statement mt-6">
        <span className="block">Let&rsquo;s talk about your</span>
        <span className="block">
          laundry <span className="text-ls-blue">business.</span>
        </span>
      </motion.h1>

      <motion.p {...enter(0.14)} className="ls-body mt-6 max-w-[34rem]">
        Tell us a little about your business and what you need. We&rsquo;ll walk
        you through LaundrySync and discuss how it could fit your existing
        process.
      </motion.p>

      <PageIllustration
        src="/images/contact-illustration.svg"
        delay={0.24}
        priority
        className="mt-10 hidden max-w-[30rem] lg:block"
      />
    </div>
  );
}
