"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { fadeUp, staggerContainer } from "@/components/motion/variants";
import { trackLandingEvent } from "@/lib/analytics";
import { appSignupUrl } from "@/lib/config";
import { addOns, pricingTiers, type BillingCycle } from "./data";

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal>
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Plans for every farm growth stage</h2>
            <a
              href={appSignupUrl('trial=1')}
              className="mt-3 inline-block text-sm font-medium text-brand-light transition hover:text-brand-yellow"
            >
              Or start with a 14-day free trial &rarr;
            </a>
          </div>
          <div className="inline-flex rounded-full border border-brand-light/60 bg-brand-canvas p-1.5 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 transition ${
                billing === "monthly" ? "bg-brand-deep text-white" : "text-white/80 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`rounded-full px-4 py-2 transition ${
                billing === "annual" ? "bg-brand-deep text-white" : "text-white/80 hover:text-white"
              }`}
            >
              Annual (15% off)
            </button>
          </div>
        </div>
      </Reveal>

      <motion.div
        className="mt-10 grid items-stretch gap-6 xl:grid-cols-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {pricingTiers.map((tier) => {
          const amount = billing === "monthly" ? tier.monthly : tier.annual;
          return (
            <motion.article key={tier.name} variants={fadeUp} className="relative">
              {tier.featured ? (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-light px-4 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-deep">
                  Most Popular
                </span>
              ) : null}
              <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-brand-canvas p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/75">{tier.subtitle}</p>
                <p className="mt-4 text-xl font-bold text-brand-yellow">{amount}</p>

                <div className="mt-4 flex flex-1 flex-col">
                  <a
                    href={tier.ctaHref}
                    onClick={() => trackLandingEvent("pricing_tier_click", { tier: tier.name, billing })}
                    className="inline-flex w-full items-center justify-center rounded-xl2 bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light hover:text-brand-deep"
                  >
                    {tier.cta}
                  </a>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/85">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={`rounded-lg border px-3 py-2 break-words [overflow-wrap:anywhere] ${
                          tier.featured
                            ? "border-white/15 bg-[rgba(50,163,101,0.18)]"
                            : "border-white/10 bg-[rgba(50,163,101,0.08)]"
                        }`}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <Reveal className="mt-12 rounded-2xl border border-white/20 bg-brand-canvas p-6 shadow-sm sm:p-8">
        <h3 className="text-xl font-bold text-brand-yellow">Add-ons</h3>
        <div className="mt-5">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/20 text-white">
                <th className="px-3 py-3 font-semibold">Add-on</th>
                <th className="w-[42%] px-3 py-3 font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map(([name, price]) => (
                <tr key={name} className="border-b border-white/15">
                  <td className="px-3 py-3 text-white/85 [overflow-wrap:anywhere]">{name}</td>
                  <td className="px-3 py-3 font-semibold text-brand-yellow [overflow-wrap:anywhere]">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
