import { ProcessStep } from '../types';

export const processStepsData: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Business Context & Technical Diagnostics',
    description: 'We discuss your goals, users, existing systems, and technical constraints to identify project needs.',
    deliverables: [
      'Technical review and performance measurements, if included in scope',
      'Stakeholder requirements and user journey mapping, as relevant',
      'Search and competitor research, if included in scope',
    ],
    duration: 'Agreed during scoping',
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'System Blueprint & Milestone Roadmap',
    description: 'We define the project approach, relevant data and integrations, and delivery schedule before implementation begins.',
    deliverables: [
      'Technical notes or specifications appropriate to the project',
      'Data models and integration details, where applicable',
      'Agreed milestones and acceptance criteria, if used',
    ],
    duration: 'Agreed during scoping',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Design System & Interactive Prototypes',
    description: 'Design work may include visual direction, reusable patterns, responsive layouts, and prototypes as agreed.',
    deliverables: [
      'Design specifications and reusable patterns, if included in scope',
      'Interactive prototypes for agreed user flows, if needed',
      'Accessibility review against agreed criteria, which may reference WCAG guidance',
    ],
    duration: 'Agreed during scoping',
  },
  {
    number: '04',
    title: 'Develop',
    subtitle: 'Type-Safe Engineering & Integration',
    description: 'Implementation uses the technologies and testing approach selected for the project.',
    deliverables: [
      'Application code and architecture as agreed',
      'Automated checks or tests, if included in scope',
      'Staging or preview environment, depending on the hosting setup',
    ],
    duration: 'Agreed during scoping',
  },
  {
    number: '05',
    title: 'Launch & Handover',
    subtitle: 'Deployment Planning & Handover',
    description: 'We plan deployment and handover around the agreed hosting environment, verification needs, and support scope.',
    deliverables: [
      'Production deployment plan and DNS/SSL configuration, as scoped',
      'Documentation and handover appropriate to the agreed scope',
      'Post-launch support expectations documented separately, if applicable',
    ],
    duration: 'Agreed during scoping',
  },
];
