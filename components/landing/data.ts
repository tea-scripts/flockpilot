import { appSignupUrl } from '../../lib/config';

export type BillingCycle = "monthly" | "annual";

export type FeatureItem = {
  name: string;
  summary: string;
};

export type FeatureGroup = {
  icon: string;
  title: string;
  features: FeatureItem[];
};

export type PricingTier = {
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

export type Metric = {
  /** Pre-formatted fallback shown under reduced motion or for non-numeric values. */
  value: string;
  label: string;
  /** When set, the value animates up to this number. */
  to?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/* ─── Hero feature spotlights (3 large outcome-driven sections) ─── */

export const heroFeatures = [
  {
    badge: "Core Platform",
    title: "Know your cost per bird before the batch ends.",
    description:
      "Track flock health, feed consumption, mortality, medication, and sales in real time. FlockPilot connects your farm floor to your financial reports — so you catch margin leaks early, not after the cash is gone.",
    highlights: [
      "Live batch dashboards with FCR, mortality drift, and margin tracking",
      "Feed inventory with consumption alerts and supplier lot tracing",
      "Sales tracking by bird or by kg with automatic COGS posting",
      "Approval workflows for every farm event before it hits the books"
    ],
    visual: [
      ["Flock Health Index", "94.2% stable"],
      ["Feed Conversion", "1.85 avg FCR"],
      ["Mortality Drift", "-12% vs prior cycle"],
      ["Unit Margin", "+₦124 per bird"]
    ]
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
      "Role-based access across 12 roles — from farm staff to finance managers"
    ],
    visual: [
      ["Active Employees", "47 across 3 sites"],
      ["This Month Payroll", "₦8.2M processed"],
      ["Open Loans", "12 active, ₦2.4M"],
      ["Pending Approvals", "3 awaiting review"]
    ]
  },
  {
    badge: "New",
    title: "Ask your farm a question. Get answers instantly.",
    description:
      "FlockPilot AI is a built-in assistant that understands your context — the module you're in, the data you're looking at — and gives practical, specific advice about farm management, finance best practices, and operational workflows.",
    highlights: [
      "Context-aware — knows if you're in Farm Ops, Finance, Payroll, or HR",
      "Practical advice on feed management, mortality control, and batch economics",
      "Available on Growth (admins, 100 msgs/month) and Scale+ (all roles, 300/month)",
      "Enterprise gets unlimited AI messages with priority processing"
    ],
    visual: [
      ["AI Messages", "88 of 300 used"],
      ["Avg Response", "< 3 seconds"],
      ["Modules Covered", "Farm · Finance · HR"],
      ["Accuracy", "Context-aware prompts"]
    ]
  }
];

/* ─── Detailed feature grid (expandable) ─── */

export const detailedFeatures: FeatureGroup[] = [
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
      { name: "Approvals Queues", summary: "Centralized review and approval workflows." }
    ]
  },
  {
    icon: "📊",
    title: "Farm Intelligence",
    features: [
      { name: "Flight Deck", summary: "Live operational metrics and KPI trends in one cockpit." },
      { name: "Batch Profitability", summary: "Break down profitability and compare cycles." },
      { name: "Analytics Export", summary: "Export farm analytics for external analysis tools." }
    ]
  },
  {
    icon: "💰",
    title: "Finance & Accounting",
    features: [
      { name: "Expense Workflows", summary: "Submit and approve expenses with controlled review." },
      { name: "Financial Statements", summary: "P&L, balance sheet, trial balance, cash flow." },
      { name: "Finance Dashboard", summary: "Revenue, cost, and trend views at a glance." },
      { name: "Double-Entry Ledger", summary: "Full journal system with automatic postings." }
    ]
  },
  {
    icon: "👥",
    title: "Workforce & Payroll",
    features: [
      { name: "Employee Directory", summary: "Complete staff records and role assignments." },
      { name: "Payroll Runs", summary: "Process salary runs with checks and controls." },
      { name: "PDF Payslips", summary: "Generate and email downloadable payslips." },
      { name: "Self-Service Portal", summary: "Employees access payslips, loans, and profiles." },
      { name: "Automated Components", summary: "Recurring allowances, deductions, and loan repayments." }
    ]
  },
  {
    icon: "🪙",
    title: "Loans",
    features: [
      { name: "Loan Applications", summary: "Guided digital flow for employee loan requests." },
      { name: "Credit Scoring", summary: "Automated eligibility checks before approval." },
      { name: "Repayment Tracking", summary: "Balances, schedules, and settlement progress." }
    ]
  },
  {
    icon: "🤖",
    title: "AI Assistant",
    features: [
      { name: "FlockPilot AI Chat", summary: "Ask questions and get practical advice in-platform." },
      { name: "Module-Aware Responses", summary: "Tailored answers based on your current context." },
      { name: "Support Tickets", summary: "Submit help requests directly from the widget." }
    ]
  },
  {
    icon: "🔒",
    title: "Admin & Security",
    features: [
      { name: "Role-Based Access", summary: "12 roles with configurable permissions." },
      { name: "Audit Trail", summary: "Track system actions for compliance." },
      { name: "Multi-Tenant Isolation", summary: "Complete data separation between organizations." },
      { name: "Document Storage", summary: "Secure file storage with controlled access." },
      { name: "In-App Notifications", summary: "Timely alerts for approvals, events, and updates." }
    ]
  }
];

/* ─── Pricing ─── */

export const pricingTiers: PricingTier[] = [
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
    ctaHref: appSignupUrl('trial=1'),
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
    ctaHref: appSignupUrl('trial=1'),
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
    ctaHref: appSignupUrl('trial=1'),
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
    ctaHref: "mailto:info@flockpilot.com?subject=FlockPilot Enterprise Inquiry",
    bestFor: "50,000+ birds, multiple companies/tenants, compliance-heavy operations."
  }
];

export const faqItems = [
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
    answer: "Yes. FlockPilot supports mixed-mode sales with unit-aware analytics and alerts."
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
    answer: "Yes - 14-day pilot access on Starter, restricted to 1 batch and 2 users."
  },
  {
    question: "What is the AI Assistant?",
    answer:
      "FlockPilot AI is a built-in chat assistant that answers questions about farm management, finance, payroll, and operations. It's context-aware — it knows which module you're working in. Available on Growth (admins/managers, 100 msgs/month) and Scale+ (all roles, 300 msgs/month). Enterprise gets unlimited."
  }
];

export const addOns = [
  ["Onboarding & Setup (Starter/Growth)", "₦150,000 one-time"],
  ["Onboarding & Setup (Scale)", "₦350,000 one-time"],
  ["WhatsApp/SMS Alerts Pack", "₦10,000/month (up to 1,000 messages)"],
  ["Extra Farm Site", "₦15,000/month per site"],
  ["Additional AI Messages (100 pack)", "₦5,000/month"]
] as const;

/* ─── Social proof metrics ─── */

export const metrics: Metric[] = [
  { value: "50,000+", label: "Birds tracked", to: 50000, suffix: "+" },
  { value: "16", label: "Modules built", to: 16 },
  { value: "99.9%", label: "Uptime", to: 99.9, decimals: 1, suffix: "%" },
  { value: "< 3s", label: "AI response time" }
];
