import {
  ANALYTICS_COOKIE_PREFIXES,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_CATEGORIES,
} from "./consent-config";
import type { ConsentCategories, ConsentRecord } from "./consent-types";

/**
 * Sentinel returned during server render and hydration.
 *
 * It is distinct from "" (decided nothing is stored), which lets the provider
 * hold a neutral "unknown" state until the real value is read on the client -
 * so the markup matches and the banner never flashes for someone who already
 * chose.
 */
export const SERVER_SNAPSHOT = "__server__";

/** Raw stored string. A primitive, so it is a stable useSyncExternalStore snapshot. */
export function readRawConsent(): string {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Treating
    // that as "undecided" is the safe default: nothing optional loads.
    return "";
  }
}

export function getServerConsentSnapshot() {
  return SERVER_SNAPSHOT;
}

const CONSENT_EVENT = "ls-consent-change";

/** Notifies this tab, and picks up changes made in other tabs. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Parses a raw snapshot.
 *
 * Returns null when there is none, when it cannot be parsed, or when it was
 * saved against an older consent version - all of which mean the visitor has
 * not decided under the current purposes and should be asked again.
 */
export function parseConsent(raw: string): ConsentRecord | null {
  if (!raw || raw === SERVER_SNAPSHOT) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed?.version !== CONSENT_VERSION) return null;
    if (typeof parsed.categories?.analytics !== "boolean") return null;

    return {
      version: CONSENT_VERSION,
      decidedAt: String(parsed.decidedAt ?? ""),
      categories: { analytics: parsed.categories.analytics },
    };
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
    categories,
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // If it cannot be persisted the choice still applies for this page view.
  }

  window.dispatchEvent(new Event(CONSENT_EVENT));
  return record;
}

export { DEFAULT_CATEGORIES };

/**
 * Expires the analytics cookies this site's providers are documented to set.
 *
 * Only the listed prefixes are touched, on the current host and its parent
 * domain, so unrelated cookies and application storage are left alone. It
 * cannot reach data a third party has already received.
 */
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const hostParts = window.location.hostname.split(".");
  const domains = [
    undefined,
    window.location.hostname,
    hostParts.length > 1 ? `.${hostParts.slice(-2).join(".")}` : undefined,
  ];

  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0]?.trim();
    if (!name) continue;
    if (!ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      continue;
    }

    for (const domain of domains) {
      document.cookie =
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/` +
        (domain ? `; domain=${domain}` : "");
    }
  }
}
