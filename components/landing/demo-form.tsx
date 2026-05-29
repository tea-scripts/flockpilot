"use client";

import { motion } from "framer-motion";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Reveal } from "@/components/motion";
import { requestDemoAction, type DemoFormState } from "@/app/actions";
import { trackLandingEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "./whatsapp-icon";

const initialState: DemoFormState = { ok: false, message: "" };

const FIELD_CLASS =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-[rgba(50,163,101,0.08)] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl2 bg-brand-deep px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-light hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending request..." : "Request Demo"}
    </button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }
  return <p className="mt-1 text-xs font-medium text-brand-yellow">{error}</p>;
}

export function DemoForm() {
  const [state, formAction] = useActionState(requestDemoAction, initialState);
  const hasTrackedSuccess = useRef(false);

  useEffect(() => {
    if (state.ok && !hasTrackedSuccess.current) {
      trackLandingEvent("demo_submit_success");
      hasTrackedSuccess.current = true;
    }
    if (!state.ok) {
      hasTrackedSuccess.current = false;
    }
  }, [state.ok]);

  return (
    <section id="demo" className="mx-auto w-full max-w-[620px] px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal className="rounded-[24px] border border-white/20 bg-brand-canvas p-6 shadow-panel sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">Request Demo</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Talk to the FlockPilot team</h2>
        <p className="mt-3 text-sm leading-6 text-white/80">
          Share your farm context and we will schedule a guided walkthrough around your operation size, structure, and rollout timeline.
        </p>

        <form action={formAction} className="mt-7 grid gap-3.5 sm:grid-cols-2">
          <label className="text-sm font-medium text-white">
            Full Name
            <input name="fullName" type="text" className={FIELD_CLASS} />
            <FieldError error={state.errors?.fullName} />
          </label>
          <label className="text-sm font-medium text-white">
            Company/Farm Name
            <input name="companyName" type="text" className={FIELD_CLASS} />
            <FieldError error={state.errors?.companyName} />
          </label>
          <label className="text-sm font-medium text-white">
            Email
            <input name="email" type="email" className={FIELD_CLASS} />
            <FieldError error={state.errors?.email} />
          </label>
          <label className="text-sm font-medium text-white">
            Phone Number
            <input name="phoneNumber" type="tel" className={FIELD_CLASS} />
            <FieldError error={state.errors?.phoneNumber} />
          </label>
          <label className="text-sm font-medium text-white sm:col-span-2">
            Number of Birds
            <select name="numberOfBirds" className={FIELD_CLASS} defaultValue="">
              <option value="" disabled>
                Select range
              </option>
              <option value="Under 500">Under 500</option>
              <option value="500–2,000">500–2,000</option>
              <option value="2,000–10,000">2,000–10,000</option>
              <option value="10,000–50,000">10,000–50,000</option>
              <option value="50,000+">50,000+</option>
            </select>
            <FieldError error={state.errors?.numberOfBirds} />
          </label>
          <label className="text-sm font-medium text-white sm:col-span-2">
            Message
            <textarea name="message" rows={4} className={FIELD_CLASS} />
            <FieldError error={state.errors?.message} />
          </label>

          <div className="sm:col-span-2">
            <SubmitButton />
          </div>
          <div className="sm:col-span-2 text-center">
            <span className="text-xs text-white/40">or</span>
          </div>
          <a
            href="https://wa.me/2349134632589"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </form>

        {state.message ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
              state.ok
                ? "border-brand-light/40 bg-brand-light/10 text-white"
                : "border-brand-yellow/40 bg-brand-yellow/20 text-white"
            }`}
          >
            {state.message}
          </motion.div>
        ) : null}
      </Reveal>
    </section>
  );
}
