# Tech Steering

## Monorepo
npm workspaces: `frontend/`, `backend/`. The root `package.json` orchestrates the scripts.
Node 24, npm 11, TypeScript ~5.9 (frontend), ~5.7 (backend).
`package-lock.json` is git-ignored: after dependency changes, run a clean `npm install` at the root.

## Frontend (`frontend/`)
| Area | Choice |
|------|--------|
| Framework | Angular 21, standalone components only |
| Build | `@angular/build:application` (esbuild) → `dist/frontend/browser`; budgets: initial 500 kB warning / 1 MB error, component style 4 kB / 8 kB. Initial bundle is ~392 kB (Oct 2026) |
| Change detection | `OnPush` everywhere (ESLint-enforced); zone.js loaded via `polyfills` (not zoneless) |
| State | Signals (`signal`, `computed`, `input()`); simple store services in `core/store` |
| Content | Typed TS: `core/content/profile.content.ts` (`PROFILE`), read via `ProfileContent` service. No HTTP for content |
| CV PDF | `core/cv/cv-document.ts` (pure `buildCvDocument`), `core/cv/cv-pdf.service.ts` (lazy pdfmake via the `PDFMAKE_LOADER` token, print fallback). `pdfmake` is in `allowedCommonJsDependencies` |
| UI | Hand-written SCSS + design tokens on `:root` in `styles.scss` (brand gradient `#5a67d8 → #6b46c1`, AA-compliant). Shared presentational components in `shared/ui` (barrel `@shared/ui`). Inter font. No Angular Material |
| Routing | `app.routes.ts`: `/`, `/resume` (eager), `/lab/**` (lazy), legacy redirects `/pokemon*`, `/auth*` → `/lab/...`; every route has a `title` |
| Auth demo | Session restored lazily in `authGuard` (`/auth/me`), never on app start |
| SEO | Static meta/OG/Twitter/JSON-LD in `index.html`; `robots.txt`, `sitemap.xml`, `llms.txt`, favicons in `src/` (copied via `angular.json` assets) |
| Tests | `ng test` → `@angular/build:unit-test` with the Vitest runner + jsdom (AOT-compiled, so `templateUrl` works). DOM helpers in `src/app/testing.ts` |
| Lint | ESLint 9 flat config (`angular-eslint` 21 + `@angular-eslint/builder` 21), Prettier, Sheriff 0.19 (`sheriff.config.ts`, barrel-less mode) |
| Aliases | `@core/*`, `@shared/*`, `@features/*`, `@environments/*` |

## Backend (`backend/`)
| Area | Choice |
|------|--------|
| Framework | NestJS 11 on Fastify |
| Validation | Zod via `nestjs-zod` |
| Auth | JWT in an HttpOnly cookie `auth_token` (30 min); `SameSite=None; Secure` in prod |
| Storage | In-memory users (demo only, resets on cold start) |
| Security | Helmet CSP, rate limit (100 req / 15 min per instance), CORS allow-list |
| Deploy | Vercel serverless (`main.ts` exports a cached handler) |
| Tests | Jest + ts-jest (`jest-util` declared explicitly as a ts-jest peer) |

## Commands
```bash
npm run dev            # frontend :4200 + backend :3000
npm test               # ng test (frontend) + jest (backend)
npm run lint           # sheriff + ng lint (frontend), eslint (backend)
npm run build          # production builds
cd frontend && npm run test:watch | npm run sheriff
```
Husky: pre-commit runs lint-staged in both workspaces; pre-push runs `test:ci` + `build`.

## Known issues / tech debt (as of 2026-10-12)
1. `core/services/api.service.ts` is not used by any feature (it has tests). Decide whether to keep it as a generic HTTP wrapper or remove it.
2. `@angular/platform-browser-dynamic` and `webpack-bundle-analyzer` (the `analyze` script) are probably unnecessary with the esbuild builder.
3. Backend: default `JWT_SECRET` fallback string in `auth.module.ts`.
4. No CI workflows (`.github/` is empty). Quality gates run only in the Husky hooks.
5. `.env.example` still lists unused `VITE_*` and `DATABASE_URL` variables.
