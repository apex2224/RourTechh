import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions — RouR Tech Professional Services",
  description:
    "Terms and conditions governing web development, UI/UX design, technical SEO, and digital engineering engagements with RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
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
                Terms & Conditions
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
                Terms & Conditions of Service
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  This draft is for discussion and is not final contract language. The owner must confirm the contracting legal entity, website terms, and how any terms interact with client agreements before publication. Project scope and commercial terms should be set out in a written agreement accepted by the parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Professional Services & Milestone Delivery
                </h2>
                <p>
                  Any engagement-specific scope, deliverables, schedule, fees, review and acceptance process, and change-control terms should be documented in a written agreement accepted by both parties.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    Review and acceptance criteria, including any review period, must be agreed in the applicable written agreement.
                  </li>
                  <li>
                    Changes to the agreed scope should be documented and accepted in writing by the parties.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Intellectual Property Rights & Ownership
                </h2>
                <p>
                  Intellectual-property ownership, licenses, pre-existing materials, third-party components, and transfer conditions must be specified in the applicable written agreement. Do not rely on this draft to determine ownership.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    The parties should expressly agree on rights and any payment or transfer conditions for custom deliverables.
                  </li>
                  <li>
                    Third-party materials remain subject to their applicable licenses and terms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Payment Terms & Invoicing
                </h2>
                <p>
                  Fees, invoicing milestones, payment methods, due dates, taxes, and any late-payment terms must be stated in the applicable written agreement. No default payment schedule is confirmed by this draft.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Warranties & Limitation of Liability
                </h2>
                <p>
                  Any warranties, support obligations, exclusions, liability limits, and remedies must be reviewed and expressly agreed in writing, subject to applicable law. This draft does not create a specific warranty or liability cap.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  6. Governing Law & Jurisdiction
                </h2>
                <p>
                  Governing law, venue, and dispute-resolution terms have not been confirmed and must be selected with legal advice appropriate to the contracting parties and applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  7. Inquiries
                </h2>
                <p>
                  For legal or contract inquiries, use the{" "}
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
