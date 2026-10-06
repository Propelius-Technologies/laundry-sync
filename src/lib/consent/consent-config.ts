import type { ConsentCategories } from "./consent-types";

/**
 * Consent configuration for the LaundrySync marketing website.
 *
 * AUDIT: the site loads no tag manager and no advertising script. Inter is
 * self-hosted by next/font, so no request reaches Google Fonts at runtime.
 * Web3Forms is contacted only when a visitor submits the contact form.
 *
 * Microsoft Clarity and Vercel Web Analytics are the analytics tools
 * configured, and both load only after a visitor opts in.
 */

/**
 * Raise this when tracking purposes materially change.
 * 2: Vercel Web Analytics added alongside Clarity, so earlier choices re-ask.
 */
export const CONSENT_VERSION = 2;

export const CONSENT_STORAGE_KEY = "ls-consent";

/**
 * A stored choice older than this counts as no choice: the banner returns and
 * nothing optional loads until the visitor decides again.
 */
export const CONSENT_MAX_AGE_MONTHS = 6;

/** Optional categories start off. Nothing here is pre-selected. */
export const DEFAULT_CATEGORIES: ConsentCategories = { analytics: false };

/**
 * Whether this build may load analytics at all, consent aside.
 *
 * Only production reports, so local, dev and preview builds never send test
 * sessions to the live projects:
 *
 * - NEXT_PUBLIC_VERCEL_ENV is "production" on Vercel production builds
 *   (Vercel exposes it when system environment variables are enabled).
 * - NEXT_PUBLIC_ANALYTICS_ENABLED="true" opts any other build in explicitly,
 *   e.g. to test the integration locally or on a staging project.
 */
export const analyticsEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";

/**
 * Analytics provider IDs, read only from the environment - there is no
 * fallback in source. Set NEXT_PUBLIC_CLARITY_PROJECT_ID (and
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID if GA4 is ever added) in the Vercel
 * Production environment.
 *
 * Null when this build is not allowed to load analytics, so nothing
 * downstream can load a provider by accident. Even when set, neither loads
 * until a visitor actively opts in; see AnalyticsLoader.
 */
export const analyticsConfig = {
  ga4MeasurementId: analyticsEnabled
    ? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || null
    : null,
  clarityProjectId: analyticsEnabled
    ? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || null
    : null,
} as const;

/**
 * Vercel Web Analytics needs no ID - Vercel wires it to the project the site
 * is deployed in - so it is on wherever this build may report at all. It
 * reports nothing until Web Analytics is enabled in the Vercel dashboard.
 */
export const vercelAnalyticsEnabled = analyticsEnabled;

export const analyticsConfigured = Boolean(
  analyticsConfig.ga4MeasurementId ||
    analyticsConfig.clarityProjectId ||
    vercelAnalyticsEnabled,
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
