# Design: EM Design Polish

Status: **Approved (2026-10-12)** · Requirements: [requirements.md](./requirements.md)

## Overview
Frontend-only. Changes the content model a little (hero pillars, case headlines, timeline notes),
adds two small presentational components (pillars, career timeline), and restyles the shell
(header, resume header, Lab intro, 404, auth background) to use the gradient only as an accent.

## Architecture
No new layers. Same Sheriff rules.
```
core/content/profile.content.ts   + headline.statement, headline.currentRole, headline.pillars
                                  + caseStudies[].headline, roles[].note
features/home/components/         + hero-pillars (inside home-hero), career-timeline
shared/ui/case-card               result-first + <details>
shared/components/header|footer   white header; footer `showTechStack` input
app.component.ts                  showTechStack = url !== '/' (router signal)
features/resume                   plain competencies, sticky TOC
```

## Components and Interfaces

### Home hero (`features/home/components/home-hero`)
```
[badge: Open to Engineering Manager roles]
Mark Kulishov
Engineering Manager
Team Lead & Delivery Manager at PrivatBank · cross-functional unit of 7 · 15+ internal platforms
"I do three things well: …"                                         ( photo )
┌ Predictable delivery ┐ ┌ AI in daily development ┐ ┌ One team ┐
│ 80–90% · 2–3/week    │ │ 2 weeks → 1–2 days       │ │ 3 hires · 100% │
└──────────────────────┘ └──────────────────────────┘ └────────────────┘
📍 Warsaw, Poland · Remote-first · EU time zone
[View resume →] [Download CV] [Connect on LinkedIn]
```
- Pillars: frosted cards on the gradient (`rgba(255,255,255,.12)` + 1 px border), value in large tabular numerals.
- Depth: two blurred radial "glow" shapes plus a faint dot grid as CSS background layers (no images, so no LCP cost).
- Mobile: the photo goes small at the top, pillars stack, CTAs are full width.

### Results in numbers
The same `MetricTile` grid, but with 3 tiles (SLA, AWS migration, unplanned work).

### Case card (`shared/ui/case-card`)
```
EMERGENCY MIGRATION TO AWS              ← eyebrow (title)
15 systems moved to AWS in 3 months     ← headline (h3)
Result: All 15 systems … no disruption  ← highlighted
▸ How it was done                       ← <details><summary>
   Challenge … / Approach …
[tags]
```

### Career timeline (`features/home/components/career-timeline`)
- Input: `roles: Role[]` (from `PROFILE.experience[0].roles`, reversed to chronological order) + `next: string` ("Engineering Manager").
- Desktop: a horizontal line with 5 nodes (4 roles + dashed "Next"), the current node filled with the gradient and labelled "Now".
- Mobile (< 768 px): vertical list with the line on the left.
- Each node: start period (current role: "Jul 2025 – Present"), title, note.

### Header (`shared/components/header`)
White background, `backdrop-filter: blur(12px)` with 85% opacity, bottom border `--color-border`.
Logo "MK" as a small gradient square (like the favicon). Links in `--color-text`, active link in
accent with a 2 px underline. CV button: gradient fill, white text. Mobile menu: white panel.

### Footer
New input `showTechStack = input(true)`. `AppComponent` computes it from the router URL
(`toSignal(router.events.pipe(filter(NavigationEnd)…))`): `false` on `/`.

### Resume
- `resume-competencies`: `<p><strong>{title}:</strong> a, b, c</p>` per group, with the extra line muted.
- `resume-certifications`: skills as a muted comma list.
- `resume-toc` (new, feature-internal): `nav[aria-label="Resume sections"]` with `routerLink="/resume" fragment="…"`;
  sticky at `top: header + 16px` on ≥ 1200 px (2-column layout: TOC 200 px + document); hidden below 1200 px and in print.
- Resume header: white with a 6 px gradient top bar, dark text, accent role.

### Other surfaces
- Lab intro, 404, auth-forms background: `--color-surface` with an accent eyebrow; CTA buttons in the gradient.

## Data Models
```ts
export interface Headline {
  role: string;
  currentRole: string;        // "Team Lead & Delivery Manager at PrivatBank · …"
  statement: string;          // the value statement
  pillars: Pillar[];          // exactly 3
  tagline: string[];          // kept for the resume header and the PDF
  valueStatement: string;     // kept for the PDF/meta
  scope: string;              // kept for the resume/PDF summary context
}
export interface Pillar { title: string; proof: ImpactMetric[]; }
export interface CaseStudy { …; headline: string; }
export interface Role { …; note?: string; }   // one-line timeline note
```
`impactMetrics` keeps only the 3 metrics that aren't in the pillars.

## Error Handling
- No runtime data, so no new error states.
- The `<details>` disclosure works without JS and stays keyboard-accessible.
- If a role has no `note`, the timeline shows only the title and period.

## Correctness Properties
1. **D1 No duplicate metrics**: no `value` appears both in `headline.pillars[*].proof` and in `impactMetrics`. _(R2.3)_
2. **D2 Pillars match the statement**: exactly 3 pillars, in the statement's order. _(R2.1)_
3. **D3 Case headlines**: each ≤ 10 words and contains a digit. _(R3.1)_
4. **D4 Timeline fidelity**: the timeline renders the PrivatBank roles chronologically, the last one with "Present", plus one "Next" step. _(R5)_
5. **D5 Footer**: the tech icons are absent on `/` and present on `/resume` and `/lab`. _(R6)_
6. **D6 Gradient budget**: the header, the resume header, the Lab intro and the 404 have no gradient background. Checked by a style review, not a unit test.

## Testing Strategy
| Level | What |
|-------|------|
| Content | D1–D3 in `profile.content.spec.ts`; existing P1–P5 stay |
| Component | hero (statement, 3 pillars, no chips), career timeline (D4), case card (headline first, details collapsed), footer input (D5), resume TOC links |
| Manual | screenshots at 390/768/1440 px, first-viewport check, Lighthouse a11y/BP/SEO, print preview |

## Risks and Mitigations
| Risk | Mitigation |
|------|-----------|
| White text on frosted pillars loses contrast | Keep the pillar background ≤ 16% white on the AA-compliant gradient; check contrast |
| Sticky TOC + sticky header overlap | `scroll-margin-top` and TOC `top` from the `--header-height` token |
| Content drift between hero, resume and PDF | Pillars reuse approved facts; invariants test |

## Alternatives Considered
- **Keep tagline chips in the hero**: rejected. They compete with the statement and the stack chip is IC-oriented.
- **Timeline in a separate page**: rejected. The point is to see the progression on the landing page.

## Decision log
- 2026-10-12: Created from the design review in chat (Mark's decisions on items 1–5).
