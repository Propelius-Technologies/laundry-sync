"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { ArrowUpRight, Close, Menu } from "@/components/ui/Icons";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { headerCta, mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/** Distance scrolled before the bar collapses into the floating pebble. */
const PEBBLE_THRESHOLD = 16;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > PEBBLE_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A resize past the desktop breakpoint should not leave the sheet mounted.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

  return (
    /*
     * The <header> box is a constant --layout-header-height tall in every
     * state, so collapsing into the pebble never resizes the sticky element
     * and never shifts the page. Only the bar inside it morphs.
     *
     * pointer-events-none lets clicks reach the page through the empty space
     * either side of the floating pebble; the bar and the menu opt back in.
     */
    <header className="pointer-events-none sticky top-0 z-50">
      <Container>
        <div className="relative">
          <div className="flex h-(--layout-header-height) items-center">
            <div
              className={cn(
                "pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 border lg:gap-8",
                "transition-[max-width,height,border-radius,padding,background-color,border-color,box-shadow,backdrop-filter]",
                "duration-500 ease-(--motion-ease) motion-reduce:transition-none",
                scrolled
                  ? // Pebble: pulls in from every edge at once - narrower, shorter,
                    // fully rounded, and lifted off the page with a border and shadow.
                    "h-(--layout-header-pill-height) max-w-(--layout-header-pill-width) rounded-ls-pill border-ls-border bg-white/85 px-4 shadow-ls-card backdrop-blur-md sm:px-6"
                  : // At rest: flush with the page, no border, no separation.
                    "h-full max-w-full rounded-none border-transparent bg-transparent px-0 shadow-none backdrop-blur-none",
              )}
            >
              <Logo href="/" priority />

              <nav
                aria-label="Main"
                className="hidden lg:flex lg:flex-1 lg:justify-center"
              >
                <ul className="flex items-center gap-8 xl:gap-11">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href}>{item.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                {/*
                  Desktop-only. Below lg the header is just the logo and the
                  menu button - the CTA crowds the pebble at narrow widths, and
                  the mobile sheet carries it at full width instead.

                  The visibility MUST live on this wrapper, not on the Button.
                  Button's own base class list contains `inline-flex`, and
                  Tailwind emits `.inline-flex` after `.hidden`; at equal
                  specificity the later rule wins, so `hidden` passed to Button
                  via className is silently ignored.
                */}
                <div className="hidden lg:flex">
                  <Button href={headerCta.href}>
                    {headerCta.label}
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>

                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  className={cn(
                    "grid size-11 place-items-center rounded-ls-md border border-ls-border text-ls-ink transition-colors duration-(--motion-normal)",
                    "hover:bg-ls-bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) lg:hidden",
                  )}
                >
                  {menuOpen ? (
                    <Close className="size-5" />
                  ) : (
                    <Menu className="size-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <MobileMenu
            id={menuId}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            triggerRef={triggerRef}
          />
        </div>
      </Container>
    </header>
  );
}
