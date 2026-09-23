"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import { DEFAULT_CATEGORIES } from "@/lib/consent/consent-config";
import {
  clearAnalyticsCookies,
  getServerConsentSnapshot,
  parseConsent,
  readRawConsent,
  SERVER_SNAPSHOT,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent/consent-storage";
import type {
  ConsentCategories,
  ConsentState,
} from "@/lib/consent/consent-types";
import { revokeClarityConsent } from "@/lib/analytics/clarity";

type ConsentContextValue = ConsentState & {
  /** True once the stored decision has been read on the client. */
  ready: boolean;
  save: (categories: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

/**
 * The single source of truth for cookie consent.
 *
 * Reads localStorage through useSyncExternalStore, which is the API built for
 * exactly this: the server and the hydrating client both see a neutral
 * sentinel, React swaps to the real value straight after hydration, and
 * changes made in another tab propagate. No effect writes state, so nothing
 * cascades and nothing flashes.
 *
 * The stored record holds only a version, a timestamp and the category flags -
 * never a name, email, message or anything else from the contact form.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(
    subscribeConsent,
    readRawConsent,
    getServerConsentSnapshot,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  /** Tracks whether an analytics script was actually injected this session. */
  const analyticsLoadedRef = useRef(false);

  const state = useMemo<ConsentState>(() => {
    if (raw === SERVER_SNAPSHOT) {
      return { status: "unknown", categories: DEFAULT_CATEGORIES };
    }
    const stored = parseConsent(raw);
    return stored
      ? { status: "decided", categories: stored.categories }
      : { status: "undecided", categories: DEFAULT_CATEGORIES };
  }, [raw]);

  // Remember whether anything was ever loaded, so withdrawal knows whether a
  // reload is genuinely needed. Writes a ref only - never state.
  useEffect(() => {
    if (state.status === "decided" && state.categories.analytics) {
      analyticsLoadedRef.current = true;
    }
  }, [state]);

  const save = useCallback((categories: ConsentCategories) => {
    const previouslyLoaded = analyticsLoadedRef.current;

    // Writing notifies the store, which re-renders every consumer.
    writeConsent(categories);
    setPreferencesOpen(false);

    if (!categories.analytics) {
      /*
       * Order matters. Tell Clarity first, while its API is still on the page:
       * the documented withdrawal path has it end the session and erase its
       * own cookies. The sweep afterwards catches anything left, including
       * GA4's cookies if GA4 is ever enabled.
       */
      revokeClarityConsent();
      clearAnalyticsCookies();

      /*
       * Neither tag can be fully unloaded once running - removing a script
       * element does not unload an initialised library - so withdrawing after
       * one loaded needs a reload to stop collection reliably. After it, the
       * gate in AnalyticsLoader simply never renders the script again.
       * Only reached if analytics actually ran.
       */
      if (previouslyLoaded) {
        analyticsLoadedRef.current = false;
        window.location.reload();
      }
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ...state,
      ready: state.status !== "unknown",
      save,
      acceptAll: () => save({ analytics: true }),
      rejectAll: () => save({ analytics: false }),
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      preferencesOpen,
    }),
    [state, save, preferencesOpen],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used inside ConsentProvider");
  }
  return context;
}
