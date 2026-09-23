"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Calendar, ChevronLeft, Droplet, Sparkle } from "@/components/ui/Icons";
import { brandInitials, customerPreviewCopy } from "@/data/brand-preview";
import { capabilitySample } from "@/data/product-capabilities";
import { pickupDays, pickupSelection, pickupSlots } from "@/data/preview-services";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const serviceIcons = [Droplet, Sparkle];

/**
 * The branded customer-facing preview.
 *
 * Content comes from the same sample data as the Section 02 phone previews
 * (`capabilitySample.services`, `pickupDays` / `pickupSlots`), so this reads as
 * the customer side of the same product rather than a new flow. Every brand
 * accent resolves from the scoped --preview-brand-* properties.
 */
export function CustomerBrandPreview({
  businessName,
  reduceMotion,
}: {
  businessName: string;
  reduceMotion: boolean;
}) {
  const [scheduling, setScheduling] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-ls-lg border border-ls-border bg-white p-4 sm:p-5">
      {/* Branded app header */}
      <div className="flex items-center gap-3">
        <span
          data-brand-tinted
          className="grid size-10 shrink-0 place-items-center rounded-ls-md text-body-sm font-bold text-(--preview-brand-foreground)"
          style={{ backgroundColor: "var(--preview-brand-strong)" }}
        >
          {brandInitials(businessName)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-body-sm font-semibold text-ls-ink">
            {businessName}
          </span>
          <span className="block truncate text-caption text-ls-muted">
            {customerPreviewCopy.tagline}
          </span>
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {scheduling ? (
          <motion.div
            key="schedule"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: easeOut }}
            className="flex flex-col gap-3"
          >
            <span className="flex items-center gap-2 text-body-sm font-semibold text-ls-ink">
              <Calendar
                data-brand-tinted
                className="size-4 text-(--preview-brand-strong)"
              />
              {customerPreviewCopy.scheduleHeading}
            </span>

            {/* Same illustrative slots as the Section 02 pickup preview */}
            <ul className="grid grid-cols-5 gap-1.5">
              {pickupDays.map((day) => {
                const selected = day.date === pickupSelection.selectedDate;
                return (
                  <li
                    key={day.date}
                    data-brand-tinted
                    className={cn(
                      "flex flex-col items-center rounded-ls-sm border py-1.5 text-caption",
                      selected
                        ? "border-transparent text-white"
                        : "border-ls-border text-ls-muted",
                    )}
                    style={
                      selected
                        ? { backgroundColor: "var(--preview-brand-strong)" }
                        : undefined
                    }
                  >
                    <span>{day.day}</span>
                    <span className="font-semibold">{day.date}</span>
                  </li>
                );
              })}
            </ul>

            <ul className="grid grid-cols-2 gap-1.5">
              {pickupSlots.slice(0, 4).map((slot) => {
                const selected = slot === pickupSelection.selectedSlot;
                return (
                  <li
                    key={slot}
                    data-brand-tinted
                    className={cn(
                      "rounded-ls-sm border px-2 py-1.5 text-center text-caption font-medium",
                      selected ? "text-ls-ink" : "border-ls-border text-ls-muted",
                    )}
                    style={
                      selected
                        ? {
                            backgroundColor: "var(--preview-brand-soft)",
                            borderColor: "var(--preview-brand-ring)",
                          }
                        : undefined
                    }
                  >
                    {slot}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <span
                data-brand-tinted
                aria-hidden="true"
                className="flex-1 rounded-ls-md px-3 py-2 text-center text-body-sm font-semibold text-(--preview-brand-foreground)"
                style={{ backgroundColor: "var(--preview-brand-strong)" }}
              >
                {customerPreviewCopy.scheduleAction}
              </span>
              <button
                type="button"
                onClick={() => setScheduling(false)}
                className="inline-flex items-center gap-1 rounded-ls-md border border-ls-border px-3 py-2 text-body-sm font-semibold text-ls-ink transition-colors duration-(--motion-normal) hover:bg-ls-bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
              >
                <ChevronLeft className="size-4" />
                {customerPreviewCopy.backAction}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: easeOut }}
            className="flex flex-col gap-4"
          >
            {/* Branded welcome panel */}
            <div
              data-brand-tinted
              className="rounded-ls-md p-4 sm:p-5"
              style={{ backgroundColor: "var(--preview-brand-soft)" }}
            >
              <span
                data-brand-tinted
                className="ls-label block text-(--preview-brand-strong)"
              >
                {customerPreviewCopy.welcomeLabel}
              </span>
              <p className="mt-2 text-lg leading-tight font-bold tracking-[-0.02em] text-ls-ink sm:text-xl">
                {customerPreviewCopy.welcomeHeading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>

              <button
                type="button"
                onClick={() => setScheduling(true)}
                data-brand-tinted
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5 rounded-ls-md px-3.5 py-2 text-body-sm font-semibold text-(--preview-brand-foreground)",
                  "transition-[filter] duration-(--motion-normal) hover:brightness-110 motion-reduce:transition-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
                )}
                style={{ backgroundColor: "var(--preview-brand-strong)" }}
              >
                {customerPreviewCopy.primaryAction}
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>

            {/* Services, from the same sample set as Section 02 */}
            <div>
              <span className="block text-caption font-semibold text-ls-ink">
                {customerPreviewCopy.servicesLabel}
              </span>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {capabilitySample.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <li
                      key={service.name}
                      className="flex items-center gap-2 rounded-ls-md border border-ls-border px-3 py-2.5"
                    >
                      <Icon
                        data-brand-tinted
                        className="size-4 shrink-0 text-(--preview-brand-strong)"
                      />
                      <span className="truncate text-body-sm text-ls-ink">
                        {service.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
