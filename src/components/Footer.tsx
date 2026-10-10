import React from "react";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "../data/servicesData";

interface FooterProps {
  onOpenContact: () => void;
  onOpenCms: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenCms,
  onSelectService,
}) => {
  return (
    <footer className="bg-white border-t border-[#E8E8E8] pt-16 pb-12 text-[#555555]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Company Positioning & Conversion Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E8E8E8]">
          <div className="lg:col-span-6 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-2xl font-bold tracking-tight text-[#111111] font-display block"
            >
              Vanguard Digital
            </a>
            <p className="text-sm text-[#555555] max-w-md leading-relaxed font-body">
              Engineering high-performance digital products, bespoke web
              applications, and resilient headless commerce systems for
              ambitious global brands.
            </p>
            <div className="pt-2 text-xs text-[#777777] space-y-1">
              <p>
                Atelier: 450 Mission Street, Suite 1400, San Francisco, CA 94105
              </p>
              <p>
                Direct: partnerships@vanguarddigital.agency · +1 (415) 890-4210
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between sm:items-end">
            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-1">
                Accepting Q4 / Q1 Engagements
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
                Ready to elevate your digital flagship?
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Initiate Discovery Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#E8E8E8] text-xs">
          {/* Services Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onSelectService(s.title)}
                    className="text-[#666666] hover:text-[#111111] transition-colors cursor-pointer text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Explore Studio
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#work"
                  className="text-[#666666] hover:text-[#111111] transition-colors"
                >
                  Case Studies & Proof
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-[#666666] hover:text-[#111111] transition-colors"
                >
                  Engineering Workflow
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  className="text-[#666666] hover:text-[#111111] transition-colors"
                >
                  Architectural Insights
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-[#666666] hover:text-[#111111] transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#666666] hover:text-[#111111] transition-colors"
                >
                  Project Inbound Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Technical Governance Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              System Architecture
            </h4>
            <ul className="space-y-2.5 text-[#666666]">
              <li>Core Web Vitals SLA (95+)</li>
              <li>Next.js 15 & React 19</li>
              <li>TypeScript Type Safety</li>
              <li>WCAG 2.1 AA Compliant</li>
              <li>SOC 2 Security Alignment</li>
              <li>Schema.org JSON-LD Graphs</li>
            </ul>
          </div>

          {/* Administration & Internal Tools */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Operations & SEO
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenCms}
                  className="text-[#FF5B4D] hover:underline font-semibold cursor-pointer"
                >
                  Open CMS & SEO Manager
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCms}
                  className="text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Inspect /sitemap.xml
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCms}
                  className="text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Inspect /robots.txt
                </button>
              </li>
              <li>
                <span className="text-[#888888]">
                  Canonical: vanguarddigital.agency
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Quiet Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-4">
          <p>© 2026 Vanguard Digital Agency. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Client IP Protected</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking Telemetry</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenCms}
              className="hover:text-[#111111] transition-colors"
            >
              Editorial CMS Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
