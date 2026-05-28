import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flockpilot.com"),
  title: {
    default: "FlockPilot — Run every farm. Know every number.",
    template: "%s | FlockPilot"
  },
  applicationName: "FlockPilot",
  description:
    "Farm management and ERP platform for poultry, piggery, and aquaculture operations across Africa.",
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
  authors: [{ name: "Enro Agro Limited", url: "https://flockpilot.com" }],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico"
  },
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
    title: "FlockPilot — Run every farm. Know every number.",
    description:
      "Farm management and ERP platform for poultry, piggery, and aquaculture operations across Africa.",
    type: "website",
    locale: "en_NG",
    url: "https://flockpilot.com",
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
    title: "FlockPilot",
    description: "Run every farm. Know every number.",
    images: ["/twitter-image"]
  },
  alternates: {
    canonical: "https://flockpilot.com"
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
      <body className={`${dmSans.className} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
