import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PolicyReviewNotice } from "@/components/PolicyReviewNotice";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cookie & Storage Policy — RouR Tech",
  description:
    "Information regarding browser cookies, local storage, and session tokens used on the RouR Tech website and digital applications.",
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiePolicyPage() {
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
                Cookie Policy
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
                Cookie & Storage Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Draft — effective date requires owner confirmation
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Scope
                </h2>
                <p>
                  This draft describes storage and external requests visible in the current website code. The owner must check production configuration, hosting integrations, and embedded content before making complete statements about cookies, analytics, or tracking.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Technologies We Use
                </h2>
                <p>The project includes Firebase Authentication and loads font files from Google Fonts. Actual browser storage and cookie behavior depends on the deployed SDK, configuration, browser, and third-party services and must be verified before publication.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                    <h3 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">
                      Firebase Authentication
                    </h3>
                    <p className="text-xs text-[#555555]">
                      When an administrator signs in, Firebase Authentication may persist authentication state using browser-managed storage. The exact persistence mode and whether cookies are set must be confirmed from the live Firebase configuration and browser behavior.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                    <h3 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">
                      Other Browser Storage
                    </h3>
                    <p className="text-xs text-[#555555]">
                      No use of localStorage or sessionStorage for interface preferences was found in the reviewed application source. Hosting, authentication, embedded content, or future changes may use additional storage; verify the production site before treating this as exhaustive.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Managing Browser Storage and Consent
                </h2>
                <p>
                  Browser settings generally provide controls for cookies and site storage, but blocking them may affect authentication or other functions. This project has no cookie-consent interface in the reviewed source. The owner must assess whether consent or other notices are required for the actual deployment and its users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Questions
                </h2>
                <p>
                  If you have questions regarding our use of storage technologies, use the{" "}
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
