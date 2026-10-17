import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions — RouR Tech Professional Services",
  description:
    "Terms and conditions governing web development, UI/UX design, technical SEO, and digital engineering engagements with RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
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
                Terms & Conditions
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Terms & Conditions of Service
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  These Terms & Conditions (&quot;Terms&quot;) govern your use of the website <strong>{siteConfig.url}</strong> and all professional engineering, design, and technical consulting services provided by <strong>{siteConfig.legalName}</strong> (&quot;RouR Tech&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our website or executing a Statement of Work (SOW), you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Professional Services & Milestone Delivery
                </h2>
                <p>
                  All discrete engineering and design engagements are governed by an agreed Statement of Work detailing scope, milestones, deliverables, tech stack specifications, and fees.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Acceptance Testing:</strong> Upon delivery of each milestone sprint, the client is granted a 10-business-day review window to test functionality against the SOW specifications.
                  </li>
                  <li>
                    <strong>Change Orders:</strong> Any requested functionality or modifications outside the signed SOW scope will be documented and evaluated in a separate change order.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Intellectual Property Rights & Ownership
                </h2>
                <p>
                  We believe our clients must own their digital assets unconditionally:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Custom Deliverables:</strong> Upon full receipt of agreed milestone payments, all custom source code, design files, component libraries, and documentation created specifically for the client transfer entirely to the client with full commercial rights.
                  </li>
                  <li>
                    <strong>Open Source Libraries:</strong> Standard third-party open-source libraries (such as React, Next.js, and Tailwind CSS) remain subject to their respective open-source licenses (MIT, Apache 2.0).
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Payment Terms & Invoicing
                </h2>
                <p>
                  Invoices are issued according to project milestone schedules agreed upon in the SOW (typically an initial deposit followed by milestone acceptance installments). Invoices are payable within 14 calendar days of issuance unless otherwise agreed in writing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Warranties & Limitation of Liability
                </h2>
                <p>
                  We warrant that all services will be executed in a professional, workmanlike manner in accordance with modern web engineering standards. We provide a 30-day post-launch warranty covering defect remediation for delivered code.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                  To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, or consequential damages. Total cumulative liability under any SOW is limited to the fees paid by the client under that SOW.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  6. Governing Law & Jurisdiction
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California, United States [Placeholder: Subject to confirmation of client corporate jurisdiction], without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  7. Inquiries
                </h2>
                <p>
                  For legal or contract inquiries, contact our management team at{" "}
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
