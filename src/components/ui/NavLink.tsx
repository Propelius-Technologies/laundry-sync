import Link from "next/link";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: string;
  className?: string;
  onClick?: () => void;
  /** Larger touch target + left alignment for the mobile sheet. */
  size?: "inline" | "stacked";
};

export function NavLink({
  href,
  children,
  className,
  onClick,
  size = "inline",
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-ls-sm font-medium text-ls-text transition-colors duration-200 hover:text-ls-navy",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ls-navy-500",
        size === "inline"
          ? "px-1 py-2 text-[0.9375rem]"
          : "-mx-2 flex min-h-12 items-center px-2 text-lg",
        className,
      )}
    >
      {children}
    </Link>
  );
}
