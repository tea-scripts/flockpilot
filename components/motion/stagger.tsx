"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, staggerContainer } from "./variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
  /** Animate immediately on mount instead of waiting for scroll-into-view. */
  animateOnMount?: boolean;
};

/** Container that reveals its {@link StaggerItem} children in sequence. */
export function Stagger({ children, className, amount = 0.2, animateOnMount = false }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "show" as const }
        : { whileInView: "show" as const, viewport: { once: true, amount } })}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Must be rendered inside a {@link Stagger}. */
export function StaggerItem({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
