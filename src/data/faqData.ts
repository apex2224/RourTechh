import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Engagement & Scope',
    question: 'How do project engagements typically start, and what is your typical timeline?',
    answer: 'Every engagement begins with an initial 45-minute discovery consultation, followed by a detailed technical specification and roadmap document. Core web applications typically take 4–8 weeks from architecture to production launch, while enterprise platforms range from 8–14 weeks depending on integrations and data migration complexity.',
  },
  {
    id: 'faq-2',
    category: 'IP & Ownership',
    question: 'Do we own 100% of the intellectual property, code, and design assets?',
    answer: 'Yes, unconditionally. Upon completion and payment of milestone invoices, all source code, Figma design files, component libraries, and deployment scripts transfer entirely to your organization with full commercial rights. We do not use proprietary lock-in frameworks or restrictive licensing.',
  },
  {
    id: 'faq-3',
    category: 'Tech Stack',
    question: 'Why do you specialize in Next.js, React, and TypeScript over monolithic platforms?',
    answer: 'Modern web applications require sub-second load times, modular scalability, and type-safe reliability. The modern TypeScript and React ecosystem allows us to achieve 95+ Core Web Vitals scores out of the box, drastically lower cloud hosting overhead, and empower in-house teams to maintain and expand the product easily.',
  },
  {
    id: 'faq-4',
    category: 'Pricing & Investment',
    question: 'What are your pricing structures and payment terms?',
    answer: 'We operate primarily on fixed-scope, milestone-based pricing for discrete projects (typically starting at $8,500–$15,000 for bespoke marketing/e-commerce flagships and $20,000+ for custom web applications). For ongoing evolution and SLA monitoring, we offer transparent monthly retainers with guaranteed engineering availability.',
  },
  {
    id: 'faq-5',
    category: 'SEO & Performance',
    question: 'How do you guarantee Core Web Vitals performance and search engine visibility?',
    answer: 'Performance is baked into our architectural foundation rather than retrofitted at the end. We enforce zero render-blocking styles, automate image generation in next-gen WebP/AVIF formats, implement structured JSON-LD entity graphs, and test every deploy against Google Lighthouse thresholds in CI/CD.',
  },
  {
    id: 'faq-6',
    category: 'Ongoing Support',
    question: 'What happens after our website or application is launched?',
    answer: 'Every launch includes a 30-day post-go-live warranty covering any unforeseen bugs or configuration adjustments. Following that period, many clients transition into our Dedicated Engineering & Maintenance retainer for 24/7 uptime monitoring, security updates, and monthly sprint enhancements.',
  },
];
