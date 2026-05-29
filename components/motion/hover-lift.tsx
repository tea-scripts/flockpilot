"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Soft spring elevation on hover. Renders a plain div (no motion) when the
 * user prefers reduced motion.
 */
export function HoverLift({ children, className, y = -4 }: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
