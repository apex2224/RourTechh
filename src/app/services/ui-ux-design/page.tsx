import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/servicesData";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
  title: "UI/UX Design & Website Design Services | RouR Tech",
  description:
    "Human-centered UI/UX design, interactive prototypes, design systems, and responsive website interfaces created in Figma for brand clarity and conversion.",
  alternates: {
    canonical: absoluteSiteUrl("/services/ui-ux-design"),
  },
  openGraph: {
    title: "UI/UX Design & Website Design Services | RouR Tech",
    description:
      "Human-centered UI/UX design, interactive prototypes, design systems, and responsive website interfaces created in Figma.",
    url: absoluteSiteUrl("/services/ui-ux-design"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design & Website Design Services | RouR Tech",
    description:
      "Human-centered UI/UX design, interactive prototypes, design systems, and responsive website interfaces created in Figma.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("service-ui-ux-design", defaultMetadata);
}

export default async function UiUxDesignPage() {
  const service = getServiceBySlug("ui-ux-design");
  if (!service) notFound();

  const pageSeo = await getPageSeo("service-ui-ux-design");
  return (
    <ServicePageTemplate
      service={service}
      pageH1={getPageH1(pageSeo, service.title)}
    />
  );
}
