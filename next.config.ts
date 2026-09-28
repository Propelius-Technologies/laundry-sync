import type { NextConfig } from "next";

/**
 * Content Security Policy, REPORT-ONLY for now.
 *
 * Browsers log violations to the console but block nothing, so the policy can
 * be checked against real traffic (consented Clarity sessions, contact-form
 * submits) before it is enforced. To enforce it, rename the header key to
 * `Content-Security-Policy`.
 *
 * - 'unsafe-inline' scripts: Next.js inlines its bootstrap scripts, and the
 *   Clarity loader is an inline next/script. Removing it needs nonces.
 * - 'unsafe-inline' styles: motion animates through inline style attributes.
 * - Clarity loads from www.clarity.ms and scripts.clarity.ms, reports to
 *   *.clarity.ms, and syncs its ID through c.bing.com.
 * - Web3Forms receives the contact form, posted straight from the browser.
 * - hCaptcha (the contact form's spam check, via Web3Forms) loads its script
 *   from js.hcaptcha.com and runs the challenge in an hcaptcha.com iframe,
 *   which also fetches its own styles and data. Only /contact loads it.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://*.clarity.ms https://hcaptcha.com https://*.hcaptcha.com",
  "connect-src 'self' https://api.web3forms.com https://*.clarity.ms https://c.bing.com https://hcaptcha.com https://*.hcaptcha.com",
  "img-src 'self' data: https://*.clarity.ms https://c.bing.com",
  "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com",
  "frame-src https://hcaptcha.com https://*.hcaptcha.com",
  "font-src 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
