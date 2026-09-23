import { analyticsConfig } from "@/lib/consent/consent-config";

/**
 * Microsoft Clarity wiring.
 *
 * Kept separate from the React component so that ConsentProvider can revoke
 * consent without importing a component, and so the exact API calls Microsoft
 * documents live in one readable place.
 *
 * References (checked against Microsoft Learn):
 * - Consent API v2: learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
 * - Consent Mode:   learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode
 * - Masking:        learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking
 */

export const clarityProjectId = analyticsConfig.clarityProjectId;

/** next/script dedupes by id, so this value must stay unique and stable. */
export const CLARITY_SCRIPT_ID = "ls-clarity";

type ClarityFn = (...args: unknown[]) => void;

function getClarity(): ClarityFn | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { clarity?: ClarityFn }).clarity;
  return typeof fn === "function" ? fn : null;
}

/**
 * The official Clarity snippet, followed by the v2 consent signal.
 *
 * The snippet is Microsoft's, unmodified apart from whitespace. It defines
 * `window.clarity` as a queueing stub before the remote tag arrives, so the
 * `consentv2` call immediately after is queued and replayed - it does not race.
 *
 * `consentv2` replaces the older `clarity('consent')` call, which Microsoft
 * documents as "planned for deprecation and should no longer be used".
 *
 * Both values are stated explicitly:
 * - analytics_Storage "granted" - this snippet is only ever rendered after the
 *   visitor has opted in, so there is no other state it could be in.
 * - ad_Storage "denied" - the site runs no advertising or remarketing of any
 *   kind, so consent for ad storage is never sought and never claimed.
 */
export function clarityBootstrap(projectId: string): string {
  return `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;
      t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", ${JSON.stringify(projectId)});
    window.clarity('consentv2', {
      ad_Storage: "denied",
      analytics_Storage: "granted"
    });
  `;
}

/**
 * Withdraws Clarity consent.
 *
 * Called when a visitor turns optional analytics off. Two documented calls,
 * in order:
 *
 * 1. `consentv2` with both storages denied - the supported way to tell Clarity
 *    the decision changed. Microsoft: on rejection Clarity "deletes any
 *    existing cookie for the website, ends the current session, and restarts
 *    tracking in no-consent mode".
 * 2. `clarity('consent', false)` - documented on the same page under "Erase
 *    cookies" as the call that "clears the Clarity cookies from the user's
 *    browser and prevent further tracking until new consent is granted".
 *
 * This does NOT by itself stop an already-running tag. Removing a script
 * element does not unload an initialised library, so ConsentProvider follows
 * this with a controlled reload; after it, the gate in AnalyticsLoader simply
 * never renders the script again.
 *
 * Safe to call when Clarity never loaded - it no-ops.
 */
export function revokeClarityConsent(): void {
  const clarity = getClarity();
  if (!clarity) return;

  try {
    clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "denied",
    });
    clarity("consent", false);
  } catch {
    /*
     * Never let a third-party tag break the preference save. The cookie sweep
     * and the reload that follow do not depend on this succeeding.
     */
  }
}
