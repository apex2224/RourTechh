import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Website Maintenance, Security & Support Services | RouR Tech",
  description:
    "Proactive web application maintenance, 24/7 uptime monitoring, security patching, dependency updates, and continuous Core Web Vitals optimization.",
  alternates: {
    canonical: `${SITE_URL}/services/maintenance-security`,
  },
  openGraph: {
    title: "Website Maintenance, Security & Support Services | RouR Tech",
    description:
      "Proactive web application maintenance, 24/7 uptime monitoring, security patching, and dependency updates.",
    url: `${SITE_URL}/services/maintenance-security`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance, Security & Support Services | RouR Tech",
    description:
      "Proactive web application maintenance, 24/7 uptime monitoring, security patching, and dependency updates.",
  },
};

export default function MaintenanceSecurityPage() {
  const service = getServiceBySlug("maintenance-security");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
