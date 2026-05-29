"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion";
import { detailedFeatures } from "./data";

export function FeatureGrid() {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal className="text-center">
        <button
          type="button"
          onClick={() => setShowAllFeatures((v) => !v)}
          className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-brand-canvas px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-yellow hover:text-brand-yellow"
        >
          {showAllFeatures ? "Hide detailed features" : "See all 30+ features"}
          <ChevronDown className={`h-4 w-4 transition-transform ${showAllFeatures ? "rotate-180" : ""}`} />
        </button>
      </Reveal>

      {showAllFeatures && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.35 }}
          className="mt-10 overflow-hidden"
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {detailedFeatures.map((group) => (
              <div key={group.title} className="rounded-2xl border border-white/15 bg-brand-canvas p-5">
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden>
                    {group.icon}
                  </span>
                  <h4 className="text-base font-bold text-brand-yellow">{group.title}</h4>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {group.features.map((f) => (
                    <li key={f.name}>
                      <p className="text-sm font-semibold text-white">{f.name}</p>
                      <p className="text-xs leading-5 text-white/60">{f.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
