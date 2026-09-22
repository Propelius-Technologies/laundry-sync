"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LaptopMockup } from "@/components/devices/LaptopMockup";
import { MobileMockup } from "@/components/devices/MobileMockup";
import { OrdersDashboardScreen } from "@/components/home/screens/OrdersDashboardScreen";
import { OrderStatusScreen } from "@/components/home/screens/OrderStatusScreen";
import { HeroNotifications } from "@/components/home/HeroNotifications";
import {
  DEMO_STEP_MS,
  baseOrders,
  demoSteps,
  incomingOrder,
  productVisualDescription,
  type DemoOrder,
  type DemoStep,
} from "@/data/hero-demo";
import { duration, easeOut, heroSequence } from "@/components/motion/motion-tokens";

/**
 * Scripted three-state demo: the customer schedules a pickup, the confirmation
 * appears on their phone, and the matching order lands in the business order
 * list. Nothing is fetched or processed - it is an illustration of the link
 * between the two surfaces.
 *
 * The loop pauses when the visual leaves the viewport, when the tab is hidden,
 * and when the visitor prefers reduced motion (where it settles on the final
 * state instead so the story still reads).
 */
function useHeroDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [tabVisible, setTabVisible] = useState(true);
  const [step, setStep] = useState<DemoStep>("schedule");

  useEffect(() => {
    const onVisibilityChange = () => setTabVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const running = inView && tabVisible && !reduceMotion;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setStep(
        (previous) =>
          demoSteps[(demoSteps.indexOf(previous) + 1) % demoSteps.length],
      );
    }, DEMO_STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // With reduced motion the loop never starts, so settle on the final state:
  // the story still reads without anything moving.
  return { stageRef, step: reduceMotion ? ("ready" as DemoStep) : step };
}

export function HeroProductVisual() {
  const { stageRef, step } = useHeroDemo();
  // The customer order joins the list once confirmed, then flips to Ready -
  // the same status the second floating card announces.
  const showIncoming = step !== "schedule";
  const incoming: DemoOrder =
    step === "ready" ? { ...incomingOrder, status: "ready" } : incomingOrder;
  const orders = showIncoming ? [incoming, ...baseOrders] : baseOrders;

  return (
    <div ref={stageRef} className="w-full">
      <div className="relative isolate mx-auto w-full max-w-[660px] lg:max-w-none">
        {/* Single, very soft pale-blue shape behind the mockups. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[9%] -right-[11%] -z-10 aspect-square w-[84%] rounded-full bg-[radial-gradient(circle_at_34%_32%,var(--color-ls-sky-100)_0%,var(--color-ls-sky-50)_50%,transparent_71%)]"
        />

        <div
          role="img"
          aria-label={productVisualDescription}
          className="relative"
        >
          <div className="relative pt-[13%] pr-[3%] pb-[9%] pl-[10%]">
            <motion.div
              className="ls-animate"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duration.slow,
                ease: easeOut,
                delay: heroSequence.laptop,
              }}
            >
              <LaptopMockup>
                <OrdersDashboardScreen
                  orders={orders}
                  highlightId={showIncoming ? incomingOrder.id : undefined}
                />
              </LaptopMockup>
            </motion.div>

            <motion.div
              className="ls-animate absolute bottom-0 left-0 w-[29%] max-w-[208px] sm:w-[26%]"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duration.base,
                ease: easeOut,
                delay: heroSequence.phone,
              }}
            >
              <MobileMockup>
                <OrderStatusScreen step={step} />
              </MobileMockup>
            </motion.div>
          </div>

          <HeroNotifications step={step} />
        </div>
      </div>

      <p className="mt-5 text-center text-caption text-ls-muted lg:mt-6">
        Illustrative product preview. Sample orders and names.
      </p>
    </div>
  );
}
