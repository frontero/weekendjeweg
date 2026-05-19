# Tasks: weekendjeweg MVP

Status: construction-quality-verified-with-data-access-blocker
Updated: 2026-05-19T19:27:01Z

## Current Progress

- Bolt 001 `nuxt-foundation-and-cleanup`: completed and CI verified.
- Bolt 002 `supabase-data-model`: completed and CI verified.
- Bolt 003 `landal-data-access`: discovery completed, compliance gate tightened, protected importer skeleton verified, and TradeTracker SOAP feed client verified with fixture-based tests. Real live import remains blocked pending TradeTracker credentials/campaign approval.
- Bolt 004 `park-search-and-detail`: completed and CI verified.
- Bolt 005 `affiliate-consent-tracking`: completed and CI verified.
- Bolt 006 `production-seo-quality`: CI verified and Lighthouse verified.
- Next recommended step: map parsed TradeTracker feed products into catalog/price upserts and persist import-run status after a real or representative approved feed sample is available.

## Blockers and Constraints

- Real Landal data access requires TradeTracker publisher/site/campaign approval and credentials.
- The TradeTracker SOAP client is implemented, but live calls cannot be verified without credentials.
- Scraping fallback may be implemented with fixtures, but no real scraper run is allowed before written permission and compliance approval.
- Landal public terms currently prohibit commercial site use unless written permission is obtained.
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
| T011 | Research official API/feed options | completed |
| T012 | Implement scraping compliance review model and gate | completed-real-run-blocked |
| T013 | Add protected daily import endpoint | completed |
| T014 | Add importer orchestration | completed-tradetracker-feed-client-verified |
| T015 | Normalize imported parks, regions, facilities, and price snapshots | parser-fixture-completed-catalog-upsert-next |
| T016 | Record import run status | response-body-completed-persistence-next |

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
| T029 | Add SEO metadata for home, search, and park detail | completed |
| T030 | Add sitemap and robots behavior | completed |
| T031 | Add accurate structured data where supported | completed |
| T032 | Add unit/integration tests for core logic | completed |
| T033 | Add E2E happy paths | expanded |
| T034 | Run Lighthouse quality review | completed |
