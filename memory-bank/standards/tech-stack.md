# Tech Stack Standard

Status: confirmed-for-mvp-draft
Updated: 2026-05-19T10:45:00Z

The first MVP construction phase uses:

- Frontend: Vue 3 with TypeScript.
- Build tooling: Vite.
- Routing: Vue Router.
- State: Pinia when shared state is needed, especially favorites and filters.
- Tests: Vitest for unit/component tests and Playwright for critical user flows.
- Styling: CSS classes and component-scoped CSS, avoiding inline styles.

## Constraints

- No backend is required for the first MVP.
- Stay data starts as static seed data in the frontend repository.
- Real booking, payments, user accounts, admin tooling, and CMS integration are out of scope for the first construction phase.

## Review Note

This stack is accepted as a working assumption after the user said "begin maar". It can still be changed during Checkpoint 3 review before construction starts.
