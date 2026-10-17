import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cookie & Storage Policy — RouR Tech",
  description:
    "Information regarding browser cookies, local storage, and session tokens used on the RouR Tech website and digital applications.",
  alternates: {
    canonical: `${SITE_URL}/cookie-policy`,
  },
};

export default function CookiePolicyPage() {
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
                Cookie Policy
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Cookie & Storage Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Principles & Zero-Telemetry Approach
                </h2>
                <p>
                  RouR Tech operates under a strict minimal-data philosophy. We do not use third-party advertising tracking networks, invasive behavioral cross-site trackers, or data-broker pixels on our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Technologies We Use
                </h2>
                <p>We utilize only essential functional technologies necessary for site operation and secure authentication:</p>
                
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                    <h3 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">
                      Essential Authentication Tokens (Firebase Auth)
                    </h3>
                    <p className="text-xs text-[#555555]">
                      When authorized team members log into the CMS or admin console, Firebase uses browser IndexedDB and session cookies to securely preserve session identity and maintain API authorization.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                    <h3 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">
                      Local UI Preferences (Browser Storage)
                    </h3>
                    <p className="text-xs text-[#555555]">
                      We may store temporary interface state (such as prefilled service preferences or dismissed notifications) in your browser&apos;s LocalStorage to ensure a seamless navigation experience between pages.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Managing Browser Storage
                </h2>
                <p>
                  You can configure or reset your browser settings to block, delete, or alert you whenever cookies or local storage items are created. Because our public website does not depend on invasive tracking cookies, all public pages will continue to function fully if you choose to clear your storage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Questions
                </h2>
                <p>
                  If you have questions regarding our use of storage technologies, please email our engineering team at{" "}
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
