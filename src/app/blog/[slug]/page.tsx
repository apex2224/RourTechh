import { Metadata } from 'next';
import { initialBlogPosts } from '@/data/blogData';
import BlogPostClient from '@/components/BlogPostClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return initialBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'RourTech Insights' };
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: 'article',
      ...(post.featuredImage
        ? { images: [{ url: post.featuredImage, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: {
      card: post.featuredImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: post.seoDescription,
      ...(post.featuredImage ? { images: [post.featuredImage] } : {}),
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