/** Optional categories the visitor can control. Strictly necessary is not one. */
export type OptionalCategory = "analytics";

export type ConsentCategories = Record<OptionalCategory, boolean>;

export type ConsentRecord = {
  /** Bumped when the purposes materially change, which re-asks the visitor. */
  version: number;
  /** ISO timestamp of the decision. No other visitor data is ever stored. */
  decidedAt: string;
  categories: ConsentCategories;
};

/**
 * "unknown" only exists before the stored record has been read, which happens
 * after hydration. It keeps the server and first client render identical.
 */
export type ConsentStatus = "unknown" | "undecided" | "decided";

export type ConsentState = {
  status: ConsentStatus;
  categories: ConsentCategories;
};
