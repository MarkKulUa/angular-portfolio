# Content Rules (portfolio copy)

These rules apply to any change to visible text, meta tags, or the CV PDF. Copy lives in:
- `frontend/src/app/core/content/profile.content.ts`: landing page, resume and the generated PDF
- `frontend/src/app/features/lab/lab.content.ts`: Lab page
- `frontend/src/index.html` (title, description, OG/Twitter, JSON-LD) and `frontend/src/llms.txt`

The facts in `index.html` and `llms.txt` are duplicated by hand: keep them in sync with `profile.content.ts`.
The content invariants spec (`profile.content.spec.ts`) guards the main rules automatically.

## Source of truth
- Facts come **only** from Mark's private evidence bank (kept locally in `tmp/`, never
  committed). If a number or claim isn't there, **ask Mark**. Never invent or round up.
- The public site must match the current EM resume: titles, dates, numbers.

## Fixed facts (public-safe)
- Name: Mark Kulishov · Warsaw, Poland · remote-first, EU time zone.
- LinkedIn: https://www.linkedin.com/in/mark-k-85140b1b5/
- Credly: https://www.credly.com/users/mark-kulishov/badges
- Employer: PrivatBank (Jul 2011 – Present). Titles:
  - Jul 2025 – Present: **Team Lead & Delivery Manager**
  - 2022 – Jul 2025: **Tech Lead (acting Engineering Manager)**
  - 2018 – 2022: **Senior Full-Stack Developer**
  - Jul 2011 – 2018: **Full-Stack Developer**
- Team scope (current role): cross-functional unit of **7**: 4 engineers + 3 business analysts, with embedded QA and design.
  Don't use "9" or "6 engineers".
- Hiring: **3 engineers hired and onboarded since 2022, 100% retention** (the EM resume is the latest source).
- Public contact: **LinkedIn only** (no email or phone on the site).
- Languages: English: professional working proficiency · Polish: conversational · Ukrainian: native.

## Never claim
- Budget or P&L ownership.
- "10x" or "tens of times" productivity. Use "a typical feature went from a full 2-week sprint to 1–2 days".
- Plain "Engineering Manager" as the title for 2022–2025 (use "Tech Lead (acting Engineering Manager)").
- Independent projects (incl. the B2B marketplace) as active/ongoing. They are finished.
- English above B2 / "professional working proficiency" (e.g. not "C1", "fluent", "B2+").
- Experience managing managers or team leads.

## Standard wording
- AWS migration: "...with no disruption to critical business operations".
- AI delivery: "spec-driven, AI-assisted development (Cursor, Kiro, Claude)".

## Privacy
- No phone number, email address, home address, salary, availability or right-to-work details on the public site.
- No names of colleagues, internal system names, or confidential details beyond what the public resume already says.
- People-management stories (e.g. an underperforming engineer) are shown only as anonymised principles, never as identifiable cases.
