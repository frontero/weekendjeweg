# Bolt 001: Nuxt Foundation and Cleanup

Status: completed-and-ci-verified
Started: 2026-05-19T13:25:00Z
Completed: 2026-05-19T13:45:00Z
Verified: 2026-05-19T14:00:00Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/001-nuxt-foundation-and-cleanup/stories/001-remove-vue-vite-draft.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/001-nuxt-foundation-and-cleanup/stories/002-scaffold-nuxt-foundation.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/001-nuxt-foundation-and-cleanup/stories/003-accessible-app-shell.md`

## Scope

- Replace Vue/Vite foundation with Nuxt + TypeScript.
- Add Nuxt app shell and route skeletons.
- Add accessible navigation, skip link, landmarks, and baseline styles.
- Update package scripts, TypeScript config, Playwright config, README, and tech-stack docs.
- Remove stale Vue/Vite app files.

## Implemented Files

- `package.json`
- `nuxt.config.ts`
- `app/app.vue`
- `app/pages/index.vue`
- `app/pages/parken/index.vue`
- `app/pages/parken/[slug].vue`
- `app/pages/regio/[slug].vue`
- `app/assets/styles/main.css`
- `tests/foundation.test.mjs`
- `e2e/app-shell.spec.ts`
- `playwright.config.ts`
- `tsconfig.json`
- `.gitignore`
- `README.md`
- `memory-bank/standards/tech-stack.md`
- `memory-bank/standards/coding-standards.md`

## Removed Stale Files

- `index.html`
- `vite.config.ts`
- `vitest.config.ts`
- `tsconfig.node.json`
- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/styles/base.css`
- `src/views/BrowseView.vue`
- `src/views/FavoritesView.vue`
- `src/views/StayDetailView.vue`
- `src/vite-env.d.ts`
- `tests/app-shell.spec.ts`
- `tests/setup.ts`

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26100763885 passed for commit `dd95d0c324179ee09911482fa711ea6a7eaedf90`.

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Next Bolt

`002-supabase-data-model`
