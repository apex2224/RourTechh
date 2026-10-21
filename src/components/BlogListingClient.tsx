"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BlogFeaturedImage } from "./BlogFeaturedImage";
import { BlogPost } from "@/types";
import { loadPublishedBlogPosts } from "@/lib/blogPosts";
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogListingClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListingClient({ initialPosts }: BlogListingClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(
    initialPosts.filter((p) => p.status === "published"),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    let cancelled = false;
    loadPublishedBlogPosts()
      .then((published) => {
        if (!cancelled && published && published.length > 0) {
          // Merge unique by slug
          const map = new Map<string, BlogPost>();
          initialPosts.forEach((p) => {
            if (p.status === "published") map.set(p.slug, p);
          });
          published.forEach((p) => {
            if (p.status === "published") map.set(p.slug, p);
          });
          setPosts(Array.from(map.values()));
        }
      })
      .catch((err) => {
        console.error("Could not load published blog posts from Firestore:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [initialPosts]);

  const categories = [
    "All",
    ...Array.from(
      new Set([
        "Web Development",
        "UI/UX",
        "SEO",
        "Technology",
        "E-commerce",
        ...posts.map((post) => post.category),
      ]),
    ),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleStartProject = () => {
    router.push("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header
        onOpenContact={handleStartProject}
        onNavigateHome={() => router.push("/")}
        isArticleView={false}
      />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-[#E8E8E8] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link href="/" className="hover:text-[#111111] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                Insights & Engineering Blog
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Architectural Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Engineering Notes, Technical SEO & Systems Design
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto mb-8 font-body">
              Deep-dives from our engineering team on Next.js performance, Core Web Vitals, headless commerce architecture, and scalable design systems.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#F8F8F6] border border-[#E8E8E8] rounded-xl text-sm text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF5B4D] transition-all"
              />
            </div>
          </div>
        </section>

        {/* Blog Listing Grid */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#111111] text-white shadow-xs"
                      : "bg-white text-[#555555] hover:text-[#111111] border border-[#E8E8E8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-xs hover-lift transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Featured Image */}
                      <Link href={`/blog/${post.slug}`} className="block relative aspect-video w-full bg-neutral-100 overflow-hidden border-b border-[#E8E8E8]">
                        {post.featuredImage ? (
                          <BlogFeaturedImage
                            imageUrl={post.featuredImage}
                            alt={post.title}
                            className="h-full w-full"
                            imageClassName="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 font-mono">
                            {post.category}
                          </div>
                        )}
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-semibold text-white tracking-wide">
                          {post.category}
                        </span>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-[#888888] mb-3">
                          <span className="font-mono-data">{post.publishDate}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 font-mono-data">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-[#111111] font-display mb-3 line-clamp-2 hover:text-[#FF5B4D] transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#F8F8F6] rounded text-[11px] text-[#666666] font-mono-data"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Author & Read More */}
                    <div className="p-6 pt-0 border-t border-[#F0F0EE] flex items-center justify-between text-xs mt-4 pt-4">
                      <div className="flex items-center gap-2.5">
                        {post.author.avatar ? (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full object-cover"
                            width={32}
                            height={32}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-[#FFF2F0] text-[#FF5B4D] font-bold flex items-center justify-center text-[10px]">
                            {post.author.name[0]}
                          </div>
                        )}
                        <span className="font-medium text-[#111111]">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-bold text-[#FF5B4D] hover:underline flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E8E8] p-8 max-w-xl mx-auto">
                <p className="text-sm text-[#666666] mb-4">
                  No articles found matching &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-xs font-semibold text-[#FF5B4D] hover:underline"
                >
                  Clear search and reset
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer
        onOpenContact={handleStartProject}
        onSelectService={(serviceTitle) => {
          router.push(`/contact?service=${encodeURIComponent(serviceTitle)}`);
        }}
      />
    </div>
  );
}
