import React from 'react';
import { X, ArrowRight, Quote, CheckCircle, Code, Award, ExternalLink } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] max-h-[92vh] overflow-y-auto z-10 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#666666]">
            <span className="font-semibold text-[#111111]">{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded-md transition-colors"
            aria-label="Close case study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Main Title & Executive Summary */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] font-display text-balance mb-4">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Featured Visual & Video Preview */}
          <div className="rounded-xl overflow-hidden border border-[#E8E8E8] bg-[#F2F2EE] aspect-[16/9] relative group">
            {project.videoPreview ? (
              <video
                src={project.videoPreview}
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                poster={project.image}
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Quantified Outcome Results Bar */}
          <div className="p-6 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF5B4D] mb-4">
              Verified Production Results
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {project.results.map((res, idx) => (
                <div key={idx} className="border-l-2 border-[#FF5B4D] pl-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-mono-data">
                    {res.metric}
                  </div>
                  <div className="text-xs text-[#666666] mt-1 font-medium">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Business Challenge vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                The Business Challenge
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E8E8E8] rounded-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                The Architectural Solution
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Engineering Process Steps */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-4">
              Execution Roadmap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.processSteps.map((step, idx) => (
                <div key={idx} className="p-4 bg-[#F8F8F6] border border-[#E8E8E8] rounded-lg">
                  <span className="text-xs font-bold text-[#FF5B4D] font-mono-data block mb-1">
                    {step.phase}
                  </span>
                  <p className="text-xs text-[#555555] leading-normal">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-[#666666]" />
              Technologies Implemented
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-[#F2F2EE] border border-[#E8E8E8] rounded-md font-mono-data text-[#333333]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="p-6 sm:p-8 bg-[#FFF2F0] border border-[#FF5B4D]/30 rounded-xl relative">
              <Quote className="w-8 h-8 text-[#FF5B4D]/40 mb-3" />
              <blockquote className="text-base sm:text-lg font-medium text-[#111111] italic leading-relaxed mb-4">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-xs">
                <strong className="text-[#111111] block font-semibold">
                  {project.testimonial.author}
                </strong>
                <span className="text-[#666666]">
                  {project.testimonial.role} · {project.testimonial.company}
                </span>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3">
              Key Strategic Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-[#555555]">
              {project.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#FF5B4D] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="sticky bottom-0 bg-white border-t border-[#E8E8E8] px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-[#666666] hidden sm:inline">
            Ready to explore an architecture for your product?
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Build Similar Solution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
