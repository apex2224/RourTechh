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
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const companyRoutes = [
    "about",
    "contact",
    "portfolio",
    "careers",
    "faq",
    "blog",
    "case-studies",
    "resources",
  ].map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const legalRoutes = [
    "privacy-policy",
    "cookie-policy",
    "terms-and-conditions",
    "disclaimer",
    "refund-policy",
    "shipping-policy",
    "acceptable-use-policy",
    "data-deletion",
  ].map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const blogPostRoutes = initialBlogPosts
    .filter((post) => post.status === "published")
    .map((post) => {
      let parsedDate = new Date();
      if (post.publishDate) {
        const d = new Date(post.publishDate);
        if (!isNaN(d.getTime())) parsedDate = d;
      }
      return {
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: parsedDate,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...serviceRoutes,
    ...companyRoutes,
    ...legalRoutes,
    ...blogPostRoutes,
  ];
}
