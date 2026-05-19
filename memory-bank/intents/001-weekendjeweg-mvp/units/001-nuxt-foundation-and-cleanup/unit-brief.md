# Unit 001: Nuxt Foundation and Cleanup

Status: planned-awaiting-checkpoint-4-review
Updated: 2026-05-19T12:56:57Z

## Purpose

Remove the stale Vue/Vite draft and create the production Nuxt + TypeScript foundation for Weekendjeweg.

## Stories

1. Remove Vue/Vite Draft
2. Scaffold Nuxt Foundation
3. Accessible App Shell

## Acceptance Criteria

- The active application foundation is Nuxt + TypeScript.
- Routes exist for `/`, `/parken`, `/parken/[slug]`, and `/regio/[slug]`.
- The first visible experience is the usable product, not a marketing-only landing page.
- Accessibility baseline includes skip link, semantic landmarks, visible focus states, and reduced-motion-safe behavior.
- Existing Vue/Vite draft code is removed or made inactive during construction.

## Out of Scope

- Real Landal data import.
- Supabase production schema migration.
- Affiliate click tracking.
- Final SEO/Lighthouse pass.

## Risks

- Old draft code may appear useful but conflicts with the approved Nuxt stack.
- The first construction step must avoid building new functionality on stale Vue/Vite files.
