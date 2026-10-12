# Design: EM Portfolio Repositioning

Status: **Approved (2026-10-12)** · Requirements: [requirements.md](./requirements.md)

## Overview
Frontend-only change (the backend is untouched). Three moves:
1. **Content model v2**: typed content replaces the IC-oriented `resume.json` schema.
2. **New information architecture**: Home becomes an EM landing page; Resume is rebuilt on the new
   model; the demos move to a `/lab` hub.
3. **Platform polish**: design tokens, SEO/OG, print/PDF, no fake preloader, test infrastructure fixed.

## Information Architecture
```
/                Home (EM landing)
  ├─ Hero                 name · headline · tagline · value statement · location · CTAs
  ├─ Impact metrics       4–6 tiles
  ├─ Case studies         3–4 cards (Challenge → Approach → Result)
  ├─ How I lead           4–6 principles
  └─ Contact CTA          Connect on LinkedIn · Download CV
/resume          Full online CV (print-optimised)
/lab             Engineering Lab hub
  ├─ /lab/pokemon           (was /pokemon)
  ├─ /lab/pokemon/:name     (was /pokemon/:name)
  └─ /lab/auth/{login,register,protected}   (was /auth/*)
**               404
```
Header nav: **Home · Resume · Lab**, plus a right-aligned "Download CV" button.
Redirects: `/pokemon` → `/lab/pokemon`, `/pokemon/:name` → `/lab/pokemon/:name`, `/auth/:page` → `/lab/auth/:page`.

## Architecture

```
features/home ─┐                      ┌─ shared/ui/* (presentational: section, metric-tile,
features/resume├─► core/content ──────┤               case-card, tag, button styles)
features/lab ──┘   (ProfileContent)   └─ shared/models/profile.model.ts (types)
features/pokemon, features/auth  (unchanged internals, re-mounted under /lab)
```
Sheriff rules stay as they are. Features import `core` and `shared` only.

### Content source: typed TypeScript instead of fetched JSON
**Decision:** move content from `assets/data/resume.json` (HTTP) to
`core/content/profile.content.ts`, a `const PROFILE: Profile` that is type-checked.

| | Typed TS (chosen) | JSON via HTTP (current) |
|---|---|---|
| Type safety | Compile-time | None (cast only) |
| Requests / LCP | 0 extra requests, renders immediately | Extra request, loading state |
| Duplicate fetch (footer + resume) | Gone | Needs `shareReplay` |
| Future prerender/SSG | Trivial | Works |
| Edit by non-dev | Harder | Easier (not a requirement) |

`ProfileContent` (core, `providedIn: 'root'`) exposes `readonly profile = signal(PROFILE).asReadonly()`
plus convenience `computed`s (`featuredCertification`, `currentRole`). Components read signals and
need no subscriptions or loading branches. `resume.json` and `ResumeData` are deleted.

## Data Models

File: `shared/models/profile.model.ts`
```ts
export interface Profile {
  person: Person;
  headline: Headline;
  summary: string;                    // plain text, paragraphs split by \n\n
  impactMetrics: ImpactMetric[];
  caseStudies: CaseStudy[];
  principles: Principle[];
  competencies: CompetencyGroup[];
  experience: Employer[];
  independentProjects: IndependentProject[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

export interface Person {
  name: string;
  location: string;                   // "Warsaw, Poland"
  workFormat: string;                 // "Remote-first · EU time zone"
  links: { linkedin: string; credly: string };
  photo: string;
  cvFileName: string;                 // "Mark_Kulishov_Engineering_Manager_CV.pdf"
  availability?: string;              // "Open to Engineering Manager roles"
}
export interface Headline { role: string; tagline: string[]; valueStatement: string; }
export interface ImpactMetric { value: string; label: string; context?: string; }
export interface CaseStudy { id: string; title: string; challenge: string; approach: string; result: string; tags: string[]; }
export interface Principle { title: string; description: string; }
export interface CompetencyGroup { title: string; items: string[]; metrics?: string[]; }
export interface Employer {
  company: string; employmentType: string; period: Period; location: string;
  roles: Role[];                      // reverse chronological
  focus?: string; tech?: string[];
}
export interface Role { title: string; period: Period; highlights: string[]; }
export interface Period { start: string; end: string | 'Present'; } // "Jul 2011", "2018"
export interface IndependentProject { name: string; role: string; description: string; outcomes?: string; tech: string[]; }
export interface Education { institution: string; degree: string; specialization: string; period: Period; }
export interface Certification {
  name: string; provider: string; issued: string; expires?: string;
  url?: string;                       // Credly badge
  verifyUrl?: string;                 // issuer verification (AWS)
  featured?: boolean; skills?: string[];
}
export interface Language { name: string; level: string; }
```
No HTML in content. The headline emphasis that used `[innerHTML]` becomes structured data (`tagline: string[]`, rendered with separators).

