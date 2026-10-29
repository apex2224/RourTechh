import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { BlogFeaturedImage } from './BlogFeaturedImage';

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectPost,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const publishedPosts = posts.filter((p) => p.status === 'published');
  const featuredPosts = publishedPosts.slice(0, 3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    const loadPosts = async () => {
      try {
        const { loadPublishedBlogPosts } = await import('../lib/blogPosts');
        const publishedPosts = await loadPublishedBlogPosts();
        if (!cancelled && publishedPosts !== null) setPosts(publishedPosts);
      } catch (error) {
        console.error(
          "Could not load published articles from Firestore:",
          error,
        );
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    if (!("IntersectionObserver" in window)) {
      void loadPosts();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void loadPosts();
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="insights" className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-[#B84238] tracking-wider uppercase mb-2">
              Insights & Architectural Dispatches
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
              Engineering essays & technical blueprints.
            </h2>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="text-sm sm:text-base text-[#666666] max-w-md">
            Rigorous analysis on web vitals, design tokens, headless architecture, and high-scale systems from our engineering principals.
            </p>
            <Link
              href="/blog"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#B84238] transition-colors"
            >
              <span>Browse all engineering articles</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Article Cards Grid */}
        {isLoading ? (
          <div
            className="text-center py-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-[#111111]">Loading articles...</p>
          </div>
        ) : featuredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
            <BookOpen className="w-8 h-8 text-[#666666] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#111111]">No articles found</p>
            <p className="text-xs text-[#666666] mt-1">Try adjusting your search query or selected category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] overflow-hidden hover-lift transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <BlogFeaturedImage
                    imageUrl={post.featuredImage}
                    alt={post.title}
                    className="aspect-[16/9]"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />

                  {/* Article Content Preview */}
                  <div className="p-6 sm:p-7">
                    {/* Clean unboxed metadata with bullet separators (anti-slop rule) */}
                    <div className="flex items-center gap-2 text-xs text-[#666666] mb-3">
                      <span className="font-semibold text-[#B84238]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-data">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-display mb-3 group-hover:text-[#B84238] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Tags (clean unboxed text with · separators) */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#666666]">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span>#{tag}</span>
                          {tIdx < 2 && <span aria-hidden="true" className="text-[#CCCCCC]">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="px-6 py-4 sm:px-7 bg-white border-t border-[#E8E8E8] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#666666]">By</span>
                    <span className="font-semibold text-[#111111]">{post.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-[#111111] group-hover:text-[#B84238] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
