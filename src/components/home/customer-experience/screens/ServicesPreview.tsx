import { PreviewShell } from "../ui/PreviewShell";
import { PreviewImagePanel, PreviewPrimaryButton } from "../ui/PreviewParts";
import { serviceCategories } from "@/data/preview-services";

/**
 * Screen A - Services.
 * Category heading, one card per service category (image panel, icon marker,
 * title, short description) and a primary "Order now" action.
 */
export function ServicesPreview() {
  return (
    <PreviewShell
      title="Services"
      footer={<PreviewPrimaryButton>Order now</PreviewPrimaryButton>}
    >
      <span className="block shrink-0 text-center text-[length:var(--ui-sm)] font-semibold text-ls-navy">
        Dry Cleaning &amp; Laundry
      </span>

      <ul className="flex min-h-0 flex-1 flex-col justify-between">
        {serviceCategories.map((category) => (
          <li
            key={category.id}
            className="relative flex flex-col items-center text-center"
          >
            <PreviewImagePanel
              icon={category.icon}
              className="h-[calc(var(--ui-lg)*2.2)] w-full"
            />

            {/* Circular category marker straddling the panel edge */}
            <span className="-mt-[calc(var(--ui-md)*0.62)] grid size-[calc(var(--ui-md)*1.25)] place-items-center rounded-full border-[2px] border-white bg-ls-navy">
              <category.icon className="h-[var(--ui-xs)] w-[var(--ui-xs)] text-white" />
            </span>

            <span className="mt-[calc(var(--ui-gap)*0.4)] block text-[length:var(--ui-xs)] font-semibold tracking-[0.06em] text-ls-ink uppercase">
              {category.title}
            </span>
            <span className="mt-[2px] block text-[length:var(--ui-2xs)] leading-snug text-ls-muted">
              {category.description}
            </span>
          </li>
        ))}
      </ul>
    </PreviewShell>
  );
}
