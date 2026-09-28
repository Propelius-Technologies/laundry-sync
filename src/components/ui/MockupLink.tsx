import type { ReactNode } from "react";
import Link from "next/link";
import { demoHref } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Makes a static product mockup lead to a demo request.
 *
 * The mockups look like working screens, so visitors click their buttons.
 * One link wraps the whole mockup - never an element inside it - because
 * the mockup is a role="img", whose children are presentational: nothing
 * inside may be focusable. Inner button lookalikes stay plain spans.
 */
export function MockupLink({
  children,
  label = "Book a demo to see this screen",
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={demoHref}
      aria-label={label}
      className={cn(
        "block rounded-ls-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-focus-ring)",
        className,
      )}
    >
      {children}
    </Link>
  );
}
