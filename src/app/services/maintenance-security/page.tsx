import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
  title: "Website Maintenance, Security & Support Services | RouR Tech",
  description:
    "Website maintenance, dependency updates, security reviews, bug fixes, and performance checks scoped to your application's needs.",
  alternates: {
    canonical: absoluteSiteUrl("/services/maintenance-security"),
  },
  openGraph: {
    title: "Website Maintenance, Security & Support Services | RouR Tech",
    description:
      "Website maintenance, dependency updates, security reviews, bug fixes, and performance checks scoped to your application's needs.",
    url: absoluteSiteUrl("/services/maintenance-security"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance, Security & Support Services | RouR Tech",
    description:
      "Website maintenance, dependency updates, security reviews, bug fixes, and performance checks scoped to your application's needs.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-maintenance-security", defaultMetadata);
}

export default async function MaintenanceSecurityPage() {
  const service = getServiceBySlug("maintenance-security");
  if (!service) notFound();

  const pageSeo = await getPageSeo("service-maintenance-security");
  return (
    <ServicePageTemplate
      service={service}
      pageH1={getPageH1(pageSeo, service.title)}
    />
  );
}
