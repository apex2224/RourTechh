import { Metadata } from "next";
import BlogListingClient from "@/components/BlogListingClient";
import { initialBlogPosts } from "@/data/blogData";
import { absoluteSiteUrl, SITE_URL } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Insights — RouR Tech",
  description:
    "Architectural notes, technical SEO strategies, Core Web Vitals blueprints, and modern web application development insights from RouR Tech engineers.",
  alternates: {
    canonical: absoluteSiteUrl("/blog"),
  },
  openGraph: {
    title: "Engineering Blog & Technical Insights — RouR Tech",
    description:
      "Architectural notes, technical SEO strategies, Core Web Vitals blueprints, and modern web application development insights.",
    url: absoluteSiteUrl("/blog"),
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & Technical Insights — RouR Tech",
    description:
      "Architectural notes, technical SEO strategies, Core Web Vitals blueprints, and modern web application development insights.",
  },
};

export default function BlogListingPage() {
  const publishedPosts = initialBlogPosts.filter((p) => p.status === "published");

  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "RouR Tech Insights",
    description:
      "Engineering blog discussing technical SEO, Next.js, and web performance.",
    url: absoluteSiteUrl("/blog"),
    blogPost: publishedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      url: absoluteSiteUrl(`/blog/${post.slug}`),
      datePublished: post.publishDate,
      author: {
        "@type":
          post.author.name === "RouR Tech Editorial Team"
            ? "Organization"
            : "Person",
        name: post.author.name,
      },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog & Insights",
        "item": absoluteSiteUrl("/blog"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdBlog),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdBreadcrumb),
        }}
      />
      <BlogListingClient initialPosts={initialBlogPosts} />
    </>
  );
}
