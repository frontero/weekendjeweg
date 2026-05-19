# Bolt 002: Supabase Data Model

Status: completed-and-ci-verified
Started: 2026-05-19T14:20:00Z
Completed: 2026-05-19T14:20:00Z
Verified: 2026-05-19T14:00:00Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/002-supabase-data-model/stories/001-supabase-schema.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/002-supabase-data-model/stories/002-typed-data-access.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/002-supabase-data-model/stories/003-mock-seed-data.md`

## Scope

- Add initial Supabase schema migration.
- Add reusable TypeScript data contracts.
- Add mock Landal Netherlands catalog data.
- Add typed query helpers for parks, facilities, prices, and affiliate templates.
- Add consent-safe anonymous click helper.
- Add unit tests for catalog filtering, price selection, affiliate placeholders, and anonymous click safety.

## Implemented Files

- `supabase/README.md`
- `supabase/migrations/20260519143000_initial_weekendjeweg_schema.sql`
- `shared/types/database.ts`
- `shared/data/mockCatalog.ts`
- `shared/domain/catalogRepository.ts`
- `shared/domain/clickTracking.ts`
- `tests/catalog.test.ts`
- `package.json`

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26102041215 passed for commit `7b389b232af6a5657424fa5d728f0ddb150df0e2`.

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Next Bolt

`004-park-search-and-detail` is the recommended next frontend construction bolt while `003-landal-data-access` remains partially blocked by real data access and scraping compliance.
