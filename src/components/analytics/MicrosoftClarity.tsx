"use client";

import Script from "next/script";
import {
  clarityBootstrap,
  clarityProjectId,
  CLARITY_SCRIPT_ID,
} from "@/lib/analytics/clarity";

/**
 * Microsoft Clarity tag.
 *
 * This component performs no consent checking of its own. It is rendered only
 * by AnalyticsLoader, which is the single gate for every optional analytics
 * tool on the site - keeping the decision in one place means a second provider
 * cannot accidentally ship with a weaker check.
 *
 * Mounting it is therefore a statement that consent has already been granted.
 *
 * Loaded once per page session:
 * - `strategy="afterInteractive"` runs it after hydration, so it never blocks
 *   first render and cannot introduce a layout shift.
 * - next/script dedupes by `id`, so re-renders, opening the preferences panel,
 *   and client-side navigation between routes all reuse the same instance. The
 *   component lives in the root layout, which does not remount on navigation.
 */
export function MicrosoftClarity() {
  if (!clarityProjectId) return null;

  return (
    <Script id={CLARITY_SCRIPT_ID} strategy="afterInteractive">
      {clarityBootstrap(clarityProjectId)}
    </Script>
  );
}
