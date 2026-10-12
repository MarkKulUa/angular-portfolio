import { Profile } from '@shared/models/profile.model';

/**
 * Portfolio content. Every fact must follow `.ai/steering/content-rules.md`:
 * sourced from the approved EM resume / evidence bank, never invented or rounded up.
 */
export const PROFILE: Profile = {
  person: {
    name: 'Mark Kulishov',
    location: 'Warsaw, Poland',
    workFormat: 'Remote-first · EU time zone',
    links: {
      linkedin: 'https://www.linkedin.com/in/mark-k-85140b1b5/',
      credly: 'https://www.credly.com/users/mark-kulishov/badges',
    },
    photo: 'assets/images/profile.png',
    cvFileName: 'Mark_Kulishov_Engineering_Manager_CV.pdf',
    availability: 'Open to Engineering Manager roles',
  },

  headline: {
    role: 'Engineering Manager',
    tagline: [
      '15+ Years in Software Engineering',
      '4+ Years Managing Teams',
      'AWS Certified Solutions Architect – Associate',
      'Node.js, NestJS, React, Laravel',
    ],
    valueStatement:
      'Engineering leader with 15+ years in software engineering and 4+ years of full-cycle people management in banking. Hands-on in Node.js, NestJS, React and Laravel.',
    scope:
      'Leading a cross-functional unit of 7 (4 engineers, 3 business analysts, with embedded QA and design) running 15+ concurrent internal platforms for 1,000+ users and ~100K daily operations.',
  },

  summary:
    'Engineering leader with 15+ years in software engineering and 4+ years of full-cycle people management in banking. I lead a cross-functional unit of 7 (4 engineers, 3 business analysts, with embedded QA and design) running 15+ concurrent internal platforms for 1,000+ users and ~100K daily operations, with 99.8%+ SLA for 5 consecutive quarters. Hired 3 engineers since 2022 with 100% retention. Led the emergency migration of 15 systems (30 services, 17 databases) to AWS in 3 months with no disruption to critical business operations. Introduced AI-assisted, spec-driven development that cut development time for a typical feature from a full 2-week sprint to 1-2 days. Hands-on in Node.js, NestJS, React and Laravel.',

  impactMetrics: [
    { value: '99.8%+', label: 'SLA', context: '5 consecutive quarters' },
    {
      value: '15 systems',
      label: 'migrated to AWS in 3 months',
      context: '30 services, 17 databases, no disruption to critical business operations',
    },
    {
      value: '~50% → ~20%',
      label: 'unplanned work',
      context: 'after moving from ad-hoc Kanban to structured sprints',
    },
    { value: '80–90%', label: 'of committed work delivered within sprint' },
    {
      value: '2 weeks → 1–2 days',
      label: 'development time for a typical feature',
      context: 'spec-driven, AI-assisted development',
    },
    { value: '3 hires', label: '100% retention', context: 'since 2022' },
  ],

  caseStudies: [
    {
      id: 'aws-migration',
      title: 'Emergency migration to AWS',
      challenge:
        'Critical banking systems ran in on-premises data centers during a national crisis. 15 systems (30 services, 17 databases) had to move to the cloud fast, without breaking the business.',
      approach:
        'Owned the architecture and resource planning, got infrastructure committee approval, coordinated vendors and operations, and led a team of up to 4 engineers.',
      result:
        'All 15 systems moved to AWS in 3 months with no disruption to critical business operations.',
      tags: ['AWS', 'Cloud migration', 'Architecture', 'Vendor coordination'],
    },
    {
      id: 'predictable-delivery',
      title: 'From chaotic sprints to predictable delivery',
      challenge:
        'Tasks moved from sprint to sprint, releases were irregular, and about half of all work was unplanned.',
      approach:
        'Replaced ad-hoc Kanban with structured 2–3-week sprints: planning, estimation and clear rules for what enters a sprint and how unplanned work is handled. Started regular 1:1s with every team member to find the real reasons behind missed tasks. Aligned priorities with the business through QBRs.',
      result:
        '80–90% of committed work delivered within sprint, unplanned work down from ~50% to ~20%, and a stable release cadence. The 1:1s became the base for individual development plans.',
      tags: ['Scrum', '1:1s', 'Delivery metrics', 'QBRs'],
    },
    {
      id: 'quality-pipeline',
      title: 'A delivery pipeline the team can trust',
      challenge:
        'Releases across ~8 projects in active development were irregular and unpredictable.',
      approach:
        'Built the pipeline end-to-end: Git flow with branch standards, AI code review on every merge request, mandatory senior review, automated build, tests, linting and static analysis, vulnerability scanning with release gating, and QA sign-off.',
      result:
        '2–3 stable production releases every week. Hotfixes dropped to about one per month, caused by gaps in business requirements, not code.',
      tags: ['CI/CD', 'Code review', 'Release gating', 'QA'],
    },
    {
      id: 'ai-spec-driven',
      title: 'Spec-driven, AI-assisted development',
      challenge: 'Coding was the bottleneck: a typical feature took a full 2-week sprint.',
      approach:
        'Introduced spec-driven, AI-assisted development (Cursor, Kiro, Claude) across the team.',
      result:
        'Development time for a typical feature went from a full 2-week sprint to 1–2 days. The bottleneck moved from coding to requirements, which is also where the few remaining hotfixes come from.',
      tags: ['Cursor', 'Kiro', 'Claude', 'Spec-driven development'],
    },
  ],

  principles: [
    {
      title: 'Measurable expectations from day one',
      description:
        'SMART goals instead of general expectations, set at the start rather than after problems show up.',
    },
    {
      title: '1:1s that solve real problems',
      description:
        'Regular 1:1s with every team member to understand what is really behind missed work, and to build individual development plans.',
    },
    {
      title: 'Predictability through metrics',
      description:
        'Commitment vs completion, unplanned work share, spillover, release frequency, hotfix rate and SLA show where delivery breaks.',
    },
    {
      title: 'Quality built into the pipeline',
      description:
        'Senior review, AI code review, automated checks and release gates catch problems before production.',
    },
    {
      title: 'Specs before code',
      description:
        'With AI-assisted development, coding is fast. Clear requirements are what keeps delivery fast and safe.',
    },
    {
      title: 'Alignment with the business',
      description:
        'QBRs and regular stakeholder communication keep the team working on what matters most.',
    },
  ],

  competencies: [
    {
      title: 'People Management',
      items: [
        'Hiring and onboarding',
        'Probation decisions',
        'Regular 1:1s',
        'Semi-annual performance reviews',
        'Compensation cases with Board-level approval',
        'Quarterly/annual KPI setting and tracking',
      ],
    },
    {
      title: 'Delivery Management',
      items: [
        'Sprint planning',
        'Estimation',
        'Capacity and resource allocation',
        'Dependency and risk management',
        'SLA ownership',
        'QBRs',
        'Stakeholder communication',
      ],
      extra: {
        label: 'Metrics',
        items: [
          'Commitment vs completion',
          'Unplanned work share',
          'Spillover',
          'Release frequency',
          'Hotfix rate',
          'SLA',
        ],
      },
    },
    {
      title: 'Cloud & Architecture',
      items: [
        'AWS (Certified Solutions Architect – Associate)',
        'Docker',
        'CI/CD',
        'GitHub Actions',
        'GitLab',
        'DigitalOcean',
      ],
      extra: { label: 'Observability', items: ['ELK / OpenSearch', 'Sentry'] },
    },
    {
      title: 'Engineering',
      items: [
        'Node.js',
        'NestJS',
        'TypeScript',
        'React',
        'Laravel',
        'PHP',
        'REST / API-first architecture',
        'SOLID',
        'PHPUnit',
        'Queues',
        'PostgreSQL',
        'MySQL',
        'Redis',
        'Elasticsearch',
      ],
    },
    {
      title: 'AI-Assisted Delivery',
      items: [
        'Spec-driven development (Cursor, Kiro, Claude)',
        'AI code review',
        'OpenAI API integrations',
        'Make.com automation',
      ],
    },
    {
      title: 'Methods & Tools',
      items: ['Agile / Scrum', 'Kanban', 'Jira', 'Git flow', 'Cross-team collaboration'],
    },
  ],

  experience: [
    {
      company: 'PrivatBank',
      employmentType: 'Full-time',
      period: { start: 'Jul 2011', end: 'Present' },
      location: 'Ukraine, working remotely from Warsaw',
      roles: [
        {
          title: 'Team Lead & Delivery Manager',
          period: { start: 'Jul 2025', end: 'Present' },
          highlights: [
            'Promoted after a formal performance review to lead a cross-functional unit of 7 (4 engineers, 3 business analysts, with embedded QA and design) across 15+ concurrent development and support projects: analytics portals, credit and risk decisioning systems, and employee performance platforms for 1,000+ internal users and ~100K operations per day',
            'Replaced ad-hoc Kanban with structured sprint delivery: 2-3-week sprints and a planned release schedule across ~8 active projects, with 2-3 releases shipping to production every week (previously irregular and unpredictable); 80-90% of committed work delivered within sprint; unplanned work cut from ~50% to ~20%',
            'Maintained 99.8%+ SLA for 5 consecutive quarters; own SLA reporting, requirements alignment, resource allocation, sprint planning, daily stand-ups, and QBRs with business stakeholders',
            'Own the full people cycle: regular 1:1s, probation decisions, semi-annual performance reviews, compensation and level recommendations approved at Board level; set and track quarterly KPIs. Turned around an underperforming engineer through SMART goals and regular check-ins',
            "Built the team's delivery pipeline end-to-end: Git flow with branch standards, AI code review on every merge request, mandatory senior review, automated build, tests, linting and static analysis, vulnerability scanning with release gating, and QA sign-off. Result: 2-3 stable production releases every week, hotfixes down to about one per month and caused only by requirement gaps, not code",
            'Introduced spec-driven, AI-assisted development (Cursor, Kiro, Claude) across the team: development time for a typical feature went from a full 2-week sprint to 1-2 days, moving the bottleneck from coding to requirements',
          ],
        },
        {
          title: 'Tech Lead (acting Engineering Manager)',
          period: { start: '2022', end: 'Jul 2025' },
          highlights: [
            'Led a team of up to 4 engineers as tech lead and acting engineering manager during the wartime relocation of critical banking systems',
            'Led the emergency migration of 15 systems (30 services, 17 databases) from on-premises data centers to AWS in 3 months with no disruption to critical business operations; owned architecture, resource planning, infrastructure committee approval, and vendor/ops coordination',
            'Took ownership of the full team lifecycle: hired and onboarded 3 engineers (100% retention to date), ran probation and performance reviews, made salary recommendations approved at Board level; set and tracked quarterly and annual team KPIs',
            'Owned architecture decisions, distributed technical work across the team, and maintained code quality through reviews',
          ],
        },
        {
          title: 'Senior Full-Stack Developer',
          period: { start: '2018', end: '2022' },
          highlights: [
            'Designed and built API-first backend systems for banking operations, reporting and internal platforms (Laravel, REST, PostgreSQL)',
            'Informal tech lead for a team of 4: architecture decisions, code quality standards, code reviews and mentoring',
            'Took part in cloud migration initiatives and legacy system refactoring',
          ],
        },
        {
          title: 'Full-Stack Developer',
          period: { start: 'Jul 2011', end: '2018' },
          highlights: [
            'Built applications for POS terminal systems, fleet and fuel tracking, and internal cash operations',
          ],
        },
      ],
      focus: [
        'People management',
        'Delivery predictability',
        'Technical leadership',
        'Cloud migration',
        'Stakeholder communication',
      ],
      tech: [
        'Laravel',
        'PHP',
        'REST API',
        'PostgreSQL',
        'AWS',
        'Node.js',
        'NestJS',
        'React',
        'Angular',
        'ELK Stack',
      ],
    },
  ],

  independentProjects: [
    {
      name: 'B2B service marketplace (cleaning, property management)',
      description:
        'Lead full-stack engineer; built invoicing, reporting, scheduling, and client/partner communication workflows from scratch and ran the platform in production. 3,000+ active business clients, 4,000+ invoices and 9K+ automated emails per month',
      tech: ['React', 'Laravel', 'Make.com'],
    },
    {
      name: 'AI-powered email automation platform',
      description:
        'OpenAI API integration generating drafts for the majority of inbound corporate email, with auto-replies for standard cases',
      tech: ['Laravel', 'Make.com', 'OpenAI API'],
    },
    {
      name: 'IoT SaaS platform for equipment monitoring and data visualization',
      description:
        "Owned production reliability: deployments, logging, alerting, and incident response; refactored the legacy codebase and introduced PHPUnit test coverage with reporting; reviewed the second developer's code",
      tech: ['Node.js', 'Laravel'],
    },
    {
      name: 'Multiple short-term Laravel/React engagements for US and EU clients',
      description: 'Bug fixes, feature delivery, Agile collaboration',
      tech: ['Laravel', 'React'],
    },
  ],

  education: [
    {
      institution: 'Dnipro University of Technology',
      degree: "Bachelor's degree, Information Technology",
      specialization: 'Information Security in Computer Systems and Networks',
      period: { start: 'Sep 2001', end: 'May 2006' },
    },
  ],

  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      provider: 'Amazon Web Services (AWS)',
      issued: 'Aug 2026',
      expires: 'Aug 2029',
      url: 'https://www.credly.com/badges/43b6199a-2387-4b7c-aa72-54beb531a5d5',
      verifyUrl:
        'https://cp.certmetrics.com/amazon/en/public/verify/credential/308a994a62ed48c4b718d0803fd1b959',
      featured: true,
      skills: ['AWS', 'Solution Architecture', 'Cloud Computing'],
    },
    {
      name: 'Scrum Foundation Professional Certification',
      provider: 'CertiProf',
      issued: 'Feb 2024',
      url: 'https://www.credly.com/badges/7e18fd97-cb01-4e54-be31-3044cc482214',
      skills: ['Agile Software Development', 'Product Backlog'],
    },
    {
      name: 'Developing Cloud Apps with Node.js and React',
      provider: 'IBM',
      issued: 'Aug 2023',
      skills: ['Node.js', 'React', 'JavaScript', 'Web Development'],
    },
    {
      name: 'Generative AI Essentials for Software Developer',
      provider: 'Coursera',
      issued: 'Jun 2024',
      url: 'https://www.credly.com/badges/a223cfac-2e92-4df2-92de-c32c744a632c',
      skills: ['Natural Language Processing', 'AI-Generated Code', 'Generative AI'],
    },
    {
      name: 'Edchart Certified Laravel Developer Expert',
      provider: 'Edchart Technologies',
      issued: 'Apr 2024',
      url: 'https://www.credly.com/badges/aaba6080-a932-4316-978c-152821ee62ff',
      skills: ['Laravel', 'PHP Developer', 'Web Development'],
    },
    {
      name: 'Edchart Certified React JS Developer Expert',
      provider: 'Edchart Technologies',
      issued: 'Apr 2024',
      url: 'https://www.credly.com/badges/66b270b6-5888-4381-89bc-e17f2c1bde24',
      skills: ['React', 'Redux', 'JSX', 'JavaScript'],
    },
    {
      name: 'Front-end Development with React',
      provider: 'IBM',
      issued: 'Aug 2023',
      url: 'https://www.credly.com/badges/006e3cbe-b9bb-4d48-adf7-107f90ec9afa',
      skills: ['React', 'Redux', 'JSX', 'JavaScript'],
    },
    {
      name: 'React.js course',
      provider: 'The Rolling Scopes School',
      issued: 'Jun 2023',
      url: 'https://app.rs.school/certificate/lsw7hwal',
      skills: ['React', 'Redux', 'JSX', 'JavaScript'],
    },
  ],

  languages: [
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'Polish', level: 'Conversational' },
    { name: 'Ukrainian', level: 'Native' },
  ],
};
