"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { ArrowUpRight, Sparkle } from "@/components/ui/Icons";
import { BrandColorSelector } from "./BrandColorSelector";
import { BrandPreview } from "./BrandPreview";
import {
  businessNameDefault,
  businessNameFallback,
  businessNameMaxLength,
  defaultBrandPreset,
  disclaimer,
  type BrandPresetId,
  type PreviewView,
} from "@/data/brand-preview";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Section 05 - Make It Yours.
 *
 * A visitor types their business name and picks a preview colour to see how a
 * branded LaundrySync experience could look, in both the customer and the
 * business-admin view.
 *
 * The entered name lives in component state only: it is never persisted, never
 * sent anywhere, and never rendered as HTML - just ordinary React text.
 */
export function MakeItYoursSection() {
  const [businessName, setBusinessName] = useState(businessNameDefault);
  const [brand, setBrand] = useState<BrandPresetId>(defaultBrandPreset);
  const [view, setView] = useState<PreviewView>("customer");
  const reduceMotion = useReducedMotion();
  const inputId = useId();

  /** Trimmed for display, with a fallback so the preview is never nameless. */
  const previewName = businessName.trim() || businessNameFallback;

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.2 });

  return (
    <Section id="make-it-yours" space="lg">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 xl:gap-20">
        {/* Left column - heading and customisation controls */}
        <div>
          <motion.div {...reveal(0, 10)} className="ls-animate">
            <Eyebrow>
              <span>
                <span className="text-ls-blue">05</span> / Make it yours
              </span>
            </Eyebrow>
          </motion.div>

          <h2 className="ls-statement mt-6">
            <motion.span {...reveal(0.08, 18)} className="ls-animate block">
              Your business.
            </motion.span>
            <motion.span
              {...reveal(0.16, 18)}
              className="ls-animate block text-ls-muted"
            >
              Front and center.
            </motion.span>
          </h2>

          <motion.p {...reveal(0.24)} className="ls-animate ls-body mt-6 max-w-[34rem]">
            Your customers know your laundry business. LaundrySync is designed
            to help you bring that relationship into a branded digital ordering
            experience.
          </motion.p>

          {/* Business name */}
          <motion.div {...reveal(0.3)} className="ls-animate mt-8 max-w-[24rem]">
            <label
              htmlFor={inputId}
              className="block text-body-sm font-semibold text-ls-ink"
            >
              Your business name
            </label>
            <input
              id={inputId}
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              maxLength={businessNameMaxLength}
              placeholder="Enter your laundry business name"
              autoComplete="off"
              className={cn(
                "mt-2 h-12 w-full rounded-ls-md border border-ls-border bg-white px-3.5 text-body text-ls-ink",
                "transition-colors duration-(--motion-normal) placeholder:text-ls-muted",
                "hover:border-ls-sky-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-focus-ring)",
              )}
            />
          </motion.div>

          {/* Product clarification - stays visible, never dismissible */}
          <motion.p
            {...reveal(0.36)}
            className="ls-animate mt-6 flex max-w-[30rem] gap-3 rounded-ls-md border-l-2 border-ls-blue bg-ls-sky-50 px-4 py-3.5 text-body-sm leading-relaxed text-ls-muted"
          >
            <Sparkle
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-ls-blue"
            />
            {disclaimer}
          </motion.p>

          <motion.div {...reveal(0.42)} className="ls-animate mt-8">
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-2 border-b-2 border-ls-sky-200 pb-1.5 text-button font-semibold text-ls-navy",
                "transition-colors duration-(--motion-normal) ease-(--motion-ease) hover:border-ls-blue hover:text-ls-blue",
                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
              )}
            >
              Discuss branding options
              <ArrowUpRight
                className={cn(
                  "size-4 transition-transform duration-(--motion-normal) ease-(--motion-ease)",
                  "group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
                )}
              />
            </Link>
          </motion.div>
        </div>

        {/* Right column - colour controls above the live preview */}
        <motion.div {...reveal(0.12, 18)} className="ls-animate min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <span className="ls-label text-ls-muted">Explore a sample brand</span>
            <BrandColorSelector value={brand} onChange={setBrand} />
          </div>

          <BrandPreview
            businessName={previewName}
            brand={brand}
            view={view}
            onViewChange={setView}
          />
        </motion.div>
      </div>
    </Section>
  );
}
