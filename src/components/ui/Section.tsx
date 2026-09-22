import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionSpace = "xs" | "sm" | "md" | "lg";
type SectionTone = "default" | "soft";

type SectionProps = {
  as?: ElementType;
  id?: string;
  /** Vertical rhythm preset. `xs` is for slim strips. */
  space?: SectionSpace;
  /** Background treatment. */
  tone?: SectionTone;
  /** Wrap children in a Container. Turn off for full-bleed content. */
  contained?: boolean;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

const spaceStyles: Record<SectionSpace, string> = {
  xs: "py-5 sm:py-6",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
};

const toneStyles: Record<SectionTone, string> = {
  default: "bg-ls-bg",
  soft: "bg-ls-bg-soft",
};

/** Section wrapper owning vertical rhythm, background tone and the container. */
export function Section({
  as: Tag = "section",
  id,
  space = "md",
  tone = "default",
  contained = true,
  className,
  children,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(spaceStyles[space], toneStyles[tone], className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </Tag>
  );
}
