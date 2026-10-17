"use client";

import React from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContactSection } from "./ContactSection";
import { useSearchParams, useRouter } from "next/navigation";

export default function ContactPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialService = searchParams.get("service") || "";

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header
        onOpenContact={() => {
          const el = document.getElementById("contact");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onNavigateHome={() => router.push("/")}
        isArticleView={false}
      />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-[#E8E8E8] py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-xs text-[#666666]">
              <li>
                <Link href="/" className="hover:text-[#111111] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold" aria-current="page">
                Contact & Project Inbound
              </li>
            </ol>
          </div>
        </nav>

        {/* Embedded Contact Section */}
        <ContactSection
          prefilledService={initialService}
          onInquirySubmitted={() => {}}
        />
      </main>

      <Footer
        onOpenContact={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSelectService={(serviceTitle) => {
          router.push(`/contact?service=${encodeURIComponent(serviceTitle)}`);
        }}
      />
    </div>
  );
}
