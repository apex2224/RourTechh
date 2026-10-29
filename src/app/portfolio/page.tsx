import { Metadata } from "next";
import PortfolioPageClient from "@/components/PortfolioPageClient";
import { absoluteSiteUrl, SITE_URL } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Project Work | RouR Tech",
  description:
    "Explore selected websites built by RouR Tech, including education technology and premium branded residences projects.",
  alternates: {
    canonical: absoluteSiteUrl("/portfolio"),
  },
  openGraph: {
    title: "Project Work | RouR Tech",
    description:
      "Explore selected websites built by RouR Tech, including education technology and premium branded residences projects.",
    url: absoluteSiteUrl("/portfolio"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Work | RouR Tech",
    description:
      "Explore selected websites built by RouR Tech, including education technology and premium branded residences projects.",
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
        "name": "Project Work",
        "item": absoluteSiteUrl("/portfolio"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdBreadcrumb),
        }}
      />
      <PortfolioPageClient />
    </>
  );
}
