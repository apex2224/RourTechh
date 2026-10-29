import { Metadata } from "next";
import FaqPageClient from "@/components/FaqPageClient";
import { faqData } from "@/data/faqData";
import { absoluteSiteUrl, SITE_URL } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | RouR Tech",
  description:
    "Answers about project scope, web development, design, technical SEO, pricing discussions, and post-launch support.",
  alternates: {
    canonical: absoluteSiteUrl("/faq"),
  },
  openGraph: {
    title: "Frequently Asked Questions | RouR Tech",
    description:
      "Answers about project scope, web development, design, technical SEO, pricing discussions, and post-launch support.",
    url: absoluteSiteUrl("/faq"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | RouR Tech",
    description:
      "Answers about project scope, web development, design, technical SEO, pricing discussions, and post-launch support.",
  },
};

export default function FaqPage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

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
        "name": "FAQs",
        "item": absoluteSiteUrl("/faq"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdFaq),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdBreadcrumb),
        }}
      />
      <FaqPageClient />
    </>
  );
}
