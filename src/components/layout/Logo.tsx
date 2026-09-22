import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteName, siteTagline } from "@/data/navigation";

type LogoProps = {
  className?: string;
  /** Renders the mark on its own (used inside the product mockups). */
  markOnly?: boolean;
  /** Wraps the lockup in a link to the homepage. */
  href?: string;
  onClick?: () => void;
};

/**
 * LaundrySync lockup.
 *
 * The hanger + wave mark is the approved brand asset and is used unmodified.
 * The wordmark and "by Propelius" attribution are set in Inter to match the
 * approved reference; see the handover notes - an official horizontal lockup
 * (ideally SVG) should replace this typographic wordmark when available.
 */
export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/brand-icon-primary.png"
      alt=""
      width={1254}
      height={1254}
      priority={priority}
      sizes="48px"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}

export function Logo({ className, markOnly, href, onClick }: LogoProps) {
  const lockup = (
    <span className={cn("flex items-center gap-2.5", !href && className)}>
      <LogoMark priority className="h-11 w-11 sm:h-12 sm:w-12" />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-[1.375rem] font-bold tracking-[-0.022em] text-ls-ink sm:text-[1.5rem]">
            Laundry
            <span className="text-ls-cyan">Sync</span>
          </span>
          <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.02em] text-ls-muted">
            {siteTagline}
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return lockup;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={`${siteName} ${siteTagline} - home`}
      className={cn(
        "inline-flex rounded-ls-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ls-navy-500",
        className,
      )}
    >
      {lockup}
    </Link>
  );
}
