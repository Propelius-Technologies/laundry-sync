import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "LaundrySync gives laundry and dry-cleaning businesses a branded way for customers to browse services, schedule pickups and follow their orders - and a clearer way for teams to manage what comes next.";

export const metadata: Metadata = {
  title: {
    default: "LaundrySync - The digital face of your laundry business",
    template: "%s | LaundrySync",
  },
  description,
  applicationName: "LaundrySync",
  authors: [{ name: "Propelius" }],
  creator: "Propelius",
  keywords: [
    "laundry software",
    "dry cleaning software",
    "laundry pickup scheduling",
    "order tracking",
    "laundry business app",
  ],
  openGraph: {
    type: "website",
    siteName: "LaundrySync",
    title: "LaundrySync - The digital face of your laundry business",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaundrySync - The digital face of your laundry business",
    description,
  },
  robots: { index: true, follow: true },
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
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
