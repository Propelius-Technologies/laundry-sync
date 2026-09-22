"use client";

import { ArrowUpRight } from "@/components/ui/Icons";
import {
  extraPreviews,
  journeySteps,
  type PreviewScreen,
} from "@/data/customer-journey";
import { cn } from "@/lib/utils";

/**
 * The five journey steps plus the two additional product screens.
 *
 * One list, restyled by breakpoint: an editorial vertical list from `lg` up,
 * and a horizontally scrollable chip row below it. Rendering a single list
 * keeps one set of buttons in the accessibility tree rather than duplicating
 * every control per breakpoint.
 *
 * These are ordinary buttons with `aria-pressed` rather than a tab pattern,
 * because two separate groups drive one preview - a tablist would have to lie
 * about that relationship.
 */
export function JourneySteps({
  active,
  onSelect,
}: {
  active: PreviewScreen;
  onSelect: (screen: PreviewScreen) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <ul
        className={cn(
          "flex gap-2 overflow-x-auto overscroll-x-contain pb-2",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:flex-col lg:gap-0 lg:overflow-x-visible lg:pb-0",
        )}
      >
        {journeySteps.map((step) => {
          const isActive = active === step.id;
          return (
            <li key={step.id} className="shrink-0 lg:shrink lg:border-b lg:border-ls-border lg:last:border-b-0">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(step.id)}
                className={cn(
                  "group flex items-center gap-3 text-left transition-colors duration-(--motion-normal) ease-(--motion-ease)",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
                  // Compact chip below lg
                  "max-lg:rounded-ls-pill max-lg:border max-lg:px-4 max-lg:py-2.5",
                  isActive
                    ? "max-lg:border-ls-blue max-lg:bg-ls-sky-50"
                    : "max-lg:border-ls-border max-lg:bg-white",
                  // Editorial row from lg up
                  "lg:w-full lg:items-start lg:gap-4 lg:border-l-2 lg:py-5 lg:pr-4 lg:pl-5",
                  isActive
                    ? "lg:border-l-ls-blue lg:bg-ls-sky-50/60"
                    : "lg:border-l-transparent lg:hover:bg-ls-bg-soft",
                )}
              >
                <span
                  className={cn(
                    "ls-label shrink-0 transition-colors duration-(--motion-normal) lg:pt-1",
                    isActive ? "text-ls-blue" : "text-ls-muted",
                  )}
                >
                  {step.number}
                </span>

                <span className="min-w-0 lg:flex-1">
                  <span
                    className={cn(
                      "block text-body font-semibold whitespace-nowrap transition-colors duration-(--motion-normal) lg:whitespace-normal",
                      isActive ? "text-ls-ink" : "text-ls-muted",
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="ls-body-sm mt-1 hidden lg:block">
                    {step.description}
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    "hidden size-4 shrink-0 text-ls-blue transition-opacity duration-(--motion-normal) lg:block lg:mt-1",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Additional product screens - deliberately outside the numbered list */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:pl-5">
        <span className="ls-label text-ls-muted">Also in the app</span>
        {extraPreviews.map((preview) => {
          const isActive = active === preview.id;
          return (
            <button
              key={preview.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(preview.id)}
              className={cn(
                "rounded-ls-pill border px-3.5 py-1.5 text-body-sm font-medium transition-colors duration-(--motion-normal) ease-(--motion-ease)",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
                isActive
                  ? "border-ls-blue bg-ls-sky-50 text-ls-navy"
                  : "border-ls-border bg-white text-ls-muted hover:text-ls-ink",
              )}
            >
              {preview.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
