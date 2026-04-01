import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Your Account — FlockPilot",
  description:
    "Request deletion of your FlockPilot account and associated data. Learn what data is deleted, what is retained, and how to submit your request.",
  alternates: { canonical: "https://flockpilot.com/account/delete" },
  openGraph: {
    title: "Delete Your Account — FlockPilot",
    description:
      "Request deletion of your FlockPilot account and all associated data.",
    url: "https://flockpilot.com/account/delete",
  },
};

export default function DeleteAccountPage() {
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
            <Link href="/about" className="hover:text-white">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-400">
            Account Management
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Delete Your <span className="text-red-400">Account</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/60">
            FlockPilot is developed by <strong className="text-white">Enro Agro Limited</strong>. If you no longer wish
            to use FlockPilot, you can request the permanent deletion of your account and associated data by following
            the steps below.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16">

        {/* Steps to delete */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-bold">How to Request Account Deletion</h2>

          <div className="space-y-4">
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light/10 text-sm font-bold text-brand-light">1</span>
              <div>
                <h3 className="font-semibold">Send an email to us</h3>
                <p className="mt-1 text-sm text-white/60">
                  Send an email to{" "}
                  <a href="mailto:hello@flockpilot.com?subject=Account%20Deletion%20Request" className="text-brand-light hover:underline">
                    hello@flockpilot.com
                  </a>{" "}
                  with the subject line <strong className="text-white">&quot;Account Deletion Request&quot;</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light/10 text-sm font-bold text-brand-light">2</span>
              <div>
                <h3 className="font-semibold">Include your account details</h3>
                <p className="mt-1 text-sm text-white/60">
                  In your email, include the <strong className="text-white">full name</strong>,{" "}
                  <strong className="text-white">email address</strong>, and{" "}
                  <strong className="text-white">phone number</strong> associated with your FlockPilot account so we can
                  verify your identity.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light/10 text-sm font-bold text-brand-light">3</span>
              <div>
                <h3 className="font-semibold">We verify and process your request</h3>
                <p className="mt-1 text-sm text-white/60">
                  We will verify your identity and confirm receipt of your request. Account deletion will be processed
                  within <strong className="text-white">30 days</strong> of verification.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light/10 text-sm font-bold text-brand-light">4</span>
              <div>
                <h3 className="font-semibold">Confirmation</h3>
                <p className="mt-1 text-sm text-white/60">
                  You will receive a confirmation email once your account and associated data have been permanently deleted.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What gets deleted */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-bold">Data That Will Be Deleted</h2>
          <p className="mb-4 text-white/70">
            Upon account deletion, the following data associated with your account will be permanently removed:
          </p>
          <ul className="space-y-2 text-white/70">
            <li className="flex gap-2"><span className="text-red-400">&times;</span> Your account profile (name, email, phone number, profile photo)</li>
            <li className="flex gap-2"><span className="text-red-400">&times;</span> Farm operational data (flock records, feed logs, mortality logs, production reports)</li>
            <li className="flex gap-2"><span className="text-red-400">&times;</span> Sales records and batch data</li>
            <li className="flex gap-2"><span className="text-red-400">&times;</span> HR records (employee profiles, attendance, leave records)</li>
            <li className="flex gap-2"><span className="text-red-400">&times;</span> In-app messages, notifications, and support history</li>
            <li className="flex gap-2"><span className="text-red-400">&times;</span> Device and usage data associated with your account</li>
          </ul>
        </section>

        {/* What is retained */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-bold">Data That May Be Retained</h2>
          <p className="mb-4 text-white/70">
            In accordance with Nigerian law and our regulatory obligations, certain data may be retained in anonymized or
            archived form even after account deletion:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-light">Data Type</th>
                  <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-light">Retention Period</th>
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wider text-brand-light">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-medium text-white">Financial records (journal entries, invoices)</td>
                  <td className="py-3 pr-4 text-white/60">Up to 7 years</td>
                  <td className="py-3 text-white/60">Nigerian tax and accounting regulations</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-medium text-white">Payroll records (PAYE, pension)</td>
                  <td className="py-3 pr-4 text-white/60">Up to 7 years</td>
                  <td className="py-3 text-white/60">Nigerian labour and tax law compliance</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-medium text-white">Payment transaction references</td>
                  <td className="py-3 pr-4 text-white/60">Up to 7 years</td>
                  <td className="py-3 text-white/60">Financial audit and regulatory requirements</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Retained records are stored in anonymized or archived form and are not accessible to you after deletion. They
            may only be produced in response to a lawful regulatory request.
          </p>
        </section>

        {/* Important notes */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-bold">Important Information</h2>
          <div className="space-y-3">
            <div className="rounded-lg border-l-2 border-red-400 bg-red-400/5 px-5 py-4 text-sm text-white/70">
              <strong className="text-white">Account deletion is permanent and irreversible.</strong> Once your data is
              deleted, it cannot be recovered. We strongly recommend exporting your data before submitting a deletion
              request.
            </div>
            <div className="rounded-lg border-l-2 border-brand-light bg-brand-light/5 px-5 py-4 text-sm text-white/70">
              <strong className="text-white">Tenant Administrators:</strong> If you are the administrator of an
              organization workspace, deleting your account will affect all users within that workspace. Please ensure
              all users are notified and data is exported before requesting deletion.
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-14">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-bold">Contact</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="divide-y divide-white/5 text-sm">
              <div className="flex gap-4 py-3">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/40">Email</span>
                <a href="mailto:hello@flockpilot.com?subject=Account%20Deletion%20Request" className="text-brand-light hover:underline">hello@flockpilot.com</a>
              </div>
              <div className="flex gap-4 py-3">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/40">Operator</span>
                <span className="text-white/70">Enro Agro Limited</span>
              </div>
              <div className="flex gap-4 py-3">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-white/40">Address</span>
                <span className="text-white/70">2, Creek Road, Apapa, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/50">
            For more information about how we handle your data, see our{" "}
            <Link href="/privacy-policy" className="text-brand-light hover:underline">Privacy Policy</Link> and{" "}
            <Link href="/terms-and-conditions" className="text-brand-light hover:underline">Terms and Conditions</Link>.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/30">
        &copy; 2025 Enro Agro Limited. All rights reserved. &middot; FlockPilot is a product of Enro Agro Limited, registered in Nigeria.
      </footer>
    </main>
  );
}
