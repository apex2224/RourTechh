import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

interface FooterProps {
  onOpenContact?: () => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const serviceLinks = [
    {
      title: "Website & Web Application Development",
      href: "/services/web-development",
    },
    {
      title: "UI/UX Design & Website Design",
      href: "/services/ui-ux-design",
    },
    {
      title: "Technical SEO & Website Optimization",
      href: "/services/technical-seo",
    },
    {
      title: "E-commerce Website Development",
      href: "/services/ecommerce-development",
    },
    {
      title: "Custom Software & Web Application Solutions",
      href: "/services/custom-software",
    },
    {
      title: "Website Maintenance, Security & Support",
      href: "/services/maintenance-security",
    },
  ];

  const companyLinks = [
    { title: "About Us", href: "/about" },
    { title: "Portfolio / Projects", href: "/portfolio" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ];

  const resourceLinks = [
    { title: "Blog & Insights", href: "/blog" },
    { title: "FAQs", href: "/faq" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Useful Resources", href: "/resources" },
  ];

  const legalLinks = [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Cookie Policy", href: "/cookie-policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
    { title: "Disclaimer", href: "/disclaimer" },
    { title: "Refund & Cancellation Policy", href: "/refund-policy" },
    { title: "Shipping & Delivery Policy", href: "/shipping-policy" },
    { title: "Acceptable Use Policy", href: "/acceptable-use-policy" },
    { title: "Data Deletion", href: "/data-deletion" },
  ];

  return (
    <footer className="bg-white border-t border-[#E8E8E8] pt-16 pb-12 text-[#555555]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Company Positioning & Conversion Prompt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E8E8E8]">
          <div className="lg:col-span-6 space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[#111111] font-display block"
            >
              RouR Tech
            </Link>
            <p className="text-sm text-[#555555] max-w-md leading-relaxed font-body">
              Engineering high-performance digital products, custom web
              applications, resilient headless commerce systems, and conversion-focused
              digital experiences.
            </p>
            <div className="pt-2 text-xs text-[#777777] space-y-1.5 font-mono-data">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF5B4D] shrink-0" />
                <span>Atelier: {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF5B4D] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#111111] transition-colors">
                  {siteConfig.email}
                </a>
                <span aria-hidden="true">·</span>
                <Phone className="w-3.5 h-3.5 text-[#FF5B4D] shrink-0" />
                <span>{siteConfig.phone}</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between sm:items-end">
            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-[#FF5B4D] uppercase tracking-wider block mb-1">
                Accepting New Engagements
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
                Ready to elevate your digital flagship?
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {onOpenContact ? (
                <button
                  onClick={onOpenContact}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Initiate Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Initiate Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Middle Tier: Organized Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#E8E8E8] text-xs">
          {/* Services Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[#666666] hover:text-[#111111] transition-colors block leading-relaxed"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-[#666666] hover:text-[#111111] transition-colors block leading-relaxed"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Resources & Insights
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-[#666666] hover:text-[#111111] transition-colors block leading-relaxed"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/sitemap.xml"
                  className="text-[#FF5B4D] hover:underline font-semibold block"
                >
                  XML Sitemap
                </Link>
              </li>
              <li>
                <Link
                  href="/robots.txt"
                  className="text-[#888888] hover:text-[#111111] transition-colors block"
                >
                  Robots.txt
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[#111111] mb-4">
              Legal & Policies
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[#666666] hover:text-[#111111] transition-colors block leading-relaxed"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-4">
          <p>© 2026 RouR Tech. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span>Client IP Protected</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking Telemetry</span>
            <span aria-hidden="true">·</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#111111] transition-colors"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-[#111111] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
