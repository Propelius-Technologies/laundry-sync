/**
 * Business facts used across the three legal pages.
 *
 * ONE SOURCE OF TRUTH. Never restate an entity name, address or email in a
 * page - read it from here, so the three policies cannot contradict each other.
 *
 * Values marked "Propelius site" are taken from the parent company's own
 * published policies (propelius.tech/privacy-policy, last updated 7 May 2025,
 * and propelius.tech/terms-and-conditions, last updated December 2024), read
 * from Wayback Machine captures of April-May 2026.
 * See docs/LEGAL_LAUNCH_CHECKLIST.md.
 *
 * Pages render facts through <Fact>, which falls back to a visible
 * "[To confirm: ...]" marker if a value is ever set back to null.
 */

export type LegalFact = string | null;

export const legalInfo = {
  /** Verified from the repository. */
  brand: "LaundrySync",
  parentBrand: "Propelius",

  /** Propelius site. */
  legalEntityName: "Propelius Technologies" as LegalFact,
  /** Propelius site: the address both of its policies give. */
  registeredAddress: "205, Milestone Milagro, Vesu, Surat, Gujarat, India" as LegalFact,
  /** Where Propelius is headquartered. Propelius site. */
  jurisdiction: "India" as LegalFact,
  /** Propelius site. */
  generalEmail: "info@propelius.tech" as LegalFact,
  /** Propelius site: the address its privacy policy gives for rights requests. */
  privacyEmail: "privacy@propelius.tech" as LegalFact,
  /**
   * Hosting provider and region. Vercel is verified from the repository (see
   * src/lib/site-config.ts). "United States" is where the company is based;
   * the deployment region is not verified, so it is not stated.
   */
  hostingProvider: "Vercel Inc. (United States)" as LegalFact,
  /** How long contact-form enquiries are kept. Propelius site: "up to 3 years". */
  contactFormRetention: "3 years" as LegalFact,
  /** Transfer safeguard relied on. Propelius site, verbatim in substance. */
  transferSafeguards:
    "Standard Contractual Clauses or another lawful mechanism" as LegalFact,
  /** Governing law. Propelius site: laws of India, courts of Gujarat. */
  governingLaw: "India" as LegalFact,
  /** Propelius site: where disputes are resolved. */
  disputeForum: "arbitration or in the courts of Gujarat, India" as LegalFact,
  /**
   * Expiry of each Clarity cookie group. Microsoft's cookie list publishes no
   * expiries, so these are upper bounds from observed behaviour (_clck about a
   * year, _clsk a day, MUID up to 13 months) rather than exact figures.
   */
  clarityCookieDurations: {
    clck: "Up to 1 year",
    clsk: "Up to 1 day",
    microsoft: "Up to 13 months, as set by Microsoft",
  },
} as const;

/**
 * Effective date shown at the top of all three policies. Setting it also makes
 * the pages indexable and adds them to the sitemap (see legalPagesApproved in
 * src/lib/site-config.ts).
 */
export const legalLastUpdated: LegalFact = "5 October 2026";

/** Third parties the website actually contacts, verified by code audit. */
export const verifiedProcessors = [
  {
    name: "Microsoft Clarity",
    role: "Optional website analytics and behaviour analysis",
    when: "Only after you opt in to optional analytics",
    detail:
      "Measures how visitors use this website, including aggregated interaction data and session recordings, to find usability problems. Provided by Microsoft. The contact form is masked, so what you type into it is not captured.",
  },
  {
    name: "Web3Forms",
    role: "Processes contact-form submissions",
    when: "Only when a visitor submits the contact form",
    detail:
      "The form posts directly from the visitor's browser to Web3Forms, which forwards the enquiry to our notification inbox.",
  },
  {
    name: "hCaptcha",
    role: "Protects the contact form from spam and automated abuse",
    // Already said in `detail`, so the page adds no "(when ...)" suffix.
    when: null,
    detail:
      "Loads only on the contact page and processes technical information about your browser and interaction to tell people from bots.",
  },
] as const;

/**
 * Storage inventory.
 *
 * The consent record is first party and always present. The Clarity entries
 * appear only after a visitor opts in to optional analytics - before that, no
 * Clarity script is loaded and none of these are set.
 *
 * Cookie names, purposes and first/third-party classification are taken from
 * Microsoft's published cookie list:
 * learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies
 *
 * DURATIONS: Microsoft's cookie list does not publish an expiry for any of
 * them, so legalInfo.clarityCookieDurations states conservative upper bounds.
 */
export const storageInventory = [
  {
    name: "ls-consent",
    provider: "LaundrySync (first party)",
    type: "Local storage",
    purpose:
      "Remembers your cookie choice and the version of the purposes you agreed to, so you are not asked again on every page.",
    category: "Strictly necessary",
    duration:
      "Until you clear your browser storage, or we materially change the purposes and ask again",
    consentRequired: "No",
  },
  {
    name: "_clck",
    provider: "Microsoft Clarity",
    type: "Cookie (first party)",
    purpose:
      "Persists the Clarity user ID and preferences, so interactions on this site are attributed to the same pseudonymous user.",
    category: "Optional analytics",
    duration:
      legalInfo.clarityCookieDurations.clck,
    consentRequired: "Yes",
  },
  {
    name: "_clsk",
    provider: "Microsoft Clarity",
    type: "Cookie (first party)",
    purpose:
      "Connects multiple page views by one visitor into a single Clarity session recording.",
    category: "Optional analytics",
    duration:
      legalInfo.clarityCookieDurations.clsk,
    consentRequired: "Yes",
  },
  {
    name: "CLID, ANONCHK, MR, MUID, SM",
    provider: "Microsoft Clarity",
    type: "Cookies (third party, Microsoft domains)",
    purpose:
      "Microsoft's own identifiers, used to recognise a browser across sites that use Clarity and to synchronise that identifier between Microsoft domains.",
    category: "Optional analytics",
    duration:
      legalInfo.clarityCookieDurations.microsoft,
    consentRequired: "Yes",
  },
] as const;
