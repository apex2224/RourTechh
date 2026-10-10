import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { faqData } from '../data/faqData';

interface FAQSectionProps {
  onStartProject: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onStartProject }) => {
  const [openIds, setOpenIds] = useState<string[]>([faqData[0]?.id || 'faq-1']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-[#E8E8E8] bg-[#F8F8F6]">
      {/* FAQPage Structured Data (Schema.org JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
            Everything you need to know about working with us.
          </h2>
          <p className="text-sm sm:text-base text-[#666666] mt-4">
            Transparent answers regarding contracts, IP rights, delivery schedules, and ongoing engineering support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E8E8E8] transition-all overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-data text-[#888888]">{item.category}</span>
                    <span className="text-sm sm:text-base font-bold text-[#111111] font-display">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full bg-[#F8F8F6] flex items-center justify-center shrink-0 text-[#666666] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FF5B4D] bg-[#FFF2F0]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#555555] leading-relaxed border-t border-[#F5F5F3] pt-4 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions banner */}
        <div className="mt-12 text-center p-6 bg-white rounded-xl border border-[#E8E8E8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-sm font-bold text-[#111111] block">
              Have a specific question not covered here?
            </span>
            <span className="text-xs text-[#666666]">
              Schedule a direct consultation with our solution architects.
            </span>
          </div>

          <button
            onClick={onStartProject}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#333333] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Ask Our Engineering Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
