export interface LabDemo {
  id: string;
  title: string;
  description: string;
  demonstrates: string[];
  tech: string[];
  link: string;
  linkLabel: string;
}

export interface LabBuildFact {
  title: string;
  description: string;
}

export interface SpecStep {
  title: string;
  description: string;
}

export const LAB_DEMOS: LabDemo[] = [
  {
    id: 'pokemon',
    title: 'Pokemon explorer',
    description:
      'Browse, search and compare Pokemon from the public PokeAPI, then export your selection to CSV.',
    demonstrates: [
      'Signal-based state with a dedicated state service',
      'Debounced search with RxJS (debounceTime, distinctUntilChanged, switchMap)',
      'Lazy-loaded routes and a functional guard that validates the route parameter',
      'Pagination, multi-select flyout and CSV export',
    ],
    tech: ['Angular 21', 'Signals', 'RxJS', 'PokeAPI'],
    link: '/lab/pokemon',
    linkLabel: 'Open the Pokemon demo',
  },
  {
    id: 'auth',
    title: 'Auth demo',
    description:
      'Register and sign in against the NestJS API, then open a page that only an authenticated session can see.',
    demonstrates: [
      'NestJS 11 on Fastify with Zod-validated DTOs',
      'JWT in an HttpOnly cookie (SameSite/Secure in production), no token in JavaScript',
      'Lazy session restore via /auth/me inside a functional route guard, so public pages never wait for the API',
      'Helmet CSP, rate limiting and a CORS allow-list',
    ],
    tech: ['NestJS', 'Fastify', 'Zod', 'JWT', 'Passport'],
    link: '/lab/auth/login',
    linkLabel: 'Open the Auth demo',
  },
];

/** Salvaged and extended from the original "this monorepo showcases" dashboard placeholder. */
export const LAB_BUILD_FACTS: LabBuildFact[] = [
  {
    title: 'Monorepo',
    description:
      'npm workspaces with an Angular 21 frontend and a NestJS 11 backend, both on strict TypeScript, deployed to Vercel.',
  },
  {
    title: 'Modern Angular',
    description:
      'Standalone components, signals, OnPush change detection everywhere, built-in control flow and lazy-loaded routes.',
  },
  {
    title: 'Architecture boundaries',
    description:
      'Sheriff enforces the layers: features may use core and shared, never each other; shared depends on nothing.',
  },
  {
    title: 'Quality gates',
    description:
      'Pre-commit: ESLint and Prettier on changed files. Pre-push: the full test suite (Vitest, Jest) and production builds.',
  },
  {
    title: 'Content as typed data',
    description:
      'The landing page, the online resume and the generated PDF CV render from one type-checked content file.',
  },
  {
    title: 'Accessible by default',
    description:
      'Semantic landmarks, keyboard navigation, visible focus, WCAG AA contrast and reduced-motion support.',
  },
];

export const SPEC_STEPS: SpecStep[] = [
  {
    title: 'Steering',
    description: 'Product, tech, structure and content rules that every AI tool reads first.',
  },
  {
    title: 'Requirements',
    description: 'User stories with testable acceptance criteria and explicit non-goals.',
  },
  {
    title: 'Design',
    description: 'Architecture, data model, components, correctness properties and risks.',
  },
  {
    title: 'Tasks',
    description: 'Small, ordered tasks traced to requirements, each with a way to verify it.',
  },
  {
    title: 'Code',
    description: 'One task at a time, with an owner approval at every gate.',
  },
];
