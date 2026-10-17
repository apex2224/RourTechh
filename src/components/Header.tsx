"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenContact?: () => void;
  activeSection?: string;
  onNavigateHome?: () => void;
  isArticleView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenContact,
  onNavigateHome,
  isArticleView = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", hash: "#services", fallback: "/#services" },
    { label: "Work", hash: "#work", fallback: "/portfolio" },
    { label: "Process", hash: "#process", fallback: "/#process" },
    { label: "Insights", hash: "#insights", fallback: "/blog" },
    { label: "FAQ", hash: "#faq", fallback: "/faq" },
    { label: "About", hash: "#about", fallback: "/about" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
    fallback: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const isHomePage = pathname === "/";

    if (isHomePage) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (isArticleView && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return;
    }

    // On other pages, route to fallback
    router.push(fallback);
  };

  const handleStartProjectClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      router.push("/contact");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F8F6]/90 backdrop-blur-md border-b border-[#E8E8E8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] font-display flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] rounded"
          aria-label="RouR Tech Home"
        >
          <span>RouR Tech</span>
        </Link>

        {/* Zone 2: Clean Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#666666]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.fallback}
              onClick={(e) => handleNavClick(e, link.hash, link.fallback)}
              className="text-[#555555] hover:text-[#111111] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FF5B4D] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStartProjectClick}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#444444] hover:text-[#111111] hover:bg-black/5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-b border-[#E8E8E8] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.fallback}
                onClick={(e) => handleNavClick(e, link.hash, link.fallback)}
                className="px-3 py-2 text-base font-medium text-[#333333] hover:text-[#111111] hover:bg-[#F8F8F6] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E8E8E8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartProjectClick();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
