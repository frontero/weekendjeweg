# Units: weekendjeweg MVP

Status: construction-in-progress
Updated: 2026-05-19T14:00:00Z

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
| 001 | nuxt-foundation-and-cleanup | Remove stale Vue/Vite draft code and create the Nuxt + TypeScript foundation | completed-and-ci-verified |
| 002 | supabase-data-model | Define Supabase schema, types, seed/mock strategy, and repository access | completed-and-ci-verified |
| 003 | landal-data-access | Discover API/feed access, enforce scraping compliance, and design the daily import path | partially blocked by data access |
| 004 | park-search-and-detail | Build the visitor journey: home, park search, park detail, filters, and price-only display | planned with mock data allowed |
| 005 | affiliate-consent-tracking | Build placeholder Landal affiliate links, consent handling, GA4 loading, and outbound click logs | planned |
| 006 | production-seo-quality | Add SEO foundations, structured data, sitemap/robots, tests, and Lighthouse quality gates | planned |

## Unit 001: nuxt-foundation-and-cleanup

Completed in `memory-bank/bolts/001-nuxt-foundation-and-cleanup/bolt.md`.

## Unit 002: supabase-data-model

Completed in `memory-bank/bolts/002-supabase-data-model/bolt.md`.

Delivered:

- Supabase schema migration.
- Shared TypeScript data contracts.
- Mock Landal Netherlands catalog data.
- Catalog query helpers.
- Anonymous functional click helper.
- Unit tests for filters, facilities, price snapshots, affiliate placeholders, and anonymous click safety.

## Unit 003: landal-data-access

Purpose: establish a compliant data acquisition path.

Review notes:

- If API/feed is unavailable and compliant scraping cannot be approved, real import work is blocked until data access is arranged.
- Frontend construction may continue with mock data while this unit is blocked.

## Unit 004: park-search-and-detail

Purpose: create the core user-facing discovery experience.

Review notes:

- The UI must never imply availability.
- Accessibility is part of every story, not a later polish task.

## Unit 005: affiliate-consent-tracking

Purpose: make outbound monetization measurable and consent-aware.

## Unit 006: production-seo-quality

Purpose: make the MVP production-ready rather than only clickable.

## Recommended Construction Order

1. `001-nuxt-foundation-and-cleanup` - completed and CI verified
2. `002-supabase-data-model` - completed and CI verified
3. `004-park-search-and-detail` using mock data where needed
4. `005-affiliate-consent-tracking`
5. `003-landal-data-access` discovery/compliance first, real import only when permitted
6. `006-production-seo-quality`

## Next Step

Start or review `004-park-search-and-detail`.
