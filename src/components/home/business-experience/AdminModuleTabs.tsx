"use client";

import { useRef } from "react";
import type { AdminModule } from "@/data/admin-preview";
import { cn } from "@/lib/utils";

/**
 * Horizontal module navigation, matching the real admin workspace's tab bar.
 *
 * Implements the full ARIA tabs pattern: roving tabindex, arrow/Home/End
 * navigation, and `aria-controls` wired to the panel. The list scrolls
 * horizontally rather than shrinking the labels.
 */
export function AdminModuleTabs({
  modules,
  activeId,
  onSelect,
  idPrefix,
}: {
  modules: AdminModule[];
  activeId: string;
  onSelect: (id: string) => void;
  idPrefix: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const next = modules[(index + modules.length) % modules.length];
    onSelect(next.id);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`#${idPrefix}-tab-${next.id}`)
      ?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(modules.length - 1);
        break;
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Administration modules"
      className={cn(
        "flex gap-1 overflow-x-auto overscroll-x-contain border-b border-ls-border px-3",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      )}
    >
      {modules.map((module, index) => {
        const selected = module.id === activeId;
        return (
          <button
            key={module.id}
            id={`${idPrefix}-tab-${module.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${module.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(module.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 py-3 text-body-sm font-semibold whitespace-nowrap",
              "transition-colors duration-(--motion-normal) ease-(--motion-ease)",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-focus-ring)",
              selected
                ? "border-b-ls-blue text-ls-navy"
                : "border-b-transparent text-ls-muted hover:text-ls-ink",
            )}
          >
            {module.label}
          </button>
        );
      })}
    </div>
  );
}
