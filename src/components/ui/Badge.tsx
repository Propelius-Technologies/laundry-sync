import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/data/hero-demo";

export type BadgeTone = "navy" | "blue" | "aqua" | "success" | "neutral";

const tones: Record<BadgeTone, string> = {
  navy: "bg-ls-sky-100 text-ls-navy",
  blue: "bg-ls-sky-50 text-ls-navy-600",
  aqua: "bg-ls-aqua-50 text-ls-teal-ink",
  success: "bg-ls-success-soft text-ls-success-ink",
  neutral: "bg-ls-subtle text-ls-muted",
};

type BadgeProps = {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
};

/** Small pill label. Used for order statuses inside the product mockups. */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-ls-pill font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Maps an order status to its badge tone so every surface stays consistent. */
export const orderStatusTone: Record<OrderStatus, BadgeTone> = {
  "pickup-scheduled": "blue",
  "in-progress": "aqua",
  ready: "success",
  completed: "neutral",
};

type EyebrowProps = {
  as?: ElementType;
  /** Shows the small brand dot before the text (as in the hero). */
  withDot?: boolean;
  /** Shows a short leading rule instead (supporting pages). */
  withRule?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Small uppercase label that introduces a section.
 *
 * Shared by the hero eyebrow and the capabilities strip label so the two never
 * drift apart. Text is authored in sentence case and uppercased by `.ls-label`,
 * which keeps it readable for screen readers.
 */
export function Eyebrow({
  as: Tag = "p",
  withDot = false,
  withRule = false,
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "ls-label flex items-center text-ls-muted",
        withDot || withRule ? "gap-3" : "gap-0",
        className,
      )}
    >
      {withDot && (
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-ls-pill bg-ls-blue"
        />
      )}
      {withRule && (
        <span
          aria-hidden="true"
          className="h-0.5 w-8 shrink-0 rounded-ls-pill bg-ls-blue"
        />
      )}
      {children}
    </Tag>
  );
}
