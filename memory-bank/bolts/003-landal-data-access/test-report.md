# Test Report: Landal Data Access Discovery

Status: verified-by-github-actions
Updated: 2026-05-19T15:15:46Z

## Checks Added

- `shared/types/database.ts` now models `termsPermitCommercialUse` on scraping compliance reviews.
- `shared/domain/scrapingCompliance.ts` blocks scraper orchestration when terms do not explicitly permit commercial use.
- `supabase/migrations/20260519143000_initial_weekendjeweg_schema.sql` stores `terms_permit_commercial_use` with default `false`.
- `tests/qualityGates.test.ts` covers the new terms-permission blocker.

## GitHub Actions Verification

Latest CI run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26106463771
- Commit: `4a17b2b4c6241b9856c9199a5e5d0661dc7444f1`
- Status: success

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Lighthouse Verification

Latest Lighthouse Preview run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26106463769
- Commit: `4a17b2b4c6241b9856c9199a5e5d0661dc7444f1`
- Status: success

Measured pages and scores:

| Page | Performance | Accessibility | SEO |
| --- | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 |
| `/parken` | 99 | 100 | 100 |

## Result

The data-access discovery is recorded and the scraping compliance gate is stricter. Real import remains blocked until TradeTracker credentials/campaign approval exist or written scraping permission is documented.
