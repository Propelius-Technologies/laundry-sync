"use client";

import { AnimatePresence, motion } from "motion/react";
import { MiniIconTile, MiniPanel } from "./MiniPanel";
import { Badge } from "@/components/ui/Badge";
import { Calendar, ListIcon } from "@/components/ui/Icons";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const { admin, orderId } = capabilitySample;

/**
 * Card 04 - order detail surfaces for the business team.
 *
 * The panel lifts, the primary row takes a tinted highlight, its status dot
 * pulses, and a secondary detail row slides out below. Order workflow only -
 * no analytics or revenue figures.
 */
export function BusinessAdminIllustration({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const live = active && !reduceMotion;

  return (
    /*
      min-h reserves the space the detail row will need, so expanding it
      neither shifts the layout nor pushes the panel past the card's clip.
    */
    <motion.div
      className="min-h-[6.5rem] w-full"
      initial={false}
      animate={live ? { y: -12 } : { y: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <MiniPanel active={active} className="overflow-hidden p-2">
        {/* Primary module row */}
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-ls-md px-2.5 py-2 transition-colors duration-(--motion-slow)",
            live ? "bg-ls-sky-50" : "bg-transparent",
          )}
        >
          <MiniIconTile tone={live ? "navy" : "sky"}>
            <ListIcon className="size-3.5" />
          </MiniIconTile>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-caption font-semibold text-ls-ink">
              {admin.panel}
            </span>
            <span className="block truncate text-[0.625rem] text-ls-muted">
              {admin.caption}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1.5">
            <motion.span
              className="size-1.5 rounded-full bg-ls-success"
              animate={live ? { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 0.7, ease: easeOut }}
            />
            <Badge tone="success" className="px-2 py-0.5 text-[0.5625rem]">
              Active
            </Badge>
          </span>
        </div>

        {/* Secondary detail row - slides out only while active */}
        <AnimatePresence initial={false}>
          {live && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="overflow-hidden"
            >
              <div className="mt-1.5 flex items-center gap-2.5 rounded-ls-md border border-ls-border bg-white px-2.5 py-2">
                <MiniIconTile>
                  <Calendar className="size-3.5" />
                </MiniIconTile>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-caption font-semibold text-ls-ink">
                    Order #{orderId}
                  </span>
                  <span className="block truncate text-[0.625rem] text-ls-muted">
                    {admin.detailStatus}
                  </span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </MiniPanel>
    </motion.div>
  );
}
