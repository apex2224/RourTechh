import { Metadata } from "next";
import PortfolioPageClient from "@/components/PortfolioPageClient";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — RouR Tech Technical Proof",
  description:
    "Explore RouR Tech's portfolio of web applications, headless commerce systems, and digital platforms with verified Core Web Vitals and architecture proof.",
  alternates: {
    canonical: `${SITE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio & Case Studies — RouR Tech Technical Proof",
    description:
      "Explore RouR Tech's portfolio of web applications, headless commerce systems, and digital platforms.",
    url: `${SITE_URL}/portfolio`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies — RouR Tech Technical Proof",
    description:
      "Explore RouR Tech's portfolio of web applications, headless commerce systems, and digital platforms.",
  },
};

export default function PortfolioPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio & Case Studies",
        "item": `${SITE_URL}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <PortfolioPageClient />
    </>
  );
}
