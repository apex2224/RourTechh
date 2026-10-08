import { ProcessStep } from '../types';

export const processStepsData: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Business Context & Technical Diagnostics',
    description: 'We align on your strategic goals, key conversion metrics, audience personas, and existing technical constraints to define the critical path to success.',
    deliverables: [
      'Technical architecture audit & performance benchmark',
      'Stakeholder requirements & user journey mapping',
      'Competitor differentiation & search opportunity analysis',
    ],
    duration: 'Week 1',
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'System Blueprint & Milestone Roadmap',
    description: 'We architect the complete technical specification, data modeling, API integration matrix, and sprint delivery schedule before writing a single line of code.',
    deliverables: [
      'Comprehensive Technical Specification Document (TSD)',
      'Entity relationship diagrams & API integration contracts',
      'Fixed-milestone sprint schedule with clear acceptance criteria',
    ],
    duration: 'Week 2',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Design System & Interactive Prototypes',
    description: 'We build the visual direction, tokenized design systems, and responsive layouts in Figma, validating every flow with interactive prototypes.',
    deliverables: [
      'Figma design system with complete design tokens (colors, type, motion)',
      'High-fidelity interactive desktop and mobile prototypes',
      'WCAG 2.1 AA accessibility contrast and keyboard navigation audit',
    ],
    duration: 'Weeks 3–4',
  },
  {
    number: '04',
    title: 'Develop',
    subtitle: 'Type-Safe Engineering & Integration',
    description: 'Our senior engineers construct clean, component-driven TypeScript code with automated test coverage, responsive layouts, and edge-rendered performance.',
    deliverables: [
      'Modular, tree-shakable React / Next.js codebase',
      'Continuous Integration pipeline with automated linting & tests',
      'Production staging environment with live client preview deployments',
    ],
    duration: 'Weeks 5–7',
  },
  {
    number: '05',
    title: 'Launch & Scale',
    subtitle: 'Zero-Downtime Deployment & Handover',
    description: 'We execute a smooth deployment with global CDN routing, verify Google Search Console indexing, conduct team training, and initiate post-launch warranty.',
    deliverables: [
      'Zero-downtime production cutover and DNS SSL configuration',
      'Comprehensive documentation and developer handover walkthrough',
      '30-day post-launch warranty and SLA performance monitoring',
    ],
    duration: 'Week 8+',
  },
];
