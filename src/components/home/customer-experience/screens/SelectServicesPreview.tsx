import { PreviewShell } from "../ui/PreviewShell";
import {
  PreviewGroupBar,
  PreviewPrimaryButton,
  PreviewQuantityControl,
  PreviewSummaryRow,
} from "../ui/PreviewParts";
import {
  itemGroups,
  orderSummary,
  serviceTiles,
  starchOptions,
} from "@/data/preview-services";
import { cn } from "@/lib/utils";

/**
 * Screen B - Select Services / Order Placement.
 *
 * Keeps the real ordering workflow: a horizontal service-category selector,
 * expandable item groups, per-item service tiers and quantities, the starch
 * options, an order summary with a voucher field, and the Place order action.
 */
export function SelectServicesPreview() {
  const [expandedGroup, ...collapsedGroups] = itemGroups;

  return (
    <PreviewShell
      title="Select Services"
      footer={<PreviewPrimaryButton>Place order</PreviewPrimaryButton>}
    >
      {/* Service category selector */}
      <ul className="flex shrink-0 gap-[calc(var(--ui-gap)*0.5)]">
        {serviceTiles.map((tile, index) => (
          <li
            key={tile.id}
            className={cn(
              "flex flex-1 flex-col items-center gap-[2px] rounded-[var(--ui-r)] border px-[2px] py-[calc(var(--ui-gap)*0.5)]",
              index === 0
                ? "border-ls-blue bg-ls-sky-50"
                : "border-ls-border bg-white",
            )}
          >
            <tile.icon className="h-[var(--ui-sm)] w-[var(--ui-sm)] text-ls-navy" />
            <span className="truncate text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
              {tile.label}
            </span>
            <span className="truncate text-[length:var(--ui-2xs)] text-ls-muted">
              {tile.from}
            </span>
          </li>
        ))}
      </ul>

      {/* Expanded group with item rows */}
      <div className="shrink-0">
        <PreviewGroupBar label={expandedGroup.label} expanded />
        <div className="rounded-b-[var(--ui-r)] border border-t-0 border-ls-border">
          {expandedGroup.items?.map((item) => (
            <span
              key={item.name}
              className="flex items-center justify-between gap-[calc(var(--ui-gap)*0.5)] border-b border-ls-border px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.6)] last:border-b-0"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
                  {item.name}
                </span>
                <span className="block truncate text-[length:var(--ui-2xs)] text-ls-muted">
                  {item.tier} · {item.price}
                </span>
              </span>
              <PreviewQuantityControl value={item.quantity} />
            </span>
          ))}

          {/* Starch options */}
          <span className="flex items-center gap-[var(--ui-gap)] border-t border-ls-border px-[calc(var(--ui-pad)*0.45)] py-[calc(var(--ui-gap)*0.55)]">
            {starchOptions.map((option, index) => (
              <span
                key={option}
                className="flex items-center gap-[3px] text-[length:var(--ui-2xs)] text-ls-muted"
              >
                <span
                  className={cn(
                    "grid size-[calc(var(--ui-2xs)*0.95)] place-items-center rounded-full border",
                    index === 0 ? "border-ls-navy" : "border-ls-border",
                  )}
                >
                  {index === 0 ? (
                    <span className="size-[45%] rounded-full bg-ls-navy" />
                  ) : null}
                </span>
                {option}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Remaining groups */}
      <ul className="flex shrink-0 flex-col gap-[calc(var(--ui-gap)*0.4)]">
        {collapsedGroups.map((group) => (
          <li key={group.id}>
            <PreviewGroupBar label={group.label} />
          </li>
        ))}
      </ul>

      {/* Order summary */}
      <div className="mt-auto flex shrink-0 flex-col gap-[calc(var(--ui-gap)*0.4)] rounded-[var(--ui-r)] bg-ls-bg-soft px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]">
        <span className="text-[length:var(--ui-2xs)] font-semibold tracking-[0.08em] text-ls-muted uppercase">
          Order summary
        </span>
        <PreviewSummaryRow label="Subtotal" value={orderSummary.subtotal} />
        <PreviewSummaryRow
          label={orderSummary.voucherPlaceholder}
          value={orderSummary.discount}
        />
        <PreviewSummaryRow label="Total" value={orderSummary.total} emphasis />
      </div>
    </PreviewShell>
  );
}
