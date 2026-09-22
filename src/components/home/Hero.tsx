"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowUpRight, Check } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Badge";
import { HeroProductVisual } from "@/components/home/HeroProductVisual";
import { heroPrimaryCta, heroSecondaryCta } from "@/data/navigation";
import {
  duration,
  easeOut,
  heroSequence,
} from "@/components/motion/motion-tokens";

const supportingPoints = [
  "Built for laundry and dry-cleaning businesses.",
  "Branded customer experience.",
  "Orders, services and pickup scheduling.",
];

/** Shared entrance: fade plus a short upward move, transform/opacity only. */
function enter(delay: number, distance = 16) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.base, ease: easeOut, delay },
  };
}

export function Hero() {
  return (
    <section className="relative overflow-x-clip bg-white">
      <Container className="grid items-center gap-12 pt-10 pb-10 sm:pt-14 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-20 lg:pb-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] xl:gap-16">
        <div className="max-w-[38rem] lg:max-w-none">
          <motion.div {...enter(heroSequence.eyebrow, 10)} className="ls-animate">
            <Eyebrow withDot className="tracking-[0.16em]">
              The digital face of your laundry business
            </Eyebrow>
          </motion.div>

          <motion.h1 {...enter(heroSequence.heading)} className="ls-animate ls-display mt-6 max-lg:text-[clamp(2rem,5vw,3.25rem)]">
            <span className="block">Your laundry business.</span>
            <span className="ls-text-gradient block">
              <span className="block">Beautifully online</span>
            </span>
          </motion.h1>

          <motion.p
            {...enter(heroSequence.body)}
            className="ls-animate ls-body-lg mt-7 max-w-[33rem]"
          >
            Give customers a branded way to browse services, schedule pickups
            and follow their orders. Give your team a clearer way to manage what
            comes next.
          </motion.p>

          <motion.div
            {...enter(heroSequence.ctas)}
            className="ls-animate mt-9 flex flex-wrap items-center gap-x-3 gap-y-4 sm:gap-x-6"
          >
            <Button href={heroPrimaryCta.href} size="lg">
              {heroPrimaryCta.label}
              <ArrowUpRight className="size-4" />
            </Button>
            <Button href={heroSecondaryCta.href} variant="text" size="lg">
              {heroSecondaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          <motion.ul
            {...enter(heroSequence.points)}
            className="ls-animate mt-11 flex flex-col gap-3.5 sm:mt-14"
          >
            {supportingPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-ls-pill bg-ls-sky-100 text-ls-navy"
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-body-sm text-ls-text">{point}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroProductVisual />
      </Container>
    </section>
  );
}
