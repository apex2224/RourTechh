"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { faqData } from "@/data/faqData";
import { 
  ChevronRight, 
  HelpCircle, 
  Search, 
  ArrowUpRight, 
  MessageSquare
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function FaqPageClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIds, setOpenIds] = useState<string[]>([faqData[0].id]);

  const categories = ["All", ...Array.from(new Set(faqData.map((f) => f.category)))];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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
                Frequently Asked Questions
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Knowledge Base & Answers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto mb-8 font-body">
              Everything you need to know about our engineering process, pricing, intellectual property ownership, and technical standards.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 text-[#888888] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or keywords (e.g. Next.js, pricing, IP, SLA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#F8F8F6] border border-[#E8E8E8] rounded-xl text-sm text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#FF5B4D] transition-all"
              />
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
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

            {/* Accordion Items */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openIds.includes(faq.id);
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-xl border border-[#E8E8E8] overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between text-base font-bold text-[#111111] hover:text-[#FF5B4D] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{faq.question}</span>
                        <ChevronRight
                          className={`w-5 h-5 text-[#888888] transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-90 text-[#FF5B4D]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-1 text-sm text-[#555555] leading-relaxed border-t border-[#F0F0EE]">
                          <span className="text-[11px] font-bold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                            {faq.category}
                          </span>
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-[#E8E8E8] p-8">
                  <p className="text-sm text-[#666666] mb-4">
                    No questions found matching &quot;{searchQuery}&quot;.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="text-xs font-semibold text-[#FF5B4D] hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>

            {/* Still have questions banner */}
            <div className="mt-16 p-8 bg-white rounded-2xl border border-[#E8E8E8] text-center shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2F0] text-[#FF5B4D] flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] font-display mb-2">
                Have a specific question not covered here?
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto mb-6">
                Our solutions architects are happy to provide detailed technical guidance for your specific requirements.
              </p>
              <button
                onClick={handleStartProject}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Ask an Engineer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
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
