import type { MetadataRoute } from "next";
import { absoluteUrl, legalPagesApproved } from "@/lib/site-config";

/**
 * XML sitemap, served at /sitemap.xml.
 *
 * Lists only indexable public pages. Deliberately excluded:
 *
 * - /thank-you        - noindex; a confirmation page has no search value.
 * - the legal pages   - only while they are unapproved drafts. See
 *                       legalPagesApproved in src/lib/site-config.ts.
 * - the 404 page      - not a real route, and returns a 404 status.
 * - homepage anchors  - /#features, /#faq and friends are sections OF the
 *                       homepage, not separate URLs. Listing them would ask
 *                       Google to index the same page five times.
 *
 * No `lastModified`, `changeFrequency` or `priority` is set. The repository
 * has no per-page content-modification tracking, so a real last-modified date
 * is not available; stamping every entry with the build time would tell
 * crawlers that all five pages change on every deploy, which is false.
 * `priority` and `changeFrequency` are ignored by Google, and there is no
 * documented reason to differentiate these five URLs.
 */
const alwaysIndexable = ["/", "/contact"];

const legalPaths = ["/privacy-policy", "/terms-of-use", "/cookie-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = legalPagesApproved
    ? [...alwaysIndexable, ...legalPaths]
    : alwaysIndexable;

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
