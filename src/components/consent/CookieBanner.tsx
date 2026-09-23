"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useConsent } from "./ConsentProvider";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { easeOut } from "@/components/motion/motion-tokens";

const actionClass = cn(
  "inline-flex min-h-11 items-center justify-center rounded-ls-md px-4 text-body-sm font-semibold",
  "transition-colors duration-(--motion-normal) ease-(--motion-ease) motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
);

/**
 * Cookie consent banner.
 *
 * Shown only once the stored decision has been read and found absent, so it
 * never flashes for someone who already chose. It is a non-modal region: the
 * site stays fully usable while it is open, and focus is not trapped.
 *
 * Accept and reject are the same size, weight and prominence, side by side.
 * Nothing here treats dismissal, scrolling or continued browsing as consent -
 * there is no close button, because closing without choosing would be
 * ambiguous.
 */
export function CookieBanner() {
  const { status, acceptAll, rejectAll, openPreferences } = useConsent();
  const reduceMotion = useReducedMotion();

  const visible = status === "undecided";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Cookie choices"
          /* Fixed, so appearing never shifts the page layout. */
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 pb-4 sm:pb-6"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <Container>
            <div className="pointer-events-auto mx-auto max-w-4xl rounded-ls-xl border border-ls-border bg-white p-5 shadow-ls-card sm:p-6">
              <h2 className="ls-h3 text-base sm:text-lg">
                Your privacy, your choice.
              </h2>

              <p className="ls-body-sm mt-2">
                We use essential storage to keep this website working. With your
                permission, we may also use analytics to understand how visitors
                use LaundrySync. You can accept optional cookies, reject them,
                or choose your preferences.{" "}
                <Link
                  href="/cookie-policy"
                  className="font-medium text-ls-navy underline underline-offset-2 transition-colors hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
                >
                  Read our Cookie Policy
                </Link>
                .
              </p>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Accept and reject carry equal visual weight. */}
                <button
                  type="button"
                  onClick={acceptAll}
                  className={cn(
                    actionClass,
                    "bg-ls-navy text-white hover:bg-ls-navy-600",
                  )}
                >
                  Accept optional cookies
                </button>

                <button
                  type="button"
                  onClick={rejectAll}
                  className={cn(
                    actionClass,
                    "border border-ls-border bg-white text-ls-ink hover:bg-ls-bg-soft",
                  )}
                >
                  Reject optional cookies
                </button>

                <button
                  type="button"
                  onClick={openPreferences}
                  className={cn(
                    actionClass,
                    "text-ls-navy underline underline-offset-4 hover:text-ls-blue sm:ml-auto sm:px-2",
                  )}
                >
                  Manage preferences
                </button>
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
