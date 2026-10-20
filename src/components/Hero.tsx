"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Cloud,
  CodeXml,
  Database,
  GitBranch,
  Layers,
  Sparkles,
} from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const rotatingWords = [
    "clear, fast, and built to last.",
    "focused, fast, and built to last.",
    "useful, fast, and built to last.",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotation = window.setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % rotatingWords.length);
    }, 2800);

    return () => window.clearInterval(rotation);
  }, [rotatingWords.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updateParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * -0.08, 24);
        heroParallaxRef.current?.style.setProperty(
          "--parallax-offset",
          `${offset}px`,
        );
        frame = 0;
      });
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden border-b border-[#E8E8E8] py-10 md:min-h-[calc(100vh-72px)] md:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,91,77,0.055),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        ref={heroParallaxRef}
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
        aria-hidden="true"
      >
        <Code2
          className="hero-float absolute left-[8%] top-[18%] h-12 w-12 text-[#3178C6]/10"
          strokeWidth={1.5}
        />
        <Braces
          className="hero-float absolute left-[22%] bottom-[18%] h-10 w-10 text-[#FF5B4D]/14"
          strokeWidth={1.5}
          style={{ animationDelay: "-1.5s" }}
        />
        <Database
          className="hero-float absolute right-[10%] top-[24%] h-14 w-14 text-[#3178C6]/10"
          strokeWidth={1.5}
          style={{ animationDelay: "-3s" }}
        />
        <Layers
          className="hero-float absolute right-[22%] bottom-[19%] h-10 w-10 text-[#FF5B4D]/10"
          strokeWidth={1.5}
          style={{ animationDelay: "-4.5s" }}
        />
        <Sparkles
          className="hero-float absolute left-[48%] top-[10%] h-8 w-8 text-[#FFB21A]/16"
          strokeWidth={1.5}
          style={{ animationDelay: "-2.5s" }}
        />
        <CodeXml
          className="hero-float absolute right-[30%] top-[12%] h-9 w-9 text-[#E34F26]/10"
          strokeWidth={1.5}
          style={{ animationDelay: "-5.5s" }}
        />
        <Cloud
          className="hero-float absolute left-[14%] bottom-[10%] h-10 w-10 text-[#2496ED]/10"
          strokeWidth={1.5}
          style={{ animationDelay: "-6.5s" }}
        />
        <GitBranch
          className="hero-float absolute right-[7%] bottom-[12%] h-9 w-9 text-[#3178C6]/10"
          strokeWidth={1.5}
          style={{ animationDelay: "-7.5s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="hero-reveal inline-flex items-center rounded-full border border-[#FF5B4D]/20 bg-[#FFF2F0] px-3 py-1 text-xs font-semibold text-[#B84238] mb-4">
            Trusted digital product engineering partner
          </div>

          <h1 className="hero-reveal mx-auto max-w-4xl text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-[#111111] leading-[1.04] tracking-tight font-display text-balance mb-5 [animation-delay:100ms]">
            Digital products that are{" "}
            <span
              key={rotatingWords[wordIndex]}
              className="word-rotate inline-block text-[#FF5B4D]"
              aria-live="polite"
            >
              {rotatingWords[wordIndex]}
            </span>
          </h1>

          <p className="hero-reveal mx-auto max-w-2xl text-sm sm:text-base text-[#555555] leading-relaxed font-body mb-7 [animation-delay:180ms]">
            RouR Tech designs and develops websites and web applications that
            make complex businesses easier to understand, use, and grow.
          </p>

          <div className="hero-reveal flex flex-wrap items-center justify-center gap-3 mb-10 [animation-delay:260ms]">
            <button
              onClick={onStartProject}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-sm flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreWork}
              className="px-6 py-3.5 text-sm font-semibold text-[#111111] bg-white hover:bg-[#F2F2EE] border border-[#E8E8E8] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hero-reveal mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3 [animation-delay:340ms]">
            {[
              [
                "01",
                "Website Design That Feels Right",
                "We build clean, responsive websites with intuitive navigation, thoughtful UI/UX design, and clear calls to action—so visitors can find what they need and take the next step.",
              ],
              [
                "02",
                "Scalable Web Development",
                "From business websites to custom web applications, we write maintainable code and build solid foundations that support your business as it grows.",
              ],
              [
                "03",
                "Performance, Accessibility & SEO",
                "A beautiful website should work well, too. We focus on loading speed, mobile usability, accessibility, and technical SEO to help create a better experience for users and search engines.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="border border-[#E8E8E8] bg-white p-5 text-left shadow-xs"
              >
                <span className="font-mono-data text-xs text-[#FF5B4D]">
                  {number}
                </span>

                <h2 className="mt-4 text-base font-bold text-[#111111] font-display">
                  {title}
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
