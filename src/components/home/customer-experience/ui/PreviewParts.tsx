import type { ComponentType, ReactNode, SVGProps } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, Eye, Minus, Plus, Reorder } from "@/components/ui/Icons";
import {
  previewStatusTone,
  type PreviewOrderStatus,
} from "@/data/preview-orders";
import { cn } from "@/lib/utils";

/**
 * Small building blocks shared across the seven phone previews. Grouped in one
 * file because each is a handful of lines and they are only ever used here.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Filled brand action, as used for "Order now" / "Place order" / "Continue". */
export function PreviewPrimaryButton({ children }: { children: ReactNode }) {
  return (
    <span className="block rounded-[var(--ui-r)] bg-ls-navy px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.9)] text-center text-[length:var(--ui-xs)] font-semibold text-white">
      {children}
    </span>
  );
}

/** Collapsed / expanded category bar from the ordering and pricing screens. */
export function PreviewGroupBar({
  label,
  icon: Icon,
  expanded = false,
}: {
  label: string;
  icon?: Icon;
  expanded?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-between gap-[var(--ui-gap)] px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.75)] text-[length:var(--ui-xs)] font-semibold",
        expanded
          ? "rounded-t-[var(--ui-r)] bg-ls-navy text-white"
          : "rounded-[var(--ui-r)] bg-ls-sky-100 text-ls-navy",
      )}
    >
      <span className="flex min-w-0 items-center gap-[calc(var(--ui-gap)*0.6)]">
        {Icon ? (
          <Icon className="h-[var(--ui-xs)] w-[var(--ui-xs)] shrink-0" />
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      <ChevronDown
        className={cn(
          "h-[var(--ui-xs)] w-[var(--ui-xs)] shrink-0",
          expanded && "rotate-180",
        )}
      />
    </span>
  );
}

/** Stepper from the item rows. Illustrative - it does not change quantity. */
export function PreviewQuantityControl({ value }: { value: number }) {
  return (
    <span className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.5)] rounded-full border border-ls-border px-[calc(var(--ui-gap)*0.5)] py-[1px]">
      <Minus className="h-[var(--ui-2xs)] w-[var(--ui-2xs)] text-ls-muted" />
      <span className="min-w-[1ch] text-center text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
        {value}
      </span>
      <Plus className="h-[var(--ui-2xs)] w-[var(--ui-2xs)] text-ls-navy" />
    </span>
  );
}

export function PreviewStatusBadge({
  status,
}: {
  status: PreviewOrderStatus;
}) {
  return (
    <Badge
      tone={previewStatusTone[status]}
      className="shrink-0 px-[calc(var(--ui-gap)*0.7)] py-[1px] text-[length:var(--ui-2xs)]"
    >
      {status}
    </Badge>
  );
}

/** One row in the Order status / Order history lists. */
export function PreviewOrderRow({
  id,
  date,
  time,
  status,
  total,
  payment,
  showReorder = false,
}: {
  id: string;
  date: string;
  time: string;
  status: PreviewOrderStatus;
  total?: string;
  payment?: string;
  showReorder?: boolean;
}) {
  return (
    <li className="flex flex-col gap-[calc(var(--ui-gap)*0.45)] rounded-[var(--ui-r)] border border-ls-border px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.7)]">
      <span className="flex items-center justify-between gap-[var(--ui-gap)]">
        <span className="truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
          {id}
        </span>
        <span className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.5)] text-ls-muted">
          <Eye className="h-[var(--ui-xs)] w-[var(--ui-xs)]" />
          {showReorder ? (
            <Reorder className="h-[var(--ui-xs)] w-[var(--ui-xs)] text-ls-navy" />
          ) : null}
        </span>
      </span>

      <span className="flex items-center justify-between gap-[var(--ui-gap)]">
        <span className="truncate text-[length:var(--ui-2xs)] text-ls-muted">
          {date} · {time}
          {total ? ` · ${total}` : ""}
          {payment ? ` · ${payment}` : ""}
        </span>
        <PreviewStatusBadge status={status} />
      </span>
    </li>
  );
}

/** Label / value row used by the price summaries. */
export function PreviewSummaryRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-between gap-[var(--ui-gap)]",
        emphasis
          ? "text-[length:var(--ui-xs)] font-semibold text-ls-ink"
          : "text-[length:var(--ui-2xs)] text-ls-muted",
      )}
    >
      <span className="truncate">{label}</span>
      <span className="shrink-0">{value}</span>
    </span>
  );
}
