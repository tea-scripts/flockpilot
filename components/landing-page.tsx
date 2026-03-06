"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, type Variants } from "framer-motion";
import { requestDemoAction, type DemoFormState } from "@/app/actions";
import { trackLandingEvent } from "@/lib/analytics";

type BillingCycle = "monthly" | "annual";

type FeatureModule = {
  module: string;
  items: string[];
};

type PricingTier = {
  name: string;
  monthly: string;
  annual: string;
  subtitle: string;
  features: string[];
  cta: string;
  bestFor: string;
  featured?: boolean;
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09
    }
  }
};

const initialState: DemoFormState = { ok: false, message: "" };

const featureModules: FeatureModule[] = [
  {
    module: "Finance",
    items: [
      "Expense Entry Workflow: Capture and categorize expenses across Feed, Labor, Vet, Utilities, Transport, and Other with review, approval, and payment tracking."
    ]
  },
  {
    module: "Finance Reporting",
    items: [
      "Financial Statements: Generate trial balance, profit and loss, balance sheet, and cash flow views."
    ]
  },
  {
    module: "Finance Analytics",
    items: [
      "Finance Dashboard: Track revenue, costs, cash movement, and overall financial health at a glance."
    ]
  },
  {
    module: "Farm Ops",
    items: [
      "Farm Site Management: Manage multiple farm locations under one platform with site-level visibility.",
      "Batch Management: Track each flock batch from setup to closeout with complete lifecycle records.",
      "Mortality Tracking: Capture mortality events for early loss detection and operational accuracy.",
      "Medication Cost Tracking: Log medication activity and costs for approvals and reporting."
    ]
  },
  {
    module: "Farm Ops/Sales",
    items: [
      "Sales Event Management: Track farm sales in bird or kilogram units with finance review steps."
    ]
  },
  {
    module: "Farm Inventory",
    items: [
      "Feed Inventory: Monitor feed types, deliveries, and usage to improve feed efficiency."
    ]
  },
  {
    module: "Farm Ops + Finance",
    items: ["Approvals Queues: Central approval queues for farm-related submissions."]
  },
  {
    module: "Farm Analytics",
    items: [
      "Flight Deck - Farm Ops Cockpit: Real-time visibility into flock health, feed performance, sales, and alerts.",
      "Batch Profitability Insights: Compare batches across cycles and see what drives profitability.",
      "Analytics Export: Export farm performance data for stakeholder reporting and deeper analysis."
    ]
  },
  {
    module: "Documents",
    items: [
      "Secure Document Storage: Store sensitive records with controlled access (AWS S3 integration)."
    ]
  },
  {
    module: "Notifications",
    items: [
      "In-App Notifications: Notify users about critical actions, decisions, and farm alerts.",
      "Email Notifications: Deliver key updates by email when needed (Resend integration)."
    ]
  },
  {
    module: "Security/Admin",
    items: [
      "Role-Based Access: Separate visibility and actions by role, including Ops and Finance views."
    ]
  },
  {
    module: "Admin",
    items: [
      "User Administration: Manage internal user accounts, permissions, and account status."
    ]
  },
  {
    module: "Admin/Settings",
    items: [
      "Tenant Configuration: Set organization-level rules and custom thresholds by farm site."
    ]
  },
  {
    module: "Audit",
    items: ["Audit Trail: Keep a full history of critical actions for accountability and compliance."]
  },
  {
    module: "Self-Service",
    items: [
      "Payslip Self-Service: Employees can view and download their own payslips anytime.",
      "Employee Document Requests: Request official HR documents from inside the app.",
      "My Profile: Employees can view their profile details anytime.",
      "My Payslips: Access payroll history and download payslips.",
      "My Loans: View loan applications, approval status, and repayment progress."
    ]
  },
  {
    module: "Documentation",
    items: ["Help & Policy Guides: Built-in plain-language guides for workflows and policies."]
  },
  {
    module: "Loans",
    items: [
      "Loan Applications: Employees can request loans through a guided process.",
      "Repayment Tracking: Employees can monitor loan balance and repayment progress."
    ]
  }
];

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    monthly: "₦25,000/month",
    annual: "₦255,000/year",
    subtitle: "For pilots and small farms getting disciplined.",
    features: [
      "Up to 2,000 active birds",
      "1 farm site",
      "Up to 3 users",
      "Batch Analytics (KPIs, trends)",
      "Mortality + Medication logging",
      "Sales tracking (Bird or Kg)",
      "Basic alerts (data quality + ops thresholds)",
      "Exports (CSV)"
    ],
    cta: "Start Starter",
    bestFor: "500–2,000 birds, first-time structured tracking."
  },
  {
    name: "Growth",
    monthly: "₦60,000/month",
    annual: "₦612,000/year",
    subtitle: "For farms running consistent cycles and managing costs.",
    features: [
      "Up to 10,000 active birds",
      "Up to 3 farm sites",
      "Up to 10 users",
      "Flight Deck (Farm Ops Cockpit)",
      "Advanced alerts (mortality, feed gaps, early sales, margin warnings)",
      "Expense buckets (Feed/Labor/Vet/Utilities/Transport/Other)",
      "Role-based access (Ops vs Finance views)",
      "Drill-down reporting"
    ],
    cta: "Start Growth",
    bestFor: "2,000–10,000 birds, multiple batches, owner + farm manager + accounts.",
    featured: true
  },
  {
    name: "Scale",
    monthly: "₦150,000/month",
    annual: "₦1,530,000/year",
    subtitle: "For multi-site operations that need control and accountability.",
    features: [
      "Up to 50,000 active birds",
      "Up to 10 farm sites",
      "Up to 30 users",
      "Multi-batch comparisons (performance and profitability)",
      "Audit logs + approvals workflow (optional modules)",
      "Custom thresholds per farm site",
      "Priority support (business hours)",
      "Dedicated onboarding session"
    ],
    cta: "Start Scale",
    bestFor: "10,000–50,000 birds, fast-growing farms, structured teams."
  },
  {
    name: "Enterprise",
    monthly: "Contact us for pricing",
    annual: "Contact us for pricing",
    subtitle: "For large operators, integrators, and groups.",
    features: [
      "Unlimited birds/sites/users",
      "SLA + dedicated support channel",
      "Custom integrations (ERP, accounting, IoT, inventory)",
      "Custom reporting + data warehouse exports",
      "Onsite onboarding available"
    ],
    cta: "Contact Sales",
    bestFor: "50,000+ birds, multiple companies/tenants, compliance-heavy operations."
  }
];

