import { Metadata } from "next";
import BlogListingClient from "@/components/BlogListingClient";
import { initialBlogPosts } from "@/data/blogData";
import { absoluteSiteUrl, SITE_URL } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";
import { sortBlogPostsNewestFirst } from "@/lib/blogOrdering";
import { loadPublishedBlogPostsForServer } from "@/lib/serverBlogPosts";
import { getPageH1, getPageMetadata, getPageSeo } from "@/lib/serverPageSeo";

export const dynamic = "force-dynamic";

const defaultMetadata: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("blog", defaultMetadata);
}

export default async function BlogListingPage() {
  const [serverPosts, pageSeo] = await Promise.all([
    loadPublishedBlogPostsForServer(),
    getPageSeo("blog"),
  ]);
  const postsBySlug = new Map(
    initialBlogPosts
      .filter((post) => post.status === "published")
      .map((post) => [post.slug, post]),
  );
  serverPosts.forEach((post) => postsBySlug.set(post.slug, post));
  const publishedPosts = sortBlogPostsNewestFirst(
    Array.from(postsBySlug.values()),
  );

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
      <BlogListingClient
        initialPosts={publishedPosts}
        pageH1={getPageH1(
          pageSeo,
          "Engineering Notes, Technical SEO & Systems Design",
        )}
      />
    </>
  );
}
