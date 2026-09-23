/**
 * Single source of truth for everything SEO needs to know about this site.
 *
 * Nothing else in the codebase should hardcode the production origin. Layout
 * metadata, per-page canonicals, the sitemap, robots.txt, the Open Graph image
 * and the JSON-LD all read from here, so the domain is changed in one place.
 */

import { legalLastUpdated } from "@/data/legal";

/**
 * The production origin to fall back on when nothing else identifies the host.
 *
 * IMPORTANT - this is NOT yet confirmed, and as of the last check
 * laundry-sync.com does not resolve at all (DNS failure). It is the domain
 * named in the Phase 16 brief, treated as intended rather than verified.
 * See docs/SEO_IMPLEMENTATION.md.
 *
 * Note the hyphen: laundry-sync.com, NOT laundrysync.com.
 */
const FALLBACK_ORIGIN = "https://laundry-sync.com";

/**
 * Resolves the origin every absolute URL on the site is built from.
 *
 * Order matters, and it is deliberately "whoever is actually serving this"
 * rather than "whatever domain we hope to use one day". Absolute URLs that
 * point at a host which does not resolve are worse than useless: Slack,
 * WhatsApp, LinkedIn and X all fetch og:image server-side, so a dead hostname
 * renders as a broken-image placeholder, and a canonical pointing at a dead
 * hostname can cost the page its indexing entirely.
 *
 * 1. NEXT_PUBLIC_SITE_ORIGIN - explicit, always wins. Use it to pin a
 *    hostname, or to point a staging build at itself.
 *
 * 2. VERCEL_PROJECT_PRODUCTION_URL - Vercel sets this on every build to "the
 *    shortest production custom domain, or vercel.app domain if no custom
 *    domain is available", and documents it for exactly this purpose
 *    ("reliably generate links that point to production such as OG-image
 *    URLs"). It is always set, including on preview builds, so a preview's
 *    share card still points at real production assets rather than at a
 *    throwaway deployment URL.
 *
 *    This self-corrects. Today the project has no custom domain, so it returns
 *    laundry-sync.vercel.app. The moment laundry-sync.com is attached to the
 *    Vercel project, the same variable returns laundry-sync.com and every
 *    canonical, sitemap entry, JSON-LD URL and share image follows - with no
 *    code change and no redeploy beyond the next build.
 *
 *    Requires "Enable access to System Environment Variables" in the Vercel
 *    project settings, which is on by default.
 *
 * 3. FALLBACK_ORIGIN - local builds and any non-Vercel host.
 */
function resolveOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_ORIGIN;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost.replace(/\/+$/, "")}`;

  return FALLBACK_ORIGIN;
}

/** True when the origin came from configuration rather than the fallback. */
export const originIsConfigured = Boolean(
  process.env.NEXT_PUBLIC_SITE_ORIGIN ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
);

/** Normalised: no trailing slash, so `${siteOrigin}/contact` is always correct. */
export const siteOrigin = resolveOrigin();

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
