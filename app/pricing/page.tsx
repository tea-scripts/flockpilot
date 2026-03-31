import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Plans from ₦25,000/month",
  description:
    "FlockPilot pricing: Starter ₦25,000/mo (2,000 birds), Growth ₦50,000/mo (10,000 birds), Scale ₦120,000/mo (50,000 birds). 15% off annual billing. AI assistant included on Growth and above.",
  alternates: { canonical: "https://flockpilot.com/pricing" },
  openGraph: {
    title: "FlockPilot Pricing — Poultry Farm ERP from ₦25,000/month",
    description:
      "Transparent pricing for Nigerian poultry farmers. Starter, Growth, Scale, and Enterprise plans. 15% off annual billing.",
    url: "https://flockpilot.com/pricing",
  },
};

const tiers = [
  {
    name: "Starter",
    price: "₦25,000",
    annual: "₦255,000/yr (save 15%)",
    birds: "2,000",
    sites: "1",
    users: "3",
    bestFor: "Small farms getting structured for the first time",
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      "Batch analytics (KPIs, trends)",
      "Mortality + medication logging",
      "Sales tracking (bird or kg)",
      "Feed inventory management",
      "Basic alerts",
      "CSV export",
      "Email support",
    ],
    excluded: ["Flight Deck", "Financial statements", "AI Assistant", "Multi-batch comparisons"],
  },
  {
    name: "Growth",
    price: "₦50,000",
    annual: "₦510,000/yr (save 15%)",
    birds: "10,000",
    sites: "3",
    users: "10",
    bestFor: "Farms running consistent cycles and managing costs",
    featured: true,
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      "Everything in Starter, plus:",
      "Flight Deck (live ops cockpit)",
      "Financial statements (P&L, balance sheet)",
      "Expense categorization",
      "Role-based access (Ops vs Finance)",
      "Drill-down reporting",
      "AI Assistant (100 messages/month)",
      "Advanced alerts (mortality, feed gaps, margins)",
    ],
    excluded: ["Multi-batch comparisons", "Priority support"],
  },
  {
    name: "Scale",
    price: "₦120,000",
    annual: "₦1,224,000/yr (save 15%)",
    birds: "50,000",
    sites: "10",
    users: "30",
    bestFor: "Multi-site operations that need control and accountability",
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      "Everything in Growth, plus:",
      "Multi-batch comparisons",
      "Audit logs + approval workflows",
      "Custom thresholds per farm site",
      "AI Assistant (300 messages/month, all roles)",
      "Priority support (business hours)",
      "Dedicated onboarding session",
    ],
    excluded: [],
  },
  {
    name: "Enterprise",
    price: "Custom",
    annual: "Custom",
    birds: "Unlimited",
    sites: "Unlimited",
    users: "Unlimited",
    bestFor: "Large operators, integrators, and farm groups",
    cta: "Contact Sales",
    ctaHref: "mailto:info@enroagro.com?subject=FlockPilot Enterprise Inquiry",
    features: [
      "Everything in Scale, plus:",
      "Unlimited AI messages",
      "SLA + dedicated support channel",
      "Custom integrations (ERP, accounting, IoT)",
      "Custom reporting + data warehouse exports",
      "Onsite onboarding available",
    ],
    excluded: [],
  },
];

const addOns = [
  { name: "Onboarding & Setup (Starter/Growth)", price: "₦150,000 one-time" },
  { name: "Onboarding & Setup (Scale)", price: "₦350,000 one-time" },
  { name: "WhatsApp/SMS Alerts Pack", price: "₦10,000/month (1,000 messages)" },
  { name: "Extra Farm Site", price: "₦15,000/month per site" },
  { name: "Additional AI Messages (100 pack)", price: "₦5,000/month" },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-brand-deep text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-light">
            FlockPilot
          </Link>
          <div className="flex gap-6 text-sm text-white/70">
            <Link href="/features" className="hover:text-white">Features</Link>
            <Link href="/pricing" className="text-brand-light">Pricing</Link>
            <Link href="/ai-assistant" className="hover:text-white">AI Assistant</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Simple, transparent <span className="text-brand-light">pricing</span>
          </h1>
          <p className="text-lg text-white/70">
            Pay for what you need. Start small and scale as your farm grows. Annual billing saves 15%.
          </p>
          <div className="mt-6">
            <Link
              href="/signup?trial=1"
              className="rounded-xl border border-brand-light/40 px-6 py-2.5 text-sm font-semibold text-brand-light transition hover:bg-brand-light/10"
            >
              Or start with a 14-day free trial
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                tier.featured
                  ? "border-brand-light bg-brand-light/5"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {tier.featured && (
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-light/20 px-3 py-1 text-xs font-semibold text-brand-light">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-bold">{tier.name}</h2>
              <p className="mt-1 text-sm text-white/50">{tier.bestFor}</p>

              <div className="mt-4 mb-1">
                <span className="text-3xl font-extrabold">{tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="text-sm text-white/50">/month</span>
                )}
              </div>
              {tier.annual !== "Custom" && (
                <p className="mb-4 text-xs text-brand-light">{tier.annual}</p>
              )}

              <div className="mb-4 flex gap-4 text-xs text-white/60">
                <span>{tier.birds} birds</span>
                <span>{tier.sites} site{tier.sites !== "1" ? "s" : ""}</span>
                <span>{tier.users} user{tier.users !== "1" ? "s" : ""}</span>
              </div>

              <ul className="mb-6 flex-1 space-y-2 text-sm text-white/80">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 text-brand-light">✓</span>
                    {f}
                  </li>
                ))}
                {tier.excluded.map((f) => (
                  <li key={f} className="flex gap-2 text-white/30">
                    <span className="mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`mt-auto block rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition ${
                  tier.featured
                    ? "bg-brand-light text-brand-deep hover:opacity-90"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">Add-ons</h2>
          <div className="space-y-3">
            {addOns.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm"
              >
                <span className="text-white/80">{a.name}</span>
                <span className="font-semibold text-brand-light">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Questions?</h2>
        <p className="mb-6 text-white/60">
          Check our FAQ on the home page or reach out directly.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/#faq"
            className="rounded-xl border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View FAQ
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-brand-light px-6 py-2.5 text-sm font-semibold text-brand-deep transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
