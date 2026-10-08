import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, Mail, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { InquiryRecord } from '../types';

interface ContactSectionProps {
  prefilledService?: string;
  onInquirySubmitted?: (inquiry: InquiryRecord) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService,
  onInquirySubmitted,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(prefilledService || 'Web Development');
  const [budget, setBudget] = useState('$25,000 – $50,000');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync external prefilled service if changed
  React.useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  const serviceOptions = [
    'Web Development',
    'UI/UX Design & Design Systems',
    'SEO & Website Optimization',
    'E-commerce Development',
    'Custom Software Solutions',
    'Website Maintenance & Support',
    'Custom Enterprise Scope',
  ];

  const budgetTiers = [
    '$10,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000+',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid work email address';
    }
    if (!company.trim()) errs.company = 'Company or organization name is required';
    if (!description.trim() || description.trim().length < 15) {
      errs.description = 'Please provide at least a brief summary of project requirements (min 15 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newRecord: InquiryRecord = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      service,
      budget,
      description: description.trim(),
      status: 'new',
    };

    setTimeout(() => {
      // Store in localStorage for CMS Admin access
      try {
        const stored = localStorage.getItem('vanguard_inquiries');
        const list: InquiryRecord[] = stored ? JSON.parse(stored) : [];
        list.unshift(newRecord);
        localStorage.setItem('vanguard_inquiries', JSON.stringify(list));
      } catch (err) {
        console.error('Failed to store inquiry locally', err);
      }

      setIsSubmitting(false);
      setSubmittedRecord(newRecord);
      if (onInquirySubmitted) onInquirySubmitted(newRecord);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context & Contact Metadata */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                Initiate Project Discovery
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
                Let&apos;s build something exceptional together.
              </h2>
              <p className="text-base text-[#555555] mt-4 leading-relaxed">
                Tell us about your technical goals, timeframe, and budget. Our solutions architects will review your requirements and respond within one business day with a structured discovery agenda.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="space-y-4 pt-4 border-t border-[#E8E8E8] text-sm text-[#444444]">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF5B4D] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#888888] block">Direct Inquiries</span>
                  <a href="mailto:partnerships@vanguarddigital.agency" className="font-semibold text-[#111111] hover:text-[#FF5B4D] transition-colors">
                    partnerships@vanguarddigital.agency
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF5B4D] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#888888] block">Studio Line</span>
                  <span className="font-semibold text-[#111111] font-mono-data">
                    +1 (415) 890-4210
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5B4D] mt-1 shrink-0" />
                <div>
                  <span className="text-xs text-[#888888] block">Primary Atelier</span>
                  <span className="text-[#333333]">
                    450 Mission Street, Suite 1400, San Francisco, CA 94105
                  </span>
                </div>
              </div>
            </div>

            {/* Response Promise Card */}
            <div className="p-5 bg-[#F8F8F6] rounded-xl border border-[#E8E8E8] text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#111111]">
                <Clock className="w-4 h-4 text-[#FF5B4D]" />
                <span>Our 24-Hour Discovery Commitment</span>
              </div>
              <p className="text-[#666666] leading-relaxed">
                Every inquiry is reviewed directly by a principal architect. We never send automated generic marketing sequences. If there is mutual alignment, we schedule a focused 30-minute technical scope review.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-7">
            {submittedRecord ? (
              <div className="p-8 sm:p-10 bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] text-center space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">
                    Project Requirements Received
                  </h3>
                  <p className="text-sm text-[#555555] mt-2 max-w-md mx-auto">
                    Thank you, <strong className="text-[#111111]">{submittedRecord.name}</strong>. A principal architect has received your submission for <strong className="text-[#111111]">{submittedRecord.company}</strong> and will reach out via <span className="font-mono text-xs bg-white px-2 py-0.5 rounded border border-[#E8E8E8]">{submittedRecord.email}</span> within 24 hours.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-[#E8E8E8] text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="text-[#888888]">Reference ID: <span className="font-mono text-[#111111]">{submittedRecord.id}</span></div>
                  <div className="text-[#888888]">Selected Service: <span className="font-semibold text-[#111111]">{submittedRecord.service}</span></div>
                  <div className="text-[#888888]">Budget Range: <span className="font-mono text-[#111111]">{submittedRecord.budget}</span></div>
                </div>

                <button
                  onClick={() => {
                    setSubmittedRecord(null);
                    setDescription('');
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-[#111111] bg-white border border-[#E8E8E8] hover:bg-[#F2F2EE] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-9 bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] shadow-xs space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
                      Your Full Name <span className="text-[#FF5B4D]">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#E8E8E8]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
                      Work Email <span className="text-[#FF5B4D]">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#E8E8E8]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="inquiry-company" className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
                    Company / Organization <span className="text-[#FF5B4D]">*</span>
                  </label>
                  <input
                    id="inquiry-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp or Stealth Startup"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                      errors.company ? 'border-red-500 bg-red-50/20' : 'border-[#E8E8E8]'
                    }`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.company}
                    </p>
                  )}
                </div>

                {/* Service Required Dropdown */}
                <div>
                  <label htmlFor="inquiry-service" className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
                    Primary Service Needed
                  </label>
                  <select
                    id="inquiry-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E8E8] rounded-lg text-sm text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range Selection (Functional Button Segmented Group) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-2">
                    Target Investment Range (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                          budget === tier
                            ? 'bg-white border-[#FF5B4D] text-[#111111] shadow-xs ring-1 ring-[#FF5B4D]'
                            : 'bg-white/60 border-[#E8E8E8] text-[#555555] hover:bg-white hover:text-[#111111]'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="inquiry-desc" className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5">
                    Project Brief & Goals <span className="text-[#FF5B4D]">*</span>
                  </label>
                  <textarea
                    id="inquiry-desc"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your current system, objectives, target launch date, and any known technical constraints..."
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors resize-y ${
                      errors.description ? 'border-red-500 bg-red-50/20' : 'border-[#E8E8E8]'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] active:scale-[0.99] rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Specification...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-[#777777] mt-3">
                    Strict NDA privacy guaranteed. We never sell or share client data.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
