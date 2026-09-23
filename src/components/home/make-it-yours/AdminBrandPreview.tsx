"use client";

import { Badge } from "@/components/ui/Badge";
import { adminModules, adminStatusTone } from "@/data/admin-preview";
import { brandInitials } from "@/data/brand-preview";
import { cn } from "@/lib/utils";

const ordersModule = adminModules.find((module) => module.id === "orders")!;
const columns = ["Order", "Customer", "Service", "Status"] as const;

/**
 * Compact business-administration preview.
 *
 * Reuses the Section 04 sample orders, the shared status-tone map and the
 * Badge component, so this is visibly the same workspace - just scoped down
 * and labelled with the visitor's business name.
 *
 * Only the workspace accents pick up the preview brand colour. The admin
 * chrome stays in the LaundrySync system, because not every part of the
 * administration interface is white-label configurable.
 */
export function AdminBrandPreview({ businessName }: { businessName: string }) {
  return (
    <div className="overflow-hidden rounded-ls-lg border border-ls-border bg-white">
      {/* Workspace header */}
      <div className="flex items-center justify-between gap-3 border-b border-ls-border px-4 py-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            data-brand-tinted
            className="grid size-8 shrink-0 place-items-center rounded-ls-sm text-caption font-bold text-(--preview-brand-foreground)"
            style={{ backgroundColor: "var(--preview-brand-strong)" }}
          >
            {brandInitials(businessName)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-body-sm font-semibold text-ls-ink">
              {businessName}
            </span>
            <span className="block truncate text-caption text-ls-muted">
              Powered by LaundrySync
            </span>
          </span>
        </span>
        <span className="hidden shrink-0 rounded-ls-pill bg-ls-subtle px-2.5 py-1 text-caption font-semibold text-ls-muted sm:inline">
          Admin
        </span>
      </div>

      {/* Module strip - Orders active */}
      <div className="flex gap-1 overflow-x-auto overscroll-x-contain border-b border-ls-border px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["Orders", "Service categories", "Customers"].map((label, index) => {
          const active = index === 0;
          return (
            <span
              key={label}
              data-brand-tinted
              aria-current={active ? "true" : undefined}
              className={cn(
                "-mb-px shrink-0 border-b-2 px-2.5 py-2.5 text-caption font-semibold whitespace-nowrap",
                active ? "text-ls-ink" : "border-b-transparent text-ls-muted",
              )}
              style={
                active
                  ? { borderBottomColor: "var(--preview-brand-strong)" }
                  : undefined
              }
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* Orders table - the same sample records as Section 04 */}
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ls-border">
              {columns.map((label, index) => (
                <th
                  key={label}
                  scope="col"
                  className={cn(
                    "px-4 py-2 text-caption font-semibold tracking-[0.06em] text-ls-muted uppercase whitespace-nowrap",
                    /* Service drops out on narrow screens; Order, Customer
                       and Status carry the row. */
                    index === 2 && "hidden sm:table-cell",
                  )}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersModule.rows.slice(0, 4).map((row) => (
              <tr
                key={row.id}
                className="border-b border-ls-border/70 transition-colors duration-(--motion-normal) last:border-b-0 hover:bg-ls-bg-soft"
              >
                <td className="px-4 py-2.5 text-body-sm font-medium whitespace-nowrap text-ls-ink">
                  {row.id}
                </td>
                <td className="max-w-[10rem] truncate px-4 py-2.5 text-body-sm text-ls-text">
                  {row.customer}
                </td>
                <td className="hidden max-w-[10rem] truncate px-4 py-2.5 text-body-sm text-ls-muted sm:table-cell">
                  {row.service}
                </td>
                <td className="px-4 py-2.5">
                  <Badge
                    tone={adminStatusTone[row.status] ?? "neutral"}
                    className="px-2 py-0.5 text-caption whitespace-nowrap"
                  >
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
