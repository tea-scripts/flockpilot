import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features — 30+ Poultry Farm Management Modules",
  description:
    "FlockPilot includes farm operations, feed tracking, mortality analysis, double-entry accounting, payroll, employee loans, AI assistant, and 30+ more modules built for poultry farmers in Nigeria.",
  alternates: { canonical: "https://flockpilot.enroagro.com/features" },
  openGraph: {
    title: "FlockPilot Features — 30+ Poultry Farm Management Modules",
    description:
      "Farm ops, feed tracking, financials, payroll, HR, loans, AI assistant — everything a poultry farm needs in one platform.",
    url: "https://flockpilot.enroagro.com/features",
  },
};

const modules = [
  {
    icon: "🚜",
    title: "Farm Operations",
    description:
      "Track flock batches, farm sites, buildings, and production cycles. Full lifecycle management from placement to sale.",
    features: [
      "Flock batch management with live bird counts",
      "Multi-site and multi-building tracking",
      "Sales events by bird count or by weight (kg)",
      "Approval workflows for every farm event",
      "Automatic COGS posting on sales",
    ],
  },
  {
    icon: "🌾",
    title: "Feed Management",
    description:
      "Monitor feed inventory, consumption, and efficiency. Catch feed waste before it eats your margins.",
    features: [
      "Feed stock levels with safety alerts",
      "Daily consumption recording per batch",
      "Automatic FCR (Feed Conversion Ratio) calculation",
      "Supplier lot tracing on deliveries",
      "Feed receipt journal posting",
    ],
  },
  {
    icon: "📉",
    title: "Mortality & Health Tracking",
    description:
      "Record mortality events with cause analysis. Spot abnormal patterns early and protect your flock.",
    features: [
      "Mortality recording with cause categorization",
      "Mortality drift comparison vs prior cycles",
      "Flock Health Index dashboard",
      "Medication administration tracking",
      "Withdrawal period monitoring",
    ],
  },
  {
    icon: "📊",
    title: "Farm Intelligence (Flight Deck)",
    description:
      "A live operational cockpit showing the KPIs that matter. Know your cost per bird before the batch ends.",
    features: [
      "Real-time FCR, mortality, and margin metrics",
      "Batch profitability breakdown",
      "Multi-batch comparison across cycles",
      "Trend charts and threshold alerts",
      "CSV and analytics export",
    ],
  },
  {
    icon: "💰",
    title: "Finance & Accounting",
    description:
      "Full double-entry accounting built for poultry operations. Every farm event posts to the ledger automatically.",
    features: [
      "Double-entry journal system",
      "Chart of accounts with versioning",
      "Accounts payable (draft → approve → pay)",
      "P&L, balance sheet, trial balance, cash flow",
      "Expense categorization and cost center tracking",
    ],
  },
  {
    icon: "👥",
    title: "Payroll & HR",
    description:
      "Process payroll, generate PDF payslips, manage employees, and handle Nigerian tax/pension/NHF deductions.",
    features: [
      "Monthly payroll runs with automated deductions",
      "PDF payslip generation and email delivery",
      "Employee directory with salary history",
      "Self-service portal for staff",
      "Department and role management",
    ],
  },
  {
    icon: "🪙",
    title: "Employee Loans",
    description:
      "Digital loan applications with credit scoring, automatic payroll deductions, and repayment tracking.",
    features: [
      "Guided loan application flow",
      "Automated credit scoring and eligibility",
      "One-active-loan enforcement",
      "Payroll-integrated repayments",
      "Treasury journal integration",
    ],
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    description:
      "Built-in AI chat powered by Claude that understands your farm context and gives practical, specific advice.",
    features: [
      "Context-aware — knows your current module",
      "Feed optimization and mortality advice",
      "Financial report explanations in plain English",
      "Support ticket submission from chat",
      "Tier-based access with monthly quotas",
    ],
  },
  {
    icon: "🔒",
    title: "Admin & Security",
    description:
      "Enterprise-grade access control, audit trails, and complete multi-tenant data isolation.",
    features: [
      "12 built-in roles with configurable permissions",
      "Multi-tenant isolation — complete data separation",
      "Audit trail for compliance",
      "In-app notifications and alerts",
      "Secure document storage",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-brand-deep text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-light">
            FlockPilot
          </Link>
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/features" className="text-brand-light">Features</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/ai-assistant" className="hover:text-white">AI Assistant</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            30+ modules built for <span className="text-brand-light">poultry farms</span>
          </h1>
          <p className="text-lg text-white/70">
            From flock batch tracking to double-entry accounting, payroll to AI-powered insights — FlockPilot replaces your spreadsheets, WhatsApp groups, and disconnected tools with one integrated platform.
          </p>
        </div>
      </section>

      {/* Module grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <article
              key={mod.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-3 text-3xl">{mod.icon}</div>
              <h2 className="mb-2 text-xl font-bold">{mod.title}</h2>
              <p className="mb-4 text-sm text-white/60">{mod.description}</p>
              <ul className="space-y-1.5 text-sm text-white/80">
                {mod.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 text-brand-light">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to try FlockPilot?</h2>
        <p className="mb-6 text-white/60">
          Start with a 14-day pilot on Starter. No credit card required.
        </p>
        <Link
          href="/#demo"
          className="inline-block rounded-xl bg-brand-light px-8 py-3 font-semibold text-brand-deep transition hover:opacity-90"
        >
          Request a Demo
        </Link>
      </section>
    </main>
  );
}
