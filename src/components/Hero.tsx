import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative flex min-h-0 items-center overflow-hidden border-b border-[#E8E8E8] py-10 md:min-h-[calc(100vh-72px)] md:py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(255,91,77,0.055),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center rounded-full border border-[#FF5B4D]/20 bg-[#FFF2F0] px-3 py-1 text-xs font-semibold text-[#B84238] mb-4">
            Trusted digital product engineering partner
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-[#111111] leading-[1.04] tracking-tight font-display text-balance mb-5">
            Digital products that are{" "}
            <span className="text-[#B84238]">clear, fast, and built to last.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#555555] leading-relaxed font-body mb-7">
            RouR Tech designs and develops websites and web applications that
            make complex businesses easier to understand, use, and grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              href="/contact"
              className="px-6 py-3.5 text-sm font-semibold text-white bg-[#B84238] hover:bg-[#A33830] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <a
              href="#services"
              className="px-6 py-3.5 text-sm font-semibold text-[#111111] bg-white hover:bg-[#F2F2EE] border border-[#E8E8E8] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-3">
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
                <span className="font-mono-data text-xs text-[#B84238]">
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
