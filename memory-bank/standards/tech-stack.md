# Tech Stack Standard

Status: confirmed-for-production-mvp
Updated: 2026-05-19T17:12:49Z

The first production MVP uses:

- Application framework: Nuxt with TypeScript.
- Runtime structure: Nuxt 4-style `app/` directory.
- Hosting target: Vercel.
- Persistence: Supabase in later units.
- Daily import path: Vercel Cron calling a protected Nuxt server endpoint in later units.
- Tests: Node test for current foundation smoke checks and Playwright for critical user flows.
- Styling: Tailwind CSS v4.3.0 through `@tailwindcss/vite`, with existing accessible custom CSS preserved during the initial migration.

## Constraints

- Existing Vue/Vite draft code is stale and must not be used as active production code.
- Real Landal data access is unresolved.
- Scraping is blocked until compliance review is approved.
- Payment, checkout, booking, user accounts, admin tooling, and CMS integration remain out of scope for the first release.
- The UI may use mock data while the data-access unit is blocked.

## Review Note

This stack supersedes the earlier Vue 3 + Vite draft assumption after requirements, design, units, and tasks were approved by the user.
