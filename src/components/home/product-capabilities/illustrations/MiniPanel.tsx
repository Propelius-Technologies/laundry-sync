import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared shell for the four miniature product interfaces: white surface, thin
 * border, and a shadow that firms up while the card is active.
 *
 * The shadow and border are plain CSS transitions - only the transforms inside
 * each illustration are driven by Motion.
 */
export function MiniPanel({
  active,
  className,
  children,
}: {
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-ls-lg border bg-white transition-[box-shadow,border-color] duration-(--motion-slow) ease-(--motion-ease) motion-reduce:transition-none",
        active
          ? "border-ls-sky-200 shadow-ls-card"
          : "border-ls-border shadow-ls-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small tinted square that stands in for a service or module icon. */
export function MiniIconTile({
  children,
  tone = "sky",
  className,
}: {
  children: ReactNode;
  tone?: "sky" | "navy";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-ls-sm",
        tone === "navy" ? "bg-ls-navy text-white" : "bg-ls-sky-100 text-ls-navy",
        className,
      )}
    >
      {children}
    </span>
  );
}
