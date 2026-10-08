import React from 'react';
import { Quote, CheckCircle, Shield } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const testimonials = [
    {
      quote: 'Vanguard re-architected our institutional platform to sub-second speeds in 12 weeks. Our institutional clients immediately noticed the responsiveness, driving a +140% surge in daily active usage.',
      name: 'Julian Vance',
      role: 'Chief Technology Officer',
      company: 'Aura Financial Partners',
      metric: '+140% Daily Active Traders',
    },
    {
      quote: 'The headless commerce flagship Vanguard engineered elevated our brand to global luxury standards. Our mobile conversion shot up by +48% within the very first month of deployment.',
      name: 'Camilla Bern',
      role: 'Brand Director & Co-Founder',
      company: 'Luminaire Design Group',
      metric: '+48% Mobile Conversion Rate',
    },
    {
      quote: 'Navigating genomic sequencing reports used to take oncologists hours of manual review. Vanguard designed an accessible clinical portal that shaved 65% off diagnostic analysis time.',
      name: 'Dr. Marcus Vance, MD',
      role: 'Director of Clinical Diagnostics',
      company: 'Synthetix Genomics Labs',
      metric: '-65% Report Review Time',
    },
  ];

  const clientLogos = [
    'AURA CAPITAL',
    'LUMINAIRE ATELIER',
    'SYNTHETIX BIO',
    'KANSO TECHNOLOGIES',
    'ARCHETYPE VENTURES',
    'MERIDIAN HEALTH',
  ];

  return (
    <section className="py-20 md:py-28 border-b border-[#E8E8E8] bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verified Logos Strip */}
        <div className="mb-20">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#777777] mb-8">
            Trusted by engineering & product leaders globally
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
            {clientLogos.map((logo, idx) => (
              <span
                key={idx}
                className="text-sm sm:text-base font-extrabold tracking-widest text-[#444444] font-display hover:text-[#111111] transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
            Verified Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
            Real outcomes from partners in production.
          </h2>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-7 sm:p-8 rounded-xl border border-[#E8E8E8] flex flex-col justify-between shadow-xs"
            >
              <div>
                <Quote className="w-7 h-7 text-[#FF5B4D]/30 mb-4" />
                <p className="text-sm text-[#444444] leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-[#F0F0EE]">
                <div className="inline-block px-2.5 py-1 bg-[#FFF2F0] text-[#FF5B4D] rounded font-mono-data text-xs font-bold mb-3">
                  {t.metric}
                </div>
                <div className="text-xs">
                  <strong className="text-[#111111] block font-semibold text-sm">
                    {t.name}
                  </strong>
                  <span className="text-[#666666]">
                    {t.role} · {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standards & Certifications Band */}
        <div className="mt-14 pt-8 border-t border-[#E8E8E8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#666666]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>SOC 2 Type II Architecture Aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>WCAG 2.1 AA Accessibility Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Core Web Vitals 95+ Score Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>100% Type-Safe TypeScript Standards</span>
          </div>
        </div>

      </div>
    </section>
  );
};
