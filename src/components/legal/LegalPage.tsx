import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Badge";
import { LegalToc } from "./LegalToc";
import { legalLastUpdated } from "@/data/legal";

export type LegalSection = { id: string; title: string };

/**
 * Marks a fact that nobody has confirmed yet.
 *
 * Rendered as a visible placeholder rather than filled with a plausible guess,
 * so a reviewer cannot mistake an unverified detail for a checked one.
 */
export function Tbc({ children }: { children: string }) {
  return (
    <mark className="rounded-ls-sm bg-ls-error/10 px-1.5 py-0.5 text-[0.95em] font-semibold text-ls-error">
      [To confirm: {children}]
    </mark>
  );
}

/**
 * Shared layout for the three policy pages: compact introduction, sticky
 * contents on desktop, collapsed into a disclosure on mobile.
 */
export function LegalPage({
  eyebrow,
  title,
  summary,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  sections: LegalSection[];
  children: ReactNode;
}) {
  return (
    <Section space="page">
      {/* Introduction */}
      <div className="max-w-[46rem]">
        <Eyebrow withRule>
          <span>{eyebrow}</span>
        </Eyebrow>

        <h1 className="ls-statement mt-6">{title}</h1>
        <p className="ls-body mt-5">{summary}</p>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-caption text-ls-muted">
          <span className="rounded-ls-pill bg-ls-error/10 px-2.5 py-1 font-semibold text-ls-error">
            Draft &mdash; not yet approved for publication
          </span>
          <span>
            {legalLastUpdated
              ? `Last updated ${legalLastUpdated}`
              : "No effective date set. This draft requires review and approval by Propelius and its legal adviser before it is published."}
          </span>
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
        <LegalToc sections={sections} />

        <div className="ls-prose min-w-0">{children}</div>
      </div>
    </Section>
  );
}
