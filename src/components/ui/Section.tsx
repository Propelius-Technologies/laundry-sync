import type { ElementType, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionSpace = "xs" | "sm" | "md" | "lg" | "page";
type SectionTone = "default" | "soft" | "dark";

type SectionProps = {
  as?: ElementType;
  id?: string;
  /**
   * Vertical rhythm preset. `xs` is for slim strips; `page` is for the
   * section that opens a route, so it sits under the header at the same
   * distance the homepage hero does.
   */
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
  /*
   * Top padding deliberately matches the hero's (pt-10 / sm:pt-14 / lg:pt-20)
   * so the gap below the sticky header is identical on every route. The bottom
   * keeps the `lg` rhythm, which is what separates content from the footer.
   */
  page: "pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32",
};

const toneStyles: Record<SectionTone, string> = {
  default: "bg-ls-bg",
  soft: "bg-ls-bg-soft",
  /* Uses the existing navy ink - not a second navy. */
  dark: "bg-ls-ink text-ls-sky-200",
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
