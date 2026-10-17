import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "RouR Tech — Engineering High-Performance Digital Products & Web Applications",
  description:
    "RouR Tech builds blazing-fast, scalable, and SEO-friendly websites, Next.js web applications, headless commerce platforms, and custom software solutions.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "RouR Tech — Engineering High-Performance Digital Products",
    description:
      "RouR Tech builds blazing-fast, scalable, and SEO-friendly websites, Next.js web applications, headless commerce platforms, and custom software solutions.",
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
    title: "RouR Tech — Engineering High-Performance Digital Products",
    description:
      "RouR Tech builds blazing-fast, scalable, and SEO-friendly websites, Next.js web applications, and headless commerce platforms.",
    images: [siteConfig.ogImage],
  },
};

export default function HomePage() {
  return <HomeClient />;
}
