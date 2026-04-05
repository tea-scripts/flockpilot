import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up — Start Managing Your Poultry Farm",
  description:
    "Create your FlockPilot account. Manage flock batches, feed, financials, and more. Plans from ₦25,000/month.",
  alternates: { canonical: "https://flockpilot.com/signup" },
};

const API_URL = process.env.FLOCKPILOT_API_URL || "https://api.flockpilot.com/api";

async function getPlans() {
  try {
    const res = await fetch(`${API_URL}/billing/public-plans`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Array<{ code: string; tier: string; interval: string }>;
  } catch {
    return [];
  }
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; trial?: string }>;
}) {
  const params = await searchParams;
  const plans = await getPlans();
  const selectedPlan = params.plan || undefined;
  const isTrial = params.trial === "1";

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

      {/* Signup Form */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
              {isTrial ? "Start your 14-day free trial" : "Create your FlockPilot account"}
            </h1>
            <p className="text-sm text-white/60">
              {isTrial
                ? "No payment required. Full access for 14 days."
                : "Set up your farm in minutes. You'll select a plan after registration."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <SignupForm
              plans={plans}
              selectedPlan={selectedPlan}
              isTrial={isTrial}
            />
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            By creating an account, you agree to our{" "}
            <Link href="/terms-and-conditions" className="text-white/60 underline hover:text-white">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-white/60 underline hover:text-white">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
