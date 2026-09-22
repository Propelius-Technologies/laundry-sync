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
import { duration, easeOut } from "@/components/motion/motion-tokens";
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

/** True only for devices that really hover, so touch never gets the tilt. */
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
 * outer element owns the scroll entrance, the middle one owns the hover tilt,
 * and the screen inside the frame owns the crossfade. The frame itself is
 * never remounted, so switching screens leaves the device perfectly still.
 */
export function CustomerPhonePreview({ screen }: { screen: PreviewScreen }) {
  const reduceMotion = useReducedMotion();
  const hasHover = useHasHover();
  const Screen = screens[screen];
  const tiltEnabled = hasHover && !reduceMotion;

  return (
    <motion.div
      className="ls-animate relative mx-auto flex w-full max-w-[420px] justify-center"
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: duration.slow, ease: easeOut, delay: 0.1 }}
    >
      {/* Rotating backdrop - hidden on narrow screens where it only adds noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex"
      >
        <svg
          viewBox="0 0 200 200"
          className={`${styles.backdrop} h-[78%] max-h-[420px] w-auto opacity-70`}
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="var(--color-ls-sky-200)"
            strokeWidth="0.6"
          />
          <circle cx="100" cy="100" r="72" fill="var(--color-ls-sky-50)" />
          <path
            d="M100 4a96 96 0 0 1 82 48"
            stroke="var(--color-ls-aqua)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M18 148a96 96 0 0 0 52 40"
            stroke="var(--color-ls-blue)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      </div>

      {/*
        Tilt wrapper. The perspective lives on this plain parent - a 3D
        rotation is only perspective-corrected by an ANCESTOR's perspective,
        so putting it on the rotating element itself renders flat.
      */}
      <div className="relative w-full max-w-[292px] [perspective:1200px]">
        <motion.div
          whileHover={tiltEnabled ? { rotateY: -3.5, rotateX: 1.5 } : undefined}
          transition={{ duration: 0.45, ease: easeOut }}
          style={{ transformStyle: "preserve-3d" }}
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
