# AGENTS.md

AI context for this repo lives in `.ai/`. Read before any task:
- `.ai/README.md`: the spec-driven workflow (requirements → design → tasks → implementation, each gated by owner approval) and the Definition of Done
- `.ai/steering/product.md`, `tech.md`, `structure.md`, `conventions.md`
- `.ai/steering/content-rules.md` for ANY change to visible copy or resume data

Active specs: `.ai/specs/<feature>/`. Implement only tasks from an approved `tasks.md`, one at a time, and tick them off.
New specs start from `.ai/templates/`.

`.kiro/` holds only symlinks to `.ai/` (for Kiro). Edit files in `.ai/`.

Never commit or publish `tmp/` (private career notes).
