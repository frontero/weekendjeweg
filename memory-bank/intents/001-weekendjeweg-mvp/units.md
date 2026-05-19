# Units: weekendjeweg MVP

Status: construction-in-progress
Updated: 2026-05-19T13:45:00Z

## Source of Truth

These units are generated from:

- `memory-bank/intents/001-weekendjeweg-mvp/requirements.md`
- `memory-bank/intents/001-weekendjeweg-mvp/clarifying-answers.md`
- `memory-bank/intents/001-weekendjeweg-mvp/design.md`
- `memory-bank/intents/001-weekendjeweg-mvp/design-answers.md`

They supersede the earlier Vue/Vite/favorites draft units.

## Unit Overview

| Unit | Name | Purpose | Status |
| --- | --- | --- | --- |
| 001 | nuxt-foundation-and-cleanup | Remove stale Vue/Vite draft code and create the Nuxt + TypeScript foundation | completed |
| 002 | supabase-data-model | Define Supabase schema, types, seed/mock strategy, and repository access | planned |
| 003 | landal-data-access | Discover API/feed access, enforce scraping compliance, and design the daily import path | partially blocked by data access |
| 004 | park-search-and-detail | Build the visitor journey: home, park search, park detail, filters, and price-only display | planned with mock data allowed |
| 005 | affiliate-consent-tracking | Build placeholder Landal affiliate links, consent handling, GA4 loading, and outbound click logs | planned |
| 006 | production-seo-quality | Add SEO foundations, structured data, sitemap/robots, tests, and Lighthouse quality gates | planned |

## Unit 001: nuxt-foundation-and-cleanup

Purpose: create the production Nuxt foundation that matches the approved stack.

Primary stories:

- Remove stale Vue/Vite draft. Completed.
- Scaffold Nuxt + TypeScript application foundation. Completed.
- Add accessible shell, route skeletons, and baseline quality commands. Completed.

Review notes:

- This was completed in `memory-bank/bolts/001-nuxt-foundation-and-cleanup/bolt.md`.
- Executable verification is delegated to GitHub Actions because work was performed direct-to-GitHub without local files.

## Unit 002: supabase-data-model

Purpose: make the data contract explicit before import and UI work depend on it.

Primary stories:

- Create Supabase schema for regions, parks, facilities, price snapshots, affiliate templates, outbound clicks, import runs, and scraping compliance reviews.
- Add reusable TypeScript contracts and typed repository helpers.
- Provide safe mock/seed data for frontend construction while real Landal access is unresolved.

Review notes:

- This unit should avoid hardcoded facility lists where source data can provide them dynamically.
- Anonymous functional click logs must not include cookie or user identifiers.

## Unit 003: landal-data-access

Purpose: establish a compliant data acquisition path.

Primary stories:

- Research official/API/feed options for Landal Netherlands.
- Implement the scraping compliance gate before any real scraper execution.
- Build daily import orchestration through Vercel Cron and a protected Nuxt server endpoint.
- Normalize parks, regions, dynamic facilities, and price snapshots.

Review notes:

- If API/feed is unavailable and compliant scraping cannot be approved, real import work is blocked until data access is arranged.
- Frontend construction may continue with mock data while this unit is blocked.

## Unit 004: park-search-and-detail

Purpose: create the core user-facing discovery experience.

Primary stories:

- Build the Dutch home page and `/parken` search route.
- Add filters for region, arrival/departure dates, adults, children, and dynamic facilities.
- Build `/parken/[slug]` detail pages with price-only wording and Landal CTA.
- Add route-supported `/regio/[slug]` placeholder behavior while rich region SEO remains deferred.

Review notes:

- The UI must never imply availability.
- Accessibility is part of every story, not a later polish task.

## Unit 005: affiliate-consent-tracking

Purpose: make outbound monetization measurable and consent-aware.

Primary stories:

- Build placeholder Landal affiliate URL templates that can accept future tracking parameters.
- Log outbound clicks in Supabase without blocking the visitor redirect.
- Add simple consent banner and load GA4 only after analytics acceptance.

Review notes:

- Full tracking requires consent.
- Cookie rejection still allows anonymous functional click logging without cookie/user ID.

## Unit 006: production-seo-quality

Purpose: make the MVP production-ready rather than only clickable.

Primary stories:

- Add SEO metadata, sitemap, robots configuration, and accurate structured data.
- Add tests for data normalization, filters, price selection, affiliate URL building, click tracking, and compliance gating.
- Verify Lighthouse 90+ targets for Performance, Accessibility, and SEO on key pages.

Review notes:

- Structured data must not make unsupported availability claims.
- Quality gates are required before production release.

## Recommended Construction Order

1. `001-nuxt-foundation-and-cleanup` - completed
2. `002-supabase-data-model`
3. `004-park-search-and-detail` using mock data where needed
4. `005-affiliate-consent-tracking`
5. `003-landal-data-access` discovery/compliance first, real import only when permitted
6. `006-production-seo-quality`

## Next Step

Start or review `002-supabase-data-model`.
