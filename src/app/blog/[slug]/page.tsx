import { Metadata } from 'next';
import { initialBlogPosts } from '@/data/blogData';
import BlogPostClient from '@/components/BlogPostClient';
import { SITE_URL } from '@/lib/siteConfig';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return initialBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | RouR Tech Insights',
      description: 'The requested engineering insight could not be found.',
    };
  }

  const imageUrl = post.featuredImage
    ? (post.featuredImage.startsWith('http')
        ? post.featuredImage
        : `${SITE_URL}${post.featuredImage}`)
    : `${SITE_URL}/src/assets/images/blog_seo_web_performance_1791271638172.jpg`;

  return {
    title: post.seoTitle || `${post.title} | RouR Tech Insights`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
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
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: [imageUrl],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  return (
    <BlogPostClient
      slug={params.slug}
      initialPost={post ?? null}
      initialPosts={initialBlogPosts}
    />
  );
}