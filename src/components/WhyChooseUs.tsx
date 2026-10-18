import {
  Gauge,
  Palette,
  Search,
  Cpu,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

const projectPriorities = [
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Measure page experience under agreed conditions and prioritize relevant loading, interaction, and layout improvements.",
  },
  {
    icon: Palette,
    title: "Usability and accessibility",
    description:
      "Review user journeys, keyboard interaction, readable content, and interface states as part of design and implementation.",
  },
  {
    icon: Search,
    title: "Technical SEO",
    description:
      "Check crawlability, metadata, canonical URLs, structured data, and sitemap coverage without promising search rankings.",
  },
  {
    icon: Cpu,
    title: "Maintainable architecture",
    description:
      "Choose tools and code organization to fit the product, integrations, hosting environment, and team's maintenance needs.",
  },
  {
    icon: Smartphone,
    title: "Responsive behavior",
    description:
      "Review representative mobile, tablet, and desktop layouts for readable content, accessible controls, and overflow.",
  },
  {
    icon: ShieldCheck,
    title: "Ongoing support",
    description:
      "Document any maintenance scope, availability, response targets, and responsibilities in the project agreement.",
  },
];

export const WhyChooseUs = () => (
  <section
    id="why-choose-us"
    className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
          Project priorities
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
          An engineering approach shaped around your project.
        </h2>
        <p className="text-sm sm:text-base text-[#666666] mt-4 leading-relaxed">
          Requirements, constraints, and validation criteria differ from
          project to project. These are areas to discuss when deciding on an
          implementation approach.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectPriorities.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="p-7 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] hover:border-[#D1D1CB] hover-lift transition-all"
          >
            <div className="w-11 h-11 rounded-lg bg-white border border-[#E8E8E8] flex items-center justify-center mb-5">
              <Icon className="w-5 h-5 text-[#FF5B4D]" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-[#111111] font-display mb-3">
              {title}
            </h3>
            <p className="text-sm text-[#555555] leading-relaxed">
              {description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
