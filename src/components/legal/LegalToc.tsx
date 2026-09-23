"use client";

import { useEffect, useRef, useState } from "react";
import type { LegalSection } from "./LegalPage";
import { cn } from "@/lib/utils";

/**
 * Sticky table of contents for the policy pages.
 *
 * Desktop only. On a phone a long list of anchors above the policy is just
 * something to scroll past, so it is not rendered at all below `lg` rather
 * than being folded into a disclosure nobody opens.
 *
 * The entry for the section currently being read is highlighted with a brand
 * rule down its left edge. An IntersectionObserver watches the headings, so
 * there is no scroll handler running on every frame.
 */
export function LegalToc({ sections }: { sections: LegalSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.current.add(entry.target.id);
          else visibleIds.current.delete(entry.target.id);
        }

        // Highlight the first section in document order that is in view.
        const current = sections.find((section) =>
          visibleIds.current.has(section.id),
        );
        if (current) setActiveId(current.id);
      },
      {
        /*
         * Top inset clears the sticky header; the large bottom inset means a
         * heading only becomes "current" once it has reached the upper part of
         * the viewport, rather than the instant it peeks in from below.
         */
        rootMargin: "-100px 0px -65% 0px",
        threshold: 0,
      },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-labelledby="legal-toc-heading"
      className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
    >
      <p id="legal-toc-heading" className="ls-label text-ls-muted">
        On this page
      </p>

      <ol className="mt-4 flex flex-col">
        {sections.map((section, index) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "flex gap-2.5 border-l-2 py-1.5 pl-3 text-body-sm",
                  "transition-colors duration-(--motion-normal) ease-(--motion-ease) motion-reduce:transition-none",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-focus-ring)",
                  active
                    ? "border-l-ls-blue font-semibold text-ls-navy"
                    : "border-l-ls-border text-ls-muted hover:border-l-ls-sky-200 hover:text-ls-ink",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 tabular-nums",
                    active ? "text-ls-blue" : "opacity-60",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
