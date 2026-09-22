"use client";

import { motion, useReducedMotion } from "motion/react";
import { StatusNotification } from "@/components/ui/StatusNotification";
import { Shirt, Truck } from "@/components/ui/Icons";
import { demoSteps, notificationCards, type DemoStep } from "@/data/hero-demo";
import {
  duration,
  easeOut,
  floatTransition,
  heroSequence,
} from "@/components/motion/motion-tokens";

function isActive(activeFrom: DemoStep, step: DemoStep) {
  return demoSteps.indexOf(step) >= demoSteps.indexOf(activeFrom);
}

type FloatingCardProps = {
  className: string;
  delay: number;
  /** Offsets the float cycle so the two cards never move in lockstep. */
  floatDelay: number;
  children: React.ReactNode;
};

function FloatingCard({
  className,
  delay,
  floatDelay,
  children,
}: FloatingCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: duration.base, ease: easeOut, delay }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { ...floatTransition, delay: floatDelay }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * The two floating product notifications in the hero. Both stay mounted; they
 * pick up a green check and a slightly stronger shadow when the demo reaches
 * the step they belong to.
 */
export function HeroNotifications({ step }: { step: DemoStep }) {
  return (
    <>
      <FloatingCard
        className="ls-animate absolute top-0 left-[2%] z-20 hidden w-[50%] max-w-[300px] sm:block"
        delay={heroSequence.notificationOne}
        floatDelay={0}
      >
        <StatusNotification
          icon={Truck}
          iconTone="blue"
          title={notificationCards.pickup.title}
          body={notificationCards.pickup.body}
          active={isActive(notificationCards.pickup.activeFrom, step)}
        />
      </FloatingCard>

      <FloatingCard
        className="ls-animate absolute right-0 bottom-[4%] z-20 hidden w-[52%] max-w-[312px] sm:block"
        delay={heroSequence.notificationTwo}
        floatDelay={1.4}
      >
        <StatusNotification
          icon={Shirt}
          iconTone="navy"
          title={notificationCards.ready.title}
          body={notificationCards.ready.body}
          active={isActive(notificationCards.ready.activeFrom, step)}
        />
      </FloatingCard>
    </>
  );
}
