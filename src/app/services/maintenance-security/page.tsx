import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
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

export default function MaintenanceSecurityPage() {
  const service = getServiceBySlug("maintenance-security");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
