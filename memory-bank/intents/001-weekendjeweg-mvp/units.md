# Units: weekendjeweg MVP

Status: construction-quality-verified-with-data-access-blocker
Updated: 2026-05-19T15:05:10Z

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
| 003 | landal-data-access | Discover API/feed access, enforce scraping compliance, and design the daily import path | next-data-access-discovery |
| 004 | park-search-and-detail | Build the visitor journey: home, park search, park detail, filters, and price-only display | completed-and-ci-verified |
| 005 | affiliate-consent-tracking | Build placeholder Landal affiliate links, consent handling, GA4 loading, and outbound click logs | completed-and-ci-verified |
| 006 | production-seo-quality | Add SEO foundations, structured data, sitemap/robots, tests, and Lighthouse quality gates | completed-ci-and-lighthouse-verified |

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
- Next action is discovery only: official API/feed first, scraping only as a fallback after robots, terms, rate limits, and explicit approval are documented.

## Unit 004: park-search-and-detail

Completed in `memory-bank/bolts/004-park-search-and-detail/bolt.md`.

Delivered:

- Dutch home page.
- `/parken` search page with filters.
- Price-only context without availability claims.
- Park detail pages.
- Region support route with noindex behavior added during Unit 006.

## Unit 005: affiliate-consent-tracking

Completed in `memory-bank/bolts/005-affiliate-consent-tracking/bolt.md`.

Delivered:

- Placeholder Landal affiliate URL templates.
- Outbound click endpoint.
- Consent banner.
- GA4 loading only after analytics acceptance.

## Unit 006: production-seo-quality

Completed in `memory-bank/bolts/006-production-seo-quality/bolt.md`.

Delivered:

- Canonical metadata.
- Conservative structured data.
- Sitemap and robots routes.
- Normalization and scraping-compliance gates.
- CI and Lighthouse quality verification.

## Recommended Construction Order

1. `001-nuxt-foundation-and-cleanup` - completed and CI verified
2. `002-supabase-data-model` - completed and CI verified
3. `004-park-search-and-detail` - completed and CI verified
4. `005-affiliate-consent-tracking` - completed and CI verified
5. `006-production-seo-quality` - completed, CI verified, and Lighthouse verified
6. `003-landal-data-access` discovery/compliance; real import only when permitted

## Next Step

Start Unit 003 data access discovery: look for an official Landal API/feed or affiliate-network export first, then document whether compliant scraping is legally and technically permitted before implementing or running any scraper.
