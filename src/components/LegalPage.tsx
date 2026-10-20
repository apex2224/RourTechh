import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export interface LegalSection {
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  label?: string;
  description?: string;
  sections: LegalSection[];
}

export function LegalPage({
  title,
  label = "Legal & Governance",
  description,
  sections,
}: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} />

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
                {title}
              </li>
            </ol>
          </nav>

          <article className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-14 shadow-xs">
            <header className="border-b border-[#E8E8E8] pb-6 mb-8">
              <span className="text-xs font-mono-data font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-2">
                {label}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 text-sm text-[#666666]">{description}</p>
              ) : null}
              <p className="text-xs text-[#888888] mt-3 font-mono-data">
                Last updated: October 20, 2026
              </p>
            </header>

            <div className="prose prose-neutral max-w-none text-sm text-[#444444] leading-relaxed space-y-8">
              {sections.map((section, index) => (
                <section key={section.title}>
                  <h2 className="text-xl font-bold text-[#111111] font-display mb-3">
                    {index + 1}. {section.title}
                  </h2>
                  {section.content}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
