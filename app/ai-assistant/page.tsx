import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Assistant — Context-Aware Chat for Poultry Farmers",
  description:
    "FlockPilot AI is a built-in chat assistant powered by Claude that understands your farm data. Ask about feed conversion, mortality trends, financial reports, and get instant, practical answers.",
  alternates: { canonical: "https://flockpilot.enroagro.com/ai-assistant" },
  openGraph: {
    title: "FlockPilot AI Assistant — Ask Your Farm a Question",
    description:
      "Built-in AI chat that understands your poultry operation. Context-aware answers about farm ops, finance, payroll, and more.",
    url: "https://flockpilot.enroagro.com/ai-assistant",
  },
};

const examples = [
  {
    question: "My FCR is 2.1 on the current batch — is that good?",
    context: "Farm Operations",
    answer:
      "An FCR of 2.1 is slightly above the typical target of 1.7–1.9 for broilers at market weight. Check for feed wastage from feeder height/type, water quality issues affecting intake, or whether the flock age has passed optimal harvest window.",
  },
  {
    question: "What does my P&L look like this month?",
    context: "Finance",
    answer:
      "I can see your March P&L shows ₦4.2M revenue from bird sales against ₦3.1M in direct costs. Your gross margin is 26%, which is slightly below last month's 29%. The main driver is a ₦180K increase in feed costs — worth reviewing your feed supplier pricing.",
  },
  {
    question: "One of my workers wants a loan but already has one active. What are the rules?",
    context: "HR / Loans",
    answer:
      "FlockPilot enforces a one-active-loan policy. The employee must fully repay their current loan before applying for a new one. You can check their repayment progress in the Loans module under their employee profile.",
  },
  {
    question: "Mortality spiked to 3.2% this week. What should I check?",
    context: "Farm Operations",
    answer:
      "A 3.2% weekly mortality rate is above the typical 0.5–1% threshold. Investigate: (1) water quality — check TDS and chlorine levels, (2) ventilation — ammonia buildup in enclosed houses, (3) disease — look for respiratory symptoms or lesions, (4) feed — any recent batch change from the supplier?",
  },
];

const tiers = [
  {
    plan: "Starter",
    access: "Not available",
    messages: "—",
    roles: "—",
    note: "Upgrade to Growth to unlock AI",
  },
  {
    plan: "Growth",
    access: "Admin roles only",
    messages: "100/month",
    roles: "Super Admin, Admin, HR Admin, Finance Manager, Farm Manager",
    note: null,
  },
  {
    plan: "Scale",
    access: "All roles",
    messages: "300/month",
    roles: "All 12 roles",
    note: null,
  },
  {
    plan: "Enterprise",
    access: "All roles",
    messages: "Unlimited",
    roles: "All 12 roles",
    note: "Priority processing",
  },
];

export default function AiAssistantPage() {
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
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="/ai-assistant" className="text-brand-light">AI Assistant</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-brand-light/20 px-4 py-1.5 text-sm font-semibold text-brand-light">
            New Feature
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Ask your farm a question. <span className="text-brand-light">Get answers instantly.</span>
          </h1>
          <p className="text-lg text-white/70">
            FlockPilot AI is a built-in chat assistant powered by Claude that understands your farm context — the module you&#39;re in, the data you&#39;re looking at — and gives practical, specific advice.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Open the chat widget",
                description:
                  "Click the chat icon in any module. The AI sees which module you're in — Farm Ops, Finance, Payroll, or HR.",
              },
              {
                step: "2",
                title: "Ask a question",
                description:
                  "Type a question in plain English. Ask about feed ratios, financial reports, payroll rules, or operational best practices.",
              },
              {
                step: "3",
                title: "Get a practical answer",
                description:
                  "Receive a context-aware response streamed in real time, with markdown formatting for easy reading.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light/20 text-lg font-bold text-brand-light">
                  {s.step}
                </div>
                <h3 className="mb-2 font-bold">{s.title}</h3>
                <p className="text-sm text-white/60">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example conversations */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center text-2xl font-bold">Example conversations</h2>
          <div className="space-y-6">
            {examples.map((ex) => (
              <div
                key={ex.question}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="mb-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                  {ex.context}
                </span>
                <p className="mb-3 font-semibold text-white/90">
                  &ldquo;{ex.question}&rdquo;
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  {ex.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier access */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold">AI access by plan</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-3 pr-6 font-medium">Plan</th>
                  <th className="pb-3 pr-6 font-medium">Access</th>
                  <th className="pb-3 pr-6 font-medium">Messages/month</th>
                  <th className="pb-3 font-medium">Eligible roles</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr
                    key={t.plan}
                    className="border-b border-white/5"
                  >
                    <td className="py-3 pr-6 font-semibold">{t.plan}</td>
                    <td className="py-3 pr-6 text-white/70">{t.access}</td>
                    <td className="py-3 pr-6 text-white/70">{t.messages}</td>
                    <td className="py-3 text-white/70">{t.roles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-white/40">
            Need more messages? Add a 100-message pack for ₦5,000/month.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Try FlockPilot AI</h2>
        <p className="mb-6 text-white/60">
          Available on Growth plans and above. Start with a demo to see it in action.
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
