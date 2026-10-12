# Structure Steering

## Repository
```
angular-portfolio/
├── .ai/                   # AI steering + specs + templates (source of truth)
├── .kiro/                 # Symlinks → .ai/steering, .ai/specs (Kiro compatibility)
├── AGENTS.md              # Tool-neutral AI entry point
├── CLAUDE.md              # Claude Code entry → @AGENTS.md
├── frontend/              # Angular 21 SPA
│   ├── sheriff.config.ts  # Architecture boundaries
│   └── src/
│       ├── app/
│       │   ├── core/      # content/, cv/, services/, guards/, interceptors/, store/, models/
│       │   ├── shared/    # ui/ (presentational kit), components/ (header, footer), models/
│       │   ├── features/  # home, resume, lab, pokemon, auth, not-found
│       │   ├── app.routes.ts / app.config.ts / app.component.ts
│       │   └── testing.ts # DOM helpers for specs
│       ├── assets/        # images/, og/
│       ├── environments/
│       └── index.html, styles.scss, favicon.*, robots.txt, sitemap.xml, llms.txt
├── backend/               # NestJS 11 + Fastify API (auth, users)
├── ci_cd/                 # Untracked AWS CodePipeline lab notes (not part of the app)
└── tmp/                   # PRIVATE career notes (git-ignored). Never commit or publish
```

## Frontend layers (enforced by Sheriff, barrel-less mode)
| Tag | Path | May import |
|-----|------|-----------|
| `root` | `src/app/*` (routes, config, app component) | anything |
| `core` | `src/app/core` | `shared`, `env` |
| `shared` | `src/app/shared`, `src/app/shared/ui` | `shared` |
| `env` | `src/environments` | nothing |
| `feature:<name>` | `src/app/features/<name>` | `core`, `shared`, same feature |

Consequences:
- Features never import other features. Demo routes are wired in `app.routes.ts` (root).
- `shared` is presentational: it receives data through inputs and reports actions through outputs
  (e.g. `Header.downloadCv`, wired to `CvPdfService` in `AppComponent`).
- Files in an `internal/` folder are private to their module.

## Features
| Feature | Route | Notes |
|---------|-------|-------|
| `home` | `/` | EM landing: hero, metrics, case studies, principles, CTA |
| `resume` | `/resume` | Container `resume.ts` + presentational `components/resume-*`; print styles |
| `lab` | `/lab` | Demo hub + "how this site is built"; copy in `lab.content.ts` |
| `pokemon` | `/lab/pokemon`, `/lab/pokemon/:name` | Demo: PokeAPI, signals, RxJS search, CSV export (`utils/`) |
| `auth` | `/lab/auth/{login,register,protected}` | Demo: cookie JWT auth against the backend |
| `not-found` | `**` | 404 with links to Home and Resume |

## Naming
- Files: kebab-case. New code uses the Angular v20+ suffix-less style (`home.ts`, class `Home`);
  legacy `*.component.ts` remains in `pokemon`.
- Selectors: `app-` prefix.
- One component = `.ts` + `.html` + `.scss` (+ `.spec.ts`), or inline template/styles for small ones.
- Container vs presentational: route components inject services; children take `input.required<T>()`.
