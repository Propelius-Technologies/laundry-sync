"use client";

import { motion } from "motion/react";
import { MiniIconTile, MiniPanel } from "./MiniPanel";
import { ArrowRight, Check, Dots, Droplet, Sparkle } from "@/components/ui/Icons";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";

const serviceIcons = [Droplet, Sparkle];

/**
 * Card 01 - the new-order panel comes into focus.
 *
 * Resting: angled back and sitting low. Active: it rises, straightens toward
 * the viewer, and the service rows lift in sequence while the primary action
 * takes on brand emphasis. Nothing is submitted - it is an illustration.
 */
export function OrderingIllustration({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const state = active && !reduceMotion ? "active" : "rest";

  return (
    <motion.div
      className="w-full origin-bottom-left"
      initial={false}
      animate={state}
      variants={{
        rest: { y: 0, rotate: reduceMotion ? 0 : -5 },
        active: {
          y: -15,
          rotate: -1.5,
          transition: { staggerChildren: 0.06, delayChildren: 0.04 },
        },
      }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <MiniPanel active={active} className="overflow-hidden p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-body-sm font-semibold text-ls-ink">
            New order
          </span>
          <Dots className="size-4 text-ls-muted" />
        </div>

        <ul className="mt-3 flex flex-col gap-2">
          {capabilitySample.services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.li
                key={service.name}
                variants={{
                  rest: { y: 0, opacity: 0.9 },
                  active: { y: -2, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="flex items-center gap-2.5 rounded-ls-md bg-ls-bg-soft px-2.5 py-2"
              >
                <MiniIconTile>
                  <Icon className="size-3.5" />
                </MiniIconTile>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-caption font-semibold text-ls-ink">
                    {service.name}
                  </span>
                  <span className="block truncate text-[0.625rem] text-ls-muted">
                    {service.detail}
                  </span>
                </span>
                <Check className="size-3.5 shrink-0 text-ls-success" />
              </motion.li>
            );
          })}
        </ul>

        <motion.span
          variants={{
            rest: { y: 0, opacity: 0.92 },
            active: { y: -2, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: easeOut }}
          className={`mt-3 flex items-center justify-between rounded-ls-md px-3 py-2 text-caption font-semibold text-white transition-[background-color,box-shadow] duration-(--motion-slow) ${
            active
              ? "bg-ls-navy-600 shadow-ls-cta"
              : "bg-ls-navy shadow-none"
          }`}
        >
          Review your order
          <ArrowRight className="size-3.5" />
        </motion.span>
      </MiniPanel>
    </motion.div>
  );
}
