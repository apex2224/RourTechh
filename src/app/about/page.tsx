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
import { SITE_URL } from "@/lib/siteConfig";

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
        "Performance is considered during planning and implementation. Measurements and improvement targets depend on the product, hosting, content, and agreed test conditions.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Engineered Architecture",
      description:
        "Technology choices are made around the product's requirements, integrations, hosting environment, and maintenance needs.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Security & Accessibility",
      description:
        "Accessibility and security requirements should be reviewed and scoped for each project. No single implementation can guarantee complete security or conformance.",
    },
    {
      icon: <Target className="w-6 h-6 text-[#FF5B4D]" />,
      title: "Honest, Direct Collaboration",
      description:
        "Clear discussions about goals, constraints, decisions, and responsibilities help teams work through technical requirements.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <Header isArticleView={false} />

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
                  Project scope, deliverables, fees, milestones, and handover
                  expectations should be agreed in writing before work begins.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        Written Scope & Expectations:
                      </strong>{" "}
                      Document the planned work, estimated schedule, and fees
                      for the engagement.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        Ownership Terms:
                      </strong>{" "}
                      The project agreement should specify ownership, licenses,
                      and any handover of code, design files, or documentation.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#333333]">
                      <strong className="font-semibold text-[#111111]">
                        Communication:
                      </strong>{" "}
                      Agree on suitable update frequency, review meetings, and
                      communication channels for the project.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#111111] text-white p-8 sm:p-10 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Globe2 className="w-6 h-6 text-[#FF5B4D]" />
                  <span className="text-xs font-mono-data uppercase tracking-wider text-neutral-400">
                    Technical Practices
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-display mb-6">
                  Engineering Considerations
                </h3>
                <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      Performance Targets
                    </span>
                    Performance goals can be agreed and measured under defined
                    test conditions. Real-world results vary with the site,
                    hosting, content, integrations, and user devices; no score
                    or threshold is guaranteed.
                  </div>
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      TypeScript
                    </span>
                    Types can help catch certain errors during development but
                    do not eliminate runtime defects. Testing and data
                    validation should be scoped to the application.
                  </div>
                  <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-[#FF5B4D] font-bold block mb-1">
                      Structured Data
                    </span>
                    Structured data can describe page content to supported
                    crawlers. Search engines determine indexing and whether
                    enhanced results appear.
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
              Let&apos;s build something exceptional together.
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-xl mx-auto">
              Contact us to discuss your goals, technical needs, and timeline.
            </p>
            <Link
              href="/contact"
              className="px-9 py-4 text-sm sm:text-base font-bold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