## Components and Interfaces

### Shared UI (`shared/ui/`, presentational, inputs only)
| Component | Inputs | Notes |
|-----------|--------|-------|
| `Section` (`app-section`) | `title`, `eyebrow?`, `id?` | `<section>` with `aria-labelledby`, content projection |
| `MetricTile` | `metric: ImpactMetric` | Large value, label, context |
| `CaseCard` | `caseStudy: CaseStudy` | `<article>`; three labelled blocks |
| `TagList` | `items: string[]` | Chips (replaces the duplicated `skill-tag` styles) |
| `ContactLinks` | `person: Person`, `variant` | LinkedIn (primary), Credly. Used by the hero, the CTA and the footer |

### Home (`features/home/`)
`Home` (container: injects `ProfileContent`) → `HomeHero`, `ImpactMetrics`, `CaseStudies`, `LeadershipPrinciples`, `ContactCta`.

### Resume (`features/resume/`)
Keep the container/presentational split; adapt components to the new model:
- `resume-header`: name, headline, location, contact links, Download CV (hidden in print)
- `resume-summary`: summary + languages
- `resume-competencies` (replaces `resume-skills`): `@for` over `CompetencyGroup[]`
- `resume-experience`: employer → nested roles timeline
- `resume-projects` (new): independent projects
- `resume-education`, `resume-certifications` (featured first, Credly link)

### Lab (`features/lab/`)
`Lab` hub page: intro, demo cards (title, what it demonstrates, tech tags, link) and a
"How this site is built" block: monorepo, Sheriff boundaries, quality gates, and the spec-driven flow
shown as a 4-step diagram (steering → requirements → design → tasks → code). It reuses the
"this monorepo showcases" list from the `dashboard` placeholder. **No link to the repository (it's
private).** Lab content is typed data in `features/lab/lab.content.ts`. The Pokemon and auth features keep their code. Only route paths change,
plus internal `routerLink`s (`/pokemon` → `/lab/pokemon`, `/auth/login` → `/lab/auth/login`, etc.).

### App shell
- `AppComponent`: remove the preloader `setTimeout` and the `Preloader` component/service.
- Hero: availability badge "Open to Engineering Manager roles" (from `person.availability`).
- `Header`: new nav and CV button; mobile menu (disclosure button with `aria-expanded`).
- `Footer`: becomes presentational. Inputs `person` (from `AppComponent` via `ProfileContent`) fix the
  Sheriff violation. Keep the "Built with" icons.

### Routing (`app.routes.ts`)
```ts
{ path: '', component: Home, title: 'Mark Kulishov · Engineering Manager' },
{ path: 'resume', component: Resume, title: 'Resume · Mark Kulishov' },
{ path: 'lab', children: [
  { path: '', loadComponent: () => import('@features/lab/lab').then(m => m.Lab), title: 'Engineering Lab · Mark Kulishov' },
  { path: 'pokemon', loadComponent: /* PokemonListComponent */, title: 'Pokemon demo · Lab' },
  { path: 'pokemon/:name', loadComponent: /* PokemonDetailsComponent */, canActivate: [pokemonDetailsGuard] },
  { path: 'auth', loadChildren: () => import('@features/auth/auth.routes').then(m => m.AUTH_ROUTES) },
]},
{ path: 'pokemon', redirectTo: 'lab/pokemon', pathMatch: 'full' },
{ path: 'pokemon/:name', redirectTo: 'lab/pokemon/:name' },
{ path: 'auth/:page', redirectTo: 'lab/auth/:page' },
{ path: '**', component: NotFound, title: 'Not found · Mark Kulishov' },
```
Sheriff: `features/lab` may not import `features/pokemon` or `features/auth`, so the lazy imports
live in `app.routes.ts` (the root tag may import anything), as nested `lab` children.

