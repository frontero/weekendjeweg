# Tech Stack Standard

Status: provisional.

No production implementation should start until the stack is confirmed during Inception.

## Candidate Direction

For a `weekendjeweg` web product, the likely default is:

- Frontend: Vue 3 with TypeScript.
- Build tooling: Vite.
- State: Pinia when shared state is needed.
- Tests: Vitest for unit/component tests and Playwright for critical user flows.
- Styling: CSS classes and component-scoped CSS, avoiding inline styles.

These are not final choices. Update this file after the first AI-DLC project-init or Inception checkpoint.
