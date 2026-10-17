import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} onOpenContact={() => {}} />

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

          <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <div className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                Legal & Governance
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#888888] mt-2 font-mono-data">
                Effective Date: October 14, 2026 · Version 2.1
              </p>
            </div>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  1. Overview & Scope
                </h2>
                <p>
                  This Privacy Policy describes how <strong>{siteConfig.legalName}</strong> (&quot;RouR Tech&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, stores, and protects information when you visit <strong>{siteConfig.url}</strong>, submit project inquiries via our contact forms, or access our client and administrative platforms.
                </p>
                <p className="mt-2">
                  We are committed to processing personal data transparently, securely, and in compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  2. Information We Collect
                </h2>
                <p>We collect only the minimal data necessary to conduct legitimate business communications and deliver digital engineering services:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Inquiry & Contact Information:</strong> When you submit our project inbound form, we collect your name, business email address, company name, selected service, estimated budget tier, and project specifications.
                  </li>
                  <li>
                    <strong>Client Authentication Data:</strong> For authorized users accessing our administration or CMS portals, we process account credentials via Firebase Authentication (email and unique user ID).
                  </li>
                  <li>
                    <strong>Technical & Diagnostic Data:</strong> Standard server logs, approximate IP location, user agent, browser type, and timestamps generated automatically during HTTP requests.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  3. Infrastructure & Third-Party Service Providers
                </h2>
                <p>
                  Our architecture relies on reputable cloud infrastructure providers with strict data processing agreements:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Google Cloud & Firebase:</strong> We utilize Firebase Authentication for secure identity management, Cloud Firestore for inquiry storage, and Firebase Storage for verified media assets.
                  </li>
                  <li>
                    <strong>EmailJS:</strong> For delivering real-time notification alerts when an inquiry is submitted through our website.
                  </li>
                  <li>
                    <strong>Hosting Infrastructure (Vercel / Cloudflare):</strong> Our frontend web application is served via high-speed global edge networks that process HTTP requests with encrypted TLS 1.3 connections.
                  </li>
                </ul>
                <p className="mt-2 text-xs text-[#777777]">
                  We do not sell, rent, or trade your personal data to third parties for advertising or marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  4. Data Retention & Security Measures
                </h2>
                <p>
                  Inquiries are retained for as long as necessary to fulfill project evaluation, contract execution, and ongoing support obligations. We implement multi-layered safeguards including:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>TLS 1.3 encryption in transit for all web traffic</li>
                  <li>Firestore security rules restricting inquiry records to authenticated administrative accounts</li>
                  <li>Routine dependency reviews and vulnerability patching</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  5. Your Rights (GDPR & CCPA)
                </h2>
                <p>Depending on your jurisdiction, you have the right to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request the complete deletion of your records (see our <Link href="/data-deletion" className="text-[#FF5B4D] hover:underline font-semibold">Data Deletion Policy</Link>)</li>
                  <li>Object to or restrict certain processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                  6. Contact & Data Protection Inquiries
                </h2>
                <p>
                  To exercise your privacy rights or submit questions regarding this policy, contact our data protection team directly at:
                </p>
                <div className="mt-3 p-4 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] text-xs">
                  <p><strong>RouR Tech Data Protection Office</strong></p>
                  <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-[#FF5B4D] font-semibold">{siteConfig.email}</a></p>
                  <p>Address: {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}, {siteConfig.address.country}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenContact={() => {}} onSelectService={() => {}} />
    </div>
  );
}
