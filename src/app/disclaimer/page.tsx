import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Website & Engineering Disclaimer — RouR Tech",
  description:
    "Technical disclaimers regarding search engine rankings, third-party cloud services, Core Web Vitals measurements, and performance benchmarks.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} />

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

          <PolicyReviewNotice />

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Website & Technical Disclaimer
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
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
                  Search engines control their own indexing and ranking systems, which can change independently. No particular ranking, traffic, or search visibility result should be inferred from general website information.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                  Any service-specific scope, performance target, or outcome must be expressly documented in the applicable written agreement; this website does not establish one.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Performance Benchmarks & Core Web Vitals
                </h2>
                <p>
                  Performance examples or projections should not be treated as measured results unless they are explicitly identified with supporting test details. Actual results depend on the application, content, hosting, third-party services, test conditions, and user devices.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Third-Party Integrations & External Links
                </h2>
                <p>
                  The website code currently references third-party services, including Firebase, EmailJS, and Google Fonts. A particular project may involve other providers only as described in its applicable agreement. Third-party services have their own terms, availability, and privacy practices; the owner must review and describe the integrations actually used in production.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Contact
                </h2>
                <p>
                  If you have questions regarding this disclaimer, use our{" "}
                  <a href="/contact" className="text-[#FF5B4D] font-semibold">
                    contact form
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
