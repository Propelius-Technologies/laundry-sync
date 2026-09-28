import type { ReactNode } from "react";
import Link from "next/link";
import { demoHref } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Makes a static product mockup lead to a demo request.
 *
 * The mockups look like working screens, so visitors click their buttons.
 * The mockup is a role="img", whose children are presentational: nothing
 * inside it may be focusable, so inner button lookalikes stay plain spans.
 *
 * One link covers the whole mockup as an overlay sibling, rather than
 * wrapping it. Wrapping gave the link the mockup's visible text as content,
 * which did not match its "Book a demo" name (WCAG 2.5.3, label in name);
 * the overlay has no text of its own, and the image keeps its own
 * description. Clicks anywhere on the mockup land on the link.
 */
export function MockupLink({
  children,
  label = "Book a demo to see this screen",
  className,
}: {
  children: ReactNode;
  label?: string;
  /** Applied to the link, e.g. a radius matching the mockup's outline. */
  className?: string;
}) {
  return (
    <div className="relative">
      {children}
      <Link
        href={demoHref}
        aria-label={label}
        className={cn(
          "absolute inset-0 z-10 rounded-ls-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
          className,
        )}
      />
    </div>
  );
}
