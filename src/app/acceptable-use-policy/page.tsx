import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — RouR Tech Platform Standards",
  description:
    "Standards and acceptable use rules governing interactions with RouR Tech websites, APIs, forms, and digital infrastructure.",
  alternates: {
    canonical: `${SITE_URL}/acceptable-use-policy`,
  },
};

export default function AcceptableUsePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} onOpenContact={() => {}} />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#111111] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                Acceptable Use Policy
              </li>
            </ol>
          </nav>

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Acceptable Use Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Purpose & Scope
                </h2>
                <p>
                  This Acceptable Use Policy (&quot;AUP&quot;) defines rules and
                  guidelines for interacting with{" "}
                  <strong>{siteConfig.url}</strong>, our public APIs, project
                  inquiry portals, client staging instances, and any digital
                  systems managed by <strong>{siteConfig.legalName}</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Prohibited Activities
                </h2>
                <p>
                  When using our website or digital systems, you agree not to
                  engage in or facilitate any of the following:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Security Probing & Attacks:</strong> Attempting to
                    probe, scan, or test the vulnerability of our application,
                    server infrastructure, or networks without prior written
                    authorization from our security team.
                  </li>
                  <li>
                    <strong>Denial of Service (DoS/DDoS):</strong> Flooding,
                    spamming, mailbombing, or overloading our servers, edge
                    networks, or contact endpoints.
                  </li>
                  <li>
                    <strong>Malicious Submissions:</strong> Submitting malicious
                    payloads, SQL injection vectors, cross-site scripting (XSS)
                    code, or false automated spam entries through our project
                    contact forms.
                  </li>
                  <li>
                    <strong>Unauthorized Scraping & Impersonation:</strong>{" "}
                    Using automated scrapers, bots, or harvesters to replicate
                    our proprietary case studies, client listings, or branding,
                    or falsely claiming affiliation with RouR Tech.
                  </li>
                  <li>
                    <strong>Illegal or Infringing Content:</strong> Using our
                    hosted client systems or servers to distribute unlawful,
                    defamatory, infringing, or harmful materials.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. System Monitoring & Enforcement
                </h2>
                <p>
                  We monitor application logs and network traffic to preserve
                  system integrity, ensure availability, and prevent security
                  exploits. We reserve the right to immediately block IP
                  addresses, throttle abusive API requests, or terminate
                  unauthorized administrative access without notice in response
                  to AUP violations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Reporting Security Concerns
                </h2>
                <p>
                  We welcome responsible disclosure of potential security
                  vulnerabilities. If you discover a vulnerability or suspect an
                  AUP violation, please report it directly to{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#FF5B4D] font-semibold"
                  >
                    {siteConfig.email}
                  </a>
                  .
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
