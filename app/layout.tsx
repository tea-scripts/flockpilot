import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flockpilot.enroagro.com"),
  title: {
    default: "FlockPilot | Poultry Farm ERP by Enro Agro Limited",
    template: "%s | FlockPilot"
  },
  applicationName: "FlockPilot",
  description:
    "FlockPilot (also searched as Flock Pilot) is poultry farm ERP software by Enro Agro Limited for farm operations, feed efficiency, and unit economics in Nigeria and Africa.",
  keywords: [
    "flockpilot",
    "flock pilot",
    "flockpilot nigeria",
    "flock pilot nigeria",
    "poultry farm software Nigeria",
    "poultry ERP",
    "farm operations software",
    "poultry finance dashboard",
    "FlockPilot",
    "Enro Agro Limited"
  ],
  category: "Agriculture Technology",
  creator: "Enro Agro Limited",
  publisher: "Enro Agro Limited",
  authors: [{ name: "Enro Agro Limited" }],
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
    title: "FlockPilot (Flock Pilot) by Enro Agro Limited",
    description:
      "FlockPilot is a real-time poultry operations and finance cockpit for profitable batches.",
    type: "website",
    locale: "en_NG",
    url: "https://flockpilot.enroagro.com",
    siteName: "FlockPilot"
  },
  twitter: {
    card: "summary_large_image",
    title: "FlockPilot by Enro Agro Limited",
    description:
      "Real-time poultry operations and finance cockpit for profitable farm batches."
  },
  alternates: {
    canonical: "https://flockpilot.enroagro.com"
  },
  other: {
    "apple-mobile-web-app-title": "FlockPilot"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
