import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — RouR Tech Platform Standards",
  description:
    "Standards and acceptable use rules governing interactions with RouR Tech websites, APIs, forms, and digital infrastructure.",
  alternates: {
    canonical: `${SITE_URL}/acceptable-use-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AcceptableUsePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
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
                Acceptable Use Policy
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
                Acceptable Use Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Purpose & Scope
                </h2>
                <p>
                  This draft describes prohibited uses of{" "}
                  <strong>{siteConfig.url}</strong>. The owner must confirm the
                  actual services, systems, and contractual terms to which it
                  applies before publication.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Prohibited Activities
                </h2>
                <p>
                  When using our website or digital systems, you agree not to
                  engage in or facilitate any of the following:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Unauthorized security testing:</strong> Do not
                    probe, scan, or test systems without prior authorization
                    from the system owner.
                  </li>
                  <li>
                    <strong>Disruption:</strong> Do not attempt to disrupt,
                    overload, or interfere with the website, its forms, or
                    related services.
                  </li>
                  <li>
                    <strong>Malicious submissions:</strong> Do not submit
                    malware, exploit payloads, or automated spam through website
                    forms.
                  </li>
                  <li>
                    <strong>Misrepresentation:</strong> Do not impersonate
                    another person or falsely claim affiliation with RouR Tech.
                  </li>
                  <li>
                    <strong>Unlawful use:</strong> Do not use the website or
                    related services in violation of applicable law or others&apos;
                    rights.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. System Monitoring & Enforcement
                </h2>
                <p>
                  This draft does not claim that activity is actively monitored
                  or that particular blocking or enforcement controls are in
                  place. The owner must confirm the available response process
                  and any contractual or legal limits before publishing
                  enforcement statements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Reporting Security Concerns
                </h2>
                <p>
                  We welcome responsible disclosure of potential security
                  vulnerabilities. If you discover a vulnerability or suspect an
                  AUP violation, please report it through the{" "}
                  <a
                    href="/contact"
                    className="text-[#FF5B4D] font-semibold"
                  >
                    contact form
                  </a>
                  .
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
