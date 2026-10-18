import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { Trash2 } from "lucide-react";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Data Deletion & User Rights Request — RouR Tech",
  description:
    "Draft instructions for submitting a data deletion request to RouR Tech.",
  alternates: {
    canonical: `${SITE_URL}/data-deletion`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DataDeletionPage() {
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
                Data Deletion Instructions
              </li>
            </ol>
          </nav>

          <PolicyReviewNotice />

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
                Draft — request handling and applicable laws require owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Submitting a Data Request
                </h2>
                <p>
                  Use the website contact form to ask about personal information associated with you. This page describes a request channel only; it does not confirm which legal rights apply, guarantee deletion, or represent that an automated deletion workflow exists.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Step-by-Step Instructions to Request Data Deletion
                </h2>
                <p>To submit a request:</p>

                <div className="mt-4 space-y-4">
                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Submit a Request
                      </h3>
                      <p className="text-xs text-[#555555]">
                        Use the{" "}
                        <a href="/contact" className="text-[#FF5B4D] font-semibold">
                          contact form
                        </a>{" "}
                        and describe the personal information or interaction concerned. Do not send sensitive identity documents through the form unless the owner provides a verified secure process.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Verification
                      </h3>
                      <p className="text-xs text-[#555555]">
                        The owner must establish an appropriate identity-verification process before this page is published. Only information reasonably needed to locate and verify a request should be requested.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm mb-1">
                        Processing
                      </h3>
                      <p className="text-xs text-[#555555]">
                        The owner must determine the applicable response timelines and process the request across relevant systems, providers, and backups. No acknowledgment or completion deadline is currently verified.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Deletion Scope and Exceptions
                </h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    The current code review did not verify deletion of contact records from Firestore or other systems.
                  </li>
                  <li>
                    The current code review did not find a user-account deletion workflow for Firebase Authentication.
                  </li>
                  <li>
                    Messages sent through email providers, provider logs, exports, backups, and records held by other recipients may require separate handling and may not be controlled by this website.
                  </li>
                  <li>
                    The owner must identify systems and records in scope, applicable retention requirements, and any permitted exceptions before promising deletion or retention outcomes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Confirmation
                </h2>
                <p>
                  The owner must establish whether and how requesters will receive a response. Do not interpret submission through the contact form as confirmation that data has been deleted.
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
