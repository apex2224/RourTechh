import { Metadata } from 'next';
import { initialBlogPosts } from '@/data/blogData';
import BlogPostClient from '@/components/BlogPostClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return initialBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seoTitle,
    description: post.seoDescription,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = initialBlogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} allPosts={initialBlogPosts} />;
}