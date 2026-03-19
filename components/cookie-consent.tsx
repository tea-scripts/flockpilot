"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "fp_cookie_consent";
type Consent = "accepted" | "declined";

function getStoredConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_KEY);
  if (value === "accepted" || value === "declined") return value;
  return null;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  return consent;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no prior choice was made
    if (getStoredConsent() === null) {
      // Small delay so the banner doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleChoice(choice: Consent) {
    localStorage.setItem(COOKIE_KEY, choice);
    setVisible(false);
    // Dispatch a storage event so the GA loader can react
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-white/10 bg-brand-deep/95 px-4 py-4 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/70">
          We use cookies to understand how visitors interact with our site and improve your experience.
          No personal data is sold.{" "}
          <a href="/about" className="text-brand-light underline underline-offset-2 hover:text-white">
            Learn more
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => handleChoice("declined")}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="rounded-lg bg-brand-light px-4 py-2 text-sm font-semibold text-brand-deep transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
