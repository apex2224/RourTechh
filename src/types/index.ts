export type ServiceId =
  | 'web-development'
  | 'ui-ux-design'
  | 'seo-optimization'
  | 'ecommerce-development'
  | 'custom-software'
  | 'maintenance-support';

export interface ServiceItem {
  id: ServiceId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  techStack: string[];
  typicalTimeline: string;
  outcomes: string[];
  startingBudget: string;
  relatedCaseStudyId?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: 'Web Application' | 'E-commerce' | 'Design System' | 'Enterprise';
  summary: string;
  image: string;
  videoPreview?: string;
  videoPoster?: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: {
    metric: string;
    label: string;
  }[];
  processSteps: {
    phase: string;
    description: string;
  }[];
  keyTakeaways: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: 'Web Development' | 'UI/UX' | 'SEO' | 'Technology' | 'E-commerce';
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  publishDate: string;
  readTime: string;
  excerpt: string;
  content: string; // Markdown or rich text paragraphs
  status: 'published' | 'draft';
  relatedServiceId?: ServiceId;
  relatedPostSlugs?: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface InquiryRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  description: string;
  status: 'new' | 'reviewed' | 'contacted' | 'proposal_sent';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
