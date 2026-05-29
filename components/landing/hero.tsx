"use client";

import { motion } from "framer-motion";
import { AmbientField, AnimatedMotif, Marquee, farmVerticals } from "@/components/motion";
import { fadeUp, staggerContainer } from "@/components/motion/variants";
import { trackLandingEvent } from "@/lib/analytics";
import { Nav } from "./nav";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient backdrop spans the nav + hero so the top reads as one surface */}
      <AmbientField />

      <div className="relative">
        <Nav />

        <div className="mx-auto max-w-[1600px] px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center rounded-full border border-brand-light/50 bg-brand-canvas px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow"
            >
              Farm Management &amp; ERP
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              The operating system for
              <span className="text-brand-yellow"> every profitable farm</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg"
            >
              Farm ops, finance, payroll, HR, and AI — in one platform. Built for farmers across Africa who want to stop guessing and start knowing.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#demo"
                onClick={() => trackLandingEvent("hero_demo_click")}
                className="shiny-ring-btn rounded-xl2 bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-light hover:text-brand-deep"
              >
                Request a Demo
              </a>
              <a
                href="#pricing"
                onClick={() => trackLandingEvent("hero_pricing_click")}
                className="rounded-xl2 border border-white/60 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-brand-yellow hover:text-brand-yellow"
              >
                View Pricing
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rotating farm verticals — the "every farm" signal */}
      <div className="relative border-y border-white/10 bg-brand-canvas/40">
        <p className="pt-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
          One platform, every farm
        </p>
        <Marquee
          speed={32}
          className="pb-4"
          items={farmVerticals}
          renderItem={(v, i) => (
            <span
              key={v.key}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80"
            >
              <AnimatedMotif Icon={v.Icon} delay={(i % farmVerticals.length) * 0.25} className="h-5 w-5 text-brand-yellow" />
              {v.label}
            </span>
          )}
        />
      </div>
    </section>
  );
}
