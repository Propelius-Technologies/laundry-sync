"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "@/components/motion/motion-tokens";
import { cn } from "@/lib/utils";

/**
 * Renders one of the approved page illustrations from /public/images.
 *
 * `unoptimized` serves the SVG straight from /public: the image optimizer
 * refuses SVG by default, and rasterising a vector would lose the sharpness
 * that made it an SVG. The intrinsic 960x760 is passed through so the box is
 * reserved before load and nothing shifts.
 *
 * `alt=""` marks it decorative - every illustration here restates what the
 * surrounding copy already says, so announcing it twice adds nothing.
 */
export function PageIllustration({
  src,
  className,
  delay = 0.2,
  priority = false,
}: {
  src: string;
  className?: string;
  delay?: number;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
    >
      <Image
        src={src}
        alt=""
        width={960}
        height={760}
        unoptimized
        priority={priority}
        className="h-auto w-full"
      />
    </motion.div>
  );
}
