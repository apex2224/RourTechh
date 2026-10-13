import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';
import { BlogFeaturedImage } from './BlogFeaturedImage';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Web Development', 'UI/UX', 'SEO', 'Technology', 'E-commerce'];

  const publishedPosts = posts.filter((p) => p.status === 'published');

  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="insights" className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
              Insights & Architectural Dispatches
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
              Engineering essays & technical blueprints.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#666666] max-w-md">
            Rigorous analysis on web vitals, design tokens, headless architecture, and high-scale systems from our engineering principals.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E8E8]">
          {/* Functional Button Segmented Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F2EE] rounded-lg border border-[#E8E8E8]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#111111] shadow-xs'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles or tags..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8F8F6] border border-[#E8E8E8] rounded-lg text-xs text-[#111111] placeholder:text-[#888888] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
            <BookOpen className="w-8 h-8 text-[#888888] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#111111]">No articles found</p>
            <p className="text-xs text-[#666666] mt-1">Try adjusting your search query or selected category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
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
                    <div className="flex items-center gap-2 text-xs text-[#777777] mb-3">
                      <span className="font-semibold text-[#FF5B4D]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.publishDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-data">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-display mb-3 group-hover:text-[#FF5B4D] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>

                    {/* Tags (clean unboxed text with · separators) */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#777777]">
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
                    <span className="text-[#888888]">By</span>
                    <span className="font-semibold text-[#111111]">{post.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-[#111111] group-hover:text-[#FF5B4D] transition-colors">
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
