"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PreviewShell } from "../ui/PreviewShell";
import { PreviewSummaryRow } from "../ui/PreviewParts";
import { Calendar, CheckCircle, Ticket } from "@/components/ui/Icons";
import { orderSummary, pickupSelection } from "@/data/preview-services";
import { duration, easeOut } from "@/components/motion/motion-tokens";

/**
 * Screen D - Order review and confirmation.
 *
 * The only preview with its own interaction: the illustrative "Place order"
 * swaps to a confirmation panel. State resets on its own because the screen
 * unmounts whenever the visitor picks a different journey step.
 */
export function OrderReviewPreview() {
  const [placed, setPlaced] = useState(false);

  return (
    <PreviewShell
      title="Review Order"
      footer={
        placed ? (
          <span className="block rounded-[var(--ui-r)] border border-ls-border px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.9)] text-center text-[length:var(--ui-xs)] font-semibold text-ls-muted">
            Back to orders
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setPlaced(true)}
            className="block w-full rounded-[var(--ui-r)] bg-ls-navy px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.9)] text-center text-[length:var(--ui-xs)] font-semibold text-white transition-colors duration-(--motion-normal) hover:bg-ls-navy-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          >
            Place order
          </button>
        )
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {placed ? (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: easeOut }}
            className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[calc(var(--ui-gap)*0.7)] text-center"
          >
            <CheckCircle className="h-[calc(var(--ui-lg)*1.6)] w-[calc(var(--ui-lg)*1.6)] text-ls-success" />
            <span className="text-[length:var(--ui-md)] font-semibold text-ls-ink">
              Order placed
            </span>
            <span className="text-[length:var(--ui-2xs)] text-ls-muted">
              Order #LS-100482 · {pickupSelection.summary}
            </span>
            <span className="mt-[calc(var(--ui-gap)*0.4)] rounded-full bg-ls-bg-soft px-[calc(var(--ui-gap)*0.8)] py-[2px] text-[length:var(--ui-2xs)] text-ls-muted">
              Illustrative preview only
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: easeOut }}
            className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.8)]"
          >
            {/* Selected items */}
            <ul className="flex shrink-0 flex-col rounded-[var(--ui-r)] border border-ls-border">
              {orderSummary.lines.map((line) => (
                <li
                  key={line.label}
                  className="flex items-center justify-between gap-[var(--ui-gap)] border-b border-ls-border px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.6)] last:border-b-0"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
                      {line.label}
                    </span>
                    <span className="block truncate text-[length:var(--ui-2xs)] text-ls-muted">
                      {line.detail}
                    </span>
                  </span>
                  <span className="shrink-0 text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
                    {line.price}
                  </span>
                </li>
              ))}
            </ul>

            {/* Pickup slot */}
            <span className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.6)] rounded-[var(--ui-r)] border border-ls-border px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.65)]">
              <Calendar className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-navy" />
              <span className="truncate text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
                {pickupSelection.summary}
              </span>
            </span>

            {/* Voucher */}
            <span className="flex shrink-0 items-center justify-between gap-[var(--ui-gap)] rounded-[var(--ui-r)] border border-dashed border-ls-sky-200 px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.6)]">
              <span className="flex min-w-0 items-center gap-[calc(var(--ui-gap)*0.5)]">
                <Ticket className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-navy" />
                <span className="truncate text-[length:var(--ui-2xs)] text-ls-muted">
                  {orderSummary.voucherPlaceholder}
                </span>
              </span>
              <span className="shrink-0 text-[length:var(--ui-2xs)] font-semibold text-ls-navy">
                Apply
              </span>
            </span>

            {/* Totals */}
            <div className="mt-auto flex shrink-0 flex-col gap-[calc(var(--ui-gap)*0.4)] rounded-[var(--ui-r)] bg-ls-bg-soft px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]">
              <PreviewSummaryRow label="Subtotal" value={orderSummary.subtotal} />
              <PreviewSummaryRow label="Discount" value={orderSummary.discount} />
              <PreviewSummaryRow
                label="Total"
                value={orderSummary.total}
                emphasis
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreviewShell>
  );
}
