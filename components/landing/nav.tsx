"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { trackLandingEvent } from "@/lib/analytics";

export function Nav() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <Reveal className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="FlockPilot home" className="inline-flex shrink-0">
          <Image
            src="/logo-white.png"
            alt="FlockPilot"
            width={1930}
            height={374}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
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
            href="/changelog"
            className="hidden text-sm font-medium text-white/80 transition hover:text-white sm:inline"
          >
            Changelog
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
  );
}
