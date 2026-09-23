import type { Metadata } from "next";
import { siteConfig, absoluteUrl, allowIndexing } from "@/lib/site-config";

/*
 * The card produced by src/app/opengraph-image.tsx. Next serves the generated
 * route at /opengraph-image; naming it explicitly keeps every page pointing at
 * the same asset.
 */
const ogImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: siteConfig.ogImageAlt,
  type: "image/png",
} as const;

/**
 * Builds a page's Metadata object.
 *
 * This exists because of one specific Next.js behaviour: metadata from nested
 * segments is merged **shallowly**, so a page that exports its own `openGraph`
 * object REPLACES the root layout's entire `openGraph` object rather than
 * extending it. A page setting only `openGraph.title` therefore silently loses
 * `siteName`, `locale`, `type` and the image reference.
 *
 * Every page routes through this helper so that can't happen: the shared
 * Open Graph fields are re-stated on each page as part of a complete object.
 *
 * That same merge also drops the og:image. The `src/app/opengraph-image.tsx`
 * file convention alone is NOT enough: it populated og:image on `/` but on no
 * other route, because each page's own `openGraph` object replaced the
 * resolved one. Verified in the built output before this was added. So the
 * image is re-stated here too, as an absolute URL.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  /** Page title WITHOUT the "| LaundrySync" suffix - the template adds it. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/contact". Becomes the canonical URL. */
  path: string;
  /** Excludes the page from search results while still allowing link following. */
  noindex?: boolean;
}): Metadata {
  /* The full title, used for og:title and twitter:title, which have no template. */
  const fullTitle = siteConfig.titleTemplate.replace("%s", title);
  const url = absoluteUrl(path);

  return {
    /*
     * `absolute` rather than a bare string, so the brand is guaranteed to be
     * in every <title> regardless of how the layout's template merges.
     *
     * This is not theoretical. The root layout's `title.template` applies to
     * CHILD segments, and app/page.tsx counts as the same segment as
     * app/layout.tsx - so the homepage rendered as
     * "Laundry Business Software & Online Ordering" with no "| LaundrySync"
     * at all, while every nested route got the suffix. Verified in the built
     * output.
     *
     * Stating the resolved title here also guarantees <title> and og:title
     * always match.
     */
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },

    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
      title: fullTitle,
      description,
      url,
      images: [ogImage],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },

    robots: noindex
      ? /*
         * follow:true is deliberate. A noindex,nofollow page is a dead end for
         * crawlers - noindex keeps it out of results while follow lets link
         * equity pass through to the pages it links to.
         */
        { index: false, follow: true }
      : /* A page is only indexable if the deployment as a whole is. */
        { index: allowIndexing, follow: true },
  };
}
