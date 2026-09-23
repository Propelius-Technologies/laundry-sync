import { PreviewShell } from "../ui/PreviewShell";
import { PreviewPrimaryButton } from "../ui/PreviewParts";
import { ChevronRight } from "@/components/ui/Icons";
import { serviceCategories } from "@/data/preview-services";

/**
 * Screen A - Services.
 *
 * Keeps the reference's structure - category heading, one card per service
 * category with a media panel, a marker, a title and a short description, then
 * a primary "Order now" - but lays each card out the way the other previews
 * do: a bordered container, a soft media strip, left-aligned text and a
 * chevron affordance. No overlapping badges or centred all-caps blocks, which
 * read as a different design language at this scale.
 */
export function ServicesPreview() {
  return (
    <PreviewShell
      title="Services"
      footer={<PreviewPrimaryButton>Order now</PreviewPrimaryButton>}
    >
      <div className="shrink-0">
        <span className="block text-[length:var(--ui-sm)] font-semibold text-ls-ink">
          Dry Cleaning &amp; Laundry
        </span>
        <span className="mt-[2px] block text-[length:var(--ui-2xs)] text-ls-muted">
          Choose a service to start your order.
        </span>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.7)]">
        {serviceCategories.map((category) => (
          <li
            key={category.id}
            className="overflow-hidden rounded-[var(--ui-r)] border border-ls-border bg-white"
          >
            {/* Media strip - a soft brand panel stands in for photography */}
            <span className="flex h-[calc(var(--ui-lg)*1.9)] items-center justify-center bg-[linear-gradient(135deg,var(--color-ls-sky-100)_0%,var(--color-ls-sky-50)_55%,var(--color-ls-aqua-50)_100%)]">
              <category.icon className="h-[var(--ui-lg)] w-[var(--ui-lg)] text-ls-navy/40" />
            </span>

            <span className="flex items-center gap-[calc(var(--ui-gap)*0.7)] px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.7)]">
              {/* Category marker */}
              <span className="grid size-[calc(var(--ui-md)*1.35)] shrink-0 place-items-center rounded-full bg-ls-sky-100">
                <category.icon className="h-[var(--ui-xs)] w-[var(--ui-xs)] text-ls-navy" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
                  {category.title}
                </span>
                <span className="block truncate text-[length:var(--ui-2xs)] text-ls-muted">
                  {category.description}
                </span>
              </span>

              <ChevronRight className="h-[var(--ui-xs)] w-[var(--ui-xs)] shrink-0 text-ls-muted" />
            </span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}
