import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  as?: ElementType;
  /** "flat" sits on a tinted surface, "raised" floats above white. */
  tone?: "flat" | "raised";
  className?: string;
  children: ReactNode;
};

const tones = {
  flat: "border-ls-border bg-white",
  raised: "border-ls-border/80 bg-white shadow-ls-card",
} as const;

export function Card({
  as: Tag = "div",
  tone = "flat",
  className,
  children,
}: CardProps) {
  return (
    <Tag className={cn("rounded-ls-lg border", tones[tone], className)}>
      {children}
    </Tag>
  );
}
