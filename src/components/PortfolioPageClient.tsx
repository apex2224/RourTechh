"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { projectsData } from "@/data/projectsData";
import { CaseStudy } from "@/types";
import { CaseStudyModal } from "./CaseStudyModal";
import { 
  ArrowUpRight, 
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PortfolioPageClient() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  const categories = ["All", "Web Application", "E-commerce", "Enterprise"];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const handleStartProject = () => {
    router.push("/contact");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header
        onOpenContact={handleStartProject}
        onNavigateHome={() => router.push("/")}
        isArticleView={false}
      />

      <main className="flex-1">
        {/* Breadcrumb */}
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
                Portfolio & Case Studies
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white border-b border-[#E8E8E8] pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF2F0] rounded-full border border-[#FF5B4D]/20 text-[#FF5B4D] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Work & Results</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] font-display tracking-tight leading-[1.1] mb-6">
              Featured Case Studies & Technical Proof
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-3xl font-body mb-8">
              Explore how we engineer sub-second web applications, headless commerce systems, and resilient custom software platforms for organizations worldwide.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-[#111111] text-white shadow-xs"
                      : "bg-[#F2F2EE] text-[#555555] hover:text-[#111111] hover:bg-[#E8E8E4]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-[#E8E8E8] overflow-hidden shadow-xs hover-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative aspect-video w-full bg-neutral-100 overflow-hidden border-b border-[#E8E8E8]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.industry}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 font-mono">
                          {project.title}
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-semibold text-white tracking-wide">
                        {project.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-xs font-semibold text-[#FF5B4D] uppercase tracking-wider mb-2">
                        {project.industry}
                      </div>
                      <h3 className="text-xl font-bold text-[#111111] font-display mb-3 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-6 line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Primary Metrics Highlight */}
                      <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
                        {project.results.slice(0, 2).map((res, i) => (
                          <div key={i}>
                            <span className="text-base font-extrabold text-[#111111] font-mono-data block">
                              {res.metric}
                            </span>
                            <span className="text-[11px] text-[#666666] leading-tight block">
                              {res.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-[#F2F2EE] rounded text-[11px] font-mono-data text-[#555555]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-0.5 bg-[#F2F2EE] rounded text-[11px] font-mono-data text-[#888888]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setActiveCaseStudy(project)}
                      className="w-full py-3 bg-[#F8F8F6] hover:bg-[#111111] text-[#111111] hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Read In-Depth Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-white border-t border-[#E8E8E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display mb-6">
              Have a high-impact project in mind?
            </h2>
            <p className="text-base sm:text-lg text-[#555555] mb-8 max-w-xl mx-auto">
              Our engineering team will assess your scope, performance objectives, and architecture.
            </p>
            <button
              onClick={handleStartProject}
              className="px-9 py-4 text-sm sm:text-base font-bold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Initiate Project Discovery</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onStartProject={handleStartProject}
      />

      <Footer
        onOpenContact={handleStartProject}
        onSelectService={(serviceTitle) => {
          router.push(`/contact?service=${encodeURIComponent(serviceTitle)}`);
        }}
      />
    </div>
  );
}
