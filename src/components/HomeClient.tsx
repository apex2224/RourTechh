"use client";

import React, { type ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { ServicesSection } from "./ServicesSection";
import { ProcessSection } from "./ProcessSection";
import { WhyChooseUs } from "./WhyChooseUs";
import { ContactSection } from "./ContactSection";
import { FAQSection } from "./FAQSection";
import { BlogSection } from "./BlogSection";
import { NewsletterSection } from "./NewsletterSection";
import { Footer } from "./Footer";
import WebMcpTools from "./WebMcpTools";
import { Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";
import type { BlogPost } from "@/types";
import { siteConfig } from "@/lib/siteConfig";

export default function HomeClient({ hero }: { hero: ReactNode }) {
  const router = useRouter();

  const [prefilledService, setPrefilledService] = useState<string>("");
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handleScrollToContact = () => {
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleScrollToContact();
  };

  const handleOpenContactPopup = () => {
    setIsContactPopupOpen(true);
  };

  const handleOpenInquiryForm = () => {
    setIsContactPopupOpen(false);
    handleScrollToContact();
  };

  const handleSelectArticle = (post: BlogPost) => {
    router.push("/blog/" + post.slug);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <WebMcpTools />
      <Header
        onOpenContact={handleOpenContactPopup}
        onNavigateHome={() => router.push("/")}
        isArticleView={false}
      />

      <main className="flex-1">
        {hero}
        <div className="content-visibility-auto">
          <ServicesSection
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
            onViewCaseStudy={() => {
              const el = document.getElementById("services");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          <ProcessSection />
          <WhyChooseUs />
          <BlogSection onSelectPost={handleSelectArticle} />
          <FAQSection onStartProject={handleOpenContactPopup} />
          <ContactSection
            prefilledService={prefilledService}
            onWhatsAppClick={handleOpenContactPopup}
            onInquirySubmitted={() => {}}
          />
          <NewsletterSection />
        </div>
      </main>

      <Footer
        onOpenContact={handleOpenContactPopup}
        onSelectService={handleSelectServiceForInquiry}
      />

      {isContactPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-contact-title"
          onClick={() => setIsContactPopupOpen(false)}
        >
          <div
            className="relative w-full max-w-md border border-[#E8E8E8] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsContactPopupOpen(false)}
              className="absolute right-4 top-4 p-1 text-[#777777] hover:text-[#111111]"
              aria-label="Close contact options"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF5B4D]">
              Contact RouR Tech
            </p>
            <h2
              id="quick-contact-title"
              className="mt-2 pr-8 text-2xl font-bold text-[#111111] font-display"
            >
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#666666]">
              Choose the quickest way to reach us, or share your project details
              through the form.
            </p>

            <div className="mt-6 grid gap-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 border border-[#E8E8E8] p-3 text-sm font-semibold text-[#111111] hover:border-[#FF5B4D] transition-colors"
              >
                <Mail className="h-5 w-5 text-[#FF5B4D]" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-[#E8E8E8] p-3 text-sm font-semibold text-[#111111] hover:border-[#FF5B4D] transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-[#FF5B4D]" />
                WhatsApp us
              </a>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 border border-[#E8E8E8] p-3 text-sm font-semibold text-[#111111] hover:border-[#FF5B4D] transition-colors"
              >
                <Phone className="h-5 w-5 text-[#FF5B4D]" />
                {siteConfig.contact.displayPhone}
              </a>
              <div className="flex items-center gap-3 border border-[#E8E8E8] p-3 text-sm text-[#555555]">
                <MapPin className="h-5 w-5 text-[#FF5B4D]" />
                {siteConfig.contact.address}
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenInquiryForm}
              className="mt-5 flex w-full items-center justify-center bg-[#111111] px-4 py-3 text-sm font-semibold text-white hover:bg-[#FF5B4D] transition-colors"
            >
              Send project details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
