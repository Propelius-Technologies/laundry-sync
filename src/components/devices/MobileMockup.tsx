import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight CSS phone frame (modern iPhone silhouette).
 *
 * Proportions follow a current iPhone Pro: a 9/19.5 screen, and a Dynamic
 * Island sized from the real 125x37pt pill on a 393x852pt screen (~32% of the
 * screen width, ~4.3% of its height) rather than the thin sliver we had.
 * Everything is a percentage or container-query unit so the frame stays fluid.
 */
export function MobileMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("@container w-full", className)}>
      <div className="relative">
        {/* Side buttons, just enough to read as hardware */}
        <span className="absolute top-[17%] -left-[0.9%] h-[4.5%] w-[1.8%] rounded-l-[2px] bg-ls-device-rail" />
        <span className="absolute top-[24%] -left-[0.9%] h-[7%] w-[1.8%] rounded-l-[2px] bg-ls-device-rail" />
        <span className="absolute top-[21%] -right-[0.9%] h-[8%] w-[1.8%] rounded-r-[2px] bg-ls-device-rail" />

        {/* Titanium-ish rail */}
        <div className="relative rounded-[clamp(16px,12cqw,46px)] bg-[image:var(--gradient-device-rail)] p-[clamp(1.5px,1.1cqw,4px)] shadow-ls-device">
          {/* Black bezel */}
          <div className="rounded-[clamp(15px,11.2cqw,43px)] bg-ls-device-screen p-[clamp(1.5px,1.1cqw,4px)]">
            <div className="ls-screen ls-screen-phone relative aspect-[9/19.5] w-full overflow-hidden rounded-[clamp(13px,10cqw,39px)] bg-white">
              {/* Dynamic Island */}
              <span className="absolute top-[1.35%] left-1/2 z-20 h-[4.3%] w-[32%] -translate-x-1/2 rounded-full bg-ls-device-screen">
                <span className="absolute top-1/2 right-[14%] size-[26%] -translate-y-1/2 rounded-full bg-ls-device-lens" />
              </span>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
