import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {

  Terminal,
  Briefcase,
  Globe2,
  Code2,
} from "lucide-react";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Careers | RouR Tech",
  description:
    "Recruitment status and application details are awaiting confirmation from RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/careers`,
  },
  openGraph: {
    title: "Careers | RouR Tech",
    description:
      "Recruitment status and application details are awaiting confirmation from RouR Tech.",
    url: `${SITE_URL}/careers`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | RouR Tech",
    description:
      "Recruitment status and application details are awaiting confirmation from RouR Tech.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CareersPage() {
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Careers",
        "item": `${SITE_URL}/careers`,
      },
    ],
  };

  const cultureValues = [
    {
      title: "Engineers First",
      description:
        "We are an engineering studio, not an agency bureaucracy. Technical decisions are made by developers and designers based on measurable performance, clean patterns, and customer value.",
    },
    {
      title: "Asynchronous Autonomy",
      description:
        "We prioritize deep work over endless meetings. Clear written communication, structured issue tracking, and automated CI/CD allow our team to operate with high autonomy.",
    },
    {
      title: "Craft & Rigor",
      description:
        "Project requirements may include typed code, accessibility review, performance measurement, and peer review, depending on the agreed scope.",
    },
    {
      title: "Direct Client Impact",
      description:
        "Engineers collaborate directly with founders, CTOs, and product leaders, seeing the immediate tangible results of the software they deliver.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Header isArticleView={false} />

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
                Careers & Culture
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Join RouR Tech</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Build High-Performance Digital Products With Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl font-body mb-8">
              We are always interested in connecting with passionate front-end engineers, full-stack developers, UI/UX designers, and technical SEO specialists who care deeply about code craft, speed, and real-world impact.
            </p>
            <div className="flex items-center gap-6 text-xs sm:text-sm text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-[#FF5B4D]" /> Remote-Friendly Collaboration
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#FF5B4D]" /> Modern TypeScript Stack
              </span>
            </div>
          </div>
        </section>

        {/* Culture Values */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                Our Environment
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] font-display">
                How We Work Together
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cultureValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-[#E8E8E8] shadow-xs"
                >
                  <h3 className="text-xl font-bold text-[#111111] font-display mb-3">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Opportunities / Speculative Inquiries */}
        <section className="py-16 md:py-24 bg-white border-t border-[#E8E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] p-8 md:p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#FFF2F0] border border-[#FF5B4D]/20 text-[#FF5B4D] flex items-center justify-center mx-auto mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] font-display mb-4">
                Recruitment information
              </h2>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl mx-auto mb-8">
                No current openings or verified application contact are listed here. The company owner should confirm recruitment status and provide an application process before this page is used for hiring.
              </p>

              <div className="inline-block p-6 bg-white rounded-xl border border-[#E8E8E8] text-left max-w-md w-full shadow-xs">
                <span className="text-xs font-bold text-[#888888] uppercase tracking-wider block mb-2">
                  Owner confirmation required
                </span>
                <p className="text-xs text-[#555555] leading-relaxed mb-4">
                  Confirm whether applications are being accepted and which contact channel should be used.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
