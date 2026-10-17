import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Electronic Delivery Policy — RouR Tech Digital Deliverables",
  description:
    "Electronic delivery, repository handover, cloud deployments, and asset transfer protocols for RouR Tech digital engineering projects.",
  alternates: {
    canonical: `${SITE_URL}/shipping-policy`,
  },
};

export default function ShippingPolicyPage() {
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
                Digital Delivery Policy
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Digital Delivery & Handover Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Digital Products & Electronic Delivery
                </h2>
                <p>
                  RouR Tech specializes in website development, custom software solutions, UI/UX design, and technical SEO engineering. All deliverables produced under our service agreements are <strong>100% electronic and digital</strong>.
                </p>
                <p className="mt-2 text-xs text-[#777777]">
                  We do not manufacture, store, or physically ship tangible goods. Therefore, standard freight, postal shipping, customs tariffs, and physical delivery timelines do not apply.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Delivery Methods & Handover Protocols
                </h2>
                <p>All project milestones and final deliverables are transferred electronically via standard secure digital channels:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Source Code & Repositories:</strong> Code is delivered via private Git repositories (GitHub, GitLab, or Bitbucket) with repository ownership directly transferred to your organization.
                  </li>
                  <li>
                    <strong>Design Assets & Tokens:</strong> Figma project files, component libraries, design token JSON files, and vector assets are transferred via direct Figma workspace invites or secure cloud links.
                  </li>
                  <li>
                    <strong>Cloud Deployments:</strong> Production staging instances and public live releases are deployed directly to your designated cloud infrastructure (Vercel, AWS, Cloudflare, or Google Cloud).
                  </li>
                  <li>
                    <strong>Documentation & Specifications:</strong> Architecture manuals, API schemas (Swagger/OpenAPI), and CMS user guides are provided in digital markdown or PDF formats.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Delivery Confirmation & Verification
                </h2>
                <p>
                  Upon electronic delivery of each project milestone, our team issues a formal Handover Notice accompanied by deployment URLs and repository access credentials. The 10-business-day acceptance review window begins immediately upon electronic transmission of the handover notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Inquiries
                </h2>
                <p>
                  If you have questions regarding digital asset transfers or delivery protocols, please reach out to{" "}
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
