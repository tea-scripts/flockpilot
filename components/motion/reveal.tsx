"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "./variants";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
};

/**
 * Scroll-triggered fade/slide reveal. Reveals once when it enters the
 * viewport. Collapses to a no-op (content shown immediately) when the user
 * prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.25 }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay } }
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
