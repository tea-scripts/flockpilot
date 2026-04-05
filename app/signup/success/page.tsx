import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Successful — FlockPilot",
  description: "Your FlockPilot account is being set up. Check your email for login credentials.",
};

export default function SignupSuccessPage() {
  return (
    <main className="min-h-screen bg-brand-deep text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-light">
            FlockPilot
          </Link>
        </div>
      </nav>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light/20">
            <svg className="h-8 w-8 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
            Payment successful!
          </h1>

          <p className="mb-6 text-sm leading-relaxed text-white/60">
            Your FlockPilot account is being set up. You will receive an email
            shortly with your login URL, email, and a temporary password.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
            <h2 className="mb-3 text-sm font-semibold text-white/80">What happens next?</h2>
            <ol className="space-y-3 text-sm text-white/60">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light/20 text-xs font-bold text-brand-light">1</span>
                <span>Check your email for your login credentials and workspace URL</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light/20 text-xs font-bold text-brand-light">2</span>
                <span>Sign in with your temporary password at your workspace URL</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light/20 text-xs font-bold text-brand-light">3</span>
                <span>Change your password on first login and start setting up your farm</span>
              </li>
            </ol>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Didn&apos;t receive an email? Check your spam folder or contact{" "}
            <a href="mailto:info@flockpilot.com" className="text-brand-light hover:underline">
              info@flockpilot.com
            </a>
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl border border-white/15 px-6 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
