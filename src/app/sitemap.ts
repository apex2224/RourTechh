import { MetadataRoute } from "next";
import { initialBlogPosts } from "@/data/blogData";

const siteUrl = process.env.APP_URL || "https://vanguarddigital.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...initialBlogPosts
      .filter((post) => post.status === "published")
      .map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
