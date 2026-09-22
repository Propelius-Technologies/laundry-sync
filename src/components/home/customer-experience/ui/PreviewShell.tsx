import type { ReactNode } from "react";
import { ChevronLeft, Menu } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Chrome shared by every phone preview: status bar, app header, a content area
 * that never overflows the device, and the iOS home indicator.
 *
 * All sizing comes from the `--ui-*` container-query scale defined by
 * `.ls-screen-phone` in globals.css - the same scale the hero preview uses, so
 * the previews stay legible at whatever width the frame is rendered.
 */

function PreviewStatusBar() {
  return (
    /* pt clears the Dynamic Island, which sits at 1.35% + 4.3% of the screen. */
    <div className="flex shrink-0 items-center justify-between px-[calc(var(--ui-pad)*0.8)] pt-[6.5%] pb-[calc(var(--ui-gap)*0.5)] text-[length:var(--ui-2xs)] font-semibold text-ls-ink">
      <span>9:41</span>
      <span className="flex items-center gap-[2px]">
        <span className="h-[0.45em] w-[0.26em] rounded-[1px] bg-ls-ink/70" />
        <span className="h-[0.65em] w-[0.26em] rounded-[1px] bg-ls-ink/70" />
        <span className="ml-[0.2em] h-[0.5em] w-[0.9em] rounded-[2px] border border-ls-ink/50" />
      </span>
    </div>
  );
}

function PreviewHomeIndicator() {
  return (
    <div className="flex shrink-0 justify-center pt-[calc(var(--ui-gap)*0.5)] pb-[calc(var(--ui-gap)*0.7)]">
      <span className="h-[3px] w-[28%] rounded-full bg-ls-ink/25" />
    </div>
  );
}

export function PreviewHeader({ title }: { title: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-[var(--ui-gap)] border-b border-ls-border px-[calc(var(--ui-pad)*0.75)] pb-[calc(var(--ui-gap)*0.8)]">
      <ChevronLeft className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-ink" />
      <span className="truncate text-[length:var(--ui-sm)] font-semibold text-ls-navy">
        {title}
      </span>
      <Menu className="h-[var(--ui-sm)] w-[var(--ui-sm)] shrink-0 text-ls-ink" />
    </div>
  );
}

/** Profile / Order status / Order history, as on the real order screens. */
export function PreviewTabs({
  tabs,
  activeIndex,
}: {
  tabs: readonly string[];
  activeIndex: number;
}) {
  return (
    <div className="flex shrink-0 items-center justify-around border-b border-ls-border px-[calc(var(--ui-pad)*0.5)]">
      {tabs.map((tab, index) => (
        <span
          key={tab}
          className={cn(
            "border-b-2 px-[calc(var(--ui-gap)*0.4)] py-[calc(var(--ui-gap)*0.8)] text-[length:var(--ui-2xs)] font-semibold whitespace-nowrap",
            index === activeIndex
              ? "border-ls-blue text-ls-navy"
              : "border-transparent text-ls-muted",
          )}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export function PreviewShell({
  title,
  tabs,
  footer,
  children,
}: {
  title: string;
  tabs?: ReactNode;
  /** Pinned to the bottom, above the home indicator. */
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <PreviewStatusBar />
      <PreviewHeader title={title} />
      {tabs}

      <div className="flex min-h-0 flex-1 flex-col gap-[calc(var(--ui-gap)*0.8)] overflow-hidden px-[calc(var(--ui-pad)*0.75)] pt-[calc(var(--ui-gap)*0.9)]">
        {children}
      </div>

      {footer ? (
        <div className="shrink-0 px-[calc(var(--ui-pad)*0.75)] pt-[calc(var(--ui-gap)*0.8)]">
          {footer}
        </div>
      ) : null}

      <PreviewHomeIndicator />
    </div>
  );
}
