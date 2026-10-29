import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Technical SEO & Website Optimization Services | RouR Tech",
  description:
    "Technical SEO audits, Core Web Vitals remediation, Schema.org JSON-LD structured data graphs, and crawl indexability optimization for long-term organic growth.",
  alternates: {
    canonical: absoluteSiteUrl("/services/technical-seo"),
  },
  openGraph: {
    title: "Technical SEO & Website Optimization Services | RouR Tech",
    description:
      "Technical SEO audits, Core Web Vitals remediation, Schema.org JSON-LD structured data graphs, and crawl indexability optimization.",
    url: absoluteSiteUrl("/services/technical-seo"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical SEO & Website Optimization Services | RouR Tech",
    description:
      "Technical SEO audits, Core Web Vitals remediation, Schema.org JSON-LD structured data graphs, and crawl indexability optimization.",
  },
};

export default function TechnicalSeoPage() {
  const service = getServiceBySlug("technical-seo");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
