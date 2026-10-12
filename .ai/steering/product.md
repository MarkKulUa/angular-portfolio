# Product Steering

## What this is
Personal portfolio and online CV of **Mark Kulishov**, deployed on Vercel
(frontend: `portfolio-rmk.vercel.app`, backend: `angular-portfolio-backend.vercel.app`).

It has two jobs:
1. **Career positioning**: present Mark as an **Engineering Manager** (15+ years in software
   engineering, 4+ years of people management in banking) to recruiters and hiring managers.
2. **Proof of hands-on engineering**: the codebase itself (Angular 21 + NestJS 11 monorepo,
   architecture boundaries, quality gates, spec-driven AI workflow) shows that the manager can still
   reason about and build production-grade software.

## Audience (priority order)
1. **Recruiters / talent partners**: skim for 10–30 seconds. They need the title, years, team scope,
   location and work format, and a contact link.
2. **Hiring managers (Directors / VPs of Engineering, CTOs)**: read for 2–5 minutes. They need
   evidence of people leadership, delivery outcomes with numbers, technical judgment, and leadership style.
3. **Engineers on the hiring panel**: look at the Lab demos (the repository is private and not linked).

## Positioning
- Primary target role: Engineering Manager. Also Team Lead / Delivery Manager and Head of Engineering.
- Strongest domain: FinTech / banking. Also SaaS, B2B platforms.
- Work format: Warsaw, Poland, remote-first, EU time zone.
- Tone: concise, factual, metric-driven, calm. No buzzwords ("rockstar", "ninja", "10x").

## Pages (target state, see `specs/em-portfolio-repositioning`)
- `/`: landing page with EM positioning, an "Open to Engineering Manager roles" badge, impact metrics, case studies, "How I lead", and calls to action.
- `/resume`: full online CV, plus a "Download CV (PDF)" generated from the same content.
- `/lab`: engineering playground (Pokemon demo, JWT auth demo, "how this site is built").

## Out of scope for the product
CMS, blog, multi-language, user accounts beyond the auth demo, analytics dashboards.
