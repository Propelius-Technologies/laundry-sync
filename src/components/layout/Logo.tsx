"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteName } from "@/data/navigation";

type LogoProps = {
  className?: string;
  /** "dark" renders the lockup for dark surfaces. */
  tone?: "light" | "dark";
  /** Renders the mark on its own (used inside the product mockups). */
  markOnly?: boolean;
  /** Wraps the lockup in a link to the homepage. */
  href?: string;
  onClick?: () => void;
  /**
   * Preloads the mark. Only the header lockup should set this: it is the one
   * instance that is above the fold. The footer lockup previously inherited it
   * too, which made every page preload a below-the-fold image in competition
   * with the real LCP element.
   */
  priority?: boolean;
};

/**
 * LaundrySync lockup.
 *
 * The hanger + wave mark is the approved brand asset and is used unmodified.
 * The wordmark is set in Inter to match the
 * approved reference; see the handover notes - an official horizontal lockup
 * (ideally SVG) should replace this typographic wordmark when available.
 */
export function LogoMark({
  className,
  priority = false,
  tone = "light",
}: {
  className?: string;
  priority?: boolean;
  /** "dark" swaps to the approved white mark for dark surfaces. */
  tone?: "light" | "dark";
}) {
  return (
    <Image
      src={
        tone === "dark"
          ? "/brand/brand-icon-white.png"
          : "/brand/brand-icon-primary.png"
      }
      alt=""
      width={1254}
      height={1254}
      priority={priority}
      sizes="48px"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

export function Logo({
  className,
  markOnly,
  href,
  onClick,
  tone = "light",
  priority = false,
}: LogoProps) {
  const dark = tone === "dark";
  const pathname = usePathname();
  const lenis = useLenis();

  /*
   * A link to "/" does nothing visible when you are already on "/", which
   * makes the logo feel broken - the usual expectation is that it takes you
   * back to the top.
   *
   * So on the home page the navigation is cancelled and the page is scrolled
   * instead. On any other route the Link is left alone and navigates normally,
   * landing at the top of the new page.
   */
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (href !== "/" || pathname !== "/") return;

    /*
     * Never hijack a modified click - cmd/ctrl/shift/alt and middle-click all
     * mean "open this somewhere else", and the browser must keep doing that.
     */
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();

    if (lenis) {
      /* Lenis eases it, and makes it instant under prefers-reduced-motion. */
      lenis.scrollTo(0);
      return;
    }

    /* No smooth-scroll engine: fall back to the platform, honouring the
       reduced-motion preference ourselves. */
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  const lockup = (
    <span className={cn("flex items-center gap-2.5", !href && className)}>
      <LogoMark
        priority={priority}
        tone={tone}
        className="h-11 w-11 sm:h-12 sm:w-12"
      />
      {!markOnly && (
        <span
          className={cn(
            "text-[1.375rem] leading-none font-bold tracking-[-0.022em] sm:text-[1.5rem]",
            dark ? "text-white" : "text-ls-ink",
          )}
        >
          Laundry
          <span className="text-ls-cyan">Sync</span>
        </span>
      )}
    </span>
  );

  if (!href) return lockup;

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-label={`${siteName} - home`}
      className={cn(
        "inline-flex rounded-ls-md focus-visible:outline-2 focus-visible:outline-offset-4",
        // The navy focus ring only reaches 3:1 on light surfaces; on the dark
        // footer it needs the aqua, which clears 8:1 against the navy.
        dark
          ? "focus-visible:outline-ls-aqua"
          : "focus-visible:outline-ls-navy-500",
        className,
      )}
    >
      {lockup}
    </Link>
  );
}
