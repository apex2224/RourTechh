import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy — RouR Tech Data Protection & Transparency",
  description:
    "Learn how RouR Tech collects, processes, and protects your personal data when using our website, contact forms, and client portals.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy — RouR Tech Data Protection & Transparency",
    description:
      "Learn how RouR Tech collects, processes, and protects your personal data.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "RouR Tech",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link href="/" className="hover:text-[#111111] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                Privacy Policy
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
                Privacy Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date and version require owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Overview & Scope
                </h2>
                <p>
                  This draft describes data flows apparent in the current website code for <strong>{siteConfig.legalName}</strong> (&quot;RouR Tech&quot;) and <strong>{siteConfig.url}</strong>. The owner must verify these practices against the live deployment and business operations before publication.
                </p>
                <p className="mt-2">
                  This draft is not a determination of which privacy laws apply and does not represent a compliance certification. The responsible legal entity, applicable jurisdictions, and final policy language require owner and legal review.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Information We Collect
                </h2>
                <p>The website code currently asks for or processes the following information in these flows. Confirm whether the deployed site or other business systems collect additional information:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Inquiry & Contact Information:</strong> The contact form requests a name, email address, company, service, budget range, and project description. The owner must verify how submitted values are received, stored, and retained in production.
                  </li>
                  <li>
                    <strong>Administration Authentication:</strong> The code uses Firebase Authentication for the admin interface. Confirm which account fields and authentication records are processed in the live configuration.
                  </li>
                  <li>
                    <strong>Technical data:</strong> Hosting, Firebase, email, and other providers may process technical information when the site is used. The owner must identify the actual data, purposes, locations, and retention periods from provider settings and agreements.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Infrastructure & Third-Party Service Providers
                </h2>
                <p>
                  Current website code integrates with Firebase services, EmailJS, and Google Fonts. The owner must verify which integrations are enabled in production, document relevant providers and their roles, and confirm applicable data-processing terms:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Firebase:</strong> Firebase Authentication, Firestore, and Storage packages or services are referenced by the project. Confirm which services are active, what data they process, and how they are configured.
                  </li>
                  <li>
                    <strong>EmailJS:</strong> The contact form code uses EmailJS to send inquiry messages. Confirm the exact fields sent, recipients, provider retention, and production configuration.
                  </li>
                  <li>
                    <strong>Google Fonts:</strong> The site requests fonts from Google Fonts. This may disclose technical request data to Google; verify the current deployment behavior and applicable provider terms.
                  </li>
                </ul>
                <p className="mt-2 text-xs text-[#777777]">
                  The owner must confirm and accurately describe any sale, sharing, advertising use, or other disclosure of personal data before publication.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Data Retention & Security Measures
                </h2>
                <p>
                  The code review did not establish an approved retention schedule or verify production security controls. Before publication, the owner must document retention periods, deletion procedures, backups, access controls, and safeguards for each system and provider.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Privacy Requests
                </h2>
                <p>Privacy rights and response obligations depend on the applicable law and circumstances. The owner must identify the laws that apply and confirm the process for receiving, verifying, responding to, and recording requests. The current code review did not verify a complete data-deletion workflow. See the <Link href="/data-deletion" className="text-[#FF5B4D] hover:underline font-semibold">data deletion request page</Link> for a draft request path.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  6. Contact & Data Protection Inquiries
                </h2>
                <p>
                  For an initial privacy question or request, use the contact
                  form. The responsible legal entity and direct privacy contact
                  details must be confirmed before publication.
                </p>
                <div className="mt-3 p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] text-xs">
                  <p><Link href="/contact" className="text-[#FF5B4D] hover:underline font-semibold">website contact form</Link></p>
                  <p>Legal business name, mailing address, and direct privacy contact email require owner confirmation.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
