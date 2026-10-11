import { MetadataRoute } from "next";

const siteUrl = process.env.APP_URL || "https://vanguarddigital.agency";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
