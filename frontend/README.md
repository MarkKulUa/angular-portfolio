# React Portfolio Frontend

Portfolio web application built with React 19, TypeScript 5.9, Vite 6, Tailwind CSS v4, and shadcn/ui.

Features: portfolio landing page, resume viewer, Pokemon Explorer (search/pagination/CSV export), cookie-based JWT authentication.

## Key Libraries

- React Router 7 — routing with lazy loading
- Zustand 5 — client state management
- TanStack React Query 5 — server state & caching
- React Hook Form + Zod — form validation
- Vitest + Testing Library — unit & component tests
- Lucide React — icons

## Development

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

```bash
npm run build        # tsc + vite build
npm run test         # vitest --run
npm run test:ui      # vitest --ui
npm run test:coverage # vitest --run --coverage
npm run lint         # eslint
npm run format       # prettier
```

## Deployment

Configured for Vercel — see `vercel.json`.
