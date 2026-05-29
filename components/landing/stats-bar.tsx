"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion";
import { fadeUp, staggerContainer } from "@/components/motion/variants";
import { metrics } from "./data";

export function StatsBar() {
  return (
    <section className="border-b border-white/10 bg-brand-canvas/50 backdrop-blur">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-4 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="text-center">
              <p className="text-2xl font-bold text-brand-yellow sm:text-3xl">
                {m.to !== undefined ? (
                  <CountUp to={m.to} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                ) : (
                  m.value
                )}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/60">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
