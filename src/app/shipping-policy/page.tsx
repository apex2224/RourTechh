import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Electronic Delivery Policy — RouR Tech Digital Deliverables",
  description:
    "Electronic delivery, repository handover, cloud deployments, and asset transfer protocols for RouR Tech digital engineering projects.",
  alternates: {
    canonical: `${SITE_URL}/shipping-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ShippingPolicyPage() {
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
                Digital Delivery Policy
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
                Digital Delivery & Handover Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Digital Products & Electronic Delivery
                </h2>
                <p>
                  The website currently describes digital services, and no physical-goods fulfillment process is documented in this project. The owner must confirm that physical products are not offered before treating this as a complete shipping policy.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                  If physical products or materials are offered, this page must be updated to explain shipping regions, costs, delivery estimates, taxes, and applicable consumer rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Delivery Methods & Handover Protocols
                </h2>
                <p>For digital services, the deliverables, delivery method, access requirements, and handover timing should be stated in the written agreement for each engagement. This draft does not promise a particular platform, repository transfer, deployment, file format, or delivery schedule.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Delivery Confirmation & Verification
                </h2>
                <p>
                  Delivery confirmation and any acceptance or review period must be agreed in the applicable written agreement. No standard handover notice or review period is confirmed here.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Inquiries
                </h2>
                <p>
                  If you have questions regarding digital asset transfers or delivery protocols, use the{" "}
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
