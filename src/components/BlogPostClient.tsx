'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArticleView } from './ArticleView';
import { BlogPost } from '@/types';

interface Props {
  post: BlogPost;
  allPosts: BlogPost[];
}

export default function BlogPostClient({ post, allPosts }: Props) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <ArticleView
        post={post}
        allPosts={allPosts}
        onBack={() => router.push('/')}
        onSelectPost={(p) => router.push('/blog/' + p.slug)}
        onSelectService={(service) => {
          router.push('/?service=' + encodeURIComponent(service) + '#contact');
        }}
      />
    </div>
  );
}