"use client";

import { AnimatePresence, motion } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, Shirt } from "@/components/ui/Icons";
import {
  adminStatusTone,
  type AdminColumn,
  type AdminModule,
  type AdminRecord,
} from "@/data/admin-preview";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * One data-driven administration table, shared by every module.
 *
 * Columns come from the module definition, so adding a module is a data
 * change rather than another near-identical table component. Non-primary
 * columns drop out below `md` and reappear in the row detail panel, which
 * keeps the table readable instead of shrinking it to nothing.
 */

function Cell({ column, row }: { column: AdminColumn; row: AdminRecord }) {
  const value = row[column.key];

  if (column.type === "thumb") {
    return (
      <span
        className="grid size-7 place-items-center rounded-ls-sm bg-ls-sky-100"
        /* Stand-in for the catalogue artwork - the project has no licensed
           laundry photography, so no broken or unlicensed images. */
        aria-hidden="true"
      >
        <Shirt className="size-3.5 text-ls-navy/45" />
      </span>
    );
  }

  if (column.type === "status") {
    return (
      <Badge
        tone={adminStatusTone[value] ?? "neutral"}
        className="px-2 py-0.5 text-caption"
      >
        {value}
      </Badge>
    );
  }

  return (
    <span
      className={cn(
        "block truncate",
        column.type === "id" && "font-mono text-caption text-ls-muted",
        column.type === "muted" && "text-ls-muted",
        !column.type && "font-medium text-ls-ink",
      )}
    >
      {value}
    </span>
  );
}

export function AdminTable({
  module,
  selectedId,
  onSelect,
}: {
  module: AdminModule;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const selected = module.rows.find((row) => row.id === selectedId) ?? null;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ls-border">
              {module.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-3 py-2.5 text-caption font-semibold tracking-[0.06em] text-ls-muted uppercase whitespace-nowrap",
                    !column.primary && "hidden md:table-cell",
                  )}
                >
                  {column.label}
                </th>
              ))}
              <th scope="col" className="w-10 px-3 py-2.5">
                <span className="sr-only">Row details</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {module.rows.map((row) => {
              const isSelected = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelect(isSelected ? null : row.id)}
                  className={cn(
                    "border-b border-ls-border/70 transition-colors duration-(--motion-normal) last:border-b-0",
                    isSelected ? "bg-ls-sky-50" : "hover:bg-ls-bg-soft",
                  )}
                >
                  {module.columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "max-w-[14rem] px-3 py-2.5 text-body-sm",
                        !column.primary && "hidden md:table-cell",
                      )}
                    >
                      <Cell column={column} row={row} />
                    </td>
                  ))}

                  <td className="px-3 py-2.5">
                    {/* The keyboard path to the detail panel. */}
                    <button
                      type="button"
                      onClick={() => onSelect(isSelected ? null : row.id)}
                      aria-expanded={isSelected}
                      aria-label={`${isSelected ? "Hide" : "Show"} details for ${row[module.columns[1].key] ?? row.id}`}
                      className={cn(
                        "grid size-6 place-items-center rounded-ls-sm text-ls-muted",
                        "transition-colors duration-(--motion-normal) hover:bg-ls-subtle hover:text-ls-navy",
                        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-focus-ring)",
                      )}
                    >
                      <ChevronRight
                        className={cn(
                          "size-4 transition-transform duration-(--motion-normal) motion-reduce:transition-none",
                          isSelected && "rotate-90",
                        )}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compact detail panel for the selected record */}
      <AnimatePresence initial={false}>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="overflow-hidden border-t border-ls-border bg-ls-bg-soft"
          >
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 px-4 py-3.5 sm:grid-cols-3">
              {module.columns.map((column) => (
                <div key={column.key} className="min-w-0">
                  <dt className="text-caption tracking-[0.06em] text-ls-muted uppercase">
                    {column.label}
                  </dt>
                  <dd className="mt-0.5 truncate text-body-sm text-ls-ink">
                    {column.type === "thumb"
                      ? "Catalogue artwork"
                      : selected[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
