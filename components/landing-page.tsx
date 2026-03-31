"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion, type Variants } from "framer-motion";
import { Facebook, Instagram, X, ChevronDown } from "lucide-react";
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
  features: FeatureItem[];
};

type PricingTier = {
  name: string;
  monthly: string;
  annual: string;
  subtitle: string;
  features: string[];
  cta: string;
  ctaHref: string;
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

/* ─── Hero Features (3 large outcome-driven sections) ─── */

const heroFeatures = [
  {
    badge: "Core Platform",
    title: "Know your cost per bird before the batch ends.",
    description:
      "Track flock health, feed consumption, mortality, medication, and sales in real time. FlockPilot connects your farm floor to your financial reports — so you catch margin leaks early, not after the cash is gone.",
    highlights: [
      "Live batch dashboards with FCR, mortality drift, and margin tracking",
      "Feed inventory with consumption alerts and supplier lot tracing",
      "Sales tracking by bird or by kg with automatic COGS posting",
      "Approval workflows for every farm event before it hits the books",
    ],
    visual: [
      ["Flock Health Index", "94.2% stable"],
      ["Feed Conversion", "1.85 avg FCR"],
      ["Mortality Drift", "-12% vs prior cycle"],
      ["Unit Margin", "+₦124 per bird"],
    ],
  },
  {
    badge: "Full ERP",
    title: "Finance, payroll, and HR — built in, not bolted on.",
    description:
      "Stop juggling spreadsheets for payroll, separate apps for accounting, and WhatsApp threads for HR. FlockPilot has double-entry ledger accounting, automated payroll with PDF payslips, employee loans with credit scoring, and document management — all sharing one source of truth.",
    highlights: [
      "Double-entry journal system with P&L, balance sheet, and cash flow",
      "Payroll runs with automated deductions, allowances, and email payslips",
      "Employee loan applications with eligibility scoring and repayment tracking",
      "Role-based access across 12 roles — from farm staff to finance managers",
    ],
    visual: [
      ["Active Employees", "47 across 3 sites"],
      ["This Month Payroll", "₦8.2M processed"],
      ["Open Loans", "12 active, ₦2.4M"],
      ["Pending Approvals", "3 awaiting review"],
    ],
  },
  {
    badge: "New",
    title: "Ask your farm a question. Get answers instantly.",
    description:
      "FlockPilot AI is a built-in assistant that understands your context — the module you're in, the data you're looking at — and gives practical, specific advice about poultry management, finance best practices, and operational workflows.",
    highlights: [
      "Context-aware — knows if you're in Farm Ops, Finance, Payroll, or HR",
      "Practical advice on feed management, mortality control, and batch economics",
      "Available on Growth (admins, 100 msgs/month) and Scale+ (all roles, 300/month)",
      "Enterprise gets unlimited AI messages with priority processing",
    ],
    visual: [
      ["AI Messages", "88 of 300 used"],
      ["Avg Response", "< 3 seconds"],
      ["Modules Covered", "Farm · Finance · HR"],
      ["Accuracy", "Context-aware prompts"],
    ],
  },
];

/* ─── Detailed feature grid (expandable) ─── */

const detailedFeatures: FeatureGroup[] = [
  {
    icon: "🚜",
    title: "Farm Operations",
    features: [
      { name: "Farm Site Management", summary: "Track multiple farm sites, buildings, and resources." },
      { name: "Batch Management", summary: "Create, monitor, and manage production batches." },
      { name: "Sales Event Management", summary: "Process sales and capture customer-level records." },
      { name: "Feed Inventory", summary: "Monitor feed stock levels, usage, and movement." },
      { name: "Mortality Tracking", summary: "Record and analyze mortality events with context." },
      { name: "Medication Cost Tracking", summary: "Track medication usage and approved costs." },
      { name: "Approvals Queues", summary: "Centralized review and approval workflows." },
    ],
  },
  {
    icon: "📊",
    title: "Farm Intelligence",
    features: [
      { name: "Flight Deck", summary: "Live operational metrics and KPI trends in one cockpit." },
      { name: "Batch Profitability", summary: "Break down profitability and compare cycles." },
      { name: "Analytics Export", summary: "Export farm analytics for external analysis tools." },
    ],
  },
  {
    icon: "💰",
    title: "Finance & Accounting",
    features: [
      { name: "Expense Workflows", summary: "Submit and approve expenses with controlled review." },
      { name: "Financial Statements", summary: "P&L, balance sheet, trial balance, cash flow." },
      { name: "Finance Dashboard", summary: "Revenue, cost, and trend views at a glance." },
      { name: "Double-Entry Ledger", summary: "Full journal system with automatic postings." },
    ],
  },
  {
    icon: "👥",
    title: "Workforce & Payroll",
    features: [
      { name: "Employee Directory", summary: "Complete staff records and role assignments." },
      { name: "Payroll Runs", summary: "Process salary runs with checks and controls." },
      { name: "PDF Payslips", summary: "Generate and email downloadable payslips." },
      { name: "Self-Service Portal", summary: "Employees access payslips, loans, and profiles." },
      { name: "Automated Components", summary: "Recurring allowances, deductions, and loan repayments." },
    ],
  },
  {
    icon: "🪙",
    title: "Loans",
    features: [
      { name: "Loan Applications", summary: "Guided digital flow for employee loan requests." },
      { name: "Credit Scoring", summary: "Automated eligibility checks before approval." },
      { name: "Repayment Tracking", summary: "Balances, schedules, and settlement progress." },
    ],
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    features: [
      { name: "FlockPilot AI Chat", summary: "Ask questions and get practical advice in-platform." },
      { name: "Module-Aware Responses", summary: "Tailored answers based on your current context." },
      { name: "Support Tickets", summary: "Submit help requests directly from the widget." },
    ],
  },
  {
    icon: "🔒",
    title: "Admin & Security",
    features: [
      { name: "Role-Based Access", summary: "12 roles with configurable permissions." },
      { name: "Audit Trail", summary: "Track system actions for compliance." },
      { name: "Multi-Tenant Isolation", summary: "Complete data separation between organizations." },
      { name: "Document Storage", summary: "Secure file storage with controlled access." },
      { name: "In-App Notifications", summary: "Timely alerts for approvals, events, and updates." },
    ],
  },
];

/* ─── Pricing ─── */

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
      "Exports (CSV)",
      "Email support"
    ],
    cta: "Get Started Free",
    ctaHref: "/signup",
    bestFor: "500–2,000 birds, first-time structured tracking."
  },
  {
    name: "Growth",
    monthly: "₦50,000/month",
    annual: "₦510,000/year",
    subtitle: "For farms running consistent cycles and managing costs.",
    features: [
      "Up to 10,000 active birds",
      "Up to 3 farm sites",
      "Up to 10 users",
      "Flight Deck (Farm Ops Cockpit)",
      "Advanced alerts (mortality, feed gaps, early sales, margin warnings)",
      "Expense buckets (Feed/Labor/Vet/Utilities/Transport/Other)",
      "Role-based access (Ops vs Finance views)",
      "Drill-down reporting",
      "AI Assistant (100 messages/month)",
      "Financial statements (P&L, balance sheet)"
    ],
    cta: "Get Started",
    ctaHref: "/signup",
    bestFor: "2,000–10,000 birds, multiple batches, owner + farm manager + accounts."
  },
  {
    name: "Scale",
    monthly: "₦120,000/month",
    annual: "₦1,224,000/year",
    subtitle: "For multi-site operations that need control and accountability.",
    features: [
      "Up to 50,000 active birds",
      "Up to 10 farm sites",
      "Up to 30 users",
      "Everything in Growth, plus:",
      "Multi-batch comparisons (performance and profitability)",
      "Audit logs + approvals workflow",
      "Custom thresholds per farm site",
      "AI Assistant (300 messages/month, all roles)",
      "Priority support (business hours)",
      "Dedicated onboarding session"
    ],
    cta: "Get Started",
    ctaHref: "/signup",
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
      "Unlimited AI Assistant messages",
      "SLA + dedicated support channel",
      "Custom integrations (ERP, accounting, IoT, inventory)",
      "Custom reporting + data warehouse exports",
      "Onsite onboarding available"
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:info@enroagro.com?subject=FlockPilot Enterprise Inquiry",
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
  },
  {
    question: "What is the AI Assistant?",
    answer:
      "FlockPilot AI is a built-in chat assistant that answers questions about farm management, finance, payroll, and operations. It's context-aware — it knows which module you're working in. Available on Growth (admins/managers, 100 msgs/month) and Scale+ (all roles, 300 msgs/month). Enterprise gets unlimited."
  }
];

