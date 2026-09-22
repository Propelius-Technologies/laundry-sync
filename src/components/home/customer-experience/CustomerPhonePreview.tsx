"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MobileMockup } from "@/components/devices/MobileMockup";
import { ServicesPreview } from "./screens/ServicesPreview";
import { SelectServicesPreview } from "./screens/SelectServicesPreview";
import { PickupSchedulingPreview } from "./screens/PickupSchedulingPreview";
import { OrderReviewPreview } from "./screens/OrderReviewPreview";
import { OrderStatusPreview } from "./screens/OrderStatusPreview";
import { PricingPreview } from "./screens/PricingPreview";
import { OrderHistoryPreview } from "./screens/OrderHistoryPreview";
import {
  previewDescriptions,
  type PreviewScreen,
} from "@/data/customer-journey";
import {
  duration,
  easeInOut,
  easeOut,
} from "@/components/motion/motion-tokens";
import styles from "./CustomerPhonePreview.module.css";

const screens: Record<PreviewScreen, () => React.JSX.Element> = {
  services: ServicesPreview,
  "select-services": SelectServicesPreview,
  pickup: PickupSchedulingPreview,
  review: OrderReviewPreview,
  status: OrderStatusPreview,
  pricing: PricingPreview,
  history: OrderHistoryPreview,
};

/** True only for devices that really hover, so touch never gets the nudge. */
function useHasHover() {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hasHover;
}

/**
 * The phone and its backdrop.
 *
 * Three transforms are kept on separate wrappers so they never fight: the
 * outer element owns the scroll entrance, the middle one owns the hover nudge,
 * and the screen inside the frame owns the crossfade. The frame itself is
 * never remounted, so switching screens leaves the device perfectly still.
 */
export function CustomerPhonePreview({ screen }: { screen: PreviewScreen }) {
  const reduceMotion = useReducedMotion();
  const hasHover = useHasHover();
  const Screen = screens[screen];
  const nudgeEnabled = hasHover && !reduceMotion;

  return (
    <motion.div
      className="ls-animate relative mx-auto flex w-full max-w-[420px] justify-center"
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.slow, ease: easeOut, delay: 0.1 }}
    >
      {/*
        Rotating backdrop. Sized by WIDTH (never taller than it is wide) so it
        can never spill past the column and add horizontal page scroll, and
        centred on the phone so the ring sits evenly around it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex"
      >
        <svg
          viewBox="0 0 200 200"
          className={`${styles.backdrop} aspect-square w-full`}
          fill="none"
        >
          {/* Pale halo behind the device */}
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="var(--color-ls-sky-100)"
            fillOpacity="0.45"
          />
          {/* Hairline outline */}
          <circle
            cx="100"
            cy="100"
            r="99"
            stroke="var(--color-ls-sky-200)"
            strokeWidth="0.6"
          />
          {/*
            Two opposing arcs on the outline, drawn with a normalised
            pathLength so the dash lengths read as exact percentages of the
            circumference rather than hand-guessed path coordinates.
          */}
          <circle
            cx="100"
            cy="100"
            r="99"
            pathLength="100"
            strokeDasharray="13 87"
            stroke="var(--color-ls-aqua)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="100"
            r="99"
            pathLength="100"
            strokeDasharray="7 93"
            strokeDashoffset="-50"
            stroke="var(--color-ls-blue)"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>

      {/*
        The phone. Hovering gives it a small rotation that settles straight
        back to rest - a nudge rather than a held tilt, so the screen never
        sits skewed while it is being read.
      */}
      <div className="relative w-full max-w-[292px]">
        <motion.div
          whileHover={nudgeEnabled ? { rotate: [0, -1.6, 0] } : undefined}
          transition={{ duration: 0.75, ease: easeInOut }}
        >
          <div role="img" aria-label={previewDescriptions[screen]}>
            <MobileMockup>
              {/*
              Only the screen contents swap. mode="wait" means a fast click run
              never leaves two screens stacked on top of each other.
            */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={screen}
                  className="absolute inset-0"
                  initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
                  transition={{ duration: 0.26, ease: easeOut }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </MobileMockup>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
