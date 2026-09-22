import { PreviewShell } from "../ui/PreviewShell";
import { PreviewPrimaryButton } from "../ui/PreviewParts";
import { Calendar, Clock } from "@/components/ui/Icons";
import {
  pickupDays,
  pickupSelection,
  pickupSlots,
} from "@/data/preview-services";
import { cn } from "@/lib/utils";

/**
 * Screen C - Pickup scheduling.
 * Date strip, available time slots and the confirmed selection. Slots are
 * illustrative sample data, not live availability.
 */
export function PickupSchedulingPreview() {
  return (
    <PreviewShell
      title="Schedule Pickup"
      footer={<PreviewPrimaryButton>Continue</PreviewPrimaryButton>}
    >
      <span className="flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.5)] text-[length:var(--ui-xs)] font-semibold text-ls-ink">
        <Calendar className="h-[var(--ui-sm)] w-[var(--ui-sm)] text-ls-navy" />
        {pickupSelection.month}
      </span>

      {/* Date strip */}
      <ul className="flex shrink-0 gap-[calc(var(--ui-gap)*0.45)]">
        {pickupDays.map((day) => {
          const selected = day.date === pickupSelection.selectedDate;
          return (
            <li
              key={day.date}
              className={cn(
                "flex flex-1 flex-col items-center gap-[1px] rounded-[var(--ui-r)] border py-[calc(var(--ui-gap)*0.6)]",
                selected
                  ? "border-ls-navy bg-ls-navy text-white"
                  : "border-ls-border bg-white text-ls-muted",
              )}
            >
              <span className="text-[length:var(--ui-2xs)]">{day.day}</span>
              <span
                className={cn(
                  "text-[length:var(--ui-xs)] font-semibold",
                  selected ? "text-white" : "text-ls-ink",
                )}
              >
                {day.date}
              </span>
            </li>
          );
        })}
      </ul>

      <span className="shrink-0 text-[length:var(--ui-2xs)] font-semibold tracking-[0.08em] text-ls-muted uppercase">
        Available time slots
      </span>

      {/* Time slots */}
      <ul className="grid shrink-0 grid-cols-2 gap-[calc(var(--ui-gap)*0.5)]">
        {pickupSlots.map((slot) => {
          const selected = slot === pickupSelection.selectedSlot;
          return (
            <li
              key={slot}
              className={cn(
                "rounded-[var(--ui-r)] border px-[calc(var(--ui-gap)*0.6)] py-[calc(var(--ui-gap)*0.7)] text-center text-[length:var(--ui-2xs)] font-medium",
                selected
                  ? "border-ls-blue bg-ls-sky-50 text-ls-navy"
                  : "border-ls-border bg-white text-ls-muted",
              )}
            >
              {slot}
            </li>
          );
        })}
      </ul>

      {/* Confirmed selection */}
      <div className="mt-auto flex shrink-0 items-center gap-[calc(var(--ui-gap)*0.7)] rounded-[var(--ui-r)] border border-ls-border bg-ls-bg-soft px-[calc(var(--ui-pad)*0.5)] py-[calc(var(--ui-gap)*0.8)]">
        <Clock className="h-[var(--ui-md)] w-[var(--ui-md)] shrink-0 text-ls-navy" />
        <span className="min-w-0">
          <span className="block text-[length:var(--ui-2xs)] text-ls-muted">
            Pickup
          </span>
          <span className="block truncate text-[length:var(--ui-xs)] font-semibold text-ls-ink">
            {pickupSelection.summary}
          </span>
        </span>
      </div>
    </PreviewShell>
  );
}
