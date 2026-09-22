import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight CSS laptop frame (MacBook-style).
 *
 * Built in-house rather than with a device-mockup package: the libraries we
 * evaluated ship fixed pixel frames (960x600) with no media queries, which
 * cannot satisfy the hero's fluid layout. Every dimension here is a percentage
 * or container-query unit, so the frame scales from 280px to 800px wide with no
 * layout shift and no horizontal overflow.
 */
export function LaptopMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("@container w-full", className)}>
      {/* Lid */}
      <div className="relative rounded-t-[clamp(7px,1.5cqw,18px)] rounded-b-[clamp(2px,0.4cqw,5px)] bg-[image:var(--gradient-device-lid)] p-[clamp(4px,0.85cqw,11px)] pb-[clamp(6px,1.25cqw,15px)] shadow-ls-device">
        {/* Camera */}
        <span className="absolute top-[clamp(1.5px,0.32cqw,4px)] left-1/2 size-[clamp(1.5px,0.3cqw,4px)] -translate-x-1/2 rounded-full bg-ls-device-lens-lg" />

        <div className="ls-screen ls-screen-laptop relative aspect-[16/10] w-full overflow-hidden rounded-[clamp(2px,0.45cqw,6px)] bg-white">
          {children}
        </div>
      </div>

      {/* Base / hinge */}
      <div className="relative mx-[-3.4%] h-[clamp(6px,1.4cqw,17px)] rounded-b-[clamp(5px,1.1cqw,13px)] bg-[image:var(--gradient-device-base)]">
        <span className="absolute top-0 left-1/2 h-[42%] w-[13%] -translate-x-1/2 rounded-b-full bg-ls-device-foot" />
      </div>

      {/* Contact shadow */}
      <div
        aria-hidden="true"
        className="mx-[6%] h-[clamp(6px,1.4cqw,16px)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(11_36_71/0.22),transparent_70%)]"
      />
    </div>
  );
}
