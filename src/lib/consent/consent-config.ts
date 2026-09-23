import type { ConsentCategories } from "./consent-types";

/**
 * Consent configuration for the LaundrySync marketing website.
 *
 * AUDIT: the site loads no tag manager and no advertising script. Inter is
 * self-hosted by next/font, so no request reaches Google Fonts at runtime.
 * Web3Forms is contacted only when a visitor submits the contact form.
 *
 * Microsoft Clarity is the one analytics tool configured, and it is loaded
 * only after a visitor opts in.
 */

/** Raise this when tracking purposes materially change. */
export const CONSENT_VERSION = 1;

export const CONSENT_STORAGE_KEY = "ls-consent";

/** Optional categories start off. Nothing here is pre-selected. */
export const DEFAULT_CATEGORIES: ConsentCategories = { analytics: false };

/**
 * The Microsoft Clarity project this site reports to.
 *
 * Held in source rather than only in an env file, for two reasons:
 *
 * 1. A Clarity project ID is not a secret. It ships inside the tag URL and is
 *    readable by every visitor in the page source - unlike the Web3Forms key,
 *    there is nothing to protect.
 * 2. `.gitignore` ignores `.env*`, so an env-only value would never reach a
 *    deployment and Clarity would silently never load in production.
 *
 * NEXT_PUBLIC_CLARITY_PROJECT_ID still overrides it, so a staging deployment
 * can point at a different project, and setting it to an empty string turns
 * Clarity off entirely.
 */
const CLARITY_PROJECT_ID = "ymplhrn7yv";

/**
 * Analytics provider IDs.
 *
 * GA4 remains unconfigured - no measurement ID exists yet - so nothing Google
 * loads regardless of consent. Clarity is configured. Neither loads until a
 * visitor actively opts in; see AnalyticsLoader.
 */
export const analyticsConfig = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? null,
  clarityProjectId:
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? CLARITY_PROJECT_ID,
} as const;

export const analyticsConfigured = Boolean(
  analyticsConfig.ga4MeasurementId || analyticsConfig.clarityProjectId,
);

/**
 * First-party cookies written by the providers above, cleared on withdrawal.
 * Deliberately an explicit list - never a blanket cookie wipe.
 *
 *   _ga, _gid, _gat   - Google Analytics (not currently active)
 *   _clck, _clsk      - Microsoft Clarity
 *
 * Clarity is also told to erase its own cookies on withdrawal; see
 * revokeClarityConsent in src/lib/analytics/clarity.ts. This list is the
 * belt-and-braces sweep, not the primary mechanism.
 */
export const ANALYTICS_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_clck", "_clsk"];
