import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  FileText, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Engineering Resources & Technical Guides — RouR Tech",
  description:
    "Free technical checklists, Core Web Vitals optimization frameworks, and architectural guides crafted by RouR Tech engineers.",
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
  openGraph: {
    title: "Engineering Resources & Technical Guides — RouR Tech",
    description:
      "Free technical checklists, Core Web Vitals optimization frameworks, and architectural guides crafted by RouR Tech engineers.",
    url: `${SITE_URL}/resources`,
    siteName: "RouR Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Resources & Technical Guides — RouR Tech",
    description:
      "Free technical checklists, Core Web Vitals optimization frameworks, and architectural guides crafted by RouR Tech engineers.",
  },
};

export default function ResourcesPage() {
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
        "name": "Resources",
        "item": `${SITE_URL}/resources`,
      },
    ],
  };

  const resourceCards = [
    {
      icon: <Zap className="w-6 h-6 text-[#FF5B4D]" />,
      badge: "Performance Checklist",
      title: "Core Web Vitals Production Checklist",
      description:
        "A practical 18-point technical audit checklist for eliminating INP delays, achieving sub-second LCP, and preventing Cumulative Layout Shifts in React and Next.js applications.",
      points: [
        "Eliminating render-blocking fonts and third-party scripts",
        "Native aspect ratio container dimensioning for images & video",
        "Splitting main-thread task execution with requestIdleCallback",
        "Static edge caching configurations for global CDNs",
      ],
      link: "/blog/how-to-build-an-seo-friendly-website",
      actionText: "Read Architecture Guide",
    },
    {
      icon: <Terminal className="w-6 h-6 text-[#FF5B4D]" />,
      badge: "Technical SEO Guide",
      title: "Schema.org & Search Graph Blueprint",
      description:
        "Standardized JSON-LD schemas for organizations, web applications, products, and articles. Ensure zero syntax errors and qualify for Google rich search results.",
      points: [
        "Organization & WebSite entity graph nesting",
        "BreadcrumbList automated schema generators",
        "FAQPage & Service structured data syntax models",
        "Validation workflows in Google Rich Results Test",
      ],
      link: "/services/technical-seo",
      actionText: "Explore Technical SEO Service",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5B4D]" />,
      badge: "Security Standard",
      title: "Modern Web Application Security Baseline",
      description:
        "Essential security practices for web applications handling authentication, user submissions, and sensitive data across modern cloud environments.",
      points: [
        "Content Security Policy (CSP) and HTTP security headers",
        "Strict input validation and sanitization using Zod/TypeScript",
        "Role-based access control (RBAC) and JWT token rotation",
        "DDoS mitigation and automated bot challenge rules",
      ],
      link: "/services/custom-software",
      actionText: "Explore Custom Software",
    },
    {
      icon: <FileText className="w-6 h-6 text-[#FF5B4D]" />,
      badge: "UI/UX Framework",
      title: "Design Tokens & Figma-to-Code Workflow",
      description:
        "How to structure primitive, semantic, and component design tokens in Figma and synchronize them directly into Tailwind CSS configurations.",
      points: [
        "Three-layer token hierarchy: primitive, semantic, component",
        "WCAG 2.1 AA accessible light theme contrast pairing rules",
        "Automating token exports via GitHub Actions",
        "Preventing design debt during rapid sprint cycles",
      ],
      link: "/blog/modern-ui-ux-design-systems",
      actionText: "Read Design Systems Article",
    },
  ];

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
                Engineering Resources
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Engineering Frameworks</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Technical Resources & Blueprints
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto mb-6 font-body">
              Actionable guides, performance checklists, and architecture frameworks distilled from real-world digital engineering engagements.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resourceCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-[#E8E8E8] shadow-xs hover-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#FFF2F0] border border-[#FF5B4D]/20 flex items-center justify-center">
                        {card.icon}
                      </div>
                      <span className="text-xs font-mono-data font-bold text-[#FF5B4D] bg-[#FFF2F0] px-3 py-1 rounded-md">
                        {card.badge}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-display mb-3">
                      {card.title}
                    </h2>
                    <p className="text-sm text-[#555555] leading-relaxed mb-6">
                      {card.description}
                    </p>

                    <div className="space-y-2.5 mb-8 p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                      {card.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#444444]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F0F0EE]">
                    <Link
                      href={card.link}
                      className="text-xs font-bold text-[#FF5B4D] hover:underline flex items-center justify-between"
                    >
                      <span>{card.actionText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-white border-t border-[#E8E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display mb-6">
              Need customized technical architecture advice?
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-xl mx-auto">
              Schedule a technical discovery session with our engineering leads.
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
