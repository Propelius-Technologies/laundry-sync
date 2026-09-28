/**
 * Business facts used across the three legal pages.
 *
 * ONE SOURCE OF TRUTH. Never restate an entity name, address or email in a
 * page - read it from here, so the three drafts cannot contradict each other.
 *
 * Every `null` below is a fact this repository does NOT contain and that
 * nobody has confirmed. They render as a visible "to be confirmed" marker
 * rather than plausible-looking invented detail, and the pages must not be
 * published until they are filled in.
 * See docs/LEGAL_LAUNCH_CHECKLIST.md.
 */

export type LegalFact = string | null;

export const legalInfo = {
  /** Verified from the repository. */
  brand: "LaundrySync",
  parentBrand: "Propelius",

  /*
   * Not present anywhere in the project - require confirmation. The pages
   * render each through <Fact>, which shows the value once it is set here and
   * a "[To confirm: ...]" marker until then.
   */
  legalEntityName: null as LegalFact,
  registeredAddress: null as LegalFact,
  /** The operating jurisdiction that decides the data protection regime. */
  jurisdiction: null as LegalFact,
  websiteDomain: null as LegalFact,
  generalEmail: null as LegalFact,
  privacyEmail: null as LegalFact,
  /** Hosting provider and region, e.g. "Vercel Inc., US (iad1)". */
  hostingProvider: null as LegalFact,
  /** How long contact-form enquiries are kept. */
  contactFormRetention: null as LegalFact,
  /** Web3Forms retention period, data location, sub-processors and DPA terms. */
  web3formsTerms: null as LegalFact,
  /** Transfer destinations and the safeguard relied on for each provider. */
  transferSafeguards: null as LegalFact,
  /** Whether a DPO or local representative must be appointed. */
  dpoRequirement: null as LegalFact,
  /** Governing law and the courts with jurisdiction over disputes. */
  governingLaw: null as LegalFact,
  /** How long the hosting provider keeps server logs. */
  hostingLogRetention: null as LegalFact,
  /** Observed expiry of each Clarity cookie group. */
  clarityCookieDurations: {
    clck: null as LegalFact,
    clsk: null as LegalFact,
    microsoft: null as LegalFact,
  },
} as const;

/** Shown in the cookie table until a Clarity duration is confirmed. */
const clarityDurationTbc =
  "Not published in Microsoft's cookie list — to be confirmed";

/**
 * Publication date. Null while these remain unapproved drafts - the pages show
 * a draft notice instead of a fabricated "last updated" date.
 */
export const legalLastUpdated: LegalFact = null;

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
 * them. Nothing is guessed here. Confirm the real values in DevTools after
 * opting in, and replace the text below with what is observed.
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
      legalInfo.clarityCookieDurations.clck || clarityDurationTbc,
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
      legalInfo.clarityCookieDurations.clsk || clarityDurationTbc,
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
      legalInfo.clarityCookieDurations.microsoft || clarityDurationTbc,
    consentRequired: "Yes",
  },
] as const;
