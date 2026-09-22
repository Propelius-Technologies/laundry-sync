import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Site-wide content width and horizontal gutter.
 *
 * Both values come from tokens (--layout-max-width / --layout-gutter), so the
 * gutter steps up at the sm and lg breakpoints exactly as it always has - the
 * breakpoints now live in tokens.css rather than in this class list.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-(--layout-max-width) px-(--layout-gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
