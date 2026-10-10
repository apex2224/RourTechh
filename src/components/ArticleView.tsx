import React, { useEffect, useState } from "react";
import { ArrowLeft, Share2, Check, ArrowRight } from "lucide-react";
import { BlogPost, ServiceItem } from "../types";
import { servicesData } from "../data/servicesData";

interface ArticleViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectService: (serviceTitle: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  onSelectService,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Dynamic SEO metadata updates
  useEffect(() => {
    const originalTitle = document.title;
    document.title = post.seoTitle || `${post.title} | Vanguard Digital`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", post.seoDescription || post.excerpt);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      document.title = originalTitle;
    };
  }, [post]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(
          Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)),
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedService: ServiceItem | undefined = post.relatedServiceId
    ? servicesData.find((s) => s.id === post.relatedServiceId)
    : undefined;

  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.status === "published")
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-[#F8F8F6] pt-8 pb-24">
      {/* Article Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.seoDescription,
            image: post.featuredImage,
            author: {
              "@type": "Person",
              name: post.author.name,
              jobTitle: post.author.role,
            },
            publisher: {
              "@type": "Organization",
              name: "Vanguard Digital",
              logo: {
                "@type": "ImageObject",
                url: "https://vanguarddigital.agency/logo.png",
              },
            },
            datePublished: post.publishDate,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://vanguarddigital.agency/blog/${post.slug}`,
            },
          }),
        }}
      />

      {/* Reading Progress Bar */}
      <div
        className="fixed top-18 left-0 right-0 h-1 bg-transparent z-40 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#FF5B4D] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E8E8]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#555555] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Insights & All Articles</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#666666] hover:text-[#111111] bg-white border border-[#E8E8E8] rounded-md hover:bg-[#F2F2EE] transition-colors cursor-pointer"
            title="Copy article link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          {/* Metadata kicker (clean unboxed text, no pills) */}
          <div className="flex items-center gap-2 text-xs text-[#777777] mb-4">
            <span className="font-semibold text-[#FF5B4D]">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.publishDate}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-data">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#555555] leading-relaxed font-body mb-8">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3.5 p-4 bg-white rounded-xl border border-[#E8E8E8]">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-[#E8E8E8]"
            />
            <div>
              <div className="text-sm font-bold text-[#111111]">
                {post.author.name}
              </div>
              <div className="text-xs text-[#666666]">
                {post.author.role} · Vanguard Digital
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-[#E8E8E8] bg-[#ECECE8] aspect-[16/9] mb-12 shadow-sm">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-6 sm:p-12 rounded-2xl border border-[#E8E8E8] shadow-xs prose prose-neutral max-w-none text-[#333333] leading-relaxed">
          {post.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="text-2xl font-bold text-[#111111] font-display mt-8 mb-4 pt-4 border-t border-[#F0F0EE] first:border-0 first:pt-0"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("```")) {
              const codeLines = trimmed.replace(/```[a-z]*\n?/g, "").trim();
              return (
                <div
                  key={index}
                  className="my-6 rounded-lg bg-[#141414] p-4 overflow-x-auto text-xs font-mono text-neutral-200"
                >
                  <pre>
                    <code>{codeLines}</code>
                  </pre>
                </div>
              );
            }

            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
              const items = trimmed.split("\n");
              return (
                <ul
                  key={index}
                  className="my-4 space-y-2 list-disc pl-5 text-sm text-[#444444]"
                >
                  {items.map((li, liIdx) => (
                    <li key={liIdx}>{li.replace(/^[\*\-]\s+/, "")}</li>
                  ))}
                </ul>
              );
            }

            if (trimmed === "---") {
              return <hr key={index} className="my-8 border-[#E8E8E8]" />;
            }

            return (
              <p
                key={index}
                className="text-base text-[#444444] leading-relaxed my-4"
              >
                {trimmed}
              </p>
            );
          })}

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[#E8E8E8] flex flex-wrap items-center gap-2 text-xs text-[#666666]">
            <span className="font-semibold text-[#111111]">
              Indexed Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#F8F8F6] border border-[#E8E8E8] rounded-md font-mono-data text-[#444444]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contextual Internal Link to Related Service */}
        {relatedService && (
          <div className="mt-10 p-6 sm:p-8 bg-[#FFF2F0] rounded-2xl border border-[#FF5B4D]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider block mb-1">
                Engineering Service Integration
              </span>
              <h3 className="text-xl font-bold text-[#111111] font-display">
                Need enterprise {relatedService.title}?
              </h3>
              <p className="text-sm text-[#555555] mt-1 max-w-lg">
                {relatedService.shortDescription}
              </p>
            </div>
            <button
              onClick={() => onSelectService(relatedService.title)}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
            >
              <span>Explore {relatedService.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-[#E8E8E8]">
          <h3 className="text-xl font-bold text-[#111111] font-display mb-6">
            Related Architectural Dispatches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectPost(rel)}
                className="bg-white p-6 rounded-xl border border-[#E8E8E8] hover:border-[#D1D1CB] transition-all cursor-pointer group"
              >
                <div className="text-xs text-[#FF5B4D] font-semibold mb-2">
                  {rel.category}
                </div>
                <h4 className="text-base font-bold text-[#111111] font-display group-hover:text-[#FF5B4D] transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#666666] line-clamp-2 mb-4">
                  {rel.excerpt}
                </p>
                <div className="text-xs font-semibold text-[#111111] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
