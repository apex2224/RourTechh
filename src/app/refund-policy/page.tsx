import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — RouR Tech Professional Services",
  description:
    "Refund, cancellation, and milestone payment policies governing custom digital engineering and design services at RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RefundPolicyPage() {
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
                Refund Policy
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
                Refund & Cancellation Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Nature of Professional Services
                </h2>
                <p>
                  This draft does not establish refund or cancellation rights. The owner must confirm the services offered, applicable consumer and contract laws, and the refund terms used in practice before publication.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Milestone Acceptance Model
                </h2>
                <p>
                  The following commercial terms must be agreed in writing for each engagement; this draft does not establish standard deposits, milestones, or refund eligibility:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Deposits and work performed:</strong> The written agreement should state any deposit, how work performed is calculated, and whether any amount may be refundable under applicable law.
                  </li>
                  <li>
                    <strong>Milestones:</strong> The parties should document applicable deliverables, invoicing events, and acceptance criteria.
                  </li>
                  <li>
                    <strong>Cancellation:</strong> The written agreement should explain how termination, outstanding charges, refunds, and transfer of completed work are handled.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Project Cancellation Terms
                </h2>
                <p>
                  No standard notice period or cancellation process has been confirmed. Any termination rights and resulting payment or transfer obligations must be set out in the applicable written agreement and comply with applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Monthly Retainers & Support Plans
                </h2>
                <p>
                  The owner must confirm whether recurring support plans are offered and, if so, publish accurate billing, cancellation, renewal, and refund terms before accepting payment.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Contact Regarding Billing
                </h2>
                <p>
                  For billing questions, milestone reconciliations, or refund requests, use the{" "}
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
