import React, { useState } from "react";
import {
  Gauge,
  Palette,
  Search,
  Cpu,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cards" | "comparison">("cards");

  const differentiators = [
    {
      id: "performance",
      icon: Gauge,
      title: "Performance-First Development",
      badge: "Speed & Conversion",
      description:
        "We architect web systems with sub-second page loads, zero render-blocking assets, and an uncompromising 95+ Core Web Vitals guarantee.",
      outcomeMetric: "< 350ms TTFB Globally",
      clientOutcome:
        "Directly lowers bounce rates by 38% and lifts checkout conversion across mobile and high-latency cellular connections.",
      verifiableImpact: [
        "Guaranteed 95+ Google Lighthouse scores across all deployments",
        "Sub-second Largest Contentful Paint (LCP) in production",
        "Zero layout shifts (CLS < 0.05) through pre-computed geometry",
      ],
    },
    {
      id: "user-focused",
      icon: Palette,
      title: "User-Focused Design",
      badge: "Engagement & Retention",
      description:
        "Every interface is engineered from real stakeholder research and tokenized design systems, ensuring intuitive navigation and strict WCAG 2.1 AA accessibility.",
      outcomeMetric: "+85% User Retention",
      clientOutcome:
        "Eliminates user friction and support tickets, transforming complex workflows into effortless, delightful interactions.",
      verifiableImpact: [
        "Complete component design system delivered in Figma with tokens",
        "Strict WCAG 2.1 AA contrast and screen-reader keyboard certification",
        "Interactive prototype validation before writing production code",
      ],
    },
    {
      id: "seo-ready",
      icon: Search,
      title: "SEO-Ready Architecture",
      badge: "Organic Acquisition",
      description:
        "Built for algorithmic visibility: semantic HTML5 hierarchies, Schema.org JSON-LD entity graphs, programmatic XML sitemaps, and AI crawler readiness.",
      outcomeMetric: "+180% Organic Discovery",
      clientOutcome:
        "Drives qualified inbound enterprise pipeline without relying entirely on volatile, expensive paid advertising.",
      verifiableImpact: [
        "Automated Schema.org graphs (Organization, WebSite, FAQ, Article)",
        "Server-rendered dynamic Open Graph and Twitter share cards",
        "Crawl-budget optimization and canonical tag conflict prevention",
      ],
    },
    {
      id: "scalable-tech",
      icon: Cpu,
      title: "Scalable Technology",
      badge: "Future-Proof Infrastructure",
      description:
        "Modular TypeScript and modern React architecture backed by edge compute and stateless APIs, built to withstand 10x traffic spikes with zero downtime.",
      outcomeMetric: "99.99% Cloud Uptime",
      clientOutcome:
        "Empowers in-house engineering teams to iterate rapidly without incurring massive technical debt or expensive rewrites.",
      verifiableImpact: [
        "100% type-safe TypeScript codebases with tree-shaking",
        "Edge middleware routing and geo-distributed asset caching",
        "Zero vendor lock-in with clean microservices separation",
      ],
    },
    {
      id: "responsive-exp",
      icon: Smartphone,
      title: "Responsive Experiences",
      badge: "Cross-Device Fluidity",
      description:
        "Obsessively tuned for every viewport: fluid typography math, touch-first ergonomics, and responsive media ensuring unified polish from 375px mobile to 4K displays.",
      outcomeMetric: "+48% Mobile Conversion",
      clientOutcome:
        "Captures mobile visitors who represent 65%+ of modern web traffic, delivering an app-like feel without app store installation friction.",
      verifiableImpact: [
        "Touch-target ergonomics exceeding Apple HIG and Android standards",
        "Adaptive responsive imagery and video with bandwidth awareness",
        "Flawless fluid grids eliminating horizontal viewport overflows",
      ],
    },
    {
      id: "ongoing-support",
      icon: ShieldCheck,
      title: "Ongoing Support & SLA",
      badge: "Operational Resilience",
      description:
        "Proactive security vulnerability patching, 24/7 uptime anomaly monitoring, and guaranteed engineering sprint availability for continuous feature evolution.",
      outcomeMetric: "< 1hr Emergency SLA",
      clientOutcome:
        "Ensures your digital flagship remains fast, secure, and competitive long after launch day with dedicated senior partner oversight.",
      verifiableImpact: [
        "Automated dependency security audits and non-breaking updates",
        "Real-time uptime and error rate monitoring with instant alerting",
        "Dedicated monthly sprint hours for ongoing CRO and feature development",
      ],
    },
  ];

  const comparisonRows = [
    {
      dimension: "Engineering Speed & LCP",
      traditional: "3.5s – 6.0s average load time with heavy theme bloat",
      vanguard: "Sub-second (< 350ms TTFB) with edge caching & zero bloat",
    },
    {
      dimension: "Design Consistency",
      traditional: "Ad-hoc component styles and disconnected template pages",
      vanguard: "Unified tokenized design system in Figma and production code",
    },
    {
      dimension: "Search Engine Indexing",
      traditional:
        "Basic meta tags with generic templates and no structured data",
      vanguard: "Comprehensive Schema.org JSON-LD graphs & Core Web Vitals 95+",
    },
    {
      dimension: "Codebase Longevity",
      traditional: "Monolithic legacy platforms with difficult upgrade paths",
      vanguard:
        "Modern type-safe TypeScript with modular component architecture",
    },
    {
      dimension: "Mobile Ergonomics",
      traditional:
        "Shrunk desktop views with hard-to-tap buttons and awkward scroll",
      vanguard:
        "Touch-first responsive layouts with fluid scaling on all devices",
    },
    {
      dimension: "Post-Launch Partnership",
      traditional:
        "Hand-off and disappear, requiring expensive retainers for fixes",
      vanguard:
        "30-day warranty + 24/7 SLA uptime monitoring and active retainers",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
              Core Differentiators
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
              Why leading brands choose RouR Tech.
            </h2>
            <p className="text-sm sm:text-base text-[#666666] mt-4 leading-relaxed">
              We focus on tangible client outcomes rather than generic marketing
              claims. Every architectural choice is made to accelerate revenue,
              engagement, and operational reliability.
            </p>
          </div>

          {/* View Mode Toggle (Cards vs. Outcome Comparison) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F2F2EE] rounded-lg border border-[#E8E8E8] self-start md:self-auto">
            <button
              onClick={() => setActiveTab("cards")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "cards"
                  ? "bg-white text-[#111111] shadow-xs font-semibold"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              Differentiator Pillars (6)
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "comparison"
                  ? "bg-white text-[#111111] shadow-xs font-semibold"
                  : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Outcome Comparison</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 6 Differentiators Cards Grid */}
        {activeTab === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {differentiators.map((diff) => {
              const Icon = diff.icon;
              return (
                <div
                  key={diff.id}
                  className="p-7 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] hover:border-[#D1D1CB] hover-lift transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top line: Icon and Outcome Metric */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center text-[#111111] group-hover:bg-[#FFF2F0] group-hover:text-[#FF5B4D] group-hover:border-[#FF5B4D]/30 transition-colors">
                        <Icon className="w-5 h-5 text-[#FF5B4D]" />
                      </div>

                      <span className="text-xs font-mono-data font-bold px-2.5 py-1 bg-white rounded-md border border-[#E8E8E8] text-[#111111] shadow-2xs">
                        {diff.outcomeMetric}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider mb-1">
                      {diff.badge}
                    </div>

                    <h3 className="text-xl font-bold text-[#111111] font-display mb-3 group-hover:text-[#FF5B4D] transition-colors">
                      {diff.title}
                    </h3>

                    <p className="text-sm text-[#555555] leading-relaxed mb-4">
                      {diff.description}
                    </p>

                    {/* Client Outcome Highlight Box */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#E8E8E8] mb-5 text-xs text-[#444444] leading-relaxed">
                      <strong className="text-[#111111] block mb-0.5 font-semibold">
                        Verifiable Client Outcome:
                      </strong>
                      {diff.clientOutcome}
                    </div>

                    {/* Specific Deliverable Checklist */}
                    <ul className="space-y-2 mb-2">
                      {diff.verifiableImpact.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-[#666666]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5B4D] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#777777]">
                    <span>Outcome Metric</span>
                    <span className="font-bold text-[#111111] font-mono-data">
                      {diff.outcomeMetric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Verifiable Impact Comparison Matrix */}
        {activeTab === "comparison" && (
          <div className="bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] p-6 sm:p-8 overflow-hidden animate-in fade-in duration-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#111111] font-display">
                Traditional Agency Approach vs. Vanguard Outcome Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] mt-1">
                See how our technical standards directly translate to higher
                conversion, lower server overhead, and enterprise scalability.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#E8E8E8] text-[#777777]">
                    <th className="py-3 px-4 font-semibold w-1/4">
                      Key Dimension
                    </th>
                    <th className="py-3 px-4 font-semibold w-3/8 text-neutral-500">
                      Traditional Agency / Template Approach
                    </th>
                    <th className="py-3 px-4 font-semibold w-3/8 text-[#111111]">
                      RouR Tech Outcome Architecture
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E8]">
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-white/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-[#111111] align-top">
                        {row.dimension}
                      </td>
                      <td className="py-4 px-4 text-[#777777] leading-relaxed align-top">
                        <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-2" />
                        {row.traditional}
                      </td>
                      <td className="py-4 px-4 text-[#111111] font-medium leading-relaxed align-top bg-white/70 rounded-md">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                        {row.vanguard}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-[#666666]">
                Every engagement includes full source code transfer and 100%
                intellectual property ownership.
              </span>
              <a
                href="#contact"
                className="font-semibold text-[#FF5B4D] hover:underline flex items-center gap-1"
              >
                <span>Discuss Your Project Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
