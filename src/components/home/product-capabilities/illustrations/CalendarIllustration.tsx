"use client";

import { AnimatePresence, motion } from "motion/react";
import { MiniPanel } from "./MiniPanel";
import { ChevronLeft, ChevronRight, Clock } from "@/components/ui/Icons";
import { capabilitySample } from "@/data/product-capabilities";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const { calendar } = capabilitySample;

/**
 * Card 02 - the pickup calendar pops out of the card.
 *
 * A restrained spring lifts and straightens it, the chosen date pulses once,
 * and the pickup window chip slides in underneath. The month and date are
 * fixed sample values, not a live booking system.
 */
export function CalendarIllustration({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const live = active && !reduceMotion;

  return (
    /*
      Kept inside the card and pushed to its right edge, echoing the reference
      placement without ever crossing over the title or description.
    */
    <div className="ml-auto w-full max-w-[15.5rem]">
      <motion.div
        className="relative origin-bottom"
        initial={false}
        animate={live ? "active" : "rest"}
        variants={{
          rest: { y: 0, rotate: reduceMotion ? 0 : -3 },
          active: { y: -14, rotate: 0 },
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 210, damping: 24, mass: 0.7 }
        }
      >
        <MiniPanel active={active} className="p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-caption font-semibold text-ls-ink">
              {calendar.month}
            </span>
            <span className="flex items-center gap-1 text-ls-muted">
              <ChevronLeft className="size-3" />
              <ChevronRight className="size-3" />
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-7 gap-y-1 text-center">
            {calendar.weekdays.map((day, index) => (
              <span
                key={`${day}-${index}`}
                className="text-[0.5625rem] font-medium text-ls-muted"
              >
                {day}
              </span>
            ))}

            {calendar.weeks.flat().map((date) => {
              const selected = date === calendar.selected;
              return (
                <span
                  key={date}
                  className="grid place-items-center py-0.5 text-[0.625rem]"
                >
                  <motion.span
                    animate={
                      live && selected
                        ? { scale: [1, 1.18, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.5, ease: easeOut }}
                    className={cn(
                      "grid size-5 place-items-center rounded-ls-sm",
                      selected
                        ? "bg-ls-navy font-semibold text-white"
                        : "text-ls-text",
                    )}
                  >
                    {date}
                  </motion.span>
                </span>
              );
            })}
          </div>
        </MiniPanel>

        {/*
          Pickup window chip. Lives inside the lifting wrapper so it travels
          with the calendar instead of being left behind at the card floor.
        */}
        <AnimatePresence>
          {live && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeOut, delay: 0.1 }}
              className="absolute -bottom-3 left-2 flex items-center gap-1.5 rounded-ls-pill border border-ls-sky-200 bg-white px-2.5 py-1 text-[0.625rem] font-semibold whitespace-nowrap text-ls-navy shadow-ls-sm"
            >
              <Clock className="size-3 text-ls-blue" />
              {calendar.slot}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
