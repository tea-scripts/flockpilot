"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Seconds to scroll the width of one set of items. Higher = slower. */
  speed?: number;
  gap?: string;
  className?: string;
  /**
   * How many copies of the item set to render. The track translates by exactly
   * one copy for a seamless loop; the remaining copies guarantee the viewport
   * stays full even on very wide screens.
   */
  repeat?: number;
};

/**
 * Seamless, never-ending ticker (think stock/news banner). Renders `repeat`
 * identical sets in one flex track and translates left by exactly one set, so
 * the loop point is invisible. Falls back to a static centered wrap under
 * reduced motion.
 */
export function Marquee<T>({
  items,
  renderItem,
  speed = 30,
  gap = "2.5rem",
  className,
  repeat = 4
}: MarqueeProps<T>) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex flex-wrap items-center justify-center ${className ?? ""}`} style={{ gap }}>
        {items.map(renderItem)}
      </div>
    );
  }

  return (
    <div
      className={`relative flex overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className ?? ""}`}
    >
      <motion.div
        className="flex shrink-0"
        animate={{ x: ["0%", `-${100 / repeat}%`] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: repeat }).map((_, copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
            aria-hidden={copy > 0}
          >
            {items.map(renderItem)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
