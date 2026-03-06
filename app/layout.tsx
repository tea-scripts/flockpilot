import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "FlockPilot by Enro Agro Limited",
  description:
    "FlockPilot gives poultry farmers a real-time operations-and-finance cockpit to track flock health, feed efficiency, and unit economics."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} font-sans antialiased pattern-overlay`}>
        {children}
      </body>
    </html>
  );
}