const faqItems = [
  {
    question: "What counts as \"active birds\"?",
    answer:
      "Active birds means birds currently in live batches during the month. If you restock and run new batches, your plan should match your peak monthly capacity."
  },
  {
    question: "Do I need Finance features to use FlockPilot?",
    answer:
      "No. You can run purely on Farm Ops (mortality, feed, sales, unit economics). Finance linkage can be enabled later."
  },
  {
    question: "Can I track both bird sales and kg sales?",
    answer:
      "Yes. FlockPilot supports mixed-mode sales with unit-aware analytics and alerts."
  },
  {
    question: "Is this per farm or per company?",
    answer:
      "Per company (tenant). Limits are based on total active birds and farm sites under that company."
  },
  {
    question: "Can I start small and upgrade mid-month?",
    answer: "Yes. Upgrades are prorated."
  },
  {
    question: "Do you offer a trial?",
    answer:
      "Yes - 14-day pilot access on Starter, restricted to 1 batch and 2 users."
  }
];

const addOns = [
  ["Onboarding & Setup (Starter/Growth)", "₦100,000 one-time"],
  ["Onboarding & Setup (Scale)", "₦250,000 one-time"],
  ["WhatsApp/SMS Alerts Pack", "₦10,000/month (up to 1,000 messages)"],
  ["Extra Farm Site", "₦15,000/month per site"]
] as const;

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl2 bg-brand-deep px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-light hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending request..." : "Request Demo"}
    </button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-brand-deep">{error}</p>;
}

