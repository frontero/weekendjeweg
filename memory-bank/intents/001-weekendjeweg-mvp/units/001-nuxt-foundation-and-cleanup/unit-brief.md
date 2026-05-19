# Unit 001: Nuxt Foundation and Cleanup

Status: completed
Updated: 2026-05-19T13:45:00Z

## Purpose

Remove the stale Vue/Vite draft and create the production Nuxt + TypeScript foundation for Weekendjeweg.

## Stories

1. Remove Vue/Vite Draft - completed
2. Scaffold Nuxt Foundation - completed
3. Accessible App Shell - completed

## Acceptance Criteria

- The active application foundation is Nuxt + TypeScript. Completed.
- Routes exist for `/`, `/parken`, `/parken/[slug]`, and `/regio/[slug]`. Completed.
- The first visible experience is the usable product, not a marketing-only landing page. Completed as route skeleton.
- Accessibility baseline includes skip link, semantic landmarks, visible focus states, and reduced-motion-safe behavior. Completed as baseline.
- Existing Vue/Vite draft code is removed or made inactive during construction. Completed.

## Out of Scope

- Real Landal data import.
- Supabase production schema migration.
- Affiliate click tracking.
- Final SEO/Lighthouse pass.

## Risks

- Executable verification depends on GitHub Actions because construction was performed direct-to-GitHub without local checkout.
