import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "@/components/ui/Icons";

type StatusNotificationProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  /** Soft fill behind the leading icon. */
  iconTone?: "blue" | "navy";
  /** Raises the card slightly while its demo step is the active one. */
  active?: boolean;
  className?: string;
};

const iconTones = {
  blue: "bg-ls-sky-100 text-ls-navy-600",
  navy: "bg-ls-navy text-white",
} as const;

/**
 * Small floating product notification. Used in the hero, but deliberately
 * generic so later sections can reuse it.
 */
export function StatusNotification({
  icon: Icon,
  title,
  body,
  iconTone = "blue",
  active = false,
  className,
}: StatusNotificationProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-ls-lg border bg-white px-3 py-2.5 sm:gap-3.5 sm:px-4 sm:py-3",
        "transition-[box-shadow,border-color] duration-500 ease-out",
        active
          ? "border-ls-sky-200 shadow-ls-card"
          : "border-ls-border shadow-ls-sm",
        className,
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-ls-md sm:size-10",
          iconTones[iconTone],
        )}
      >
        <Icon className="size-4 sm:size-5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.8125rem] leading-tight font-semibold text-ls-ink sm:text-[0.9375rem]">
          {title}
        </span>
        <span className="mt-1 block text-[0.6875rem] leading-snug text-ls-muted sm:text-xs">
          {body}
        </span>
      </span>

      <CheckCircle
        className={cn(
          "size-5 shrink-0 transition-[color,opacity] duration-500 ease-out sm:size-6",
          active ? "text-ls-success opacity-100" : "text-ls-border opacity-70",
        )}
      />
    </div>
  );
}
