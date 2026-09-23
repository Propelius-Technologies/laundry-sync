"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useConsent } from "./ConsentProvider";
import { Close } from "@/components/ui/Icons";
import { analyticsConfigured } from "@/lib/consent/consent-config";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/use-scroll-lock";

const actionClass = cn(
  "inline-flex min-h-11 items-center justify-center rounded-ls-md px-4 text-body-sm font-semibold",
  "transition-colors duration-(--motion-normal) ease-(--motion-ease) motion-reduce:transition-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
);

/**
 * Cookie preferences dialog.
 *
 * Uses the native <dialog> element with showModal(), which gives correct
 * dialog semantics, focus containment, Escape handling and focus restoration
 * from the platform rather than a hand-rolled trap.
 *
 * Closing without saving discards the edits: the draft state is re-seeded from
 * the saved record every time the dialog opens, so dismissing it can never
 * silently switch optional tracking on.
 */
export function CookiePreferencesDialog() {
  const {
    preferencesOpen,
    closePreferences,
    categories,
    save,
    acceptAll,
    rejectAll,
  } = useConsent();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draftAnalytics, setDraftAnalytics] = useState(categories.analytics);

  /*
   * showModal() blocks document scrolling in most browsers, but not
   * consistently, and it does not stop Lenis reading wheel events. Pausing it
   * explicitly keeps the page behind the dialog still everywhere.
   */
  useScrollLock(preferencesOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (preferencesOpen && !dialog.open) {
      // Re-seed from the saved decision, discarding any previous edits.
      setDraftAnalytics(categories.analytics);
      dialog.showModal();
    } else if (!preferencesOpen && dialog.open) {
      dialog.close();
    }
  }, [preferencesOpen, categories.analytics]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cookie-prefs-title"
      onClose={closePreferences}
      /* Escape fires cancel; let the platform close it and sync our state. */
      onCancel={closePreferences}
      className={cn(
        "m-auto w-[min(40rem,calc(100vw-2rem))] rounded-ls-xl border border-ls-border bg-white p-0 text-ls-text",
        "backdrop:bg-ls-ink/50",
      )}
    >
      {/* data-lenis-prevent: this panel scrolls natively, not through Lenis */}
      <div
        data-lenis-prevent
        className="max-h-[80vh] overflow-y-auto p-6 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="cookie-prefs-title" className="ls-h3 text-lg">
            Cookie preferences
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close cookie preferences"
            className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-ls-md text-ls-muted transition-colors hover:bg-ls-bg-soft hover:text-ls-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          >
            <Close className="size-5" />
          </button>
        </div>

        <p className="ls-body-sm mt-2">
          Choose which optional storage this website may use. Your choice is
          saved on this device.{" "}
          <Link
            href="/cookie-policy"
            onClick={closePreferences}
            className="font-medium text-ls-navy underline underline-offset-2 hover:text-ls-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)"
          >
            Cookie Policy
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {/* Strictly necessary - no toggle, because it genuinely cannot be off */}
          <section className="rounded-ls-md border border-ls-border bg-ls-bg-soft p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-body-sm font-semibold text-ls-ink">
                Strictly necessary
              </h3>
              <span className="rounded-ls-pill bg-ls-subtle px-2.5 py-1 text-caption font-semibold text-ls-muted">
                Always on
              </span>
            </div>
            <p className="ls-body-sm mt-2">
              Supports core website functions and remembers the cookie choice
              you make here. This cannot be switched off, so no toggle is shown.
            </p>
          </section>

          {/* Analytics - optional, off unless explicitly enabled */}
          <section className="rounded-ls-md border border-ls-border p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-body-sm font-semibold text-ls-ink">
                <label htmlFor="consent-analytics">Analytics</label>
              </h3>

              <label
                htmlFor="consent-analytics"
                className="relative inline-flex shrink-0 cursor-pointer items-center"
              >
                <input
                  id="consent-analytics"
                  type="checkbox"
                  role="switch"
                  checked={draftAnalytics}
                  onChange={(event) => setDraftAnalytics(event.target.checked)}
                  aria-describedby="consent-analytics-desc"
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="h-6 w-11 rounded-ls-pill bg-ls-subtle transition-colors peer-checked:bg-ls-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--color-focus-ring)"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-0.5 size-5 -translate-y-1/2 rounded-full bg-white shadow-ls-xs transition-transform peer-checked:translate-x-5 motion-reduce:transition-none"
                />
              </label>
            </div>

            <p id="consent-analytics-desc" className="ls-body-sm mt-2">
              {/*
                Names the actual tool. Consent is only informed if the visitor
                can see what they are agreeing to before they agree to it.
              */}
              When enabled, <strong>Microsoft Clarity</strong> measures how
              visitors use this website, including session recordings, so we
              can find usability problems. The contact form is masked, and we
              never send your contact-form details to analytics.
              {!analyticsConfigured && (
                <>
                  {" "}
                  <strong>
                    No analytics provider is currently configured on this
                    website, so nothing is loaded either way.
                  </strong>{" "}
                  Your choice here will apply if one is added later.
                </>
              )}
            </p>
          </section>
        </div>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => save({ analytics: draftAnalytics })}
            className={cn(
              actionClass,
              "bg-ls-navy text-white hover:bg-ls-navy-600",
            )}
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className={cn(
              actionClass,
              "border border-ls-border bg-white text-ls-ink hover:bg-ls-bg-soft",
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
        </div>
      </div>
    </dialog>
  );
}
