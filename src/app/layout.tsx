import type { Metadata } from "next";
import {
  siteConfig,
  siteOrigin,
  absoluteUrl,
  allowIndexing,
} from "@/lib/site-config";
import { JsonLd } from "@/components/seo/JsonLd";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { CookiePreferencesDialog } from "@/components/consent/CookiePreferencesDialog";
import { AnalyticsLoader } from "@/components/consent/AnalyticsLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  /*
   * Required for absolute URLs. Without it Next resolves relative canonical
   * and og:image values against localhost, which would ship localhost URLs
   * into production metadata.
   */
  metadataBase: new URL(siteOrigin),

  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.parentBrand }],
  creator: siteConfig.parentBrand,
  publisher: siteConfig.parentBrand,

  /*
   * Defaults only. Every page re-states a complete openGraph object through
   * pageMetadata() because nested metadata replaces these objects wholesale
   * rather than extending them.
   */
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: absoluteUrl("/"),
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    /*
     * No site/creator handle: LaundrySync has no X account, and naming one
     * that does not exist would be a fabricated reference. The large-image
     * card works without it.
     */
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [absoluteUrl("/opengraph-image")],
  },

  robots: { index: allowIndexing, follow: true },

  /*
   * icon / apple-icon / favicon.ico are picked up from the app directory by
   * file convention. They are not repeated here - doing so would emit a second
   * set of <link rel="icon"> tags.
   */

  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ls-bg">
        {/*
          Motion renders entrance states as inline styles (opacity:0), so
          without JavaScript the hero would stay invisible. An !important rule
          in a stylesheet outranks an inline style, which reveals it.
        */}
        <noscript>
          <style>{`.ls-animate{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        <MotionProvider>
          <SmoothScroll>
            <ConsentProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />

              {/* Consent shell - rendered once, available on every route */}
              <CookieBanner />
              <CookiePreferencesDialog />
              <AnalyticsLoader />
            </ConsentProvider>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
