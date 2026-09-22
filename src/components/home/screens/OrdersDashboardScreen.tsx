"use client";

import { AnimatePresence, motion } from "motion/react";
import { LogoMark } from "@/components/layout/Logo";
import { Badge, orderStatusTone } from "@/components/ui/Badge";
import {
  Bell,
  Calendar,
  ListIcon,
  MapPin,
  Search,
  Shirt,
  Tag,
  Ticket,
  Users,
} from "@/components/ui/Icons";
import {
  dashboardNav,
  orderFilters,
  orderStatusLabels,
  type DemoOrder,
} from "@/data/hero-demo";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

const navIcons = [ListIcon, Users, Shirt, Tag, Calendar, MapPin, Ticket];

/** How many rows the list shows at its largest size. */
const MAX_ROWS = 7;

/**
 * Column template widens as the screen gets more room. Thresholds are ordered
 * so a column only appears once the table has space for it, allowing for the
 * sidebar that arrives at 460px.
 */
const gridCols =
  "grid grid-cols-[1fr_1.3fr_0.95fr] " +
  "@min-[300px]:grid-cols-[0.95fr_1.25fr_1.1fr_0.95fr] " +
  "@min-[380px]:grid-cols-[0.9fr_1.2fr_1.05fr_1.15fr_0.9fr] " +
  "@min-[440px]:grid-cols-[0.85fr_1.15fr_1fr_0.5fr_1.1fr_0.9fr]";

/**
 * Illustrative business-side order list: laundry workflow, not a finance
 * dashboard. Sample data only - no revenue, charts or performance figures.
 */
