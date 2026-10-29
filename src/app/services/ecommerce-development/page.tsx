import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "E-commerce Website Development Services | RouR Tech",
  description:
    "High-converting custom e-commerce stores and headless Shopify platforms engineered for rapid mobile checkout, international payment gateways, and scalable catalogs.",
  alternates: {
    canonical: absoluteSiteUrl("/services/ecommerce-development"),
  },
  openGraph: {
    title: "E-commerce Website Development Services | RouR Tech",
    description:
      "High-converting custom e-commerce stores and headless Shopify platforms engineered for rapid mobile checkout.",
    url: absoluteSiteUrl("/services/ecommerce-development"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Website Development Services | RouR Tech",
    description:
      "High-converting custom e-commerce stores and headless Shopify platforms engineered for rapid mobile checkout.",
  },
};

export default function EcommerceDevelopmentPage() {
  const service = getServiceBySlug("ecommerce-development");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
