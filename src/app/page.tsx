import { Metadata } from "next";
import { Hero } from "@/components/Hero";
import HomeClient from "@/components/HomeClient";
import { absoluteSiteUrl, SITE_URL, siteConfig } from "@/lib/siteConfig";
import { loadPublishedBlogPostsForServer } from "@/lib/serverBlogPosts";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
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
  const [blogPosts, pageSeo] = await Promise.all([
    loadPublishedBlogPostsForServer(3),
    getPageSeo("home"),
  ]);
  return (
    <HomeClient
      hero={<Hero h1={getPageH1(pageSeo, "Digital products that are clear, fast, and built to last.")} />}
      blogPosts={blogPosts}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home", defaultMetadata);
}