export function OrdersDashboardScreen({
  orders,
  highlightId,
}: {
  orders: DemoOrder[];
  highlightId?: string;
}) {
  const visible = orders.slice(0, MAX_ROWS);

  return (
    <div className="flex h-full w-full bg-ls-bg-soft">
      <aside className="flex w-[21%] shrink-0 flex-col border-r border-ls-border bg-white p-[var(--ui-pad)] @max-[460px]:hidden">
        <div className="flex items-center gap-[calc(var(--ui-gap)*0.7)]">
          <LogoMark className="h-[var(--ui-md)] w-[var(--ui-md)]" />
          <span className="truncate text-[length:var(--ui-sm)] leading-none font-bold tracking-[-0.02em] text-ls-ink">
            Laundry<span className="text-ls-cyan">Sync</span>
          </span>
        </div>

        <nav className="mt-[calc(var(--ui-pad)*0.9)] flex flex-col gap-[calc(var(--ui-gap)*0.4)]">
          {dashboardNav.map((item, index) => {
            const Icon = navIcons[index];
            const active = index === 0;
            return (
              <span
                key={item}
                className={cn(
                  "flex items-center gap-[calc(var(--ui-gap)*0.6)] rounded-[var(--ui-r)] px-[calc(var(--ui-gap)*0.7)] py-[calc(var(--ui-gap)*0.5)] text-[length:var(--ui-2xs)] font-medium",
                  active ? "bg-ls-sky-100 text-ls-navy" : "text-ls-muted",
                )}
              >
                <Icon className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0" />
                <span className="truncate">{item}</span>
              </span>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-[var(--ui-gap)] border-b border-ls-border bg-white px-[var(--ui-pad)] py-[calc(var(--ui-pad)*0.5)]">
          <span className="flex max-w-[58%] min-w-0 flex-1 items-center gap-[calc(var(--ui-gap)*0.6)] rounded-full border border-ls-border bg-ls-bg-soft px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.5)] @max-[280px]:hidden">
            <Search className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-muted" />
            <span className="truncate text-[length:var(--ui-2xs)] text-ls-muted">
              Search orders, customers
            </span>
          </span>

          <span className="flex items-center gap-[calc(var(--ui-gap)*0.8)]">
            <Bell className="h-[var(--ui-sm)] w-[var(--ui-sm)] text-ls-muted" />
            <span className="grid size-[var(--ui-md)] place-items-center rounded-full bg-ls-navy text-[length:var(--ui-2xs)] leading-none font-semibold text-white">
              AO
            </span>
          </span>
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.9)] p-[var(--ui-pad)]">
          <div className="flex items-start justify-between gap-[var(--ui-gap)]">
            <span className="min-w-0">
              <span className="block text-[length:var(--ui-lg)] leading-none font-bold tracking-[-0.02em] text-ls-ink">
                Orders
              </span>
              <span className="mt-[calc(var(--ui-gap)*0.55)] block truncate text-[length:var(--ui-2xs)] text-ls-muted @max-[300px]:hidden">
                Pickups and order status for today
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.5)] rounded-full border border-ls-border bg-white px-[calc(var(--ui-gap)*0.9)] py-[calc(var(--ui-gap)*0.42)] text-[length:var(--ui-2xs)] font-medium text-ls-muted @max-[380px]:hidden">
              <Calendar className="h-[var(--ui-2xs)] w-[var(--ui-2xs)]" />
              Today
            </span>
          </div>

          <div className="flex items-center gap-[calc(var(--ui-gap)*0.55)] @max-[300px]:hidden">
            {orderFilters.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  "rounded-full px-[calc(var(--ui-gap)*0.9)] py-[calc(var(--ui-gap)*0.42)] text-[length:var(--ui-2xs)] font-medium whitespace-nowrap",
                  index === 0
                    ? "bg-ls-navy text-white"
                    : "border border-ls-border bg-white text-ls-muted",
                )}
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--ui-r)] border border-ls-border bg-white">
            <div
              className={cn(
                gridCols,
                "items-center gap-[var(--ui-gap)] border-b border-ls-border bg-ls-bg-soft px-[calc(var(--ui-pad)*0.75)] py-[calc(var(--ui-gap)*0.7)] text-[length:var(--ui-2xs)] font-semibold tracking-[0.06em] text-ls-muted uppercase",
              )}
            >
              <span>Order</span>
              <span>Customer</span>
              <span className="@max-[300px]:hidden">Service</span>
              <span className="@max-[440px]:hidden">Items</span>
              <span className="@max-[380px]:hidden">Pickup</span>
              <span>Status</span>
            </div>

            <div className="flex flex-col divide-y divide-ls-border">
              <AnimatePresence initial={false}>
                {visible.map((order, index) => {
                  const isNew = order.id === highlightId;
                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={
                        isNew ? { opacity: 0, y: -12, scale: 0.98 } : false
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeOut }}
                      className={cn(
                        gridCols,
                        "items-center gap-[var(--ui-gap)] px-[calc(var(--ui-pad)*0.75)] py-[calc(var(--ui-gap)*0.8)] text-[length:var(--ui-xs)] transition-colors duration-500",
                        isNew ? "bg-ls-sky-50" : "bg-white",
                        index >= 5 && "@max-[460px]:hidden",
                      )}
                    >
                      <span className="truncate font-semibold text-ls-ink">
                        {order.id}
                      </span>
                      <span className="truncate text-ls-text">
                        {order.customer}
                      </span>
                      <span className="truncate text-ls-muted @max-[300px]:hidden">
                        {order.service}
                      </span>
                      <span className="truncate text-ls-muted @max-[440px]:hidden">
                        {order.items}
                      </span>
                      <span className="truncate text-ls-muted @max-[380px]:hidden">
                        {order.pickup}
                      </span>
                      <span className="min-w-0">
                        <Badge
                          tone={orderStatusTone[order.status]}
                          className="max-w-full truncate px-[calc(var(--ui-gap)*0.7)] py-[calc(var(--ui-gap)*0.3)] text-[length:var(--ui-2xs)]"
                        >
                          {orderStatusLabels[order.status]}
                        </Badge>
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Fills the rest of the card so the list never floats in whitespace. */}
            <div className="mt-auto flex items-center justify-between gap-[var(--ui-gap)] border-t border-ls-border px-[calc(var(--ui-pad)*0.75)] py-[calc(var(--ui-gap)*0.7)] text-[length:var(--ui-2xs)] text-ls-muted">
              <span className="truncate">Showing {visible.length} of 24</span>
              <span className="shrink-0 font-semibold text-ls-navy">
                View all
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
