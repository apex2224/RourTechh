"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArticleView } from "./ArticleView";
import { BlogPost } from "@/types";
import { loadPublishedBlogPosts } from "@/lib/blogPosts";

interface Props {
  slug: string;
  initialPost: BlogPost | null;
  initialPosts: BlogPost[];
}

export default function BlogPostClient({
  slug,
  initialPost,
  initialPosts,
}: Props) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(!initialPost);

  useEffect(() => {
    let cancelled = false;
    loadPublishedBlogPosts()
      .then((publishedPosts) => {
        if (cancelled || !publishedPosts) return;
        setAllPosts(publishedPosts);
        setPost(publishedPosts.find((article) => article.slug === slug) ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Could not load the published article from Firestore:", error);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8F8F6] px-6 text-center">
        <p className="text-sm text-[#666666]">
          {loading ? "Loading article…" : "This article is not available."}
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <ArticleView
        post={post}
        allPosts={allPosts}
        onBack={() => router.push("/")}
        onSelectPost={(selectedPost) => router.push("/blog/" + selectedPost.slug)}
        onSelectService={(service) => {
          router.push("/?service=" + encodeURIComponent(service) + "#contact");
        }}
      />
    </div>
  );
}