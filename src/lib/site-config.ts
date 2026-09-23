/**
 * Single source of truth for everything SEO needs to know about this site.
 *
 * Nothing else in the codebase should hardcode the production origin. Layout
 * metadata, per-page canonicals, the sitemap, robots.txt, the Open Graph image
 * and the JSON-LD all read from here, so the domain is changed in one place.
 */

import { legalLastUpdated } from "@/data/legal";

/**
 * The intended production origin.
 *
 * IMPORTANT - this is NOT yet confirmed by anything in the repository. There is
 * no vercel.json, netlify.toml, Dockerfile, CI workflow or deployment manifest
 * in this project, and `.env.local` contains only the Web3Forms key. The value
 * below is the domain named in the Phase 16 brief and is treated as intended
 * rather than verified. See docs/SEO_IMPLEMENTATION.md.
 *
 * Note the hyphen: laundry-sync.com, NOT laundrysync.com.
 *
 * Set NEXT_PUBLIC_SITE_ORIGIN at build time to override it without a code
 * change - that is how a preview deployment points at its own hostname instead
 * of claiming to be production.
 */
const FALLBACK_ORIGIN = "https://laundry-sync.com";

/** True only when the origin came from deployment configuration, not the fallback. */
export const originIsConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_ORIGIN);

/** Normalised: no trailing slash, so `${siteOrigin}/contact` is always correct. */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? FALLBACK_ORIGIN
).replace(/\/+$/, "");

/**
 * Whether this build may be indexed.
 *
 * Defaults to allowing indexing, because a production build must never
 * silently inherit a preview-only restriction. A preview deployment opts OUT
 * explicitly by setting NEXT_PUBLIC_ALLOW_INDEXING="false".
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

/**
 * Whether the three legal policies may be indexed.
 *
 * They are still drafts: they render a visible "Draft - not yet approved for
 * publication" badge and `[To confirm: ...]` markers, and every business fact
 * in src/data/legal.ts is null. Letting Google index that would publish
 * unapproved legal content, so they are noindex and stay out of sitemap.xml
 * until approval.
 *
 * The signal is `legalLastUpdated`, which doubles as the effective date the
 * pages display. Setting it to a real date - the last step of the publication
 * checklist in docs/LEGAL_LAUNCH_CHECKLIST.md - makes all three pages
 * indexable and adds them to the sitemap with no other code change.
 */
export const legalPagesApproved = legalLastUpdated !== null;

export const siteConfig = {
  name: "LaundrySync",
  parentBrand: "Propelius",

  /** Used as the <title> when a page sets none, and as og:title site-wide. */
  defaultTitle: "LaundrySync | Laundry Business Software by Propelius",
  titleTemplate: "%s | LaundrySync",

  /**
   * Describes what the software does for a laundry BUSINESS. LaundrySync sells
   * software to laundries - it does not wash or deliver clothes - so the copy
   * deliberately avoids consumer laundry-service intent.
   */
  defaultDescription:
    "LaundrySync helps laundry and dry-cleaning businesses offer branded online ordering, pickup scheduling and order-status visibility, with tools for business administration.",

  /** Served by src/app/opengraph-image.tsx at /opengraph-image. */
  ogImageAlt:
    "LaundrySync - branded online ordering for laundry businesses. A product by Propelius.",

  ogLocale: "en_US",

  contactPath: "/contact",
} as const;

/**
 * Absolute URL for a site-relative path. Guarantees one consistent hostname
 * AND one consistent trailing-slash form.
 *
 * The root returns a bare origin with no trailing slash, because that is what
 * Next emits for `alternates.canonical: "/"`. Verified in the built output:
 * returning `${siteOrigin}/` here made sitemap.xml disagree with the
 * homepage's own canonical tag.
 */
export function absoluteUrl(path: string): string {
  if (path === "/") return siteOrigin;
  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}
