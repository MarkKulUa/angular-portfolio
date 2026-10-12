# Coding Conventions

## Angular
- Standalone components; don't write `standalone: true` explicitly (it's the default in v21).
- `changeDetection: ChangeDetectionStrategy.OnPush` is mandatory (ESLint error otherwise).
- DI via `inject()`; no constructor injection in new code.
- Inputs: `input()` / `input.required()`; outputs: `output()`. No `@Input`/`@Output` decorators in new code.
- State: `signal`, `computed`, `linkedSignal`; expose read-only views (`asReadonly()`).
- Templates: built-in control flow (`@if`, `@for` with `track`, `@switch`). No `*ngIf`/`*ngFor`, no `CommonModule`.
- Use `NgOptimizedImage` for images. `alt` text is required.
- Avoid `[innerHTML]`. If you must use it, the content has to be static and trusted, and markup must stay minimal.
- Use route-level `title` for page titles; keep meta tags in `index.html` or a meta service.
- Explicit return types on all functions (ESLint `explicit-function-return-type`). `any` is not allowed.
- Subscriptions: prefer `toSignal()` or the `async` pipe; otherwise `takeUntilDestroyed()`.

## Styling (SCSS)
- Component-scoped SCSS; keep each component under the 4 kB budget.
- Use design tokens (CSS custom properties on `:root` in `styles.scss`) for colors, spacing, radius,
  shadows and typography. Don't add new hard-coded hex colors in components.
- Mobile-first; breakpoints at 768px and 1024px.
- WCAG 2.1 AA: text contrast ≥ 4.5:1, visible `:focus-visible`, `prefers-reduced-motion` respected.

## Accessibility
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, ordered headings.
- Links that open a new tab carry `rel="noopener noreferrer"` and accessible text.
- Template a11y ESLint rules are enabled. Keep them green.

## Testing
- Frontend: Vitest + Angular TestBed. Name test files `*.spec.ts` and keep them next to the source.
- Test the behaviour, not the implementation: rendered text, inputs → DOM, service contracts.
- Content data: keep a schema/invariant test (e.g. required fields, no "Present" end date on finished engagements).
- Backend: Jest unit tests for services/controllers, Supertest for e2e.

## NestJS
- Module per domain: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/` with Zod schemas.
- Controllers stay thin; logic lives in services.
- Read config from env vars; never commit secrets.

## Git
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Don't bypass the Husky hooks.
