import React, { useState } from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { processStepsData } from '../data/processData';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = processStepsData[activeStepIndex];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-[#E8E8E8] bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold text-[#B84238] tracking-wider uppercase mb-2">
            Structured Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
            Disciplined delivery from architecture to handover.
          </h2>
          <p className="text-sm sm:text-base text-[#666666] mt-4 leading-relaxed">
            Project cadence, collaboration tools, and deliverables are agreed
            for each engagement.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {processStepsData.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#FF5B4D] shadow-sm ring-1 ring-[#FF5B4D]'
                    : 'bg-[#F2F2EE] border-[#E8E8E8] hover:bg-white text-[#666666] hover:text-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono-data font-bold ${isActive ? 'text-[#B84238]' : 'text-[#666666]'}`}>
                    {step.number}.
                  </span>
                  <span className="text-[11px] text-[#666666] font-mono-data">{step.duration}</span>
                </div>
                <div className={`text-sm font-bold font-display ${isActive ? 'text-[#111111]' : 'text-[#555555]'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Detail Showcase Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8E8E8] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Phase Synopsis */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono-data text-[#B84238] font-bold">
                <span>Phase {activeStep.number}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStep.duration}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display">
                {activeStep.number}. {activeStep.title} — {activeStep.subtitle}
              </h3>

              <p className="text-base text-[#555555] leading-relaxed">
                {activeStep.description}
              </p>

              <div className="pt-4 flex items-center gap-4 text-xs text-[#666666] border-t border-[#F0F0EE]">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF5B4D]" />
                  <span>Sprint Velocity: Weekly Milestones</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5B4D]" />
                  <span>Direct Principal Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tangible Deliverables Checklist */}
            <div className="lg:col-span-6 bg-[#F8F8F6] p-6 sm:p-7 rounded-xl border border-[#E8E8E8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
                Milestone Acceptance Deliverables
              </h4>
              <ul className="space-y-3.5">
                {activeStep.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5B4D] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Interactive Stepper Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-[#E8E8E8] flex items-center justify-between text-xs">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : processStepsData.length - 1))}
              className="text-[#666666] hover:text-[#111111] font-medium transition-colors"
            >
              ← Previous: {processStepsData[activeStepIndex > 0 ? activeStepIndex - 1 : processStepsData.length - 1].title}
            </button>
            <span className="font-mono-data text-[#666666]">
              Step {activeStepIndex + 1} of {processStepsData.length}
            </span>
            <button
              onClick={() => setActiveStepIndex((prev) => (prev < processStepsData.length - 1 ? prev + 1 : 0))}
              className="text-[#111111] hover:text-[#B84238] font-semibold transition-colors"
            >
              Next: {processStepsData[activeStepIndex < processStepsData.length - 1 ? activeStepIndex + 1 : 0].title} →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
