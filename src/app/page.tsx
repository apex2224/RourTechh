import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import HomeClient from "@/components/HomeClient";
import { absoluteSiteUrl, SITE_URL, siteConfig } from "@/lib/siteConfig";
import { loadPublishedBlogPostsForServer } from "@/lib/serverBlogPosts";

export const metadata: Metadata = {
  title: "Independent Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
  description:
    "RouR Tech is an independent web development company based in Kangra, Himachal Pradesh, building websites, web applications, e-commerce platforms, and custom software.",
  alternates: {
    canonical: absoluteSiteUrl(),
  },
  openGraph: {
    title: "Independent Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
    description:
      "RouR Tech is an independent web development company based in Kangra, Himachal Pradesh, building websites, web applications, e-commerce platforms, and custom software.",
    url: SITE_URL,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "RouR Tech — Digital Solutions & Web Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Independent Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
    description:
      "RouR Tech is an independent web development company based in Kangra, Himachal Pradesh, building websites, web applications, e-commerce platforms, and custom software.",
    images: [siteConfig.ogImage],
  },
};

export default async function HomePage() {
  const blogPosts = await loadPublishedBlogPostsForServer(3);
  return <HomeClient hero={<Hero />} blogPosts={blogPosts} />;
}
