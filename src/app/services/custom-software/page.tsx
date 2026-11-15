import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
  title: "Custom Software & Web Application Solutions | RouR Tech",
  description:
    "Bespoke SaaS applications, internal portals, real-time dashboards, and custom API systems engineered with TypeScript, Node.js, and modern cloud infrastructure.",
  alternates: {
    canonical: absoluteSiteUrl("/services/custom-software"),
  },
  openGraph: {
    title: "Custom Software & Web Application Solutions | RouR Tech",
    description:
      "Bespoke SaaS applications, internal portals, real-time dashboards, and custom API systems engineered with TypeScript and Node.js.",
    url: absoluteSiteUrl("/services/custom-software"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software & Web Application Solutions | RouR Tech",
    description:
      "Bespoke SaaS applications, internal portals, real-time dashboards, and custom API systems engineered with TypeScript and Node.js.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-custom-software", defaultMetadata);
}

export default async function CustomSoftwarePage() {
  const service = getServiceBySlug("custom-software");
  if (!service) notFound();

  const pageSeo = await getPageSeo("service-custom-software");
  return (
    <ServicePageTemplate
      service={service}
      pageH1={getPageH1(pageSeo, service.title)}
    />
  );
}
