import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { Problem } from "@/components/landing/problem";
import { FeatureSpotlights } from "@/components/landing/feature-spotlights";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { Resources } from "@/components/landing/resources";
import { DemoForm } from "@/components/landing/demo-form";
import { TrustedBy } from "@/components/landing/trusted-by";
import { SiteFooter } from "@/components/landing/site-footer";
import { BackToTop } from "@/components/landing/back-to-top";

/**
 * FlockPilot marketing landing page. Composed from focused section components
 * in components/landing/. Each section owns its own state and motion; this
 * orchestrator just lays them out in order. The nav lives inside Hero so it
 * shares the hero's ambient background.
 */
export function LandingPage() {
  return (
    <main className="section-shell text-white">
      <Hero />
      <StatsBar />
      <Problem />
      <FeatureSpotlights />
      <FeatureGrid />
      <PricingSection />
      <FaqSection />
      <Resources />
      <DemoForm />
      <TrustedBy />
      <SiteFooter />
      <BackToTop />
    </main>
  );
}