## Visual Design
- **Tokens** in `styles.scss` (`:root`): `--color-bg`, `--color-surface`, `--color-text`,
  `--color-text-muted`, `--color-accent`, `--color-accent-contrast`, `--color-border`,
  `--space-1..8`, `--radius-sm/md/lg`, `--shadow-sm/md`, `--font-sans`, `--fs-*`.
- Direction (Q4 = keep the brand): the purple gradient (`#667eea → #764ba2`) stays as the brand,
  defined once as `--gradient-brand` and used for the header, the hero and the accent elements. Body
  sections stay on a light neutral surface. Improvements within the brand: make sure the hero text
  and buttons meet AA contrast on the gradient; load the font that is actually used (Inter); replace
  emoji icons with inline SVG; keep the existing card style.
- Remove the global Angular Material theme and packages after the `dashboard`/`profile` placeholders are gone (R15.3). Nothing else uses Material.
- Motion: short fade-in only, disabled under `prefers-reduced-motion`.

## SEO, Sharing, PDF
- `index.html`: title, description, canonical (`https://portfolio-rmk.vercel.app/`), OG
  (`og:title`, `og:description`, `og:image` = `assets/og/og-image.png` 1200×630, `og:type=profile`),
  Twitter `summary_large_image`, `theme-color`, favicon set (`favicon.svg` + `favicon.ico`), JSON-LD `Person`.
  These tags are static, so the LinkedIn scraper (which doesn't run JS) sees them.
- `src/robots.txt`, `src/sitemap.xml` added to build `assets` in `angular.json`.
- Route titles via the default `TitleStrategy`.
- **PDF generated from content (R8)**:
  - `core/cv/cv-document.ts`: a **pure** function `buildCvDocument(profile: Profile): TDocumentDefinitions`
    that maps the same `PROFILE` to a pdfmake document (A4, built-in Roboto, sections in the same order as
    `/resume`, the footer line "Extended CV available on request. Message me on LinkedIn: …"). Pure, so it can be unit-tested without a browser.
  - `core/cv/cv-pdf.service.ts`: `download()` → `await import('pdfmake/build/pdfmake')` + `vfs_fonts`
    (lazy chunk, loaded on the first click only), then `createPdf(doc).download(person.cvFileName)`. A `generating` signal
    disables the button and shows "Preparing…". Errors set an `error` signal and fall back to `window.print()`.
  - `angular.json`: add `pdfmake` to `allowedCommonJsDependencies`.
  - Why pdfmake: declarative document definition (maps naturally from typed data), real selectable text
    (ATS-friendly), no server. Lazy cost ~1.5 MB on click only; initial bundle unchanged.
- **Print**: `@media print` rules in `resume.scss` and `styles.scss` hide the header, footer and CTAs, use black on white,
  apply `break-inside: avoid` per role, and set A4 margins.

## Error Handling
- Content is compile-time data, so there are no runtime loading or error states for Home and Resume.
- Missing optional fields (`url`, `availability`) hide the related UI element; nothing renders empty.
- Profile photo: `NgOptimizedImage` with explicit size; on error, fall back to an initials avatar (current behaviour, kept).
- CV PDF: if the lazy chunk fails to load or generation throws, show an inline message and open the print dialog as a fallback.
- Demo errors (PokeAPI, backend auth) keep their current handling inside the Lab; the global `errorInterceptor` stays.
- Unknown routes go to `NotFound` with links to Home and Resume.

## Correctness Properties
Properties that must always hold. Each is covered by an automated test.
1. **P1 Content integrity**: every `Profile` required field is non-empty; every `Period.start` is parseable; roles within an employer are in reverse chronological order. _(R5, R13.2)_
2. **P2 Claims guard**: the serialised content never contains banned claims (`P&L`, `budget owner`, `10x`, `B2+`, `C1`, `fluent`) and has no phone or email field or pattern. _(content-rules, R9.2)_
3. **P3 Finished engagements**: no `IndependentProject` and no non-PrivatBank employer has `end: 'Present'`. _(R5.3)_
4. **P4 Featured certification**: `certifications[0]` is AWS SAA with `featured: true`. _(R7.1)_
5. **P5 Title fidelity**: PrivatBank roles match exactly the four approved titles and periods. _(R5.2)_
6. **P6 Route compatibility**: every legacy URL (`/pokemon`, `/pokemon/:name`, `/auth/:page`) resolves to its `/lab/...` equivalent. _(R10.3)_
7. **P7 Single h1 per route**, and every route has a `title`. _(R11.2, R12.4)_
8. **P8 PDF parity**: `buildCvDocument(PROFILE)` contains every role title, every certification name and the LinkedIn URL, and no phone or email. _(R8.1, R8.2)_

## Testing Strategy
| Level | What |
|-------|------|
| Content invariants (`profile.content.spec.ts`) | Required fields non-empty; first certification is AWS SAA and `featured`; no independent project has an end of `Present`; PrivatBank has 4 roles with the approved titles; no banned phrases (`P&L`, `10x`, `B2+`, `C1`, `fluent`) anywhere in the serialised content; no phone/email |
| Component | Hero renders role + CTAs; MetricTile/CaseCard render inputs; competencies render N groups from data; experience renders nested roles; Lab cards link to `/lab/...` |
| PDF | `buildCvDocument` parity (P8); service lazy-loads and calls `download` with the right filename (pdfmake mocked) |
| Routing | Redirects `/pokemon` → `/lab/pokemon`, `/auth/login` → `/lab/auth/login`; titles per route |
| Manual / tooling | Lighthouse mobile on `/`, `/resume`; keyboard-only pass; print preview A4; LinkedIn Post Inspector for OG |

**Sequencing (R13):** the test *infrastructure* is fixed in Phase 0 so the gates work. The test *suite* is
rewritten from scratch in the final phase, after the new portfolio is implemented: obsolete specs are deleted
together with the code they cover during the earlier phases, and the remaining specs must stay green.

## Implementation Phases

The task breakdown comes after approval.
0. **Baseline**: fix the install and test runner; git hygiene (done: `tmp/` ignored, `.ai` tracked).
1. **Foundation**: model v2, `profile.content.ts` (rewritten 1:1 from the EM resume + case studies from the evidence bank), `ProfileContent`, design tokens, shared UI.
2. **Resume rebuild** on the new model; remove `resume.json`/`ResumeData`.
3. **Home** EM landing (hero + badge, metrics, case studies, How I lead, CTA).
4. **Lab** hub + route move + redirects; rename Secret Club; salvage the dashboard content.
5. **Shell**: header/nav/mobile, footer refactor, remove the preloader.
6. **PDF generator + print**, SEO/OG, favicon, robots/sitemap.
7. **Unused code review** (R15) + README.
8. **Test suite rewrite** (R13.2) + Lighthouse/a11y verification.

Each phase leaves the site deployable.

## Risks and Mitigations
| Risk | Mitigation |
|------|-----------|
| Inconsistent facts (e.g. team size) | Q1 resolved before content; invariants test; single content file |
| Public exposure of private data | `tmp/` ignored; privacy rules; review of the content file in the PR |
| Breaking old shared links to demos | Redirect routes + test |
| Style budget (4 kB/component) exceeded | Tokens and shared UI; split large components |
| PDF layout differs from the web page | Same section order and data; parity test P8; manual check of the PDF in each release |
| pdfmake CommonJS / bundle warnings | Lazy import, `allowedCommonJsDependencies`; check the build stats |

## Alternatives Considered
- **Separate `/leadership` page** for case studies: rejected for now. Fewer clicks matter for recruiters. Can be split out later if the content grows.
- **Angular SSG/prerender (`@angular/ssr`)**: better SEO for `/resume`, but adds build complexity.
  Deferred as a follow-up spec. Static meta in `index.html` covers link previews.
- **Keep JSON content**: rejected (see Content source).
- **PDF via a static file**: rejected (Q6). It goes out of sync with the site.
- **PDF via a headless browser at build time** (Puppeteer/Playwright on Vercel): pixel-perfect, but it makes the build fragile (Chromium in the Vercel build image).
- **PDF via `window.print()` only**: zero dependencies, but it's not a one-click download, and the result depends on the browser. Kept as the fallback.

## Decision log
- 2026-10-12: Content as typed TS (see Content source). Demos under `/lab` with redirects. Frontend-only scope.
- 2026-10-12: LinkedIn-only contact; keep the purple gradient brand; team size 7.
- 2026-10-12: PDF generated client-side with lazy pdfmake from `PROFILE`; Open-to-work badge; no repo link; old certificates kept; tests rewritten in the final phase; dead code removed only after salvage (R15).
