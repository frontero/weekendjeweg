# Bolt 001: Nuxt Foundation and Cleanup

Status: completed-with-remote-code-review
Started: 2026-05-19T13:25:00Z
Completed: 2026-05-19T13:45:00Z

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

Remote code review was performed through GitHub file inspection. Local install/build/test were not run because the user requested direct GitHub-only work without local repository files.

GitHub Actions should run after the pushes to `main` and is the first executable verification point for this bolt.

## Next Bolt

`002-supabase-data-model`
