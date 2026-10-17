import React from 'react';
import { X, CheckCircle2, ArrowRight, Clock, DollarSign, Layers } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForInquiry: (serviceTitle: string) => void;
  onViewCaseStudy?: (caseStudyId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForInquiry,
  onViewCaseStudy,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8E8E8] max-h-[90vh] overflow-y-auto z-10">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E8E8] flex items-start justify-between bg-[#F8F8F6]">
          <div>
            <div className="text-xs font-semibold text-[#FF5B4D] uppercase tracking-wider mb-1">
              Service Deep Dive
            </div>
            <h2 id="service-modal-title" className="text-2xl font-bold text-[#111111] font-display">
              {service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#666666] hover:text-[#111111] hover:bg-black/5 rounded-md transition-colors"
            aria-label="Close service modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-base text-[#444444] leading-relaxed">
            {service.fullDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8F8F6] rounded-lg border border-[#E8E8E8] text-sm">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#FF5B4D]" />
              <div>
                <span className="text-xs text-[#777777] block">Delivery Window</span>
                <span className="font-semibold text-[#111111]">{service.typicalTimeline}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4 text-[#FF5B4D]" />
              <div>
                <span className="text-xs text-[#777777] block">Investment Baseline</span>
                <span className="font-semibold text-[#111111] font-mono-data">{service.startingBudget}</span>
              </div>
            </div>
          </div>

          {/* Scope & Deliverables */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3">
              Included Deliverables & Milestones
            </h3>
            <ul className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#444444]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5B4D] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-2.5">
              Core Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-[#555555]">
              {service.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-[#F2F2EE] border border-[#E8E8E8] rounded-md font-mono-data text-[#333333]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expected Client Outcomes */}
          <div className="p-4 bg-[#FFF2F0] rounded-lg border border-[#FF5B4D]/20">
            <h4 className="text-xs font-bold text-[#FF5B4D] uppercase tracking-wider mb-2">
              Measurable Business Outcomes
            </h4>
            <ul className="space-y-1.5 text-xs text-[#444444]">
              {service.outcomes.map((out, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B4D]" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-[#E8E8E8] bg-[#F8F8F6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {service.relatedCaseStudyId && onViewCaseStudy && (
              <button
                onClick={() => {
                  onClose();
                  onViewCaseStudy(service.relatedCaseStudyId!);
                }}
                className="text-xs font-semibold text-[#111111] hover:text-[#FF5B4D] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>View Case Study</span>
              </button>
            )}
            <a
              href={`/services/${service.slug || service.id}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#FF5B4D] hover:underline"
            >
              Full Service Page &rarr;
            </a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSelectForInquiry(service.title);
                onClose();
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Inquire for {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
