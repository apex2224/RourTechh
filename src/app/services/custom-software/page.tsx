import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Custom Software & Web Application Solutions | RouR Tech",
  description:
    "Bespoke SaaS applications, internal portals, real-time dashboards, and custom API systems engineered with TypeScript, Node.js, and modern cloud infrastructure.",
  alternates: {
    canonical: `${SITE_URL}/services/custom-software`,
  },
  openGraph: {
    title: "Custom Software & Web Application Solutions | RouR Tech",
    description:
      "Bespoke SaaS applications, internal portals, real-time dashboards, and custom API systems engineered with TypeScript and Node.js.",
    url: `${SITE_URL}/services/custom-software`,
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

export default function CustomSoftwarePage() {
  const service = getServiceBySlug("custom-software");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
