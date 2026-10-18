import { MetadataRoute } from "next";
import { initialBlogPosts } from "@/data/blogData";
import { SITE_URL } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = [
    "web-development",
    "ui-ux-design",
    "technical-seo",
    "ecommerce-development",
    "custom-software",
    "maintenance-security",
  ].map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
  }));

  const companyRoutes = [
    "about",
    "contact",
    "faq",
    "blog",
    "resources",
  ].map((route) => ({
    url: `${SITE_URL}/${route}`,
  }));

  const blogPostRoutes = initialBlogPosts
    .filter((post) => post.status === "published")
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
    }));

  return [
    {
      url: SITE_URL,
    },
    ...serviceRoutes,
    ...companyRoutes,
    ...blogPostRoutes,
  ];
}