const addOns = [
  ["Onboarding & Setup (Starter/Growth)", "₦150,000 one-time"],
  ["Onboarding & Setup (Scale)", "₦350,000 one-time"],
  ["WhatsApp/SMS Alerts Pack", "₦10,000/month (up to 1,000 messages)"],
  ["Extra Farm Site", "₦15,000/month per site"],
  ["Additional AI Messages (100 pack)", "₦5,000/month"]
] as const;

/* ─── Social proof metrics ─── */

const metrics = [
  { value: "50,000+", label: "Birds tracked" },
  { value: "16", label: "Modules built" },
  { value: "99.9%", label: "Uptime" },
  { value: "< 3s", label: "AI response time" },
];

/* ─── Utility components ─── */

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

/* ─── Main component ─── */

export function LandingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [state, formAction] = useActionState(requestDemoAction, initialState);
  const hasTrackedSuccess = useRef(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* ─── Navigation ─── */}
      <section className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Reveal className="flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold tracking-tight text-brand-yellow sm:text-3xl">
            FlockPilot
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#features"
              className="hidden text-sm font-medium text-white/80 transition hover:text-white sm:inline"
            >
              Features
            </a>
            <a
              href="/pricing"
              className="hidden text-sm font-medium text-white/80 transition hover:text-white sm:inline"
            >
              Pricing
            </a>
            <a
              href="#demo"
              onClick={() => trackLandingEvent("nav_launch_pilot_click")}
              className="rounded-full border border-brand-light/60 bg-brand-canvas px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-sm transition hover:border-brand-yellow hover:text-brand-yellow"
            >
              Launch Your Pilot
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={revealVariants}
            className="inline-flex items-center rounded-full border border-brand-light/50 bg-brand-canvas px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow"
          >
            FlockPilot by Enro Agro Limited
          </motion.p>
          <motion.h1
            variants={revealVariants}
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            The operating system for
            <span className="text-brand-yellow"> profitable poultry farms</span>
          </motion.h1>
          <motion.p
            variants={revealVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg"
          >
            Farm ops, finance, payroll, HR, and AI — in one platform. Built for Nigerian poultry operators who want to stop guessing and start knowing.
          </motion.p>
          <motion.div variants={revealVariants} className="mt-8 flex flex-wrap justify-center gap-3">
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
      </section>

      {/* ─── Social Proof Bar ─── */}
      <section className="border-y border-white/10 bg-brand-canvas/50 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 gap-4 py-8 sm:grid-cols-4 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {metrics.map((m) => (
              <motion.div key={m.label} variants={revealVariants} className="text-center">
                <p className="text-2xl font-bold text-brand-yellow sm:text-3xl">{m.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-white/60">{m.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Problem → Solution ─── */}
      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="rounded-[26px] border border-white/20 bg-brand-canvas p-8 shadow-panel sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">
            The Problem
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

      {/* ─── Hero Features (3 large outcome-driven sections) ─── */}
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
            <motion.div variants={revealVariants} className={idx % 2 === 1 ? "lg:[direction:ltr]" : ""}>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${
                feature.badge === "New"
                  ? "bg-brand-yellow/20 text-brand-yellow"
                  : "bg-brand-light/15 text-brand-light"
              }`}>
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
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light/20 text-xs text-brand-light">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={revealVariants} className={idx % 2 === 1 ? "lg:[direction:ltr]" : ""}>
              <div className="rounded-[24px] border border-white/15 bg-brand-canvas p-5 shadow-panel">
                <div className="grid gap-3 sm:grid-cols-2">
                  {feature.visual.map(([label, value]) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="rounded-2xl border border-white/12 bg-[#223329] p-4"
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

      {/* ─── Full Feature Grid (expandable) ─── */}
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
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-10"
          >
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {detailedFeatures.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/15 bg-brand-canvas p-5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden>{group.icon}</span>
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

      {/* ─── Pricing ─── */}
      <section id="pricing" className="mx-auto max-w-[1600px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-yellow">Pricing</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Plans for every farm growth stage</h2>
              <a href="/signup?trial=1" className="mt-3 inline-block text-sm font-medium text-brand-light transition hover:text-brand-yellow">
                Or start with a 14-day free trial &rarr;
              </a>
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
                  "border-white/20 bg-brand-canvas"
                }`}
              >
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-white/75">{tier.subtitle}</p>
                <p className="mt-4 text-xl font-bold text-brand-yellow">{tier.amount}</p>

                <div className="mt-4 flex flex-1 flex-col">
                  <a
                    href={tier.ctaHref}
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

      {/* ─── Demo Form ─── */}
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
            <div className="sm:col-span-2 text-center">
              <span className="text-xs text-white/40">or</span>
            </div>
            <a
              href="https://wa.me/2348162420463"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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

      {/* ─── Trusted By ─── */}
      <section className="border-t border-white/10 bg-brand-deep px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Trusted by farms across Nigeria
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
            <img
              src="/enro-logo.png"
              alt="Enro Agro Limited"
              className="h-16 w-auto opacity-90"
            />
          </div>
          <p className="mt-8 text-sm text-white/50">
            More farms joining every month. Your farm could be next.
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
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
            <p className="mt-2 text-sm">
              <a
                href="https://wa.me/2348162420463"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/90 hover:text-brand-yellow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>Chat on WhatsApp</span>
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
              <a
                href="https://x.com/enroagro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Enro Agro on X"
                className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
              >
                <X className="h-4 w-4" />
                <span>@enroagro</span>
              </a>
              <a
                href="https://instagram.com/enroagro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Enro Agro on Instagram"
                className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
              >
                <Instagram className="h-4 w-4" />
                <span>@enroagro</span>
              </a>
              <a
                href="https://facebook.com/EnroAgro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Enro Agro on Facebook"
                className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
              >
                <Facebook className="h-4 w-4" />
                <span>Enro Agro</span>
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

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-brand-canvas/90 text-white shadow-lg backdrop-blur transition hover:bg-brand-light/20 hover:text-brand-light"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </main>
  );
}
