import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy — RouR Tech Professional Services",
  description:
    "Refund, cancellation, and milestone payment policies governing custom digital engineering and design services at RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
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
                Refund Policy
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Refund & Cancellation Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Nature of Professional Services
                </h2>
                <p>
                  RouR Tech provides bespoke digital engineering, website development, UI/UX design, and technical SEO optimization services. Because each project represents custom intellectual work, bespoke architecture, and dedicated engineering hours, standard retail consumer return policies do not apply.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Milestone Acceptance Model
                </h2>
                <p>
                  To provide complete transparency and eliminate financial risk, our projects are invoiced in structured milestones defined within each Statement of Work (SOW):
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Initial Discovery Deposit:</strong> Reserves dedicated engineering team capacity and covers architecture planning, user flowcharts, and technical specification documentation. Deposits are non-refundable once architectural discovery work has commenced.
                  </li>
                  <li>
                    <strong>Progress Milestones:</strong> Payments tied to intermediate deliverables (such as Figma prototype approval, backend API completion, or staging deployment) are invoiced upon your explicit acceptance of that milestone.
                  </li>
                  <li>
                    <strong>Final Production Milestone:</strong> Due upon final staging acceptance and prior to public production deployment and repository handover.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Project Cancellation Terms
                </h2>
                <p>
                  Either party may terminate an active engagement by providing 14 calendar days&apos; written notice. In the event of early termination:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>The client is invoiced solely for completed milestones and verified engineering hours delivered up to the termination effective date.</li>
                  <li>Any unearned portion of advance milestone deposits will be promptly refunded within 14 business days.</li>
                  <li>All completed source code, design assets, and documentation completed up to the date of termination will be transferred to the client.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Monthly Retainers & Support Plans
                </h2>
                <p>
                  Dedicated monthly maintenance retainers are billed on a 30-day recurring basis and may be cancelled at any time with 30 days&apos; advance written notice. Pro-rated refunds are not issued for mid-month cancellations once the billing cycle has begun, but engineering support will continue through the end of the paid cycle.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Contact Regarding Billing
                </h2>
                <p>
                  For billing questions, milestone reconciliations, or refund requests, please email our accounting team at{" "}
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
