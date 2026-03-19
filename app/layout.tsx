import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flockpilot.enroagro.com"),
  title: {
    default: "FlockPilot | Poultry Farm Management Software Nigeria — ERP by Enro Agro",
    template: "%s | FlockPilot"
  },
  applicationName: "FlockPilot",
  description:
    "FlockPilot (also searched as Flock Pilot) is the #1 poultry farm management software in Nigeria. All-in-one ERP for farm operations, feed tracking, mortality analysis, flock financials, payroll, AI assistant, and unit economics. Built by Enro Agro Limited for poultry farmers across Africa.",
  keywords: [
    "flockpilot",
    "flock pilot",
    "flockpilot nigeria",
    "flock pilot nigeria",
    "poultry farm software Nigeria",
    "poultry farm management software",
    "poultry ERP",
    "poultry ERP Nigeria",
    "farm operations software",
    "poultry finance dashboard",
    "poultry accounting software",
    "livestock management software Nigeria",
    "poultry feed tracking software",
    "poultry mortality tracking",
    "farm payroll software Nigeria",
    "poultry AI assistant",
    "chicken farm management app",
    "broiler farm software",
    "layer farm software",
    "agricultural ERP Africa",
    "FlockPilot",
    "Enro Agro Limited",
    "Enro Agro"
  ],
  category: "Agriculture Technology",
  creator: "Enro Agro Limited",
  publisher: "Enro Agro Limited",
  authors: [{ name: "Enro Agro Limited", url: "https://enroagro.com" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "FlockPilot — Poultry Farm Management Software for Nigeria & Africa",
    description:
      "All-in-one poultry ERP: farm ops, feed tracking, financials, payroll, and AI assistant. From ₦45,000/month. Built for Nigerian poultry farmers by Enro Agro.",
    type: "website",
    locale: "en_NG",
    url: "https://flockpilot.enroagro.com",
    siteName: "FlockPilot",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "FlockPilot — The operating system for profitable poultry farms",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@enroagro",
    creator: "@enroagro",
    title: "FlockPilot — Poultry Farm Management Software",
    description:
      "All-in-one poultry ERP: farm ops, feed tracking, financials, payroll, and AI assistant. Built for Nigerian poultry farmers.",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://flockpilot.enroagro.com"
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined
  },
  other: {
    "apple-mobile-web-app-title": "FlockPilot",
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
