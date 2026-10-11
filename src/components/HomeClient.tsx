"use client";

import React, { useEffect, useState } from "react";
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
import { initialBlogPosts } from "@/data/blogData";
import { BlogPost } from "@/types";
import { loadPublishedBlogPosts } from "@/lib/blogPosts";

export default function HomeClient() {
  const router = useRouter();

  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  const [prefilledService, setPrefilledService] = useState<string>("");
  const [activeCaseStudyId, setActiveCaseStudyId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    loadPublishedBlogPosts()
      .then((publishedPosts) => {
        if (!cancelled && publishedPosts) setPosts(publishedPosts);
      })
      .catch((error) => {
        console.error("Could not load published articles from Firestore:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
        onSelectService={handleSelectServiceForInquiry}
      />
    </div>
  );
}
