/**
 * Single source of truth for every navigation target on the site.
 * Section anchors point at ids that the homepage sections will own as they are
 * built; keeping them here means each new section only has to match the slug.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const siteName = "LaundrySync";

export const mainNav: NavItem[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "For businesses", href: "/#for-businesses" },
  { label: "FAQ", href: "/#faq" },
];

export const headerCta: NavItem = { label: "Contact us", href: "/contact" };

export const heroPrimaryCta: NavItem = {
  label: "Talk to our team",
  href: "/contact",
};

export const heroSecondaryCta: NavItem = {
  label: "See how it works",
  href: "/#how-it-works",
};

/** Section ids the homepage will provide, derived from the nav so they cannot drift. */
export const sectionIds = mainNav
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footerExplore: NavItem[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "For businesses", href: "/#for-businesses" },
  { label: "Make it yours", href: "/#make-it-yours" },
  { label: "FAQ", href: "/#faq" },
];

/** Routes to pages that are not built yet - the paths are the intended ones. */
export const footerLegal: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const footerContact: NavItem = { label: "Contact us", href: "/contact" };

export const footerTagline =
  "Branded online ordering and pickup scheduling for laundry and dry-cleaning businesses.";
