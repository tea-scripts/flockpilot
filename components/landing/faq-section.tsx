"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { faqItems } from "./data";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <Reveal className="rounded-2xl border border-white/20 bg-brand-canvas p-6 shadow-sm sm:p-8">
        <h3 className="text-xl font-bold text-brand-yellow">Frequently Asked Questions</h3>
        <div className="mt-5 space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.question} className="rounded-xl border border-white/15 bg-[rgba(50,163,101,0.08)]">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-white">{faq.question}</span>
                  <span className="text-lg leading-none text-brand-light">{isOpen ? "-" : "+"}</span>
                </button>
                {isOpen ? (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 pb-4 text-sm leading-7 text-white/80"
                  >
                    {faq.answer}
                  </motion.p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
