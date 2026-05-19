# Tasks: weekendjeweg MVP

Status: construction-in-progress
Updated: 2026-05-19T14:35:00Z

## Current Progress

- Bolt 001 `nuxt-foundation-and-cleanup`: completed and CI verified.
- Bolt 002 `supabase-data-model`: completed and CI verified.
- Bolt 004 `park-search-and-detail`: completed and CI verified.
- Bolt 005 `affiliate-consent-tracking`: completed and CI verified.
- Bolt 006 `production-seo-quality`: completed pending CI.
- Next recommended step after CI: deployed preview and Lighthouse measurement.

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
| T017 | Build Dutch home page | completed |
| T018 | Build `/parken` search page | completed |
| T019 | Add filters for region, arrival/departure, adults, children, and facilities | completed |
| T020 | Select and display matching price snapshots | completed |
| T021 | Build `/parken/[slug]` detail page | completed |
| T022 | Add `/regio/[slug]` placeholder route | completed |
| T023 | Add accessible empty and loading states | completed |

## Unit 005 Tasks: Affiliate, Consent, and Tracking

| Task | Description | Status |
| --- | --- | --- |
| T024 | Add affiliate URL builder | completed |
| T025 | Add outbound click endpoint | completed |
| T026 | Add consent banner | completed |
| T027 | Load GA4 only after analytics acceptance | completed |
| T028 | Apply consent-aware click tracking | completed |

## Unit 006 Tasks: Production SEO and Quality

| Task | Description | Status |
| --- | --- | --- |
| T029 | Add SEO metadata for home, search, and park detail | completed-pending-ci |
| T030 | Add sitemap and robots behavior | completed-pending-ci |
| T031 | Add accurate structured data where supported | completed-pending-ci |
| T032 | Add unit/integration tests for core logic | completed-pending-ci |
| T033 | Add E2E happy paths | expanded-pending-ci |
| T034 | Run Lighthouse quality review | pending-preview-measurement |
