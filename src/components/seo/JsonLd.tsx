import { siteConfig, siteOrigin, absoluteUrl } from "@/lib/site-config";
import { legalInfo } from "@/data/legal";

/**
 * Site-wide structured data.
 *
 * Deliberately limited to two nodes that can be backed by what the site
 * actually says. Every property here is verifiable from visible page content
 * or from a committed brand asset.
 *
 * Intentionally NOT included, and why:
 *
 * - `Organization` telephone, foundingDate, `sameAs` social profiles,
 *   VAT/registration numbers. None of these are stated on the site, and
 *   LaundrySync maintains no social profiles. Inventing them would put false
 *   claims into machine-readable markup. legalName, address and email ARE
 *   included: they come from src/data/legal.ts, the same values the legal
 *   pages display.
 *
 * - `SoftwareApplication`. Google's software rich result needs `offers` (a
 *   price) or `aggregateRating` to be eligible. LaundrySync publishes no
 *   pricing, and has no ratings or reviews. A node without them earns no rich
 *   result, and adding them would mean inventing commercial terms.
 *
 * - `FAQPage`, despite the homepage FAQ accordion. Since Google's August 2023
 *   change, FAQ rich results are shown only for authoritative government and
 *   health sites, so the markup would carry risk for a B2B SaaS site with no
 *   upside. Revisit only if that guidance changes.
 */
export function JsonLd() {
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        /* The trading name shown on the site; the legal name as the policies state it. */
        name: siteConfig.parentBrand,
        ...(legalInfo.legalEntityName && { legalName: legalInfo.legalEntityName }),
        ...(legalInfo.registeredAddress && { address: legalInfo.registeredAddress }),
        ...(legalInfo.generalEmail && { email: legalInfo.generalEmail }),
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/brand-icon-primary.png"),
          width: 1254,
          height: 1254,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        description: siteConfig.defaultDescription,
        url: absoluteUrl("/"),
        inLanguage: "en",
        publisher: { "@id": organizationId },
        /*
         * No `potentialAction` / SearchAction: the site has no search page, so
         * declaring a search endpoint would describe a feature that does not
         * exist.
         */
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      /*
       * JSON.stringify output is escaped for the one character that could
       * close the script element early. The value is built from static config,
       * never from user input.
       */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
