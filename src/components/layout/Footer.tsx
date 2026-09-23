"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import {
  footerContact,
  footerExplore,
  footerLegal,
  footerTagline,
  siteName,
} from "@/data/navigation";
import { scrollReveal } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const linkClass = cn(
  "inline-flex min-h-9 items-center text-body-sm text-ls-sky-200/75",
  "transition-colors duration-(--motion-normal) ease-(--motion-ease) hover:text-ls-aqua",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ls-aqua",
);

/** Column heading + its links, named for the nav landmark via aria-labelledby. */
function FooterNav({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-labelledby={id}>
      <p id={id} className="ls-label text-ls-sky-200/70">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-1">{children}</ul>
    </nav>
  );
}

/**
 * Global site footer.
 *
 * Rendered once from the root layout so every page gets it - never from a
 * page component, which would double it up.
 *
 * No social links: LaundrySync has no verified profiles, and inventing them
 * would be worse than omitting them.
 */
export function Footer() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 14) =>
    reduceMotion ? {} : scrollReveal({ delay, distance, amount: 0.15 });

  return (
    <footer className="bg-ls-ink">
      <Container>
        <div className="pt-16 pb-8 lg:pt-20 lg:pb-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-16">
            {/* Brand */}
            <motion.div {...reveal(0)} className="ls-animate">
              <Logo href="/" tone="dark" />
              <p className="mt-5 max-w-[22rem] text-body-sm leading-relaxed text-ls-sky-200/70">
                {footerTagline}
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              {...reveal(0.1)}
              className="ls-animate grid gap-10 sm:grid-cols-3"
            >
              <FooterNav id="footer-explore" title="Explore">
                {footerExplore.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </FooterNav>

              <FooterNav id="footer-company" title="Company">
                <li>
                  <Link href={footerContact.href} className={linkClass}>
                    {footerContact.label}
                  </Link>
                </li>
              </FooterNav>

              <FooterNav id="footer-legal" title="Legal">
                {footerLegal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookiePreferencesButton className={linkClass} />
                </li>
              </FooterNav>
            </motion.div>
          </div>

          <motion.hr
            {...reveal(0.18, 0)}
            className="ls-animate mt-12 border-0 border-t border-white/10 lg:mt-14"
          />

          <motion.p
            {...reveal(0.24)}
            className="ls-animate mt-8 text-caption text-ls-sky-200/60"
          >
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </motion.p>
        </div>
      </Container>
    </footer>
  );
}
