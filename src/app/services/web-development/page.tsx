import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
  title: "Website & Web Application Development Services | RouR Tech",
  description:
    "Custom Next.js and React websites and web applications, with responsive interfaces, maintainable architecture, and performance considered throughout delivery.",
  alternates: {
    canonical: absoluteSiteUrl("/services/web-development"),
  },
  openGraph: {
    title: "Website & Web Application Development Services | RouR Tech",
    description:
      "Custom Next.js and React websites and web applications, with responsive interfaces and maintainable architecture.",
    url: absoluteSiteUrl("/services/web-development"),
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

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-web-development", defaultMetadata);
}

export default async function WebDevelopmentPage() {
  const service = getServiceBySlug("web-development");
  if (!service) notFound();

  const pageSeo = await getPageSeo("service-web-development");
  return (
    <ServicePageTemplate
      service={service}
      pageH1={getPageH1(pageSeo, service.title)}
    />
  );
}