export function LandingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [state, formAction] = useActionState(requestDemoAction, initialState);
  const hasTrackedSuccess = useRef(false);

  const pricing = useMemo(
    () =>
      pricingTiers.map((tier) => ({
        ...tier,
        amount: billing === "monthly" ? tier.monthly : tier.annual
      })),
    [billing]
  );

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
    <main className="section-shell">
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-24">
        <Reveal className="flex items-center justify-between gap-4">
          <Image
            src="/brand/enro-logo-with-tagline.svg"
            alt="Enro Agro Limited"
            width={210}
            height={72}
            priority
          />
          <a
            href="#demo"
            onClick={() => trackLandingEvent("nav_launch_pilot_click")}
            className="rounded-full border border-brand-deep/20 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-brand-deep backdrop-blur-sm transition hover:border-brand-light hover:text-brand-light"
          >
            Launch Your Pilot
          </a>
        </Reveal>

        <motion.div
          className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={revealVariants}>
            <p className="inline-flex items-center rounded-full border border-brand-light/40 bg-white/75 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep">
              FlockPilot by Enro Agro Limited
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-brand-deep sm:text-5xl">
              Real-time poultry operations and finance cockpit for profitable batches.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand-deep/80 sm:text-lg">
              FlockPilot tracks flock health, feed efficiency, and unit economics in one place so Nigerian poultry operators can catch losses early and run every cycle with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#demo"
                onClick={() => trackLandingEvent("hero_demo_click")}
                className="rounded-xl2 bg-brand-deep px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-light hover:text-brand-deep"
              >
                Request a Demo
              </a>
              <a
                href="#pricing"
                onClick={() => trackLandingEvent("hero_pricing_click")}
                className="rounded-xl2 border border-brand-deep/30 bg-white/80 px-6 py-3 text-sm font-semibold text-brand-deep transition hover:-translate-y-0.5 hover:border-brand-light hover:text-brand-light"
              >
                View Pricing
              </a>
            </div>
          </motion.div>

          <motion.div variants={revealVariants}>
            <div className="rounded-[28px] border border-brand-light/25 bg-white/85 p-5 shadow-panel backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Flock Health Index", "94.2% stable"],
                  ["Feed Conversion", "1.85 avg FCR"],
                  ["Mortality Drift", "-12% vs prior cycle"],
                  ["Unit Margin", "+₦124 per bird"]
                ].map(([label, value]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="rounded-2xl border border-brand-deep/10 bg-gradient-to-b from-white to-brand-canvas p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep/60">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-bold text-brand-deep">{value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-brand-deep p-4 text-white">
                <p className="text-xs uppercase tracking-[0.12em] text-white/70">Live Alert</p>
                <p className="mt-1 text-sm font-medium leading-6">
                  Feed intake at Site B has dropped below target for 2 consecutive days. Investigate intake logs and inventory flow.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal className="rounded-[26px] border border-brand-light/30 bg-white/85 p-7 shadow-panel sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">
            Problem to Solution
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-brand-deep sm:text-3xl">
                Nigerian poultry teams are forced to operate blind.
              </h2>
              <p className="mt-3 text-sm leading-7 text-brand-deep/80 sm:text-base">
                Manual records, delayed updates, and disconnected farm-finance tracking make it hard to detect mortality spikes, feed leakage, or poor batch margins before cash is already gone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-deep">FlockPilot connects operations and money in real time.</h3>
              <p className="mt-3 text-sm leading-7 text-brand-deep/80 sm:text-base">
                Owners and operators get one cockpit for flock performance, feed efficiency, sales, and unit economics, with alerts and approvals that tighten execution across every farm site.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">Platform Features</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-deep">Modules built for operational control and profitable scale</h2>
        </Reveal>
        <motion.div
          className="mt-8 grid gap-4 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureModules.map((group) => (
            <motion.article
              key={group.module}
              variants={revealVariants}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-brand-deep/10 bg-white/85 p-5 shadow-sm"
            >
              <h3 className="flex items-center gap-2 text-base font-bold text-brand-deep">
                <Image
                  src="/brand/enro-pattern-icon.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px]"
                />
                {group.module}
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-brand-deep/85">
                {group.items.map((item) => (
                  <li key={item} className="rounded-xl border border-brand-light/20 bg-brand-canvas px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">Pricing</p>
              <h2 className="mt-3 text-3xl font-bold text-brand-deep">Plans for every farm growth stage</h2>
            </div>
            <div className="inline-flex rounded-full border border-brand-deep/20 bg-white p-1.5 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-4 py-2 transition ${
                  billing === "monthly"
                    ? "bg-brand-deep text-white"
                    : "text-brand-deep/70 hover:text-brand-deep"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`rounded-full px-4 py-2 transition ${
                  billing === "annual"
                    ? "bg-brand-deep text-white"
                    : "text-brand-deep/70 hover:text-brand-deep"
                }`}
              >
                Annual (15% off)
              </button>
            </div>
          </div>
        </Reveal>

        <motion.div
          className="mt-8 grid gap-4 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {pricing.map((tier) => (
            <motion.article
              key={tier.name}
              variants={revealVariants}
              whileHover={{ y: -6 }}
              className={`rounded-2xl border p-5 shadow-sm ${
                tier.featured
                  ? "border-brand-light/80 bg-white shadow-glow"
                  : "border-brand-deep/10 bg-white/85"
              }`}
            >
              <h3 className="text-2xl font-bold text-brand-deep">{tier.name}</h3>
              <p className="mt-1 text-sm text-brand-deep/75">{tier.subtitle}</p>
              <p className="mt-4 text-xl font-bold text-brand-deep">{tier.amount}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-brand-deep/85">
                {tier.features.map((feature) => (
                  <li key={feature} className="rounded-lg bg-brand-canvas px-3 py-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border border-brand-light/30 bg-brand-light/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep/80">
                Best for: {tier.bestFor}
              </p>
              <a
                href="#demo"
                onClick={() =>
                  trackLandingEvent("pricing_tier_click", {
                    tier: tier.name,
                    billing
                  })
                }
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl2 bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-light hover:text-brand-deep"
              >
                {tier.cta}
              </a>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-10 rounded-2xl border border-brand-deep/10 bg-white/90 p-5 shadow-sm sm:p-7">
          <h3 className="text-xl font-bold text-brand-deep">Add-ons</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-deep/15 text-brand-deep">
                  <th className="px-3 py-3 font-semibold">Add-on</th>
                  <th className="px-3 py-3 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map(([name, price]) => (
                  <tr key={name} className="border-b border-brand-deep/10">
                    <td className="px-3 py-3 text-brand-deep/85">{name}</td>
                    <td className="px-3 py-3 font-semibold text-brand-deep">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-8 rounded-2xl border border-brand-deep/10 bg-white/90 p-5 shadow-sm sm:p-7">
          <h3 className="text-xl font-bold text-brand-deep">Frequently Asked Questions</h3>
          <div className="mt-4 space-y-2">
            {faqItems.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="rounded-xl border border-brand-deep/12 bg-brand-canvas/75">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  >
                    <span className="text-sm font-semibold text-brand-deep">{faq.question}</span>
                    <span className="text-lg leading-none text-brand-light">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 pb-4 text-sm leading-7 text-brand-deep/85"
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

      <section id="demo" className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal className="rounded-[26px] border border-brand-light/30 bg-white/95 p-6 shadow-panel sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-light">Request Demo</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-deep">Talk to the FlockPilot team</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-deep/85">
            Share your farm context and we will schedule a guided walkthrough around your batch size, operational structure, and rollout timeline.
          </p>

          <form action={formAction} className="mt-7 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-brand-deep">
              Full Name
              <input
                name="fullName"
                type="text"
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
              />
              <FieldError error={state.errors?.fullName} />
            </label>
            <label className="text-sm font-medium text-brand-deep">
              Company/Farm Name
              <input
                name="companyName"
                type="text"
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
              />
              <FieldError error={state.errors?.companyName} />
            </label>
            <label className="text-sm font-medium text-brand-deep">
              Email
              <input
                name="email"
                type="email"
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
              />
              <FieldError error={state.errors?.email} />
            </label>
            <label className="text-sm font-medium text-brand-deep">
              Phone Number
              <input
                name="phoneNumber"
                type="tel"
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
              />
              <FieldError error={state.errors?.phoneNumber} />
            </label>
            <label className="text-sm font-medium text-brand-deep sm:col-span-2">
              Number of Birds
              <select
                name="numberOfBirds"
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
                defaultValue=""
              >
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
            <label className="text-sm font-medium text-brand-deep sm:col-span-2">
              Message
              <textarea
                name="message"
                rows={5}
                className="mt-1.5 w-full rounded-xl border border-brand-deep/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-light focus:ring-2 focus:ring-brand-light/25"
              />
              <FieldError error={state.errors?.message} />
            </label>

            <div className="sm:col-span-2">
              <SubmitButton />
            </div>
          </form>

          {state.message ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                state.ok
                  ? "border-brand-light/40 bg-brand-light/10 text-brand-deep"
                  : "border-brand-deep/20 bg-brand-yellow/20 text-brand-deep"
              }`}
            >
              {state.message}
            </motion.div>
          ) : null}
        </Reveal>
      </section>

      <footer className="border-t border-brand-deep/10 bg-white/85">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Image src="/brand/enro-logo.svg" alt="Enro Agro Limited" width={140} height={44} />
            <p className="text-brand-deep/75">FlockPilot is a product of Enro Agro Limited.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <p className="text-brand-deep/85">
              <span className="font-semibold">Company:</span> Enro Agro Limited
              <br />
              <span className="font-semibold">Address:</span> Lagos, Nigeria
            </p>
            <p className="text-brand-deep/85">
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:info@enroagro.com" className="hover:text-brand-light">
                info@enroagro.com
              </a>
              <br />
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+2348162420463" className="hover:text-brand-light">
                +2348162420463
              </a>
            </p>
            <p className="text-brand-deep/85">
              <span className="font-semibold">Socials:</span>{" "}
              <a href="https://x.com/enroagro" className="hover:text-brand-light">
                X (@enroagro)
              </a>
              ,{" "}
              <a href="https://instagram.com/enroagro" className="hover:text-brand-light">
                Instagram (@enroagro)
              </a>
              , Facebook (Enro Agro Limited), LinkedIn (Enro Agro Limited)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
