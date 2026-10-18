"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ServiceItem } from "../types";
import { servicesData } from "../data/servicesData";
import { 
  Code2, 
  Palette, 
  TrendingUp, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2,
  Clock,
  Wallet,
  Cpu,
  ChevronRight,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SITE_URL } from "@/lib/siteConfig";

interface ServicePageTemplateProps {
  service: ServiceItem;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ service }) => {
  const router = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const getServiceIcon = (iconName: string, size = "w-12 h-12") => {
    const props = { className: `${size} text-[#FF5B4D]` };
    switch (iconName) {
      case "Code2": return <Code2 {...props} />;
      case "Palette": return <Palette {...props} />;
      case "TrendingUp": return <TrendingUp {...props} />;
      case "ShoppingBag": return <ShoppingBag {...props} />;
      case "Layers": return <Layers {...props} />;
      case "ShieldCheck": return <ShieldCheck {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  const handleStartProject = () => {
    router.push("/contact?service=" + encodeURIComponent(service.title));
  };

  const otherServices = servicesData.filter((s) => s.id !== service.id);

  // Schema.org JSON-LD structured data
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.shortDescription,
    "provider": {
      "@type": "Organization",
      "name": "RouR Tech",
      "url": SITE_URL,
    },
    "serviceType": service.title,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${SITE_URL}/#services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `${SITE_URL}/services/${service.slug || service.id}`,
      },
    ],
  };

  const jsonLdFaq = service.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      }
    : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      <Header
        onOpenContact={handleStartProject}
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
              <li>
                <Link href="/#services" className="hover:text-[#111111] transition-colors">
                  Services
                </Link>
              </li>
              <li className="text-[#888888] font-bold">/</li>
              <li className="text-[#111111] font-semibold truncate" aria-current="page">
                {service.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Service Hero */}
        <section className="relative overflow-hidden bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl"
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#FFF2F0] rounded-xl border border-[#FF5B4D]/20">
                  {getServiceIcon(service.iconName, "w-8 h-8")}
                </div>
                <span className="text-xs font-bold text-[#FF5B4D] tracking-widest uppercase">
                  RouR Tech Core Capability
                </span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight font-display mb-6"
              >
                {service.title}
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed mb-8 max-w-3xl font-body"
              >
                {service.fullDescription}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleStartProject}
                  className="px-8 py-4 text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-6 px-6 py-4 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#888888]" />
                    <span className="text-xs font-mono-data text-[#555555]">
                      Timeline: {service.typicalTimeline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#888888]" />
                    <span className="text-xs font-mono-data text-[#555555]">
                      Pricing: {service.startingBudget}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.03] pointer-events-none">
            {getServiceIcon(service.iconName, "w-[600px] h-[600px]")}
          </div>
        </section>

        {/* Problems Solved & Use Cases Grid */}
        {(service.problemsSolved || service.useCases) && (
          <section className="py-16 md:py-20 bg-white border-b border-[#E8E8E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Problems We Solve */}
                {service.problemsSolved && (
                  <div className="bg-[#FFF8F7] p-8 rounded-2xl border border-[#FF5B4D]/15">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-[#FFF2F0] rounded-lg text-[#FF5B4D]">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-[#111111] font-display">
                        Challenges We Solve
                      </h2>
                    </div>
                    <ul className="space-y-4">
                      {service.problemsSolved.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#FF5B4D] shrink-0 mt-2" />
                          <p className="text-sm text-[#444444] leading-relaxed">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ideal Use Cases */}
                {service.useCases && (
                  <div className="bg-[#F8F8F6] p-8 rounded-2xl border border-[#E8E8E8]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-white rounded-lg text-[#111111] border border-[#E8E8E8]">
                        <Sparkles className="w-5 h-5 text-[#FF5B4D]" />
                      </div>
                      <h2 className="text-xl font-bold text-[#111111] font-display">
                        Ideal Use Cases
                      </h2>
                    </div>
                    <ul className="space-y-4">
                      {service.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#111111] shrink-0 mt-2" />
                          <p className="text-sm text-[#444444] leading-relaxed">
                            {useCase}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Detailed Deliverables & Process */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Deliverables & Tech */}
              <div className="lg:col-span-7">
                <div className="mb-14">
                  <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                    Scope of Work
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] font-display flex items-center gap-3">
                    <CheckCircle2 className="w-7 h-7 text-[#FF5B4D]" />
                    What We Deliver
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-[#E8E8E8] shadow-xs flex flex-col justify-between">
                      <div className="w-7 h-7 rounded-md bg-[#F8F8F6] flex items-center justify-center text-[#FF5B4D] font-mono-data text-xs font-bold mb-3">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      <p className="text-sm font-medium text-[#111111] leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="mt-14 pt-12 border-t border-[#E8E8E8]">
                  <h3 className="text-xl font-bold text-[#111111] font-display mb-6 flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-[#FF5B4D]" />
                    Technologies & Approach
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.techStack.map((tech) => (
                      <span key={tech} className="px-3.5 py-1.5 bg-white border border-[#E8E8E8] rounded-lg text-xs font-mono-data text-[#111111] shadow-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Delivery Process */}
                {service.process && (
                  <div className="mt-14 pt-12 border-t border-[#E8E8E8]">
                    <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                      Structured Execution
                    </div>
                    <h3 className="text-2xl font-bold text-[#111111] font-display mb-8">
                      Our Delivery Process
                    </h3>
                    <div className="space-y-6">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-[#E8E8E8] flex gap-4">
                          <span className="font-mono-data font-bold text-lg text-[#FF5B4D] shrink-0">
                            {step.step}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-[#111111] font-display mb-1">
                              {step.title}
                            </h4>
                            <p className="text-sm text-[#555555] leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Outcomes & Strategic Value */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-8">
                  <div className="bg-[#111111] rounded-2xl p-8 text-white shadow-xl">
                    <h3 className="text-xl font-bold font-display mb-6">Strategic Outcomes</h3>
                    <ul className="space-y-4">
                      {service.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF5B4D] shrink-0" />
                          <p className="text-sm text-neutral-300 leading-relaxed">
                            {outcome}
                          </p>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={handleStartProject}
                      className="w-full mt-8 py-3.5 bg-[#FF5B4D] hover:bg-[#E84E40] text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Inquire About {service.title.split('&')[0].trim()}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Why RouR Tech Card */}
                  <div className="bg-white rounded-2xl p-7 border border-[#E8E8E8] shadow-sm">
                    <h3 className="text-lg font-bold text-[#111111] font-display mb-3">Why RouR Tech?</h3>
                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
                      Architecture, accessibility, performance, and maintenance needs are discussed and scoped for each project.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-medium text-[#111111]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Project Scope and Milestones Agreed in Writing</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium text-[#111111]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Communication and Review Arrangements Agreed for the Project</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium text-[#111111]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Ownership and Handover Terms Documented in the Agreement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="py-16 md:py-24 bg-white border-t border-[#E8E8E8]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                  Common Inquiries
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111] font-display flex items-center justify-center gap-2">
                  <HelpCircle className="w-7 h-7 text-[#FF5B4D]" />
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#E8E8E8] rounded-xl overflow-hidden transition-all bg-[#F8F8F6]"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between text-base font-semibold text-[#111111] hover:text-[#FF5B4D] transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <ChevronRight
                          className={`w-5 h-5 text-[#888888] transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-90 text-[#FF5B4D]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm text-[#555555] leading-relaxed border-t border-[#E8E8E8]/60 bg-white">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Explore Other Services */}
        <section className="py-16 md:py-20 bg-[#F8F8F6] border-t border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold text-[#FF5B4D] tracking-widest uppercase block mb-1">
                  Full Service Agency
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display">
                  Explore Complementary Capabilities
                </h2>
              </div>
              <Link
                href="/#services"
                className="text-xs font-semibold text-[#FF5B4D] hover:underline flex items-center gap-1"
              >
                <span>All Capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherServices.slice(0, 3).map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug || other.id}`}
                  className="group bg-white p-6 rounded-xl border border-[#E8E8E8] shadow-xs hover-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#F8F8F6] flex items-center justify-center text-[#111111] group-hover:text-[#FF5B4D] group-hover:bg-[#FFF2F0] transition-colors mb-4">
                      {getServiceIcon(other.iconName, "w-4 h-4")}
                    </div>
                    <h3 className="text-base font-bold text-[#111111] group-hover:text-[#FF5B4D] transition-colors font-display mb-2">
                      {other.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#F0F0EE] flex items-center justify-between text-xs text-[#888888]">
                    <span>From {other.startingBudget}</span>
                    <span className="text-[#111111] group-hover:text-[#FF5B4D] font-semibold flex items-center gap-1">
                      Learn more <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Global Conversion CTA */}
        <section className="py-20 md:py-28 bg-white border-t border-[#E8E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display mb-6 tracking-tight">
              Ready to engineer your next digital breakthrough?
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-10 max-w-2xl mx-auto leading-relaxed font-body">
              Share your project objectives so the scope, timeline, and next steps can be discussed.
            </p>
            <button
              onClick={handleStartProject}
              className="px-9 py-4 text-sm sm:text-base font-bold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Discovery Call</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer
        onOpenContact={handleStartProject}
        onSelectService={(title) => {
          const match = servicesData.find((s) => s.title === title);
          if (match) {
            router.push(`/services/${match.slug || match.id}`);
          }
        }}
      />
    </div>
  );
};
