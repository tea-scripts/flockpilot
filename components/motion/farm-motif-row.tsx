"use client";

import { AnimatedMotif, farmVerticals } from "./motifs/farm-motifs";

/**
 * A short row of animated farm motifs. Self-contained client component so
 * Server Components can render it without passing icon functions across the
 * server→client boundary (which is not serializable).
 */
export function FarmMotifRow({ className = "", count = 5 }: { className?: string; count?: number }) {
  return (
    <div className={`flex items-center gap-5 text-brand-light/70 ${className}`}>
      {farmVerticals.slice(0, count).map((v, i) => (
        <AnimatedMotif key={v.key} Icon={v.Icon} delay={i * 0.3} className="h-5 w-5" />
      ))}
    </div>
  );
}
