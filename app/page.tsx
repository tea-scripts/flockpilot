import { LandingPage } from "@/components/landing-page";

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlockPilot",
  alternateName: "Flock Pilot",
  url: "https://flockpilot.enroagro.com"
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Enro Agro Limited",
  url: "https://flockpilot.enroagro.com",
  email: "info@enroagro.com",
  telephone: "+2348162420463",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG"
  },
  sameAs: [
    "https://x.com/enroagro",
    "https://instagram.com/enroagro"
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
    "@type": "Offer",
    price: "25000",
    priceCurrency: "NGN",
    category: "Starter Plan"
  },
  description:
    "FlockPilot gives poultry farmers a real-time operations-and-finance cockpit that tracks flock health, feed efficiency, and unit economics.",
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
        text: "Yes. Upgrades are prorated."
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
