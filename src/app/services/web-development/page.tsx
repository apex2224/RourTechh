import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Website & Web Application Development Services | RouR Tech",
  description:
    "Custom Next.js and React websites and web applications, with responsive interfaces, maintainable architecture, and performance considered throughout delivery.",
  alternates: {
    canonical: `${SITE_URL}/services/web-development`,
  },
  openGraph: {
    title: "Website & Web Application Development Services | RouR Tech",
    description:
      "Custom Next.js and React websites and web applications, with responsive interfaces and maintainable architecture.",
    url: `${SITE_URL}/services/web-development`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website & Web Application Development Services | RouR Tech",
    description:
      "Custom Next.js and React websites and web applications, with responsive interfaces and maintainable architecture.",
  },
};

export default function WebDevelopmentPage() {
  const service = getServiceBySlug("web-development");
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
