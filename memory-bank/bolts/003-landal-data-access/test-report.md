# Test Report: Landal Data Access

Status: verified-by-github-actions
Updated: 2026-05-19T15:23:30Z

## Checks Added

- `shared/types/database.ts` models `termsPermitCommercialUse` on scraping compliance reviews.
- `shared/domain/scrapingCompliance.ts` blocks scraper orchestration when terms do not explicitly permit commercial use.
- `supabase/migrations/20260519143000_initial_weekendjeweg_schema.sql` stores `terms_permit_commercial_use` with default `false`.
- `tests/qualityGates.test.ts` covers the new terms-permission blocker.
- `shared/domain/tradeTrackerImport.ts` plans safe blocked import runs when secrets or credentials are missing.
- `server/api/import/landal.post.ts` adds the protected import skeleton endpoint.
- `tests/importPipeline.test.ts` covers import authorization and blocked-run planning.

## GitHub Actions Verification

Latest CI run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26106913937
- Commit: `bea3e92cf7e5e4ba9f503a7dc031da7ee3a784f9`
- Status: success

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Lighthouse Verification

Latest Lighthouse Preview run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26106913888
- Commit: `bea3e92cf7e5e4ba9f503a7dc031da7ee3a784f9`
- Status: success

Measured pages and scores:

| Page | Performance | Accessibility | SEO |
| --- | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 |
| `/parken` | 99 | 100 | 100 |

## Result

The data-access discovery, compliance gate, and protected import skeleton are verified. Real TradeTracker import remains blocked until credentials and campaign approval exist.
