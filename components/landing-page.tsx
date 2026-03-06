"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, type Variants } from "framer-motion";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import { requestDemoAction, type DemoFormState } from "@/app/actions";
import { trackLandingEvent } from "@/lib/analytics";

type BillingCycle = "monthly" | "annual";

type FeatureItem = {
  name: string;
  summary: string;
};

type FeatureGroup = {
  icon: string;
  title: string;
  description: string;
  features: FeatureItem[];
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

const featureGroups: FeatureGroup[] = [
  {
    icon: "🚜",
    title: "Farm Operations",
    description: "Run daily farm execution with clean lifecycle records, sales flow, and loss controls.",
    features: [
      {
        name: "Farm Site Management",
        summary: "Track multiple farm sites, buildings, and resources in one place."
      },
      {
        name: "Batch Management",
        summary: "Create, monitor, and manage production batches with full visibility."
      },
      {
        name: "Sales Event Management",
        summary: "Process sales orders and capture customer-level sales records."
      },
      {
        name: "Feed Inventory",
        summary: "Monitor feed stock levels, usage, and inventory movement in real time."
      },
      {
        name: "Mortality Tracking",
        summary: "Record and analyze mortality events with complete operational context."
      },
      {
        name: "Medication Cost Tracking",
        summary: "Track medication usage schedules and approved medication costs."
      },
      {
        name: "Approvals Queues",
        summary: "Centralize review and approval steps for farm and finance workflows."
      }
    ]
  },
  {
    icon: "📊",
    title: "Farm Intelligence",
    description: "Turn operational data into live visibility, performance benchmarks, and export-ready insights.",
    features: [
      {
        name: "Flight Deck - Farm Ops Cockpit",
        summary: "See live operational metrics and KPI trends from one cockpit."
      },
      {
        name: "Batch Profitability Insights",
        summary: "Break down batch profitability and compare cycle performance."
      },
      {
        name: "Analytics Export",
        summary: "Export farm analytics for reporting and external analysis tools."
      }
    ]
  },
  {
    icon: "💰",
    title: "Finance & Accounting",
    description: "Track farm spending, monitor financial performance, and report with confidence.",
    features: [
      {
        name: "Expense Entry Workflow",
        summary: "Submit and approve expenses with controlled review flow."
      },
      {
        name: "Financial Statements",
        summary: "Generate core financial reports for management visibility."
      },
      {
        name: "Finance Dashboard",
        summary: "Monitor financial health with revenue, cost, and trend views."
      }
    ]
  },
  {
    icon: "👥",
    title: "Workforce & Payroll",
    description: "Manage teams and payroll operations with auditable records and employee access.",
    features: [
      {
        name: "Employee Directory",
        summary: "Maintain complete staff records and role assignments."
      },
      {
        name: "Payroll Run Management",
        summary: "Process salary runs with checks, controls, and status visibility."
      },
      {
        name: "Payslip Generation",
        summary: "Generate downloadable payslips for each payroll cycle."
      },
      {
        name: "Payslip Self-Service",
        summary: "Let employees securely access and download their own payslips."
      },
      {
        name: "Automated Pay Components",
        summary: "Apply recurring allowances, deductions, and loan repayments automatically."
      }
    ]
  },
  {
    icon: "🪙",
    title: "Loan Management",
    description: "Digitize loan workflows from employee requests to approvals and repayment visibility.",
    features: [
      {
        name: "Loan Applications",
        summary: "Collect employee loan requests through a guided digital flow."
      },
      {
        name: "Repayment Tracking",
        summary: "Track loan balances, schedules, and repayment progress."
      },
      {
        name: "Approval Workflow",
        summary: "Route loans through role-based approval and decision steps."
      }
    ]
  },
  {
    icon: "👤",
    title: "Employee Self-Service",
    description: "Give staff direct access to personal records, payroll, loan status, and guidance.",
    features: [
      {
        name: "My Profile",
        summary: "Employees can view and confirm their own profile details."
      },
      {
        name: "My Payslips",
        summary: "Access payroll history and payslip documents anytime."
      },
      {
        name: "My Loans",
        summary: "View loan applications, approvals, and repayment balance."
      },
      {
        name: "Help & Policy Guides",
        summary: "Access built-in guides and policy references without support tickets."
      }
    ]
  },
  {
    icon: "🔔",
    title: "Documents & Notifications",
    description: "Secure critical documents and keep teams informed on key operational actions.",
    features: [
      {
        name: "Secure Document Storage",
        summary: "Store sensitive records with controlled access and retrieval."
      },
      {
        name: "Employee Document Requests",
        summary: "Handle staff document requests from a central workflow."
      },
      {
        name: "In-App Notifications",
        summary: "Deliver timely updates and alerts directly inside the platform."
      }
    ]
  },
  {
    icon: "🔒",
    title: "Admin & Security",
    description: "Enforce governance, access controls, and accountability across the organization.",
    features: [
      {
        name: "Role-Based Access",
        summary: "Define role permissions and restrict data visibility by access level."
      },
      {
        name: "User Administration",
        summary: "Manage user accounts, permissions, and account status centrally."
      },
      {
        name: "Tenant Configuration",
        summary: "Configure organization-wide settings and operating rules."
      },
      {
        name: "Audit Trail",
        summary: "Track important system actions for compliance and accountability."
      }
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
    bestFor: "2,000–10,000 birds, multiple batches, owner + farm manager + accounts."
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
    bestFor: "10,000–50,000 birds, fast-growing farms, structured teams.",
    featured: true
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
    <main className="section-shell text-white">
      <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-24">
        <Reveal className="flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold tracking-tight text-brand-yellow sm:text-3xl">
            FlockPilot
          </p>
          <a
            href="#demo"
            onClick={() => trackLandingEvent("nav_launch_pilot_click")}
            className="rounded-full border border-brand-light/60 bg-brand-canvas px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-brand-yellow hover:text-brand-yellow"
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
            <p className="inline-flex items-center rounded-full border border-brand-light/50 bg-brand-canvas px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
              FlockPilot by Enro Agro Limited
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Real-time poultry operations and finance cockpit for profitable batches.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              FlockPilot tracks flock health, feed efficiency, and unit economics in one place so Nigerian poultry operators can catch losses early and run every cycle with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            </div>
          </motion.div>

          <motion.div variants={revealVariants}>
            <div className="rounded-[28px] border border-white/20 bg-brand-canvas p-5 shadow-panel backdrop-blur">
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
                    className="rounded-2xl border border-white/15 bg-[#223329] p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">{value}</p>
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

      <section className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal className="rounded-[26px] border border-white/20 bg-brand-canvas p-8 shadow-panel sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
            Problem to Solution
          </p>
          <div className="mt-7 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Nigerian poultry teams are forced to operate blind.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Manual records, delayed updates, and disconnected farm-finance tracking make it hard to detect mortality spikes, feed leakage, or poor batch margins before cash is already gone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                FlockPilot connects operations and money in real time.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                Owners and operators get one cockpit for flock performance, feed efficiency, sales, and unit economics, with alerts and approvals that tighten execution across every farm site.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="features"
        className="mx-auto max-w-[1600px] px-4 py-14 pb-20 sm:px-6 lg:px-10 lg:py-16 lg:pb-24"
      >
        <Reveal className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Powerful Features Built for Poultry Farms
          </h2>
          <p className="mt-2 text-sm text-white/75 sm:text-base">
            Everything you need to manage, analyze, and grow your farm operation.
          </p>
        </Reveal>
        <motion.div
          className="mt-12 space-y-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featureGroups.map((group) => (
            <motion.section key={group.title} variants={revealVariants}>
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden>
                  {group.icon}
                </span>
                <h3 className="text-2xl font-bold text-brand-yellow">{group.title}</h3>
              </div>
              <p className="mt-2 text-sm text-white/80">{group.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {group.features.map((item) => (
                  <motion.article
                    key={item.name}
                    whileHover={{ y: -4 }}
                    className="group rounded-xl p-[1px] bg-white/20 transition duration-300 hover:bg-gradient-to-r hover:from-brand-light hover:via-brand-yellow hover:to-brand-light"
                  >
                    <div className="h-full rounded-[11px] border border-transparent bg-[#223329] p-4 shadow-sm transition duration-300 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
                      <h4 className="text-sm font-bold text-white">{item.name}</h4>
                      <p className="mt-2 text-xs leading-5 text-white/70 sm:text-sm">
                        {item.summary}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </section>

      <section id="pricing" className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">Pricing</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Plans for every farm growth stage</h2>
            </div>
            <div className="inline-flex rounded-full border border-brand-light/60 bg-brand-canvas p-1.5 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-4 py-2 transition ${
                  billing === "monthly"
                    ? "bg-brand-deep text-white"
                    : "text-white/80 hover:text-white"
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
                    : "text-white/80 hover:text-white"
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
          {pricing.map((tier) => {
            return (
              <motion.article
                key={tier.name}
                variants={revealVariants}
                className="relative"
              >
                {tier.featured ? (
                  <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-light px-4 py-1 text-xs font-bold uppercase tracking-[0.08em] text-brand-deep">
                    Most Popular
                  </span>
                ) : null}
                <div
                className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
                  tier.featured
                    ? "border-white/20 bg-[#223329]"
                    : "border-white/20 bg-brand-canvas"
                }`}
              >
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/75">{tier.subtitle}</p>
                <p className="mt-4 text-xl font-bold text-brand-yellow">{tier.amount}</p>

                <div className="mt-4 flex flex-1 flex-col">
                  <a
                    href="#demo"
                    onClick={() =>
                      trackLandingEvent("pricing_tier_click", {
                        tier: tier.name,
                        billing
                      })
                    }
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
                            ? "border-white/15 bg-[#2b3f33]"
                            : "border-white/10 bg-[#223329]"
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
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/20 text-white">
                  <th className="px-3 py-3 font-semibold">Add-on</th>
                  <th className="px-3 py-3 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map(([name, price]) => (
                  <tr key={name} className="border-b border-white/15">
                    <td className="px-3 py-3 text-white/85">{name}</td>
                    <td className="px-3 py-3 font-semibold text-brand-yellow">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-10 rounded-2xl border border-white/20 bg-brand-canvas p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold text-brand-yellow">Frequently Asked Questions</h3>
          <div className="mt-5 space-y-3">
            {faqItems.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="rounded-xl border border-white/15 bg-[#223329]">
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

      <section id="demo" className="mx-auto w-full max-w-[620px] px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal className="rounded-[24px] border border-white/20 bg-brand-canvas p-6 shadow-panel sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">Request Demo</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Talk to the FlockPilot team</h2>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Share your farm context and we will schedule a guided walkthrough around your batch size, operational structure, and rollout timeline.
          </p>

          <form action={formAction} className="mt-7 grid gap-3.5 sm:grid-cols-2">
            <label className="text-sm font-medium text-white">
              Full Name
              <input
                name="fullName"
                type="text"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
              <FieldError error={state.errors?.fullName} />
            </label>
            <label className="text-sm font-medium text-white">
              Company/Farm Name
              <input
                name="companyName"
                type="text"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
              <FieldError error={state.errors?.companyName} />
            </label>
            <label className="text-sm font-medium text-white">
              Email
              <input
                name="email"
                type="email"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
              <FieldError error={state.errors?.email} />
            </label>
            <label className="text-sm font-medium text-white">
              Phone Number
              <input
                name="phoneNumber"
                type="tel"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
              />
              <FieldError error={state.errors?.phoneNumber} />
            </label>
            <label className="text-sm font-medium text-white sm:col-span-2">
              Number of Birds
              <select
                name="numberOfBirds"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
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
            <label className="text-sm font-medium text-white sm:col-span-2">
              Message
              <textarea
                name="message"
                rows={4}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#223329] px-3.5 py-2.5 text-sm leading-5 text-white outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
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
                  ? "border-brand-light/40 bg-brand-light/10 text-white"
                  : "border-brand-yellow/40 bg-brand-yellow/20 text-white"
              }`}
            >
              {state.message}
            </motion.div>
          ) : null}
        </Reveal>
      </section>

      <footer className="bg-brand-canvas text-white">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-brand-yellow">FlockPilot</p>
            <p className="mt-4 text-sm text-white/85">FlockPilot is a product of Enro Agro Limited.</p>
            <p className="mt-4 text-sm text-white/80">Lagos, Nigeria</p>
            <p className="mt-2 text-sm">
              <a href="mailto:info@enroagro.com" className="text-white/90 hover:text-brand-yellow">
                info@enroagro.com
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href="tel:+2348162420463" className="text-white/90 hover:text-brand-yellow">
                +2348162420463
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-yellow">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="#features" className="text-white/90 transition hover:text-brand-yellow">
                Features
              </a>
              <a href="#pricing" className="text-white/90 transition hover:text-brand-yellow">
                Pricing
              </a>
              <a href="#demo" className="text-white/90 transition hover:text-brand-yellow">
                Request Demo
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-yellow">Socials</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="https://x.com/enroagro" className="flex items-center gap-3 text-white/90 hover:text-brand-yellow">
                <X className="h-4 w-4" />
                <span>@enroagro</span>
              </a>
              <a
                href="https://instagram.com/enroagro"
                className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
              >
                <Instagram className="h-4 w-4" />
                <span>@enroagro</span>
              </a>
              <a href="https://facebook.com" className="flex items-center gap-3 text-white/90 hover:text-brand-yellow">
                <Facebook className="h-4 w-4" />
                <span>Enro Agro Limited</span>
              </a>
              <a href="https://linkedin.com" className="flex items-center gap-3 text-white/90 hover:text-brand-yellow">
                <Linkedin className="h-4 w-4" />
                <span>Enro Agro Limited</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="mx-auto max-w-[1600px] px-4 py-4 text-xs text-white/75 sm:px-6 lg:px-8">
            © 2026 Enro Agro Limited. All rights reserved. FlockPilot is a product of Enro Agro Limited.
          </div>
        </div>
      </footer>
    </main>
  );
}
