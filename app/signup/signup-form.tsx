"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { signupAction, type SignupState } from "./actions";

interface Plan {
  code: string;
  tier: string;
  interval: string;
}

const tierLabels: Record<string, string> = {
  STARTER: "Starter",
  GROWTH: "Growth",
  SCALE: "Scale",
};

const tierPrices: Record<string, { monthly: string; annual: string }> = {
  STARTER: { monthly: "₦25,000/mo", annual: "₦255,000/yr" },
  GROWTH: { monthly: "₦50,000/mo", annual: "₦510,000/yr" },
  SCALE: { monthly: "₦120,000/mo", annual: "₦1,224,000/yr" },
};

function PlanDropdown({
  plans,
  selectedPlan,
}: {
  plans: Plan[];
  selectedPlan?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Plan | null>(
    plans.find((p) => p.code === selectedPlan) || null,
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthlyPlans = plans.filter((p) => p.interval === "MONTHLY");
  const annualPlans = plans.filter((p) => p.interval === "ANNUALLY");

  function formatLabel(plan: Plan) {
    const label = tierLabels[plan.tier] || plan.tier;
    const prices = tierPrices[plan.tier];
    if (!prices) return label;
    const price = plan.interval === "ANNUALLY" ? prices.annual : prices.monthly;
    return `${label} — ${price}`;
  }

  function formatBillingTag(plan: Plan) {
    return plan.interval === "ANNUALLY" ? "Annual (save 15%)" : "Monthly";
  }

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="planCode" value={selected?.code || ""} />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-left text-sm text-white outline-none transition focus:border-brand-light focus:ring-1 focus:ring-brand-light/30"
      >
        <span className={selected ? "text-white" : "text-white/30"}>
          {selected ? formatLabel(selected) : "Choose a plan..."}
        </span>
        <svg
          className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/15 bg-[#1a2e1f] shadow-xl">
          {monthlyPlans.length > 0 && (
            <div>
              <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Monthly
              </div>
              {monthlyPlans.map((plan) => (
                <button
                  key={plan.code}
                  type="button"
                  onClick={() => {
                    setSelected(plan);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                    selected?.code === plan.code
                      ? "bg-brand-light/10 text-brand-light"
                      : "text-white"
                  }`}
                >
                  <span className="font-medium">{tierLabels[plan.tier] || plan.tier}</span>
                  <span className="text-xs text-white/50">
                    {tierPrices[plan.tier]?.monthly || ""}
                  </span>
                </button>
              ))}
            </div>
          )}

          {annualPlans.length > 0 && (
            <div>
              <div className="mt-1 border-t border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Annual
                <span className="ml-1.5 rounded bg-brand-light/20 px-1.5 py-0.5 text-[9px] font-bold text-brand-light">
                  Save 15%
                </span>
              </div>
              {annualPlans.map((plan) => (
                <button
                  key={plan.code}
                  type="button"
                  onClick={() => {
                    setSelected(plan);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                    selected?.code === plan.code
                      ? "bg-brand-light/10 text-brand-light"
                      : "text-white"
                  }`}
                >
                  <span className="font-medium">{tierLabels[plan.tier] || plan.tier}</span>
                  <span className="text-xs text-white/50">
                    {tierPrices[plan.tier]?.annual || ""}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Option to clear selection */}
          {selected && (
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setOpen(false);
              }}
              className="w-full border-t border-white/10 px-4 py-2 text-left text-xs text-white/40 transition hover:bg-white/10 hover:text-white/60"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function SignupForm({
  plans,
  selectedPlan,
  isTrial,
}: {
  plans: Plan[];
  selectedPlan?: string;
  isTrial: boolean;
}) {
  const initialState: SignupState = { ok: false, message: "" };
  const [state, formAction, isPending] = useActionState(signupAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Redirect to Paystack checkout on success
  useEffect(() => {
    if (state.ok && state.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  }, [state]);

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-brand-light focus:ring-1 focus:ring-brand-light/30 transition";

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="organizationName" className="mb-1 block text-xs font-medium text-white/70">
          Farm / Organization Name
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          required
          minLength={2}
          placeholder="Acme Farms Ltd"
          className={inputClass}
        />
        {state.errors?.organizationName && (
          <p className="mt-1 text-xs text-red-400">{state.errors.organizationName}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-xs font-medium text-white/70">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="John"
            className={inputClass}
          />
          {state.errors?.firstName && (
            <p className="mt-1 text-xs text-red-400">{state.errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1 block text-xs font-medium text-white/70">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Doe"
            className={inputClass}
          />
          {state.errors?.lastName && (
            <p className="mt-1 text-xs text-red-400">{state.errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium text-white/70">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={inputClass}
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>
        )}
      </div>

      {/* Plan selector (only if not trial and plans are available) */}
      {!isTrial && plans.length > 0 && (
        <div>
          <label className="mb-1 block text-xs font-medium text-white/70">
            Select Plan
          </label>
          <PlanDropdown plans={plans} selectedPlan={selectedPlan} />
          <p className="mt-1 text-xs text-white/40">
            You can also select a plan after registration.
          </p>
        </div>
      )}

      {/* Hidden plan code for trial flow */}
      {isTrial && <input type="hidden" name="trial" value="1" />}

      {/* Status messages */}
      {state.message && !state.ok && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-sm text-red-300">
          {state.message}
        </div>
      )}

      {state.ok && !state.checkoutUrl && (
        <div className="rounded-xl border border-brand-light/30 bg-brand-light/10 px-4 py-2.5 text-sm text-brand-light">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-brand-light px-4 py-3 text-sm font-semibold text-brand-deep transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending
          ? "Creating your account..."
          : isTrial
            ? "Start Free Trial"
            : "Create Account"}
      </button>
    </form>
  );
}
