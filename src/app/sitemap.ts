import type { MetadataRoute } from "next";
import { absoluteSiteUrl } from "@/lib/siteConfig";
import { listPublishedBlogPostSlugs } from "@/lib/serverBlogPosts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serviceRoutes = [
    "web-development",
    "ui-ux-design",
    "technical-seo",
    "ecommerce-development",
    "custom-software",
    "maintenance-security",
  ].map((slug) => ({
    url: absoluteSiteUrl(`/services/${slug}`),
  }));

  const companyRoutes = [
    "about",
    "contact",
    "faq",
    "blog",
    "resources",
    "portfolio",
  ].map((route) => ({
    url: absoluteSiteUrl(`/${route}`),
  }));

  const legalRoutes = [
    "privacy-policy",
    "cookie-policy",
    "terms-and-conditions",
    "disclaimer",
    "data-deletion",
    "acceptable-use-policy",
    "refund-policy",
    "shipping-policy",
  ].map((route) => ({
    url: absoluteSiteUrl(`/${route}`),
  }));

  const blogPostRoutes = (await listPublishedBlogPostSlugs()).map((slug) => ({
    url: absoluteSiteUrl(`/blog/${slug}`),
  }));

  return [
    {
      url: absoluteSiteUrl(),
    },
    ...serviceRoutes,
    ...companyRoutes,
    ...legalRoutes,
    ...blogPostRoutes,
  ];
}
