"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ServicesSection } from "./ServicesSection";
import { ProjectsSection } from "./ProjectsSection";
import { ProcessSection } from "./ProcessSection";
import { WhyChooseUs } from "./WhyChooseUs";
import { TrustSection } from "./TrustSection";
import { ContactSection } from "./ContactSection";
import { FAQSection } from "./FAQSection";
import { BlogSection } from "./BlogSection";
import { NewsletterSection } from "./NewsletterSection";
import { Footer } from "./Footer";
import { CmsAdminModal } from "./CmsAdminModal";
import { initialBlogPosts } from "@/data/blogData";
import { BlogPost } from "@/types";

export default function HomeClient() {
  const router = useRouter();

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window === "undefined") return initialBlogPosts;
    try {
      const stored = localStorage.getItem("vanguard_posts");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error loading posts from localStorage", e);
    }
    return initialBlogPosts;
  });

  const [prefilledService, setPrefilledService] = useState<string>("");
  const [cmsModalOpen, setCmsModalOpen] = useState(false);
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(
    null,
  );

  const handleUpdatePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem("vanguard_posts", JSON.stringify(newPosts));
    } catch (e) {
      console.error("Error saving posts to localStorage", e);
    }
  };

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

  const handleViewCaseStudy = (caseStudyId: string) => {
    setActiveCaseStudyId(caseStudyId);
    setTimeout(() => {
      const workEl = document.getElementById("work");
      if (workEl) workEl.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSelectArticle = (post: BlogPost) => {
    router.push("/blog/" + post.slug);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header
        onOpenContact={handleScrollToContact}
        onOpenCms={() => setCmsModalOpen(true)}
        onNavigateHome={() => router.push("/")}
        isArticleView={false}
      />

      <main className="flex-1">
        <Hero
          onStartProject={handleScrollToContact}
          onExploreWork={() => {
            const el = document.getElementById("work");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
          onViewCaseStudy={handleViewCaseStudy}
        />
        <ProjectsSection
          onStartProject={handleScrollToContact}
          activeCaseStudyId={activeCaseStudyId}
          onClearActiveCaseStudy={() => setActiveCaseStudyId(null)}
        />
        <ProcessSection />
        <WhyChooseUs />
        <TrustSection />
        <BlogSection posts={posts} onSelectPost={handleSelectArticle} />
        <FAQSection onStartProject={handleScrollToContact} />
        <ContactSection
          prefilledService={prefilledService}
          onInquirySubmitted={() => {}}
        />
        <NewsletterSection />
      </main>

      <Footer
        onOpenContact={handleScrollToContact}
        onOpenCms={() => setCmsModalOpen(true)}
        onSelectService={handleSelectServiceForInquiry}
      />

      <CmsAdminModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
        posts={posts}
        onUpdatePosts={handleUpdatePosts}
        onViewArticle={handleSelectArticle}
      />
    </div>
  );
}
