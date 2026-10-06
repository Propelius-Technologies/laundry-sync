"use client";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "./ConsentProvider";
import {
  analyticsConfig,
  analyticsConfigured,
  analyticsEnabled,
  vercelAnalyticsEnabled,
} from "@/lib/consent/consent-config";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";

/**
 * The only place optional analytics can enter the page.
 *
 * Basic consent, deliberately: nothing is requested, injected or queued until
 * the visitor has actively opted in. There is no pre-consent ping and no
 * "denied" bootstrap call - if a visitor has not opted in, no analytics
 * request is made at all.
 *
 * Two conditions must both hold: the visitor opted in, and this build is
 * allowed to report (`analyticsEnabled` - production, or an explicit opt-in).
 * The same gate covers Clarity, Vercel Web Analytics and GA4. GA4 has no
 * measurement ID yet, so nothing Google loads either way.
 *
 * Rendering is keyed off `status === "decided"`, and next/script dedupes by
 * id, so neither provider can be injected twice. This component is mounted
 * once from the root layout, so client-side navigation does not remount it.
 *
 * This is the ONLY gate. Provider components below do not re-check consent -
 * reaching them already means it was granted.
 */
export function AnalyticsLoader() {
  const { status, categories } = useConsent();

  const allowed = status === "decided" && categories.analytics;
  if (!allowed || !analyticsEnabled || !analyticsConfigured) return null;

  const { ga4MeasurementId, clarityProjectId } = analyticsConfig;

  return (
    <>
      {ga4MeasurementId && (
        <>
          <Script
            id="ls-ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
          />
          <Script id="ls-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'granted'
              });
              gtag('config', '${ga4MeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {clarityProjectId && <MicrosoftClarity />}

      {/* Cookieless; served and collected first party under /_vercel/insights. */}
      {vercelAnalyticsEnabled && <Analytics />}
    </>
  );
}
