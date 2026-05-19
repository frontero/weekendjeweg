# Tasks: weekendjeweg MVP

Status: construction-in-progress
Updated: 2026-05-19T14:00:00Z

## Source

This task plan is generated from the approved requirements and updated design:

- `memory-bank/intents/001-weekendjeweg-mvp/requirements.md`
- `memory-bank/intents/001-weekendjeweg-mvp/design.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units.md`

## Current Progress

- Checkpoint 4 units/tasks: approved by user.
- Bolt 001 `nuxt-foundation-and-cleanup`: completed and CI verified.
- Bolt 002 `supabase-data-model`: completed and CI verified.
- Next recommended bolt: `004-park-search-and-detail` using mock data.

## Blockers and Constraints

- Real Landal data access is unresolved.
- Scraping fallback may be implemented, but no real scraper run is allowed before the compliance gate is approved.
- If API/feed access and compliant scraping are both impossible, real import work is blocked until data access is arranged.
- Landal affiliate account/network details are not arranged yet, so first release uses placeholder affiliate-link structure.

## Unit 001 Tasks: Nuxt Foundation and Cleanup

| Task | Description | Status |
| --- | --- | --- |
| T001 | Remove stale Vue/Vite draft files during construction | completed |
| T002 | Scaffold Nuxt + TypeScript foundation | completed |
| T003 | Add app shell and route skeletons | completed |
| T004 | Add accessibility baseline | completed |
| T005 | Add baseline scripts and CI-friendly commands | completed |

## Unit 002 Tasks: Supabase Data Model

| Task | Description | Status |
| --- | --- | --- |
| T006 | Define schema for regions, facilities, parks, park facilities, prices, affiliate templates, clicks, imports, and compliance reviews | completed |
| T007 | Add TypeScript data contracts | completed |
| T008 | Add repository/query helpers | completed |
| T009 | Add mock or seed data | completed |
| T010 | Verify anonymous click model | completed |

## Unit 003 Tasks: Landal Data Access

| Task | Description | Status |
| --- | --- | --- |
| T011 | Research official API/feed options | planned |
| T012 | Implement scraping compliance review model and gate | blocked-before-real-run |
| T013 | Add protected daily import endpoint | planned |
| T014 | Add importer orchestration | blocked-until-access-decision |
| T015 | Normalize imported parks, regions, facilities, and price snapshots | blocked-until-access-decision |
| T016 | Record import run status | planned |

## Unit 004 Tasks: Park Search and Detail

| Task | Description | Status |
| --- | --- | --- |
| T017 | Build Dutch home page | foundation-skeleton-completed |
| T018 | Build `/parken` search page | foundation-skeleton-completed |
| T019 | Add filters for region, arrival/departure, adults, children, and facilities | foundation-skeleton-completed |
| T020 | Select and display matching price snapshots | planned |
| T021 | Build `/parken/[slug]` detail page | foundation-skeleton-completed |
| T022 | Add `/regio/[slug]` placeholder route | foundation-skeleton-completed |
| T023 | Add accessible empty and loading states | planned |

## Unit 005 Tasks: Affiliate, Consent, and Tracking

| Task | Description | Status |
| --- | --- | --- |
| T024 | Add affiliate URL builder | planned |
| T025 | Add outbound click endpoint | planned |
| T026 | Add consent banner | planned |
| T027 | Load GA4 only after analytics acceptance | planned |
| T028 | Apply consent-aware click tracking | planned |

## Unit 006 Tasks: Production SEO and Quality

| Task | Description | Status |
| --- | --- | --- |
| T029 | Add SEO metadata for home, search, and park detail | foundation-baseline-completed |
| T030 | Add sitemap and robots behavior | planned |
| T031 | Add accurate structured data where supported | planned |
| T032 | Add unit/integration tests for core logic | data-model-tests-completed |
| T033 | Add E2E happy paths | foundation-baseline-completed |
| T034 | Run Lighthouse quality review | planned |

## Deferred Work

- Rich `/regio/[slug]` SEO landing pages.
- Real park imagery and media ingestion.
- Admin/CMS tooling.
- Payment, checkout, reservation, or availability claims.
- Final Landal affiliate-network parameter mapping until account/network details are known.
