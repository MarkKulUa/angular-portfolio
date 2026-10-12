# Tasks: EM Design Polish

Status: **Approved (2026-10-12)** · Design: [design.md](./design.md)

Rules: one task at a time; Definition of Done from `.ai/README.md`; **no git commits or pushes**.

## Phase 1: Content and assets
- [x] 1.1 Model + content: `Headline.currentRole/statement/pillars`, `Pillar`, `CaseStudy.headline`, `Role.note`; fill in the content; reduce `impactMetrics` to the 3 non-pillar metrics. _R1, R2, R3.3, R5.2_
- [x] 1.2 Content invariants D1–D3. _R9.2_
- [x] 1.3 Photo → `profile.webp` 560×560 ≤ 80 KB; update references and JSON-LD; remove the PNG from assets. _R8.1, R8.3_

## Phase 2: Shell and colors
- [x] 2.1 White translucent header, gradient logo mark, accent active link, gradient CV button, white mobile menu. _R4.2_
- [x] 2.2 Neutral surfaces: resume header (gradient top bar), Lab intro, 404, auth background. _R4.1, R4.3_
- [x] 2.3 Footer `showTechStack` input + route-based signal in `AppComponent`. _R6_

## Phase 3: Home
- [x] 3.1 Hero: current-role line, statement, pillars, depth background; remove chips and the scope paragraph. _R1, R2.1, R4.4_
- [x] 3.2 "Results in numbers" with 3 tiles. _R2.3_
- [x] 3.3 Case card: result-first + `<details>`. _R3_
- [x] 3.4 Career timeline section (horizontal/vertical, "Now", dashed "Next"). _R5_

## Phase 4: Resume
- [x] 4.1 Plain-text competencies and certification skills. _R7.1, R7.2_
- [x] 4.2 Sticky TOC (≥ 1200 px) + `scroll-margin-top`. _R7.3_

## Phase 5: Previews and verification
- [x] 5.1 Regenerate the OG image (new photo + statement). _R8.2_
- [x] 5.2 Update specs (hero, timeline, case card, footer D5, TOC); lint/test/build green. _R9.1_
- [x] 5.3 Screenshots 390/768/1440, first-viewport check, Lighthouse a11y/BP/SEO = 100, print preview. Record results here. _R2.2, R9.3_

## Notes and deviations
- 1.1: The model keeps `tagline`, `valueStatement` and `scope` (still used by the resume header, the PDF and the meta tags); the hero no longer renders them.
- 1.3: Photo converted with `sips` (resize) + `cwebp -q 85`: 560×560, **14 KB** (was 803 KB PNG). The PNG was removed from assets; the original stays in git history (commit f440f7a).
- 3.3: The case "Result" texts were trimmed so they don't repeat the new headline word for word (headline + result = the original approved result; no facts changed).
- Found while verifying (pre-existing bug): the header was **never sticky**. `position: sticky` sat on the inner `<header>`, whose parent (the 70px host) limits it. Moved to `:host`. Also `ViewportScroller.setOffset([0, 86])`, because anchor scrolling ignores CSS `scroll-margin-top`.
- 5.3 a11y fixes from Lighthouse: the dimmed "Next" timeline note (4.36:1) is no longer dimmed; the logo now gets its accessible name from its visible text ("MK Mark Kulishov, home") instead of an `aria-label` (WCAG 2.5.3).
- 5.3 results (production build, local server): Lighthouse `/` and `/resume`, mobile and desktop: Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 100, 0 failed audits. Trace (mobile, Slow 4G, CPU ×4): LCP 844 ms, CLS 0. First viewport: at 1440×900 the hero incl. pillars and CTAs is fully visible; at 390×844 the pillars start at 614px. No horizontal scroll at 390/1440. Print preview: TOC and shell hidden, competencies as plain text. Tests: 18 files / 89 tests green; lint and Sheriff clean; initial bundle 405 kB.

