# .ai: Spec-Driven Development Workspace

This folder is the single, tool-neutral source of AI context for this repository.

How each tool finds it:
| Tool | Entry point |
|------|-------------|
| Cursor, Codex, Copilot, Gemini, Jules, … | `AGENTS.md` (root) |
| Claude Code | `CLAUDE.md` → imports `AGENTS.md` |
| Kiro | `.kiro/steering` and `.kiro/specs` are **symlinks** to `.ai/steering` and `.ai/specs` |

Edit files only in `.ai/`. Never put real files into `.kiro/`.

```
.ai/
├── steering/              # Always-on project context (read before any task)
│   ├── product.md         # What the product is, audience, positioning
│   ├── tech.md            # Stack, versions, commands, known issues
│   ├── structure.md       # Repo layout, layers, boundaries, naming
│   ├── conventions.md     # Coding standards (Angular, NestJS, SCSS, tests)
│   └── content-rules.md   # Rules for any change to resume/portfolio copy
├── templates/             # Copy these when starting a new spec
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
└── specs/
    └── <feature-slug>/    # One folder per feature
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

## Workflow (approval-gated)

| Phase | Output | Gate |
|-------|--------|------|
| 1. Requirements | `requirements.md`: user stories + EARS acceptance criteria, non-goals, open questions | Owner approves; all open questions closed |
| 2. Design | `design.md`: architecture, data model, components, routing, testing, risks | Owner approves |
| 3. Tasks | `tasks.md`: small, ordered, independently verifiable tasks traced to requirement IDs | Owner approves |
| 4. Implementation | Code, one task at a time; tick the checkbox in `tasks.md` when done | Each task passes the Definition of Done |

Rules:
- Never skip a gate. If implementation reveals a gap, update the spec first, then the code.
- Every task references requirement IDs (e.g. `_Requirements: R2.1, R2.3_`).
- Keep specs in English (better for AI tools and future collaborators).
- A spec is a living document: record decisions in a `## Decision log` section, don't silently rewrite history.

## Definition of Done (every task)

1. `npm run lint` passes (ESLint + Sheriff) in the affected workspace.
2. `npm run test` passes; new logic has tests.
3. `npm run build` passes, with no new budget warnings.
4. Content changes follow `steering/content-rules.md`.
5. The task checkbox is ticked in `tasks.md`, with deviations noted.
