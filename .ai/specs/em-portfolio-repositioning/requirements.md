# Requirements: EM Portfolio Repositioning

Status: **Approved (2026-10-12)** · Owner: Mark · Created: 2026-10-12

## Introduction
The portfolio currently positions Mark as a *Senior Full-Stack Engineer (Laravel/React/Angular)*.
The resume content is out of date and in places contradicts the approved facts: the B2B freelance
engagement is shown as "Present", PrivatBank shows wrong dates and one merged title, there is no
AWS SAA certification, and English is listed as "B2+". The landing page promotes a Pokemon demo
and a "Secret Club" page.

Goal: reposition the site for **Engineering Manager** roles so that a recruiter gets the message
in about 10 seconds and a hiring manager finds evidence of leadership and delivery impact in
2–5 minutes. Engineering credibility stays, but in a clearly separated "Lab".

## Goals
- G1. The EM positioning is clear above the fold.
- G2. All content matches the approved EM resume and `steering/content-rules.md`.
- G3. Leadership impact is shown with verified numbers and short case studies.
- G4. The hands-on engineering proof (demos and this repo's spec-driven workflow) stays visible but secondary.
- G5. The site is professional when shared and found: SEO, link previews, performance, a11y.

## Non-goals
- Backend feature changes (the auth demo stays as is).
- CMS, blog, i18n, dark mode, custom domain, analytics.
- Writing new facts. All copy comes from the evidence bank; anything missing is asked.

---

## Requirements

### R1. Landing page positioning (Home)
**User story:** As a recruiter, I want to see Mark's target role, scope and location immediately, so that I can decide in seconds whether he fits.

1. WHEN the home page loads THEN the hero SHALL show the name, the headline "Engineering Manager", and the tagline "15+ years in software engineering · 4+ years managing teams · AWS Certified Solutions Architect – Associate".
2. The hero SHALL include a 2–3 sentence value statement derived from the approved resume summary.
3. The hero SHALL show "Warsaw, Poland · Remote-first (EU time zone)".
4. The hero or the metrics SHALL state the scope: "cross-functional unit of 7 (4 engineers, 3 business analysts, embedded QA and design) · 15+ concurrent platforms · 1,000+ internal users".
5. The hero SHALL offer the primary actions **View resume**, **Download CV (PDF)** and **Connect on LinkedIn**.
6. The hero SHALL show an availability badge: "Open to Engineering Manager roles".
7. The hero SHALL NOT link to the Pokemon demo or the auth demo.

### R2. Impact metrics
**User story:** As a hiring manager, I want key outcomes in numbers, so that I can judge impact without reading the full CV.

1. The home page SHALL show 4–6 metric tiles, each with a value, a short label, and optional context.
2. Each metric SHALL be one of the approved facts, e.g.: 99.8%+ SLA for 5 consecutive quarters; 15 systems / 30 services / 17 DBs migrated to AWS in 3 months; 3 hires since 2022 with 100% retention; unplanned work ~50% → ~20%; 80–90% of committed work delivered within the sprint; a typical feature went from a 2-week sprint to 1–2 days.
3. Metric data SHALL be typed content, not hard-coded markup.

### R3. Leadership case studies
**User story:** As a hiring manager, I want short stories of how Mark solved real problems, so that I can assess his approach.

1. The site SHALL show 3–4 case studies, each structured as **Challenge → Approach → Result**, ≤ 90 words.
2. The texts SHALL be taken from the STAR stories in the private evidence bank (`tmp/evidence-bank.md`), condensed and kept to confirmed (✅) facts: (a) emergency AWS migration (Story 1); (b) from chaotic sprints to predictable delivery (Story 2); (c) quality and release pipeline (Story 3); (d) AI spec-driven development rollout (Story 4).
3. Stories marked as draft or unconfirmed (Story 7) and parts marked ⚠️ SHALL NOT be published.
4. Case studies SHALL contain no confidential or identifying details (see content rules: Privacy).

### R4. Leadership approach ("How I lead")
**User story:** As a hiring manager, I want to understand Mark's management style, so that I can assess team and culture fit.

1. The home page SHALL show 4–6 concise principles (title + one sentence), for example: measurable expectations from day one (SMART goals); regular 1:1s as the base for growth plans; delivery predictability through metrics; quality gates built into the pipeline; AI-assisted delivery with specs before code.
2. The principles SHALL be derived from the evidence bank (e.g. the learning from Story 6, the 1:1 practice from Story 2, the requirements gate from Story 7's confirmed facts), never as identifiable people stories.

### R5. Resume content accuracy
**User story:** As a reader, I want the online CV to match the CV I received, so that I trust it.

1. The resume content SHALL be **fully rewritten** from `tmp/Resume_Mark_Kulishov_em.md`: headline line, summary, core competencies, work history, selected independent projects, education, certifications and languages. Wording and numbers SHALL match the source 1:1 (no paraphrasing of facts). The GDPR consent clause, phone and email are omitted on the site.
2. PrivatBank SHALL appear as one employer (Full-time, Jul 2011 – Present, Ukraine, working remotely from Warsaw) with **four roles** in reverse chronological order, each with its own period and bullet points.
3. Independent projects SHALL appear in a separate "Selected independent projects" section, written in the past tense, with no "Present" dates.
4. Removed/replaced: the "Senior Full-Stack Engineer" headline, "B2+", the outdated LinkedIn URL, and the "Freelance · Present" entries.
5. The resume SHALL show a "Focus" line and a tech line where the source resume has them.

### R6. Core competencies (data-driven)
1. Competencies SHALL be rendered from an ordered list of categories `{ title, items[] }`, not from hard-coded template blocks.
2. Categories (in order): People Management, Delivery Management, Cloud & Architecture, Engineering, AI-Assisted Delivery, Methods & Tools.
3. The old "Certified Skills" block SHALL be removed (duplicates certifications).

### R7. Certifications
1. **AWS Certified Solutions Architect – Associate** (Amazon Web Services, issued Aug 2026, expires Aug 2029) SHALL be listed first and featured, with the Credly badge link `https://www.credly.com/badges/43b6199a-2387-4b7c-aa72-54beb531a5d5` and an AWS verification link `https://cp.certmetrics.com/amazon/en/public/verify/credential/308a994a62ed48c4b718d0803fd1b959`. LinkedIn lists it twice (AWS and AWS Training and Certification); the site shows it once.
2. Then the certificates from the EM resume: Scrum Foundation Professional (CertiProf, Feb 2024) and Developing Cloud Apps with Node.js and React (IBM, Aug 2023).
3. The existing certificates SHALL stay (Edchart Laravel, Edchart React, IBM Front-end Development with React, Coursera Generative AI, RS School React), listed after the EM-relevant ones, newest first.
4. The section SHALL link to the Credly profile for all badges.

### R8. Downloadable CV (generated) and print
1. WHEN the user clicks "Download CV (PDF)" THEN the site SHALL generate a PDF **from the same portfolio content** (no separately maintained file) and download it as `Mark_Kulishov_Engineering_Manager_CV.pdf`.
2. The PDF SHALL contain selectable text (ATS-readable), an A4 layout, the same sections as `/resume`, and a footer line: "Extended CV available on request. Message me on LinkedIn: <url>".
3. The PDF generator SHALL be lazy-loaded on click and SHALL NOT increase the initial bundle.
4. WHEN `/resume` is printed THEN a print stylesheet SHALL produce a clean A4 layout (no header, nav or footer; black on white).

### R9. Contact
1. The site SHALL use **LinkedIn** as the only direct contact channel, with Credly as a credentials link.
2. The site SHALL NOT show a phone number or an email address (both are in the PDF CV only).

### R10. Engineering Lab
**User story:** As an engineer on the hiring panel, I want to see what Mark builds and how, so that I can assess his technical depth.

1. A `/lab` page SHALL present the demos as cards with a short "what it demonstrates" note: Pokemon (signals, RxJS search, lazy routes, guards, CSV export); Auth (NestJS + Fastify, Zod, JWT in an HttpOnly cookie, guards).
2. The Lab SHALL include a "How this site is built" block: monorepo (Angular 21 + NestJS 11), Sheriff boundaries, quality gates (Husky, lint, tests, build), and the spec-driven AI workflow (steering → requirements → design → tasks). It reuses the useful "what this monorepo showcases" list from the unused `dashboard` placeholder.
3. The site SHALL NOT link to the source repository (it is private).
4. The demos SHALL move under `/lab/...`. Old URLs (`/pokemon`, `/pokemon/:name`, `/auth/*`) SHALL redirect to the new ones.
5. The "Secret Club" label SHALL be renamed to neutral wording ("Auth demo").
6. The main nav SHALL be: Home · Resume · Lab.

### R11. SEO and link previews
1. `index.html` SHALL have the title "Mark Kulishov · Engineering Manager", a meta description, canonical URL, Open Graph and Twitter Card tags (with an OG image of 1200×630), `theme-color` and a working favicon.
2. Each route SHALL set its own `<title>` through route `title` configuration.
3. The page SHALL include JSON-LD `Person` structured data (name, jobTitle, address locality, sameAs: LinkedIn, Credly).
4. The site SHALL serve `robots.txt` and `sitemap.xml`.

### R12. Performance and accessibility
1. The artificial 1-second preloader SHALL be removed. Content renders as soon as it is ready.
2. Resume content SHALL be loaded once and shared (no duplicate requests).
3. Lighthouse (mobile) for `/` and `/resume` SHALL score ≥ 90 for Performance and ≥ 95 for Accessibility, Best Practices and SEO.
4. Layouts SHALL work from 360 px to 1440 px; colors SHALL meet WCAG AA; all interactive elements SHALL have a visible focus state; animations SHALL respect `prefers-reduced-motion`.

### R13. Engineering quality
1. The test infrastructure SHALL be fixed first (`zone.js`, Sheriff and Vitest resolve), so lint/build/test gates work during implementation.
2. The frontend test suite SHALL be **rewritten from scratch after the new portfolio is implemented** (final phase): obsolete specs are removed together with the code they cover; the new suite covers the content invariants, components, routing/redirects and the PDF generator.
3. During the implementation phases, every remaining spec SHALL pass (no red builds), but new tests are not required until the test phase.
4. `npm run lint` (incl. Sheriff) and `npm run build` SHALL pass with no new budget errors.
5. The `shared → core` boundary violation in the footer SHALL be fixed.
6. The README SHALL describe the EM portfolio and the spec-driven workflow; dead links SHALL be removed.

### R14. Repository hygiene and privacy
1. `tmp/` SHALL be unstaged and git-ignored; no private career data SHALL be committed.
2. `.ai/` SHALL be versioned so the specs live with the code; `.kiro/` holds only symlinks to it. The repository stays private.

### R15. Unused code review
1. Code SHALL be removed only if it is confirmed dead: not routed, not imported, and with no unique value.
2. `features/dashboard` and `features/profile` (scaffold placeholders from the initial commit): their useful content moves to the Lab (R10.2), then the folders are removed.
3. The Angular Material theme and packages SHALL be removed if no component uses Material after step 2.
4. `provideClientHydration` (no SSR, so it does nothing) and the Karma `test` target (Vitest is used) SHALL be removed.
5. The `@angular-eslint/*` v19 packages SHALL be aligned with `angular-eslint` v21 (a version fix, not a removal); `@nestjs/swagger` SHALL be removed from the frontend dependencies.
6. The preloader is not dead code but delays rendering by 1 s (R12.1). It SHALL be removed.

---

## Open questions
| # | Question | Answer |
|---|----------|--------|
| Q1 | Team size | **7: 4 engineers + 3 BAs, embedded QA and design** |
| Q2 | Public contact | **LinkedIn only** (no email, no phone) |
| Q3 | Older IC certificates | **Keep them**, and add AWS SAA first (R7) |
| Q4 | Visual style | **Keep the purple gradient brand** |
| Q5 | Link to the repo | **No.** The repo is private (R10.3) |
| Q6 | CV PDF | **Generated from the portfolio content**; extended CV on request via LinkedIn (R8) |
| Q7 | "Open to work" badge | **Yes**, show it (R1.6) |
| Q8 | Tech debt | **Remove only confirmed dead code, after salvaging what's useful** (R15) |
| Q9 | Case-study texts | **Take them from `tmp/` files** (R3.2, R4.2) |
| Q10 | AWS SAA Credly badge URL | **Credly badge + AWS verification link** (R7.1) |

## Decision log
- 2026-10-12: Spec folder format = Kiro (`.kiro/steering`, `.kiro/specs`), referenced from `CLAUDE.md`.
- 2026-10-12: Superseded. AI context moved to the neutral `.ai/` with `AGENTS.md` as the entry point; `.kiro/` keeps symlinks for Kiro; `frontend/.ai/angular.json` removed (covered by `steering/conventions.md`).
- 2026-10-12: Hiring metric = 3 hires (consistent across all source files).
- 2026-10-12: Q1 team = 7 (4 eng + 3 BA). Q2 contact = LinkedIn only. Q4 keep the purple gradient. R14 done: private notes moved to git-ignored `tmp/`, `tmp_context` unstaged.
- 2026-10-12: Q3, Q5–Q9 answered. Tests are rewritten after implementation; PDF is generated from content; Open-to-work badge shown; no repo link.
- 2026-10-12: Q10 answered (AWS badge + verification links).
