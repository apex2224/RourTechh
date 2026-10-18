import React from "react";
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
  return (
    <section className="relative flex min-h-0 items-center overflow-hidden border-b border-[#E8E8E8] py-10 md:min-h-[calc(100vh-72px)] md:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,91,77,0.055),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
        <Code2 className="hero-float absolute left-[8%] top-[18%] h-12 w-12 text-[#3178C6]/10" strokeWidth={1.5} />
        <Braces className="hero-float absolute left-[22%] bottom-[18%] h-10 w-10 text-[#FF5B4D]/14" strokeWidth={1.5} style={{ animationDelay: "-1.5s" }} />
        <Database className="hero-float absolute right-[10%] top-[24%] h-14 w-14 text-[#3178C6]/10" strokeWidth={1.5} style={{ animationDelay: "-3s" }} />
        <Layers className="hero-float absolute right-[22%] bottom-[19%] h-10 w-10 text-[#FF5B4D]/10" strokeWidth={1.5} style={{ animationDelay: "-4.5s" }} />
        <Sparkles className="hero-float absolute left-[48%] top-[10%] h-8 w-8 text-[#FFB21A]/16" strokeWidth={1.5} style={{ animationDelay: "-2.5s" }} />
        <CodeXml className="hero-float absolute right-[30%] top-[12%] h-9 w-9 text-[#E34F26]/10" strokeWidth={1.5} style={{ animationDelay: "-5.5s" }} />
        <Cloud className="hero-float absolute left-[14%] bottom-[10%] h-10 w-10 text-[#2496ED]/10" strokeWidth={1.5} style={{ animationDelay: "-6.5s" }} />
        <GitBranch className="hero-float absolute right-[7%] bottom-[12%] h-9 w-9 text-[#3178C6]/10" strokeWidth={1.5} style={{ animationDelay: "-7.5s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center rounded-full border border-[#FF5B4D]/20 bg-[#FFF2F0] px-3 py-1 text-xs font-semibold text-[#B84238] mb-4">
            Trusted digital product engineering partner
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-[#111111] leading-[1.04] tracking-tight font-display text-balance mb-5">
            Digital products that are <span className="text-[#FF5B4D]">clear, fast, and built to last.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#555555] leading-relaxed font-body mb-7">
            RouR Tech designs and develops websites and web applications that
            make complex businesses easier to understand, use, and grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
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

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ["01", "Web experiences", "Clear interfaces that help people find their way."],
            ["02", "Solid foundations", "Thoughtful code that stays maintainable as you grow."],
            ["03", "Measured performance", "Fast, accessible builds made for real devices and people."],
          ].map(([number, title, description]) => (
            <div key={number} className="border border-[#E8E8E8] bg-white p-5 text-left shadow-xs">
              <span className="font-mono-data text-xs text-[#FF5B4D]">{number}</span>
              <h2 className="mt-4 text-base font-bold text-[#111111] font-display">{title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#666666]">{description}</p>
            </div>
          ))}
        </div>

      </div>
      </div>
    </section>
  );
};
