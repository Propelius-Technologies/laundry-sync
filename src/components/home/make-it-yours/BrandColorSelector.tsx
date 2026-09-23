"use client";

import { useRef } from "react";
import { Check } from "@/components/ui/Icons";
import {
  brandPresets,
  type BrandPresetId,
} from "@/data/brand-preview";
import { cn } from "@/lib/utils";

/**
 * Four curated preview colours as an accessible radio group.
 *
 * Roving tabindex with arrow-key navigation, per the radiogroup pattern.
 * Selection is never signalled by colour alone - the selected swatch carries a
 * ring and a checkmark, and `aria-checked` states it outright.
 */
export function BrandColorSelector({
  value,
  onChange,
}: {
  value: BrandPresetId;
  onChange: (id: BrandPresetId) => void;
}) {
  const groupRef = useRef<HTMLDivElement>(null);

  const move = (index: number) => {
    const next = brandPresets[(index + brandPresets.length) % brandPresets.length];
    onChange(next.id);
    groupRef.current
      ?.querySelector<HTMLButtonElement>(`[data-preset="${next.id}"]`)
      ?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(index - 1);
        break;
    }
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Preview brand colour"
      className="flex items-center gap-2.5"
    >
      {brandPresets.map((preset, index) => {
        const selected = preset.id === value;
        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            data-preset={preset.id}
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(preset.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            title={preset.name}
            className={cn(
              "grid size-8 place-items-center rounded-full ring-offset-2 ring-offset-white",
              "transition-[box-shadow,transform] duration-(--motion-normal) ease-(--motion-ease)",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring)",
              "motion-reduce:transition-none",
              selected
                ? "ring-2 ring-ls-ink/70"
                : "ring-1 ring-ls-border hover:ring-ls-muted",
            )}
            style={{ backgroundColor: preset.swatch }}
          >
            <span className="sr-only">{preset.name}</span>
            {/* Not colour alone: the selected swatch is also ticked. */}
            {selected && (
              <Check className="size-4 text-white" strokeWidth={3} />
            )}
          </button>
        );
      })}
    </div>
  );
}
