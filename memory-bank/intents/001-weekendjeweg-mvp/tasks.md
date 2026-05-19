# Tasks: weekendjeweg MVP

Status: checkpoint-4-units-tasks-review
Updated: 2026-05-19T12:56:57Z

## Source

This task plan is generated from the approved requirements and updated design:

- `memory-bank/intents/001-weekendjeweg-mvp/requirements.md`
- `memory-bank/intents/001-weekendjeweg-mvp/design.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units.md`

Construction is not approved yet. This file is for review.

## Current Review Decision Needed

Approve, revise, or reject this task plan before any construction bolt starts.

Recommended first construction bolt after approval:

- `001-nuxt-foundation-and-cleanup`

## Blockers and Constraints

- Real Landal data access is unresolved.
- Scraping fallback may be implemented, but no real scraper run is allowed before the compliance gate is approved.
- If API/feed access and compliant scraping are both impossible, real import work is blocked until data access is arranged.
- Landal affiliate account/network details are not arranged yet, so first release uses placeholder affiliate-link structure.
- Existing Vue/Vite draft code is stale and must be removed at the first construction step.

## Unit 001 Tasks: Nuxt Foundation and Cleanup

| Task | Description | Acceptance |
| --- | --- | --- |
| T001 | Remove stale Vue/Vite draft files during construction | Repo no longer contains the old app foundation as active code |
| T002 | Scaffold Nuxt + TypeScript foundation | App runs with Nuxt routes and TypeScript checks |
| T003 | Add app shell and route skeletons | `/`, `/parken`, `/parken/[slug]`, and `/regio/[slug]` exist |
| T004 | Add accessibility baseline | Skip link, landmarks, focus states, and reduced-motion-safe behavior exist |
| T005 | Add baseline scripts and CI-friendly commands | Typecheck/test/lint or equivalent commands are documented and runnable |

## Unit 002 Tasks: Supabase Data Model

| Task | Description | Acceptance |
| --- | --- | --- |
| T006 | Define schema for regions, facilities, parks, park facilities, prices, affiliate templates, clicks, imports, and compliance reviews | Schema matches `design.md` and supports required flows |
| T007 | Add TypeScript data contracts | Shared types are reusable outside single components |
| T008 | Add repository/query helpers | UI and server endpoints do not duplicate raw data access logic |
| T009 | Add mock or seed data | Frontend construction can proceed while Landal access is unresolved |
| T010 | Verify anonymous click model | Rejected-cookie flow stores no cookie or user identifier |

## Unit 003 Tasks: Landal Data Access

| Task | Description | Acceptance |
| --- | --- | --- |
| T011 | Research official API/feed options | Decision recorded before scraper implementation is activated |
| T012 | Implement scraping compliance review model and gate | Real scraper execution is blocked unless review is approved |
| T013 | Add protected daily import endpoint | Vercel Cron can call the endpoint with a secret or equivalent protection |
| T014 | Add importer orchestration | Import tries official/API/feed first, then compliant scraper fallback only if allowed |
| T015 | Normalize imported parks, regions, facilities, and price snapshots | Data is stored in Supabase-compatible shape |
| T016 | Record import run status | Success, failure, and record counts are persisted |

## Unit 004 Tasks: Park Search and Detail

| Task | Description | Acceptance |
| --- | --- | --- |
| T017 | Build Dutch home page | Home leads directly into Landal park discovery |
| T018 | Build `/parken` search page | Visitors can scan and filter parks |
| T019 | Add filters for region, arrival/departure, adults, children, and facilities | Filters are keyboard usable and update results clearly |
| T020 | Select and display matching price snapshots | UI shows price only and never implies availability |
| T021 | Build `/parken/[slug]` detail page | Park detail shows useful content, price context, and Landal CTA |
| T022 | Add `/regio/[slug]` placeholder route | Route exists without pretending rich SEO region content is complete |
| T023 | Add accessible empty and loading states | Screenreader-friendly result counts and reset controls exist |

## Unit 005 Tasks: Affiliate, Consent, and Tracking

| Task | Description | Acceptance |
| --- | --- | --- |
| T024 | Add affiliate URL builder | Placeholder Landal links can accept future tracking parameters |
| T025 | Add outbound click endpoint | Clicks are logged before redirect and redirect continues if logging fails |
| T026 | Add consent banner | Banner is keyboard accessible and records accept/reject state |
| T027 | Load GA4 only after analytics acceptance | No GA4 script runs before consent |
| T028 | Apply consent-aware click tracking | Anonymous functional logs occur without cookies; full context only with consent |

## Unit 006 Tasks: Production SEO and Quality

| Task | Description | Acceptance |
| --- | --- | --- |
| T029 | Add SEO metadata for home, search, and park detail | Titles/descriptions are Dutch and accurate |
| T030 | Add sitemap and robots behavior | Search engines can discover allowed production pages |
| T031 | Add accurate structured data where supported | No unsupported availability claims appear |
| T032 | Add unit/integration tests for core logic | Normalization, filters, price selection, affiliate URLs, consent tracking, and compliance gate are covered |
| T033 | Add E2E happy paths | Home to search to detail to outbound CTA is covered |
| T034 | Run Lighthouse quality review | Performance, Accessibility, and SEO target 90+ on key pages |

## Deferred Work

- Rich `/regio/[slug]` SEO landing pages.
- Real park imagery and media ingestion.
- Admin/CMS tooling.
- Payment, checkout, reservation, or availability claims.
- Final Landal affiliate-network parameter mapping until account/network details are known.

## Review Gate

Stop here for checkpoint-4 review.

Construction may begin only after this task plan is approved or revised.
