import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Enro Agro Limited",
  description:
    "FlockPilot is built by Enro Agro Limited, a Lagos-based agricultural technology company. We build software that helps poultry farmers in Nigeria and Africa run more profitable operations.",
  alternates: { canonical: "https://flockpilot.com/about" },
  openGraph: {
    title: "About FlockPilot — Built by Enro Agro Limited",
    description:
      "Lagos-based AgTech company building software for poultry farmers across Nigeria and Africa.",
    url: "https://flockpilot.com/about",
  },
};

export default function AboutPage() {
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
            <Link href="/ai-assistant" className="hover:text-white">AI Assistant</Link>
            <Link href="/about" className="text-brand-light">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Built for poultry farmers, <span className="text-brand-light">by people who understand the business.</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70">
            FlockPilot is built by Enro Agro Limited, a Lagos-based agricultural technology company. We saw firsthand how poultry farmers in Nigeria manage operations — spreadsheets for feed tracking, WhatsApp groups for approvals, separate apps for accounting, and no clear view of whether a batch was actually profitable until it was too late.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">Our mission</h2>
          <p className="text-lg leading-relaxed text-white/70">
            Give every poultry farmer the operational visibility and financial control that was previously only available to large integrators with custom-built systems. FlockPilot puts the same level of real-time insight into the hands of a 2,000-bird farm as a 50,000-bird operation.
          </p>
        </div>
      </section>

      {/* Why FlockPilot */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold">Why we built FlockPilot</h2>
          <div className="space-y-6 text-white/70">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-2 font-bold text-white">Poultry-specific, not generic</h3>
              <p>
                Generic ERPs and accounting tools don&#39;t understand flock batches, feed conversion ratios, mortality drift, or per-bird unit economics. FlockPilot does — these concepts are built into the core, not bolted on as custom fields.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-2 font-bold text-white">Everything in one place</h3>
              <p>
                Farm ops, finance, payroll, HR, loans, and now AI — all sharing one source of truth. When a sales event is recorded, the journal entries post automatically. When payroll runs, loan repayments deduct automatically. No re-keying, no reconciliation headaches.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-2 font-bold text-white">Built for Nigeria</h3>
              <p>
                Naira pricing, Nigerian tax calculations (PAYE, pension, NHF), and operational conventions that match how Nigerian poultry farms actually run. We&#39;re not a foreign tool trying to fit into the local market — we started here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold">Get in touch</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-3 font-bold">Contact</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <span className="text-white/40">Email:</span>{" "}
                  <a href="mailto:info@enroagro.com" className="text-brand-light hover:underline">
                    info@enroagro.com
                  </a>
                </li>
                <li>
                  <span className="text-white/40">Phone:</span>{" "}
                  <a href="tel:+2348162420463" className="text-brand-light hover:underline">
                    +234 816 242 0463
                  </a>
                </li>
                <li>
                  <span className="text-white/40">Location:</span> Lagos, Nigeria
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-3 font-bold">Follow us</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a
                    href="https://x.com/enroagro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-light hover:underline"
                  >
                    X (Twitter) — @enroagro
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/enroagro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-light hover:underline"
                  >
                    Instagram — @enroagro
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mb-6 text-white/60">
          See FlockPilot in action with a personalized demo of your farm setup.
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
