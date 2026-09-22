import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-ls-pill font-semibold " +
  "transition-[background-color,box-shadow,color,filter,transform] duration-(--motion-normal) ease-(--motion-ease) " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-focus-ring) " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,var(--color-ls-navy-500)_0%,var(--color-ls-navy-600)_45%,var(--color-ls-navy)_100%)] " +
    "text-white shadow-ls-cta hover:brightness-[1.07] active:translate-y-px",
  secondary:
    "border border-ls-border bg-white text-ls-ink shadow-ls-xs hover:border-ls-sky-200 hover:bg-ls-sky-50 active:translate-y-px",
  text: "text-ls-ink hover:text-ls-navy-600 [&_svg]:transition-transform [&_svg]:duration-(--motion-normal) hover:[&_svg]:translate-x-0.5",
};

/** `text` needs almost no horizontal padding - it is not a filled surface. */
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-body-sm",
  md: "h-11 px-5 text-button",
  lg: "h-13 px-7 text-button sm:text-base",
};

const textSizes: Record<Size, string> = {
  sm: "h-9 px-1 text-body-sm",
  md: "h-11 px-2 text-button",
  lg: "h-13 px-2 text-button sm:text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Single button surface for the whole site. Renders a next/link when `href` is
 * given and a real <button> otherwise, so navigation and actions never diverge
 * visually.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    onClick,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    variant === "text" ? textSizes[size] : sizes[size],
    className,
  );

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      aria-expanded={props["aria-expanded"]}
      aria-controls={props["aria-controls"]}
    >
      {children}
    </button>
  );
}
