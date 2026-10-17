import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trash2 } from "lucide-react";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Data Deletion & User Rights Request — RouR Tech",
  description:
    "Instructions on how to submit a personal data deletion request and what occurs after your request is processed under GDPR and CCPA.",
  alternates: {
    canonical: `${SITE_URL}/data-deletion`,
  },
};

export default function DataDeletionPage() {
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
                Data Deletion Instructions
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Privacy & User Rights
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display flex items-center gap-3">
                <Trash2 className="w-8 h-8 text-[#FF5B4D]" />
                User Data Deletion Request
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Compliance with GDPR Article 17 (&quot;Right to Erasure&quot;) and CCPA
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Your Right to Erasure
                </h2>
                <p>
                  At <strong>{siteConfig.legalName}</strong>, we respect your right to control your personal data. If you have previously submitted an inquiry through our website contact forms or have an account associated with our digital services, you have the right to request the permanent deletion of your personal records from our databases.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Step-by-Step Instructions to Request Data Deletion
                </h2>
                <p>To submit a verified data erasure request, follow these straightforward steps:</p>

                <div className="mt-4 space-y-4">
                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Compose an Email Request
                      </h3>
                      <p className="text-xs text-[#555555]">
                        Send an email from the specific address you previously used to submit inquiries on our website to{" "}
                        <a href={`mailto:${siteConfig.email}?subject=Personal Data Deletion Request`} className="text-[#FF5B4D] font-semibold">
                          {siteConfig.email}
                        </a>{" "}
                        with the subject line: <strong>&quot;Personal Data Deletion Request&quot;</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Provide Verification Information
                      </h3>
                      <p className="text-xs text-[#555555]">
                        Include your full name, company name (if applicable), and approximate dates of your previous communication so our team can accurately locate your records.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Receipt & Processing Confirmation
                      </h3>
                      <p className="text-xs text-[#555555]">
                        Our data protection team will acknowledge receipt within 48 business hours and process the deletion across all active databases within 30 calendar days.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. What Happens After Your Request Is Processed?
                </h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Firestore Inquiry Records:</strong> All inquiry documents containing your name, email, company, and project notes are permanently purged from Google Cloud Firestore.
                  </li>
                  <li>
                    <strong>Authentication Credentials:</strong> If an administrative or client account exists, your user record is deleted from Firebase Authentication.
                  </li>
                  <li>
                    <strong>Email Records:</strong> Historical inquiry notification threads in our internal email systems are permanently deleted.
                  </li>
                  <li>
                    <strong>Exceptions Required by Law:</strong> In accordance with statutory requirements, minimal transaction records (such as completed billing invoices or tax documentation for executed contracts) may be retained solely to satisfy legal and accounting obligations.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Written Confirmation
                </h2>
                <p>
                  Upon completion of the erasure workflow, you will receive a final confirmation email verifying that all associated personal data has been permanently removed from our active systems.
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
