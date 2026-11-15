import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-ecommerce-development", defaultMetadata);
}

export default async function EcommerceDevelopmentPage() {
  const service = getServiceBySlug("ecommerce-development");
  if (!service) notFound();

  const pageSeo = await getPageSeo("service-ecommerce-development");
  return (
    <ServicePageTemplate
      service={service}
      pageH1={getPageH1(pageSeo, service.title)}
    />
  );
}
