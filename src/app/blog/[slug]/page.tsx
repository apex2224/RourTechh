import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { initialBlogPosts } from "@/data/blogData";
import BlogPostClient from "@/components/BlogPostClient";
import { absoluteSiteUrl, SITE_URL } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";
import { loadPublishedBlogPostBySlug } from "@/lib/serverBlogPosts";

export const dynamic = "force-dynamic";
interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const staticPost = initialBlogPosts.find((post) => post.slug === slug);

  if (staticPost) return staticPost;

  return loadPublishedBlogPostBySlug(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status === "draft") {
    return {
      title: "Article Not Found | RouR Tech Insights",
      description: "The requested article could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : absoluteSiteUrl(post.featuredImage)
    : absoluteSiteUrl(
        "/src/assets/images/hero_digital_agency_1791271576191-optimized.webp",
      );
  const canonicalUrl = absoluteSiteUrl(`/blog/${post.slug}`);

  return {
    title: post.seoTitle || `${post.title} | RouR Tech Insights`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishDate,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status === "draft") {
    notFound();
  }

  const allPosts = [
    post,
    ...initialBlogPosts.filter((item) => item.slug !== post.slug),
  ];
  const imageUrl = post.featuredImage
    ? post.featuredImage.startsWith("http")
      ? post.featuredImage
      : absoluteSiteUrl(post.featuredImage)
    : absoluteSiteUrl(
        "/src/assets/images/hero_digital_agency_1791271576191-optimized.webp",
      );
  const canonicalUrl = absoluteSiteUrl(`/blog/${post.slug}`);
  const datePublished = Date.parse(post.publishDate);
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [imageUrl],
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    ...(Number.isFinite(datePublished)
      ? { datePublished: new Date(datePublished).toISOString() }
      : {}),
    author: {
      "@type":
        post.author.name === "RouR Tech Editorial Team"
          ? "Organization"
          : "Person",
      name: post.author.name,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdArticle),
        }}
      />
      <BlogPostClient slug={slug} initialPost={post} initialPosts={allPosts} />
    </>
  );
}
