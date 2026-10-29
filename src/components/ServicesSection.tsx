"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Palette,
  TrendingUp,
  ShoppingBag,
  Layers,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { ServiceItem } from "../types";
import { ServiceDetailModal } from "./ServiceDetailModal";

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
  onViewCaseStudy?: (caseStudyId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
  onViewCaseStudy,
}) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="services"
      className="py-20 md:py-28 border-b border-[#E8E8E8] bg-[#F8F8F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#B84238] tracking-wider uppercase mb-2">
              Web Development & Digital Services
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
              Website Development & Digital Solutions for Growing Businesses.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-md">
            Explore web development, website design, UI/UX, SEO optimization and
            other digital services designed to improve your online presence,
            user experience and business growth.
          </p>
        </div>

        {/* 6-Card Scalable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => {
            const stepNum = String(index + 1).padStart(2, "0");
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl p-7 border border-[#E8E8E8] shadow-xs hover-lift flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top Bar inside card: Editorial Number & Icon */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0F0EE]">
                    <span className="text-xs font-bold font-mono-data text-[#666666] tracking-widest">
                      {stepNum}.
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#F8F8F6] border border-[#E8E8E8] flex items-center justify-center text-[#111111] group-hover:bg-[#FFF2F0] group-hover:text-[#FF5B4D] group-hover:border-[#FF5B4D]/30 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-[#111111] font-display mb-3 group-hover:text-[#B84238] transition-colors">
                    <Link href={`/services/${service.slug || service.id}`}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Top 3 Deliverables */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#666666]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B4D] shrink-0 mt-1.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer of Card: Investment baseline + Trigger Buttons */}
                <div className="pt-5 border-t border-[#F0F0EE] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#666666] block text-[11px]">
                      Starting Price
                    </span>
                    <span className="font-bold text-[#111111] font-mono-data">
                      {service.startingBudget}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setActiveService(service);
                      }}
                      className="inline-flex items-center rounded-md border border-[#E8E8E8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#B84238] transition-colors hover:border-[#FF5B4D] hover:bg-[#FFF2F0] cursor-pointer"
                      aria-label={`Quick overview for ${service.title}`}
                    >
                      Quick View
                    </button>
                    <span className="text-[#E0E0DD]">|</span>
                    <Link
                      href={`/services/${service.slug || service.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:text-[#B84238] transition-colors group-hover:translate-x-0.5 duration-150"
                      aria-label={`Dedicated page for ${service.title}`}
                    >
                      <span>Full Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Bottom Banner for Custom Project Scopes */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-[#E8E8E8] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#111111] font-display">
              Need a Custom Website or Software Solution?
            </h4>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Discuss custom web applications, e-commerce platforms, API
              integrations, design systems and tailored digital solutions for
              your business requirements.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForInquiry("Custom Enterprise Scope")}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#111111] bg-[#F2F2EE] hover:bg-[#E8E8E4] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Deep Dive Modal */}
      <ServiceDetailModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onSelectForInquiry={onSelectServiceForInquiry}
        onViewCaseStudy={onViewCaseStudy}
      />
    </section>
  );
};
