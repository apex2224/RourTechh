import React, { useState } from "react";
import {
  Play,
  Pause,
  ArrowRight,
  Search,
  Grid,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { projectsData } from "../data/projectsData";
import { CaseStudy } from "../types";
import { CaseStudyModal } from "./CaseStudyModal";

interface ProjectsSectionProps {
  onStartProject: () => void;
  activeCaseStudyId?: string | null;
  onClearActiveCaseStudy?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onStartProject,
  activeCaseStudyId,
  onClearActiveCaseStudy,
}) => {
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutMode, setLayoutMode] = useState<"featured" | "compact">(
    "featured",
  );
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(
    activeCaseStudyId
      ? projectsData.find((p) => p.id === activeCaseStudyId) || null
      : null,
  );

  // Sync external request to view case study
  React.useEffect(() => {
    if (activeCaseStudyId) {
      const p = projectsData.find((item) => item.id === activeCaseStudyId);
      if (p) setSelectedProject(p);
    }
  }, [activeCaseStudyId]);

  const categories = [
    "All",
    "Web Application",
    "E-commerce",
    "Design System",
    "Enterprise",
  ];

  // Filter and search
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = filter === "All" || project.category === filter;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  const handleToggleVideo = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setPlayingVideoId((prev) => (prev === projectId ? null : projectId));
  };

  return (
    <section
      id="work"
      className="py-20 md:py-28 border-b border-[#E8E8E8] bg-[#F8F8F6]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
              Our Work & Digital Project Portfolio
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
              Website Development Projects & Digital Solutions.
            </h2>

            <p className="text-sm sm:text-base text-[#666666] mt-4 leading-relaxed">
              Explore our portfolio of web development projects, e-commerce
              websites, UI/UX design systems and custom software solutions.
              Discover project approaches, technologies and implementation
              details to understand how digital products are designed and
              developed around business requirements.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Layout density toggles */}
            <div className="hidden sm:flex items-center p-1 bg-[#F2F2EE] rounded-lg border border-[#E8E8E8]">
              <button
                onClick={() => setLayoutMode("featured")}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === "featured"
                    ? "bg-white text-[#111111] shadow-2xs"
                    : "text-[#777777] hover:text-[#111111]"
                }`}
                title="Featured 2-Column Grid"
                aria-label="Featured 2-Column Grid"
              >
                <Grid className="w-4 h-4" />
              </button>

              <button
                onClick={() => setLayoutMode("compact")}
                className={`p-1.5 rounded-md transition-colors ${
                  layoutMode === "compact"
                    ? "bg-white text-[#111111] shadow-2xs"
                    : "text-[#777777] hover:text-[#111111]"
                }`}
                title="Compact 3-Column Library Grid"
                aria-label="Compact 3-Column Library Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters + Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E8E8]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F2EE] rounded-lg border border-[#E8E8E8]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? "bg-white text-[#111111] shadow-xs font-semibold"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, industry or technology..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E8E8E8] rounded-lg text-xs text-[#111111] placeholder:text-[#888888] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]"
              />
            </div>

            <span className="text-xs text-[#888888] font-mono-data whitespace-nowrap">
              {filteredProjects.length} of {projectsData.length} Projects
            </span>
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E8E8]">
            <Layers className="w-8 h-8 text-[#888888] mx-auto mb-3" />

            <p className="text-sm font-semibold text-[#111111]">
              No Matching Projects Found
            </p>

            <p className="text-xs text-[#666666] mt-1">
              Try another project name, technology or category to explore our
              portfolio.
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              layoutMode === "featured"
                ? "grid-cols-1 lg:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredProjects.map((project) => {
              const isPlayingVideo = playingVideoId === project.id;

              return (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] hover:border-[#D1D1CB] hover-lift transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>
                    {/* Visual & Video Preview Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#ECECE8]">
                      {isPlayingVideo && project.videoPreview ? (
                        <div className="relative w-full h-full bg-black">
                          <video
                            src={project.videoPreview}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />

                          <button
                            onClick={(e) => handleToggleVideo(e, project.id)}
                            className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors z-20 cursor-pointer"
                            title="Pause video preview"
                          >
                            <Pause className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <image
                            src={project.image}
                            alt={`${project.title} — ${project.category} project by RourTech`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />

                          {/* Video Preview Trigger Badge */}
                          {project.videoPreview && (
                            <button
                              onClick={(e) => handleToggleVideo(e, project.id)}
                              className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/75 hover:bg-black text-white rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-sm transition-all shadow-md cursor-pointer hover:scale-105"
                              title="Play Video Preview"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Preview Video</span>
                            </button>
                          )}
                        </>
                      )}

                      {/* Top Badges (Category & Project Result) */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none z-10">
                        <span className="bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-md font-medium text-[11px]">
                          {project.category}
                        </span>

                        <span className="bg-white/95 backdrop-blur-sm text-[#111111] px-2.5 py-1 rounded-md font-mono-data font-bold text-[11px] shadow-xs">
                          {project.results[0]?.metric}{" "}
                          {project.results[0]?.label}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7">
                      {/* Client & Industry Metadata */}
                      <div className="flex items-center gap-2 text-xs text-[#777777] mb-2.5">
                        <span className="font-semibold text-[#111111]">
                          {project.client}
                        </span>

                        <span aria-hidden="true">·</span>

                        <span>{project.industry}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#111111] font-display mb-3 group-hover:text-[#FF5B4D] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      {/* Project Summary */}
                      <p className="text-sm text-[#555555] leading-relaxed mb-6 line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Project Results */}
                      <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] mb-6">
                        <div>
                          <span className="text-[11px] text-[#777777] block">
                            {project.results[0]?.label}
                          </span>

                          <span className="text-lg font-extrabold text-[#111111] font-mono-data">
                            {project.results[0]?.metric}
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] text-[#777777] block">
                            {project.results[1]?.label}
                          </span>

                          <span className="text-lg font-extrabold text-[#111111] font-mono-data">
                            {project.results[1]?.metric}
                          </span>
                        </div>
                      </div>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {project.technologies
                          .slice(0, layoutMode === "compact" ? 3 : 5)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-[#F2F2EE] border border-[#E8E8E8] rounded-md font-mono-data text-[#444444] text-[11px]"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="px-6 py-4 sm:px-7 bg-[#F8F8F6] border-t border-[#E8E8E8] flex items-center justify-between">
                    <span className="text-xs text-[#777777] hidden sm:inline">
                      Project Details & Implementation
                    </span>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#FF5B4D] rounded-lg transition-all duration-150 shadow-2xs ml-auto cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Portfolio Bottom Banner */}
        <div className="mt-14 p-8 bg-white rounded-2xl border border-[#E8E8E8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-[#111111] font-display">
              Have a Website or Custom Software Project in Mind?
            </h4>

            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Discuss your website development, e-commerce, UI/UX design or
              custom software requirements with RourTech.
            </p>
          </div>

          <button
            onClick={onStartProject}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          if (onClearActiveCaseStudy) onClearActiveCaseStudy();
        }}
        onStartProject={onStartProject}
      />
    </section>
  );
};
