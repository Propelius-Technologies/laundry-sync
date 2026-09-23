"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/layout/Logo";
import { AdminModuleTabs } from "./AdminModuleTabs";
import { AdminTable } from "./AdminTable";
import { Filter, Plus, Search } from "@/components/ui/Icons";
import { adminModules } from "@/data/admin-preview";
import { easeOut } from "@/components/motion/motion-tokens";
import { useHasHover } from "@/lib/use-has-hover";
import { cn } from "@/lib/utils";

/**
 * The business-administration workspace preview.
 *
 * Recreates the business-facing side of the real admin product - horizontal
 * module tabs over a data table - not the builder tooling that surrounds it.
 * Everything is frontend-only: the search filters the sample rows in place and
 * nothing here reaches a backend.
 */
export function BusinessAdminPreview() {
  const [activeId, setActiveId] = useState(adminModules[0].id);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const reduceMotion = useReducedMotion();
  const hasHover = useHasHover();
  const idPrefix = useId().replace(/:/g, "");

  const activeModule =
    adminModules.find((module) => module.id === activeId) ?? adminModules[0];

  /** Illustrative search - filters the sample rows already on screen. */
  const filteredModule = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return activeModule;
    return {
      ...activeModule,
      rows: activeModule.rows.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(term),
        ),
      ),
    };
  }, [activeModule, query]);

  const selectModule = (id: string) => {
    setActiveId(id);
    setSelectedRow(null);
    setQuery("");
  };

  return (
    <motion.div
      className="ls-animate"
      initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
      whileHover={hasHover && !reduceMotion ? { y: -5 } : undefined}
    >
      {/* Outer chrome - sits on the dark section */}
      <div
        className={cn(
          "group rounded-ls-xl border border-white/10 bg-white/[0.04] p-2 shadow-ls-device sm:p-3",
          "transition-[border-color,box-shadow] duration-(--motion-slow) ease-(--motion-ease)",
          "hover:border-ls-aqua/35 motion-reduce:transition-none",
        )}
      >
        <div className="flex items-center justify-between px-2 pb-2 sm:px-2.5">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ls-aqua" />
            <span className="ls-label text-ls-sky-200/80">Business view</span>
          </span>
          <span className="text-caption text-ls-sky-200/60">
            Illustrative admin screens
          </span>
        </div>

        {/* Application surface */}
        <div className="overflow-hidden rounded-ls-lg border border-ls-border bg-white">
          {/* App header */}
          <div className="flex items-center justify-between gap-3 border-b border-ls-border px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-2">
              <LogoMark className="size-6" />
              <span className="truncate text-body-sm font-bold tracking-[-0.02em] text-ls-ink">
                Laundry<span className="text-ls-cyan">Sync</span>
              </span>
              <span className="ml-1 hidden rounded-ls-pill bg-ls-sky-100 px-2 py-0.5 text-caption font-semibold text-ls-navy sm:inline">
                Business administration
              </span>
            </span>
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ls-navy text-caption font-semibold text-white">
              AD
            </span>
          </div>

          <AdminModuleTabs
            modules={adminModules}
            activeId={activeId}
            onSelect={selectModule}
            idPrefix={idPrefix}
          />

          {/* Module toolbar */}
          <div className="flex flex-wrap items-end justify-between gap-3 px-4 pt-4 pb-3">
            <div className="min-w-0">
              <h3 className="ls-h3 text-[1.0625rem] sm:text-xl">
                {activeModule.heading}
              </h3>
              <p className="ls-body-sm mt-0.5">{activeModule.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <label className="relative">
                <span className="sr-only">{activeModule.searchPlaceholder}</span>
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ls-muted" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={activeModule.searchPlaceholder}
                  className={cn(
                    "h-9 w-40 rounded-ls-md border border-ls-border bg-white pr-3 pl-8 text-body-sm text-ls-ink sm:w-52",
                    "placeholder:text-ls-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-focus-ring)",
                  )}
                />
              </label>

              <span
                aria-hidden="true"
                className="hidden size-9 place-items-center rounded-ls-md border border-ls-border text-ls-muted sm:grid"
              >
                <Filter className="size-4" />
              </span>

              <span
                aria-hidden="true"
                className="hidden items-center gap-1.5 rounded-ls-md bg-ls-navy px-3 py-2 text-body-sm font-semibold text-white lg:inline-flex"
              >
                <Plus className="size-4" />
                {activeModule.action}
              </span>
            </div>
          </div>

          {/* Module panel - the shell above never remounts */}
          <div
            id={`${idPrefix}-panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-tab-${activeId}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeId}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: easeOut }}
              >
                {filteredModule.rows.length > 0 ? (
                  <AdminTable
                    module={filteredModule}
                    selectedId={selectedRow}
                    onSelect={setSelectedRow}
                  />
                ) : (
                  <p className="ls-body-sm px-4 py-10 text-center">
                    No sample records match &ldquo;{query}&rdquo;.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
