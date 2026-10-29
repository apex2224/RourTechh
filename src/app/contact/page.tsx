import { Metadata } from "next";
import { Suspense } from "react";
import ContactPageClient from "@/components/ContactPageClient";
import { absoluteSiteUrl, siteConfig } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
  description:
    "Contact RouR Tech to discuss a website, UI/UX design, technical SEO, or custom software project.",
  alternates: {
    canonical: absoluteSiteUrl("/contact"),
  },
  openGraph: {
    title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
    description:
      "Contact RouR Tech to discuss a website, web application, design, SEO, or software project.",
    url: absoluteSiteUrl("/contact"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RouR Tech — Initiate Project Discovery & Inquiries",
    description:
      "Contact RouR Tech to discuss a website, web application, design, SEO, or software project.",
  },
};

export default function ContactPage() {
  const jsonLdContact = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact RouR Tech",
    description:
      "Initiate project discovery with RouR Tech's solutions architects.",
    url: absoluteSiteUrl("/contact"),
    email: siteConfig.contact.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdContact),
        }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[#F8F8F6]" />}>
        <ContactPageClient />
      </Suspense>
    </>
  );
}
