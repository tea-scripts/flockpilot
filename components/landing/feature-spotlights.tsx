"use client";

import { motion } from "framer-motion";
import { AnimatedMotif, Reveal, farmVerticals } from "@/components/motion";
import { fadeUp, staggerContainer } from "@/components/motion/variants";
import { heroFeatures } from "./data";

export function FeatureSpotlights() {
  return (
    <>
      <section id="features" className="mx-auto max-w-[1600px] px-4 pb-10 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
            Platform
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Everything your farm business needs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
            Three pillars that replace the spreadsheets, WhatsApp threads, and guesswork.
          </p>
          <div className="mt-5 flex items-center justify-center gap-4 text-brand-light/70">
            {farmVerticals.slice(0, 5).map((v, i) => (
              <AnimatedMotif key={v.key} Icon={v.Icon} delay={i * 0.3} className="h-5 w-5" />
            ))}
          </div>
        </Reveal>
      </section>

      {heroFeatures.map((feature, idx) => (
        <section key={feature.title} className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <motion.div
            className={`grid items-center gap-10 lg:grid-cols-2 ${idx % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className={idx % 2 === 1 ? "lg:[direction:ltr]" : ""}>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${
                  feature.badge === "New"
                    ? "bg-brand-yellow/20 text-brand-yellow"
                    : "bg-brand-light/15 text-brand-light"
                }`}
              >
                {feature.badge}
              </span>
              <h3 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                {feature.description}
              </p>
              <ul className="mt-6 space-y-3">
                {feature.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light/20 text-xs text-brand-light">
                      ✓
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className={idx % 2 === 1 ? "lg:[direction:ltr]" : ""}>
              <div className="rounded-[24px] border border-white/15 bg-brand-canvas p-5 shadow-panel">
                <div className="grid gap-3 sm:grid-cols-2">
                  {feature.visual.map(([label, value]) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="rounded-2xl border border-white/12 bg-[rgba(50,163,101,0.08)] p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
                        {label}
                      </p>
                      <p className="mt-2 text-lg font-bold text-white">{value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      ))}
    </>
  );
}
