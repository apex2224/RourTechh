import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Website & Engineering Disclaimer — RouR Tech",
  description:
    "Technical disclaimers regarding search engine rankings, third-party cloud services, Core Web Vitals measurements, and performance benchmarks.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} onOpenContact={() => {}} />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link href="/" className="hover:text-[#111111] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                Disclaimer
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Website & Technical Disclaimer
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. General Information Purpose
                </h2>
                <p>
                  The information provided on <strong>{siteConfig.url}</strong> is for general informational and exploratory purposes regarding our digital engineering, website development, UI/UX design, and technical SEO capabilities. While we strive to maintain accurate, up-to-date content, we make no representations or warranties of any kind regarding completeness or real-time accuracy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Search Engine Rankings & SEO Disclaimer
                </h2>
                <p>
                  RouR Tech provides technical SEO audits, structured data engineering, and Core Web Vitals remediation to maximize search engine discoverability. However, organic search rankings are governed entirely by independent third-party search engines (including Google, Bing, and others) whose proprietary algorithms and evaluation standards evolve continuously.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                  RouR Tech explicitly does not promise, warrant, or guarantee specific keyword ranking positions, search result placements, organic traffic volumes, or worldwide search visibility.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Performance Benchmarks & Core Web Vitals
                </h2>
                <p>
                  Case studies and performance metrics cited on this website (such as sub-second LCP, low INP, and Lighthouse audit scores) represent real measurements recorded under specific network testing environments, CDN configurations, and client asset constraints. Real-world user experience may vary depending on local network conditions, end-user device capabilities, third-party tag managers, or client modifications made after deployment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Third-Party Integrations & External Links
                </h2>
                <p>
                  Our web applications often interface with third-party APIs, payment gateways (such as Stripe or Shopify), hosting providers, and cloud services (such as Firebase, AWS, or Cloudflare). RouR Tech is not responsible for unscheduled outages, API rate limit modifications, or downtime originating from external third-party infrastructure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Contact
                </h2>
                <p>
                  If you have questions regarding this disclaimer, contact our team at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-[#FF5B4D] font-semibold">
                    {siteConfig.email}
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenContact={() => {}} onSelectService={() => {}} />
    </div>
  );
}
