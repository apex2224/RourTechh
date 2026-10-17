import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { projectsData } from "@/data/projectsData";
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Case Studies — Verified Engineering Results | RouR Tech",
  description:
    "Explore verified technical case studies: Sub-second FinTech analytics, headless architectural commerce, and clinical healthcare portals engineered by RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
  openGraph: {
    title: "Case Studies — Verified Engineering Results | RouR Tech",
    description:
      "Explore verified technical case studies: Sub-second FinTech analytics, headless architectural commerce, and clinical healthcare portals.",
    url: `${SITE_URL}/case-studies`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies — Verified Engineering Results | RouR Tech",
    description:
      "Explore verified technical case studies: Sub-second FinTech analytics, headless architectural commerce, and clinical healthcare portals.",
  },
};

export default function CaseStudiesPage() {
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
        "name": "Case Studies",
        "item": `${SITE_URL}/case-studies`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Header isArticleView={false} onOpenContact={() => {}} />

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
                Technical Case Studies
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Architecture, Real Metrics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Engineering Case Studies & Production Proof
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl font-body">
              A detailed inspection of real challenges, technical solutions, and measured production outcomes. We do not invent metrics—every figure reflects real user experience and business impact.
            </p>
          </div>
        </section>

        {/* In-Depth Studies List */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {projectsData.map((project, idx) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-12 shadow-xs hover-lift transition-all"
              >
                {/* Meta row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F0F0EE] mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#FFF2F0] text-[#FF5B4D] flex items-center justify-center font-mono-data font-bold text-xs">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider block">
                        {project.industry}
                      </span>
                      <span className="text-xs text-[#888888]">
                        Client: {project.client}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#F8F8F6] border border-[#E8E8E8] rounded-md text-xs font-mono-data text-[#555555]">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] font-display mb-4">
                  {project.title}
                </h2>
                <p className="text-base sm:text-lg text-[#555555] leading-relaxed mb-8">
                  {project.summary}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] mb-10">
                  {project.results.map((res, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-mono-data block">
                        {res.metric}
                      </span>
                      <span className="text-xs text-[#666666] leading-tight block mt-1">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-[#FFF8F7] rounded-xl border border-[#FF5B4D]/15">
                    <h3 className="text-base font-bold text-[#111111] font-display mb-3">
                      The Engineering Challenge
                    </h3>
                    <p className="text-sm text-[#444444] leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="p-6 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                    <h3 className="text-base font-bold text-[#111111] font-display mb-3">
                      Our Technical Solution
                    </h3>
                    <p className="text-sm text-[#444444] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Architectural Takeaways */}
                {project.keyTakeaways && project.keyTakeaways.length > 0 && (
                  <div className="mb-8 pt-6 border-t border-[#F0F0EE]">
                    <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-4">
                      Key Technical Insights:
                    </h4>
                    <ul className="space-y-2.5">
                      {project.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555555]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies & CTA */}
                <div className="pt-6 border-t border-[#F0F0EE] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-[#F8F8F6] border border-[#E8E8E8] rounded text-xs font-mono-data text-[#555555]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(project.category)}`}
                    className="text-xs font-semibold text-[#FF5B4D] hover:underline flex items-center gap-1.5"
                  >
                    <span>Discuss a Similar Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-white border-t border-[#E8E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display mb-6">
              Ready to engineer your success story?
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-xl mx-auto">
              Discuss your technical requirements with our solutions architects.
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
