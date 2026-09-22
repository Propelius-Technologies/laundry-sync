import { PreviewShell } from "../ui/PreviewShell";
import { PreviewGroupBar } from "../ui/PreviewParts";
import { pricingGroups } from "@/data/preview-services";

/**
 * Screen F - Pricing.
 * Expandable category groups, each holding service tiers with per-item prices.
 * Sample customer service pricing, not LaundrySync commercial pricing.
 */
export function PricingPreview() {
  const [expandedGroup, ...collapsedGroups] = pricingGroups;

  return (
    <PreviewShell title="Pricing">
      <div className="shrink-0">
        <PreviewGroupBar
          label={expandedGroup.label}
          icon={expandedGroup.icon}
          expanded
        />

        <div className="flex flex-col gap-[calc(var(--ui-gap)*0.7)] rounded-b-[var(--ui-r)] border border-t-0 border-ls-border px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]">
          {expandedGroup.tiers?.map((tier) => (
            <div key={tier.name}>
              <span className="block text-[length:var(--ui-2xs)] font-semibold text-ls-navy">
                {tier.name}
              </span>
              <ul className="mt-[calc(var(--ui-gap)*0.35)] flex flex-col gap-[calc(var(--ui-gap)*0.3)]">
                {tier.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline gap-[calc(var(--ui-gap)*0.5)] text-[length:var(--ui-2xs)]"
                  >
                    <span className="shrink-0 text-ls-muted">{item.name}</span>
                    <span className="min-w-0 flex-1 translate-y-[-2px] border-b border-dotted border-ls-border" />
                    <span className="shrink-0 font-semibold text-ls-ink">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <ul className="flex shrink-0 flex-col gap-[calc(var(--ui-gap)*0.45)]">
        {collapsedGroups.map((group) => (
          <li key={group.id}>
            <PreviewGroupBar label={group.label} icon={group.icon} />
          </li>
        ))}
      </ul>

      <span className="mt-auto block shrink-0 text-center text-[length:var(--ui-2xs)] text-ls-muted">
        Sample prices shown for illustration.
      </span>
    </PreviewShell>
  );
}
