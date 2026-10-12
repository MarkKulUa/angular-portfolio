# Mark Kulishov · Engineering Manager Portfolio

Personal portfolio and online CV, built as a production-grade Angular 21 + NestJS 11 monorepo.

- **`/`**: Engineering Manager landing page: impact metrics, case studies, leadership principles
- **`/resume`**: full online CV, plus a **Download CV (PDF)** generated in the browser from the same content
- **`/lab`**: Engineering Lab with hands-on demos (Pokemon explorer, cookie-based JWT auth) and "how this site is built"

All copy lives in one type-checked file: [`frontend/src/app/core/content/profile.content.ts`](frontend/src/app/core/content/profile.content.ts).
Content rules (approved facts, banned claims, privacy) are in [`.ai/steering/content-rules.md`](.ai/steering/content-rules.md).

## Tech stack

| Area | Choice |
|------|--------|
| Frontend | Angular 21 (standalone components, signals, OnPush, built-in control flow), SCSS with design tokens |
| PDF | pdfmake, lazy-loaded on the first click (initial bundle unaffected) |
| Backend | NestJS 11 on Fastify, Zod DTOs, JWT in an HttpOnly cookie, Helmet, rate limiting |
| Tests | Vitest via the Angular `@angular/build:unit-test` builder (frontend), Jest + Supertest (backend) |
| Quality | ESLint (angular-eslint 21), Prettier, Sheriff architecture boundaries, Husky hooks |
| Deploy | Vercel (frontend SPA + backend serverless function) |

## Getting started

Requirements: Node.js 24+, npm 11+.

```bash
npm install          # installs all workspaces
npm run dev          # frontend http://localhost:4200 + backend http://localhost:3000
```

## Commands

```bash
npm test             # frontend (Vitest) + backend (Jest)
npm run lint         # Sheriff + ESLint (frontend), ESLint (backend)
npm run build        # production builds of both apps

cd frontend
npm run test:watch   # Vitest in watch mode
npm run sheriff      # architecture boundaries only
```

Git hooks (Husky): **pre-commit** runs ESLint + Prettier on staged files; **pre-push** runs the full
test suite and both production builds.

## Project structure

```
.ai/                    AI steering, specs and templates (source of truth for AI tools)
.kiro/                  symlinks to .ai/steering and .ai/specs (Kiro compatibility)
AGENTS.md, CLAUDE.md    entry points for AI coding tools
frontend/
  sheriff.config.ts     architecture boundaries
  src/app/
    core/               content, CV PDF, services, guards, interceptors, store
    shared/             presentational UI (shared/ui), models, header, footer
    features/           home, resume, lab, pokemon, auth, not-found
  src/index.html        SEO, Open Graph, JSON-LD
backend/src/            auth and users modules (demo, in-memory storage)
```

Layer rules (enforced by Sheriff): features may use `core` and `shared`, never each other;
`core` may use `shared`; `shared` depends on nothing.

## Spec-driven workflow

Every change follows **steering → requirements → design → tasks → code**, with an owner approval
at each gate. See [`.ai/README.md`](.ai/README.md). Specs live in `.ai/specs/<feature>/`.

## Environment

Copy `.env.example` to `.env`. The backend reads `PORT`, `NODE_ENV`, `JWT_SECRET` and `FRONTEND_URL`.
The frontend API URL is set in `frontend/src/environments/`.

## License

MIT
