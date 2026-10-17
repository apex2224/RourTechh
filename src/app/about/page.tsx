import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Code2,
  Terminal,
  Globe2,
} from "lucide-react";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About RouR Tech — Engineering High-Performance Digital Products",
  description:
    "Learn about RouR Tech's engineering philosophy, architecture standards, and client-first delivery model for modern web applications and digital platforms.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About RouR Tech — Engineering High-Performance Digital Products",
    description:
      "Learn about RouR Tech's engineering philosophy, architecture standards, and client-first delivery model.",
    url: `${SITE_URL}/about`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RouR Tech — Engineering High-Performance Digital Products",
    description:
      "Learn about RouR Tech's engineering philosophy, architecture standards, and client-first delivery model.",
  },
};

export default function AboutPage() {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  const principles = [
    {
      icon: <Zap className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Performance by Default",
      description:
        "Speed is a fundamental feature, not an afterthought. We enforce strict Core Web Vitals budgets—sub-second LCP and zero render-blocking bloat—on every project.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Engineered Architecture",
      description:
        "We build exclusively with strict TypeScript, modular Next.js components, and resilient APIs. Clean code guarantees your digital product can evolve for years.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Security & Accessibility",
      description:
        "Every application adheres to WCAG 2.1 AA accessibility guidelines and modern security standards, ensuring an inclusive experience and rock-solid data protection.",
    },
    {
      icon: <Target className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Honest, Direct Collaboration",
      description:
        "No account managers or bureaucratic middlemen. You collaborate directly with senior engineers and product designers who understand your exact technical requirements.",
    },
  ];

  // const milestones = [
  //   {
  //     year: "Core Focus",
  //     title: "Engineering-First Digital Agency",
  //     desc: "Founded with the mission to eliminate slow, fragile agency templates and replace them with resilient, type-safe web applications.",
  //   },
  //   {
  //     year: "Modern Stack",
  //     title: "Next.js & Headless Specialization",
  //     desc: "Pioneered headless Shopify and Next.js full-stack architectures, consistently delivering sub-second load times for international brands.",
  //   },
  //   {
  //     year: "Global Reach",
  //     title: "Worldwide Client Collaboration",
  //     desc: "Delivering digital flagships, fintech portals, and enterprise software for ambitious organizations across North America, Europe, and Asia.",
  //   },
  // ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <Header isArticleView={false} onOpenContact={() => {}} />

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white border-b border-[#E8E8E8] py-3"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#111111] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                About Us
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white border-b border-[#E8E8E8] pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <Terminal className="w-3.5 h-3.5" />
              <span>About RouR Tech</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-8">
              We engineer high-performance digital products that drive
              measurable business growth.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl font-body mb-10">
              RouR Tech is a specialized digital engineering studio. We combine
              modern front-end technologies, robust cloud architectures, and
              conversion-focused UI/UX design to build websites and web
              applications that outperform the competition.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-all shadow-sm flex items-center gap-2"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="px-8 py-4 text-sm font-semibold text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-lg transition-colors flex items-center gap-2"
              >
                <span>View Case Studies</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Philosophy & Principles Grid */}
        <section className="py-20 md:py-28 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                Engineering Discipline
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] font-display">
                The Principles Behind Our Work
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-[#E8E8E8] shadow-xs hover-lift transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF2F0] border border-[#FF5B4D]/20 flex items-center justify-center mb-6">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] font-display mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Model & Standards */}
        <section className="py-20 md:py-28 bg-white border-t border-b border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase">
                  Transparent Delivery
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] font-display leading-tight">
                  How We Partner With Ambitious Teams
                </h2>
                <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                  We done&apos;t believe in convoluted project scopes or vague
                  hourly billing. Every engagement is structured around concrete
                  deliverables, clear milestones, and verified production
                  deployments.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        Fixed-Scope & Milestone Clarity:
                      </strong>{" "}
                      Know exactly what will be built, when it will be
                      delivered, and what it costs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        100% Code & IP Ownership:
                      </strong>{" "}
                      All repositories, Figma tokens, assets, and documentation
                      are transferred fully to your team.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        Global Communication Cadence:
                      </strong>{" "}
                      Async video updates, weekly sprint demos, and direct
                      shared communication channels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#111111] text-white p-8 sm:p-10 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Globe2 className="w-6 h-6 text-[#FF5B4D]" />
                  <span className="text-xs font-mono-data uppercase tracking-wider text-neutral-400">
                    Global Engineering Standards
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-display mb-6">
                  Production Standards on Every Build
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      Core Web Vitals Guarantee
                    </span>
                    Engineered to meet green thresholds (LCP &lt; 2.5s, INP &lt;
                    200ms, CLS &lt; 0.1) under actual Chrome User Experience
                    benchmarks.
                  </div>
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      TypeScript Type Safety
                    </span>
                    End-to-end typed contracts between database schemas, server
                    components, and client interactions to eliminate runtime
                    regressions.
                  </div>
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      Schema.org JSON-LD Graphs
                    </span>
                    Explicit entity graphs embedded into your document head to
                    maximize search engine indexing and rich AI search answer
                    readiness.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-[#F8F8F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display mb-6">
              Lete&apos;s build something exceptional together.
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-xl mx-auto">
              Schedule an exploratory call with our team to discuss your goals,
              architecture, and timeline.
            </p>
            <Link
              href="/contact"
              className="px-9 py-4 text-sm sm:text-base font-bold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Initiate Discovery Call</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => {}} onSelectService={() => {}} />
    </div>
  );
}
