export type LandingEventName =
  | "hero_demo_click"
  | "hero_pricing_click"
  | "nav_launch_pilot_click"
  | "pricing_tier_click"
  | "demo_submit_success"
  | "cookie_consent_accepted"
  | "cookie_consent_declined";

export function trackLandingEvent(
  event: LandingEventName,
  props?: Record<string, string | number | boolean>
) {
  const payload = {
    event,
    props,
    pathname: typeof window !== "undefined" ? window.location.pathname : ""
  };

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, props);
  }

  if (typeof navigator !== "undefined") {
    const body = JSON.stringify(payload);
    navigator.sendBeacon("/api/analytics", body);
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: string,
      targetOrEventName: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}
