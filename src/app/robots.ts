import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*"],
      other: {
        "Content-Signal": "search=yes, ai-train=no",
      },
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
