"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";
import { ArrowUpRight } from "@/components/ui/Icons";
import { headerCta, mainNav } from "@/data/navigation";
import { duration, easeOut } from "@/components/motion/motion-tokens";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  /** Focus returns here when the menu closes. */
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  id: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose, triggerRef, id }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  // Escape closes, Tab stays inside the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const items = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Prevent the page behind the sheet from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the panel on open, and back to the trigger on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const firstLink = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      firstLink?.focus();
      return;
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="pointer-events-auto fixed inset-0 z-40 bg-ls-ink/20 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: easeOut }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="pointer-events-auto absolute inset-x-0 top-full z-50 origin-top rounded-ls-lg border border-ls-border bg-white shadow-ls-card lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.fast, ease: easeOut }}
          >
            <nav aria-label="Mobile" className="px-4 pt-2 pb-5 sm:px-6">
              <ul className="flex flex-col divide-y divide-ls-border">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href} size="stacked" onClick={close}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <Button
                href={headerCta.href}
                size="lg"
                className="mt-5 w-full"
                onClick={close}
              >
                {headerCta.label}
                <ArrowUpRight className="size-4" />
              </Button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
