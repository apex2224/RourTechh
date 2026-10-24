import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { initialBlogPosts } from "@/data/blogData";
import BlogPostClient from "@/components/BlogPostClient";
import { SITE_URL } from "@/lib/siteConfig";
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
      : `${SITE_URL}${post.featuredImage}`
    : `${SITE_URL}/src/assets/images/blog_seo_web_performance_1791271638172-optimized.webp`;

  return {
    title: post.seoTitle || `${post.title} | RouR Tech Insights`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}/`,
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

  return (
    <BlogPostClient slug={slug} initialPost={post} initialPosts={allPosts} />
  );
}
