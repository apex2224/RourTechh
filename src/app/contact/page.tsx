import { Metadata } from "next";
import { Suspense } from "react";
import ContactPageClient from "@/components/ContactPageClient";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
  description:
    "Get in touch with RouR Tech's senior engineering team. Discuss your web application, UI/UX design, technical SEO, or custom software requirements.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
    description:
      "Get in touch with RouR Tech's senior engineering team. Receive a structured project proposal within one business day.",
    url: `${SITE_URL}/contact`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
    description:
      "Get in touch with RouR Tech's senior engineering team. Receive a structured project proposal within one business day.",
  },
};

export default function ContactPage() {
  const jsonLdContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact RouR Tech",
    description:
      "Initiate project discovery with RouR Tech's solutions architects.",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#F8F8F6]" />}>
        <ContactPageClient />
      </Suspense>
    </>
  );
}
