"use client";

import { useConsent } from "./ConsentProvider";
import { cn } from "@/lib/utils";

/**
 * Opens the cookie preferences dialog.
 *
 * Always functional - the consent system is part of the app shell, so this can
 * never be a dead control.
 */
export function CookiePreferencesButton({
  className,
  children = "Cookie preferences",
}: {
  className?: string;
  children?: string;
}) {
  const { openPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        className ??
          "font-medium text-ls-navy underline underline-offset-2 transition-colors hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
      )}
    >
      {children}
    </button>
  );
}
