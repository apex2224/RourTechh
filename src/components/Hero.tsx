import React, { useEffect, useRef, useState } from "react";

import { ArrowDown, ArrowUpRight, Play, Pause, Sparkles } from "lucide-react";

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationPlaying, setAnimationPlaying] = useState(true);
  const animationRef = useRef<number | null>(null);

  // Lightweight Abstract Technology Mesh Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Nodes for dynamic technological constellation
    const points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    const numPoints = Math.min(36, Math.floor(width / 30));

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
      });
    }

    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient organic wave gradients
      t += 0.008;
      const gradient = ctx.createRadialGradient(
        width * 0.7,
        height * 0.4,
        20,
        width * 0.7,
        height * 0.4,
        width * 0.6,
      );
      gradient.addColorStop(0, "rgba(255, 91, 77, 0.055)");
      gradient.addColorStop(0.5, "rgba(230, 230, 226, 0.04)");
      gradient.addColorStop(1, "rgba(248, 248, 246, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect nodes with hairline vectors
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 140) * 0.16;
            ctx.strokeStyle = `rgba(17, 17, 17, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          i % 7 === 0 ? "rgba(255, 91, 77, 0.4)" : "rgba(17, 17, 17, 0.2)";
        ctx.fill();
      }

      if (animationPlaying) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    if (animationPlaying) {
      animationRef.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animationPlaying]);

  return (
    <section className="relative overflow-hidden border-b border-[#E8E8E8] pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background Interactive Ambient Canvas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#666666] tracking-wider uppercase mb-5">
              <span>Web Development</span>
              <span aria-hidden="true">·</span>
              <span>Digital Solutions</span>
              <span aria-hidden="true">·</span>
              <span>SEO Optimization</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight font-display text-balance mb-6">
              Building High-Performance Websites & Digital Solutions.
            </h1>

            {/* Supporting business description */}
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-body mb-8">
              RourTech designs and develops fast, responsive and SEO-friendly
              websites and web applications that help businesses strengthen
              their online presence, improve user experience and grow their
              digital reach.
            </p>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
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
                <span>Explore Our Work</span>
              </button>

              {/* Pause/Play Ambient Canvas toggle */}
              <button
                onClick={() => setAnimationPlaying(!animationPlaying)}
                className="p-3 text-[#666666] hover:text-[#111111] border border-transparent hover:border-[#E8E8E8] rounded-lg transition-colors text-xs flex items-center gap-1.5"
                title={
                  animationPlaying
                    ? "Pause ambient motion"
                    : "Resume ambient motion"
                }
                aria-label={
                  animationPlaying
                    ? "Pause ambient motion"
                    : "Resume ambient motion"
                }
              >
                {animationPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span className="sr-only sm:not-sr-only text-xs">
                  {animationPlaying ? "Ambient: Live" : "Paused"}
                </span>
              </button>
            </div>

            {/* Service Highlights */}
            <div className="pt-6 border-t border-[#E8E8E8] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] font-mono-data">
                  Responsive
                </p>
                <p className="text-xs text-[#666666] mt-0.5">
                  Mobile-Friendly Design
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] font-mono-data">
                  SEO-Ready
                </p>
                <p className="text-xs text-[#666666] mt-0.5">
                  Search-Friendly Structure
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] font-mono-data">
                  Modern
                </p>
                <p className="text-xs text-[#666666] mt-0.5">
                  Web Technologies
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-[#111111] font-mono-data">
                  Scalable
                </p>
                <p className="text-xs text-[#666666] mt-0.5">
                  Built for Business Growth
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#E8E8E8] bg-white shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F2EE]">
                <img
                  src="/src/assets/images/hero_digital_agency_1791271576191.jpg"
                  alt="RourTech digital agency providing web development, website design and SEO solutions"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Zero broken image policy fallback
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add(
                        "flex",
                        "items-center",
                        "justify-center",
                        "bg-neutral-100",
                      );
                      parent.innerHTML =
                        '<div class="p-8 text-center text-xs text-neutral-500 font-mono">RourTech — Digital Solutions & Web Development</div>';
                    }
                  }}
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div>
                    <span className="font-medium tracking-wide">
                      RourTech Digital Solutions
                    </span>
                    <span className="text-white/70 block text-[11px]">
                      Web Development · Design · SEO
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[11px] bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                      Digital Experiences
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Capability Micro-Strip */}
              <div className="p-4 bg-white border-t border-[#E8E8E8] flex items-center justify-between text-xs text-[#555555]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5B4D]" />
                  <span className="font-medium text-[#111111]">
                    Modern Web Development
                  </span>
                </div>
                <span className="font-mono-data text-[#888888]">
                  Next.js · React · TypeScript
                </span>
              </div>
            </div>

            {/* Floating Annotation */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#FFFFFF] border border-[#E8E8E8] rounded-lg p-3 shadow-lg max-w-xs items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <p className="text-xs text-[#333333] leading-tight">
                Let's discuss your next{" "}
                <strong className="text-[#111111]">digital project</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onExploreWork}
            className="flex items-center gap-2 text-xs font-medium text-[#777777] hover:text-[#111111] transition-colors py-1 group"
            aria-label="Explore web development services and projects"
          >
            <span>Explore Services & Projects</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
