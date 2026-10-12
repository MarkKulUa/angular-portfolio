# Requirements: EM Design Polish

Status: **Approved (2026-10-12)** · Owner: Mark · Created: 2026-10-12
Follows: [em-portfolio-repositioning](../em-portfolio-repositioning/requirements.md) (done)

## Introduction
The EM repositioning is complete technically. This spec improves how the site **reads** for
recruiters and hiring managers: a lighter hero with proof on the first screen, result-first case
studies, a visible career progression, a calmer use of the brand color, and a more document-like resume.

## Goals
- G1. The value proposition and the proof are visible without scrolling.
- G2. Results lead; details are available on demand.
- G3. The move from IC to people leadership is visible at a glance.
- G4. The brand looks more refined: the gradient is used as an accent, not everywhere.

## Non-goals
- Testimonials (later, when Mark has LinkedIn recommendations).
- Changing the uniform card style (decided: keep it, it standardises reading and rendering).
- New facts. All copy follows `.ai/steering/content-rules.md`.

---

## Requirements

### R1. Lighter hero with a value statement
**User story:** As a recruiter, I want to understand in one sentence what Mark is good at, so that I can match him to a role quickly.

1. The hero SHALL show: availability badge, name, target role "Engineering Manager", a current-role line, the value statement, the location/work format line, CTAs and the photo.
2. The value statement SHALL be: "I do three things well: ship predictably with stable releases, bring AI into my team's daily development, and turn individuals into one team that owns its results." (approved by Mark; lives in content).
3. The current-role line SHALL be: "Team Lead & Delivery Manager at PrivatBank · cross-functional unit of 7 · 15+ internal platforms".
4. The tagline chips (incl. the tech-stack chip) and the long scope paragraph SHALL be removed from the hero.

### R2. Proof on the first screen
1. Directly under the value statement, the hero SHALL show **three pillars** that match its three claims, each with a title and 1–2 proof metrics:
   - Predictable delivery: 80–90% of committed work delivered within sprint; 2–3 stable production releases every week
   - AI in daily development: typical feature from a full 2-week sprint to 1–2 days
   - One team: 3 hires since 2022 with 100% retention
2. On a 1440×900 and a 390×844 viewport, the pillars SHALL be visible or start within the first viewport (desktop: fully visible).
3. The "Results in numbers" section SHALL show only the metrics that are **not** used in the pillars (99.8%+ SLA; 15 systems to AWS in 3 months; unplanned work ~50% → ~20%). No metric tile repeats a pillar metric. Case study headlines (R3) may restate a result, because they tell its story.

### R3. Result-first case studies
1. Each case card SHALL start with a short result headline (≤ 10 words, contains the key number), followed by the case title as an eyebrow.
2. Challenge and Approach SHALL be collapsed by default behind a native disclosure ("How it was done"), keyboard-accessible, with the Result visible.
3. Headlines: "15 systems moved to AWS in 3 months"; "80–90% of committed work delivered within sprint"; "2–3 stable releases every week"; "A typical feature in 1–2 days instead of 2 weeks".

### R4. Calmer, more refined brand use
1. The purple gradient SHALL be used only in the home hero and the closing CTA.
2. The header SHALL be white (translucent with backdrop blur when scrolling), with accent-colored active links and a gradient or accent "Download CV" button.
3. The resume header, the Lab intro, the 404 page and the auth demo background SHALL use light neutral surfaces with accent details instead of full gradient fills.
4. The hero SHALL get subtle depth (soft light shapes or a fine pattern) without hurting contrast (WCAG AA) or LCP.

### R5. Career timeline on Home
**User story:** As a hiring manager, I want to see the path from engineer to leader, so that I can trust the management experience.

1. Home SHALL show a "Career path" section with the four PrivatBank roles in chronological order: Full-Stack Developer (Jul 2011) → Senior Full-Stack Developer (2018) → Tech Lead (acting Engineering Manager) (2022) → Team Lead & Delivery Manager (Jul 2025 – Present).
2. Each step SHALL show its period and a one-line note derived from the resume bullets.
3. The current step SHALL be visually highlighted; a final, dashed "Next: Engineering Manager" step SHALL show the target.
4. The timeline SHALL be horizontal on desktop and vertical on mobile, and derived from `PROFILE.experience` (titles and periods are not duplicated in content).
5. The section SHALL NOT state an end year for the current role ("Present").

### R6. Footer tech stack
1. The "Built with" icons SHALL be hidden on Home and shown on all other pages.

### R7. Document-like resume
1. Competencies SHALL render as plain, comma-separated text per group (no colored pills).
2. Certification skills SHALL render as plain muted text.
3. On viewports ≥ 1200 px, the resume SHALL show a sticky table of contents (anchor links to its sections); sections SHALL have `scroll-margin-top` so the sticky header doesn't cover them.

### R8. Photo and preview assets
1. The profile photo SHALL be served as WebP at 2× the largest display size (560×560), ≤ 80 KB; the original PNG is not shipped.
2. The OG image SHALL be regenerated with the new photo and the new value statement.
3. JSON-LD `image` SHALL point to the new photo.

### R9. Quality
1. Lint, tests and build SHALL pass; specs SHALL be updated for the new hero, pillars, timeline, case cards and footer behaviour.
2. Content invariants SHALL also cover: the hero pillars use only approved facts; no metric is duplicated between pillars and "Results in numbers"; case headlines ≤ 10 words.
3. Lighthouse Accessibility, Best Practices and SEO SHALL stay at 100 for `/` and `/resume`.

## Open questions
| # | Question | Answer |
|---|----------|--------|
| Q1 | Hero value statement | **Approved by Mark** (R1.2 wording) |
| Q2 | `ci_cd/` folder | Not part of this spec; waiting for Mark's decision (move or delete) |

## Decision log
- 2026-10-12: Keep uniform cards (Mark). Footer icons hidden only on Home (Mark). No testimonials yet (Mark).
- 2026-10-12: Hero statement approved. Photo conversion tested: cwebp q85, 560×560 → 14 KB (vs 803 KB PNG), no visible quality loss.
