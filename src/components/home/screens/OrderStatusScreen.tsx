"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Calendar,
  Check,
  Dots,
  Home,
  ListIcon,
  MapPin,
  Menu,
} from "@/components/ui/Icons";
import {
  basketLines,
  customerTimeline,
  demoSteps,
  incomingOrder,
  pickupArea,
  type DemoStep,
} from "@/data/hero-demo";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", icon: Home },
  { label: "Orders", icon: ListIcon },
  { label: "Schedule", icon: Calendar },
  { label: "More", icon: Dots },
];

function isComplete(completedFrom: DemoStep | null, step: DemoStep) {
  if (!completedFrom) return false;
  return demoSteps.indexOf(step) >= demoSteps.indexOf(completedFrom);
}

const headings: Record<DemoStep, string> = {
  schedule: "Schedule a pickup",
  confirmed: "Order confirmed",
  ready: "Your order is ready",
};

/**
 * Illustrative customer-side screens: choose services and quantities, book a
 * pickup slot in a service area, then follow the order status track. Mirrors
 * the real laundry customer journey, re-skinned in the LaundrySync system.
 */
export function OrderStatusScreen({ step }: { step: DemoStep }) {
  const totalItems = basketLines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Status bar - cleared below the Dynamic Island */}
      <div className="flex shrink-0 items-center justify-between px-[calc(var(--ui-pad)*0.7)] pt-[6.5%] pb-[calc(var(--ui-gap)*0.7)] text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
        <span>9:41</span>
        <span className="flex items-center gap-[2px]">
          <span className="h-[0.5em] w-[0.28em] rounded-[1px] bg-ls-ink/70" />
          <span className="h-[0.7em] w-[0.28em] rounded-[1px] bg-ls-ink/70" />
          <span className="ml-[0.2em] h-[0.5em] w-[0.9em] rounded-[2px] border border-ls-ink/50" />
        </span>
      </div>

      {/* App bar */}
      <div className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.6)] border-b border-ls-border px-[calc(var(--ui-pad)*0.7)] pb-[calc(var(--ui-gap)*0.8)]">
        <Menu className="h-[var(--ui-sm)] w-[var(--ui-sm)] text-ls-ink" />
        <span className="text-[length:var(--ui-sm)] leading-none font-bold tracking-[-0.02em] text-ls-ink">
          Laundry<span className="text-ls-cyan">Sync</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col px-[calc(var(--ui-pad)*0.7)] pt-[calc(var(--ui-pad)*0.7)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <span className="block text-[length:var(--ui-lg)] leading-[1.15] font-bold tracking-[-0.025em] text-ls-ink">
              {headings[step]}
            </span>
            <span className="mt-[calc(var(--ui-gap)*0.5)] block text-[length:var(--ui-2xs)] text-ls-muted">
              {step === "schedule"
                ? `${totalItems} items - ${pickupArea}`
                : `Order #${incomingOrder.id}`}
            </span>

            {step === "schedule" ? (
              <div className="mt-[calc(var(--ui-pad)*0.85)] flex flex-col gap-[calc(var(--ui-gap)*0.7)]">
                {/* Per-item basket, as in the real product */}
                {basketLines.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between gap-[calc(var(--ui-gap)*0.6)] rounded-[var(--ui-r)] border border-ls-border bg-ls-bg-soft px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
                        {line.label}
                      </span>
                      <span className="block truncate text-[length:var(--ui-2xs)] text-ls-muted @max-[118px]:hidden">
                        {line.detail}
                      </span>
                    </span>
                    <span className="grid size-[var(--ui-md)] shrink-0 place-items-center rounded-full bg-ls-sky-100 text-[length:var(--ui-2xs)] leading-none font-semibold text-ls-navy">
                      {line.quantity}
                    </span>
                  </div>
                ))}

                <div className="flex items-center gap-[calc(var(--ui-gap)*0.7)] rounded-[var(--ui-r)] border border-ls-border bg-white px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]">
                  <Calendar className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-navy" />
                  <span className="min-w-0">
                    <span className="block text-[length:var(--ui-2xs)] text-ls-muted @max-[118px]:hidden">
                      Pickup
                    </span>
                    <span className="block truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
                      {incomingOrder.pickup}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-[calc(var(--ui-gap)*0.7)] rounded-[var(--ui-r)] border border-ls-border bg-white px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)] @max-[130px]:hidden">
                  <MapPin className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-navy" />
                  <span className="min-w-0">
                    <span className="block text-[length:var(--ui-2xs)] text-ls-muted">
                      Service area
                    </span>
                    <span className="block truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
                      {pickupArea}
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <ol className="mt-[calc(var(--ui-pad)*1.1)] flex flex-col gap-[calc(var(--ui-gap)*1.5)]">
                {customerTimeline.map((item, index) => {
                  const done = isComplete(item.completedFrom, step);
                  const isLast = index === customerTimeline.length - 1;
                  return (
                    <li
                      key={item.label}
                      className="relative flex items-start gap-[calc(var(--ui-gap)*0.8)]"
                    >
                      {!isLast && (
                        <span
                          className={cn(
                            "absolute top-[var(--ui-md)] left-[calc(var(--ui-md)/2-0.5px)] h-[calc(100%+var(--ui-gap)*1.5-var(--ui-md))] w-[1px]",
                            done ? "bg-ls-navy/35" : "bg-ls-border",
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 grid size-[var(--ui-md)] shrink-0 place-items-center rounded-full transition-colors duration-500",
                          done
                            ? "bg-ls-navy text-white"
                            : "border border-ls-border bg-white text-transparent",
                        )}
                      >
                        <Check className="h-[calc(var(--ui-2xs)*0.9)] w-[calc(var(--ui-2xs)*0.9)]" />
                      </span>
                      <span className="min-w-0 pt-[1px]">
                        <span
                          className={cn(
                            "block truncate text-[length:var(--ui-xs)] font-semibold",
                            done ? "text-ls-ink" : "text-ls-muted",
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="block truncate text-[length:var(--ui-2xs)] text-ls-muted @max-[118px]:hidden">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            )}
          </motion.div>
        </AnimatePresence>

        <span className="mt-auto mb-[calc(var(--ui-pad)*0.7)] block rounded-full bg-ls-navy px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.9)] text-center text-[length:var(--ui-xs)] font-semibold text-white">
          {step === "schedule" ? "Confirm pickup" : "View order details"}
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex shrink-0 items-center justify-around border-t border-ls-border px-[calc(var(--ui-gap)*0.5)] pt-[calc(var(--ui-gap)*0.7)] pb-[calc(var(--ui-pad)*0.7)]">
        {tabs.map((tab, index) => (
          <span
            key={tab.label}
            className={cn(
              "flex flex-col items-center gap-[2px]",
              index === 0 ? "text-ls-navy" : "text-ls-muted",
            )}
          >
            <tab.icon className="h-[var(--ui-sm)] w-[var(--ui-sm)]" />
            <span className="text-[length:var(--ui-2xs)] leading-none @max-[118px]:hidden">
              {tab.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
