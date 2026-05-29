"use client";

import { motion, useReducedMotion } from "framer-motion";

const GRAINS = [
  { left: "10%", size: 5, dur: 9, delay: 0 },
  { left: "26%", size: 4, dur: 11, delay: 2.5 },
  { left: "44%", size: 6, dur: 8, delay: 1 },
  { left: "61%", size: 4, dur: 12, delay: 3.5 },
  { left: "77%", size: 5, dur: 10, delay: 0.8 },
  { left: "90%", size: 4, dur: 9.5, delay: 2 }
] as const;

/**
 * Subtle atmospheric backdrop: a slowly drifting gradient mesh in the brand
 * palette with a few floating "grain" particles. Purely decorative — sits
 * behind content, ignores pointer events, and goes static under reduced motion.
 */
export function AmbientField({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <motion.div
        className="absolute -inset-1/4"
        style={{
          background:
            "radial-gradient(40% 40% at 28% 30%, rgba(50,163,101,0.45), transparent 70%)," +
            "radial-gradient(42% 42% at 76% 64%, rgba(241,203,18,0.22), transparent 70%)," +
            "radial-gradient(46% 46% at 60% 18%, rgba(63,191,120,0.32), transparent 70%)",
          filter: "blur(64px)"
        }}
        animate={reduce ? undefined : { x: ["-3%", "4%", "-3%"], y: ["-2%", "3%", "-2%"], scale: [1, 1.08, 1] }}
        transition={reduce ? undefined : { duration: 20, ease: "easeInOut", repeat: Infinity }}
      />

      {!reduce &&
        GRAINS.map((g, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{ left: g.left, bottom: -12, width: g.size, height: g.size }}
            animate={{ y: [0, -280], opacity: [0, 0.7, 0] }}
            transition={{ duration: g.dur, ease: "linear", repeat: Infinity, delay: g.delay }}
          />
        ))}
    </div>
  );
}
