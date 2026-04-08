import { LandingPage } from "@/components/landing-page";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlockPilot",
  alternateName: "Flock Pilot",
  url: "https://flockpilot.com"
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enro Agro Limited",
  url: "https://flockpilot.com",
  email: "info@flockpilot.com",
  telephone: "+2349134632589",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG"
  },
  sameAs: [
    "https://x.com/enroagro",
    "https://instagram.com/enroagro",
    "https://facebook.com/EnroAgro"
  ]
};

const productStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlockPilot",
  alternateName: "Flock Pilot",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "25000",
    highPrice: "120000",
    priceCurrency: "NGN",
    offerCount: 4,
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "25000",
        priceCurrency: "NGN",
        description: "Up to 2,000 birds, 1 farm site, 3 users"
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "50000",
        priceCurrency: "NGN",
        description: "Up to 10,000 birds, 3 farm sites, 10 users, AI assistant (100 msgs/mo)"
      },
      {
        "@type": "Offer",
        name: "Scale",
        price: "120000",
        priceCurrency: "NGN",
        description: "Up to 50,000 birds, 10 farm sites, 30 users, AI assistant (300 msgs/mo)"
      }
    ]
  },
  description:
    "FlockPilot gives poultry farmers a real-time operations-and-finance cockpit that tracks flock health, feed efficiency, unit economics, and includes an AI assistant for instant farm insights.",
  featureList:
    "Farm operations tracking, Feed consumption analytics, Mortality analysis, Flock sales management, Accounts payable, Payroll with payslips, Employee loans, Chart of accounts, Financial statements, AI-powered assistant",
  screenshot: "https://flockpilot.com/opengraph-image",
  provider: {
    "@type": "Organization",
    name: "Enro Agro Limited"
  }
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What counts as active birds?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Active birds means birds currently in live batches during the month. If you restock and run new batches, your plan should match your peak monthly capacity."
      }
    },
    {
      "@type": "Question",
      name: "How much does FlockPilot cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlockPilot starts at ₦25,000/month for the Starter plan (up to 2,000 birds). Growth is ₦50,000/month (10,000 birds), Scale is ₦120,000/month (50,000 birds), and Enterprise pricing is custom. Annual billing saves 15%."
      }
    },
    {
      "@type": "Question",
      name: "What is the AI Assistant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FlockPilot includes a built-in AI assistant powered by Claude that understands your farm data. Ask questions about feed conversion ratios, mortality trends, financial summaries, or get plain-English explanations of your reports. Available on Growth (100 messages/month), Scale (300 messages/month), and Enterprise (unlimited) plans."
      }
    },
    {
      "@type": "Question",
      name: "Do I need Finance features to use FlockPilot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can run purely on Farm Ops (mortality, feed, sales, unit economics). Finance linkage can be enabled later."
      }
    },
    {
      "@type": "Question",
      name: "Can I track both bird sales and kg sales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FlockPilot supports mixed-mode sales with unit-aware analytics and alerts."
      }
    },
    {
      "@type": "Question",
      name: "Is this per farm or per company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Per company (tenant). Limits are based on total active birds and farm sites under that company."
      }
    },
    {
      "@type": "Question",
      name: "Can I start small and upgrade mid-month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Upgrades are prorated — you only pay the difference for the remaining days."
      }
    },
    {
      "@type": "Question",
      name: "Do you offer a trial?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 14-day pilot access on Starter, restricted to 1 batch and 2 users."
      }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <LandingPage />
    </>
  );
}
