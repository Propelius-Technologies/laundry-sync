import type { MetadataRoute } from "next";
import { absoluteUrl, allowIndexing } from "@/lib/site-config";

/**
 * robots.txt, served at /robots.txt.
 *
 * Production allows everything. There is nothing to hide: the site is five
 * public marketing pages with no API routes, no admin area and no private
 * paths. Inventing Disallow rules would only advertise paths that do not
 * exist.
 *
 * /thank-you is NOT disallowed. It carries a noindex directive, and a crawler
 * has to be allowed to fetch the page to see that directive - blocking it in
 * robots.txt would hide the very instruction that keeps it out of results, and
 * the URL could still surface from an external link.
 *
 * Nothing blocks CSS, JS, SVG or images. Google renders pages before indexing
 * them, so blocking /_next/static would make the site look broken to the
 * crawler.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    /*
     * Preview/staging only, reached by setting NEXT_PUBLIC_ALLOW_INDEXING to
     * "false" on that deployment. This is a safety net for a hostname that is
     * not meant to rank - not a substitute for access control, and never the
     * default. A production build has the variable unset and takes the branch
     * below.
     */
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
