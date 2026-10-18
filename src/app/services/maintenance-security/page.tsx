import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Website Maintenance, Security & Support Services | RouR Tech",
  description:
    "Website maintenance, dependency updates, security reviews, bug fixes, and performance checks scoped to your application's needs.",
  alternates: {
    canonical: `${SITE_URL}/services/maintenance-security`,
  },
  openGraph: {
    title: "Website Maintenance, Security & Support Services | RouR Tech",
    description:
      "Website maintenance, dependency updates, security reviews, bug fixes, and performance checks scoped to your application's needs.",
    url: `${SITE_URL}/services/maintenance-security`,
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

export default function MaintenanceSecurityPage() {
  const service = getServiceBySlug("maintenance-security");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
