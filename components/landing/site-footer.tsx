import Image from "next/image";
import { Facebook, Instagram, X } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";

export function SiteFooter() {
  return (
    <footer className="bg-brand-canvas text-white">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/logo-white.png"
            alt="FlockPilot"
            width={1930}
            height={374}
            className="h-8 w-auto"
          />
          <p className="mt-4 text-sm text-white/85">Farm management and ERP for livestock and crop operations across Africa.</p>
          <p className="mt-4 text-sm text-white/80">Lagos, Nigeria</p>
          <p className="mt-2 text-sm">
            <a href="mailto:info@flockpilot.com" className="text-white/90 hover:text-brand-yellow">
              info@flockpilot.com
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href="tel:+2349134632589" className="text-white/90 hover:text-brand-yellow">
              +2349134632589
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a
              href="https://wa.me/2349134632589"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 hover:text-brand-yellow"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-yellow">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="#features" className="text-white/90 transition hover:text-brand-yellow">
              Features
            </a>
            <a href="#pricing" className="text-white/90 transition hover:text-brand-yellow">
              Pricing
            </a>
            <a href="#demo" className="text-white/90 transition hover:text-brand-yellow">
              Request Demo
            </a>
            <a href="/changelog" className="text-white/90 transition hover:text-brand-yellow">
              Changelog
            </a>
            <a href="#resources" className="inline-flex items-center gap-2 text-white/90 transition hover:text-brand-yellow">
              Resources
              <span className="rounded-full bg-brand-yellow/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-yellow">
                Soon
              </span>
            </a>
          </div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-brand-yellow">Legal</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="/privacy-policy" className="text-white/90 transition hover:text-brand-yellow">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="text-white/90 transition hover:text-brand-yellow">
              Terms &amp; Conditions
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-yellow">Socials</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a
              href="https://x.com/flockpilot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FlockPilot on X"
              className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
            >
              <X className="h-4 w-4" />
              <span>@flockpilot</span>
            </a>
            <a
              href="https://instagram.com/flockpilot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FlockPilot on Instagram"
              className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
            >
              <Instagram className="h-4 w-4" />
              <span>@flockpilot</span>
            </a>
            <a
              href="https://facebook.com/flockpilot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow FlockPilot on Facebook"
              className="flex items-center gap-3 text-white/90 hover:text-brand-yellow"
            >
              <Facebook className="h-4 w-4" />
              <span>FlockPilot</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-[1600px] px-4 py-4 text-xs text-white/75 sm:px-6 lg:px-8">
          © 2026 FlockPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
