import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid work email address');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="py-16 md:py-20 border-b border-[#E8E8E8] bg-[#F8F8F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Bi-Weekly Architectural Dispatch</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] font-display text-balance mb-4">
          Stay ahead of web performance, design tokens, and digital scale.
        </h2>

        <p className="text-sm text-[#555555] max-w-xl mx-auto mb-8">
          Join 8,400+ engineering leaders, CTOs, and product designers receiving our unfiltered breakdowns on Core Web Vitals, headless commerce, and systems architecture.
        </p>

        {subscribed ? (
          <div className="p-4 bg-white rounded-xl border border-emerald-200 max-w-md mx-auto text-emerald-800 text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>You are subscribed. We never send spam or marketing fluff.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email address"
                className="grow px-4 py-3 bg-white border border-[#E8E8E8] rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D]"
              />
              <button
                type="submit"
                className="px-5 py-3 text-sm font-semibold text-white bg-[#111111] hover:bg-[#333333] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-xs text-red-600 text-left">{error}</p>}
            <p className="text-[11px] text-[#888888] text-center pt-1">
              Sent every second Thursday. Unsubscribe with 1 click at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
