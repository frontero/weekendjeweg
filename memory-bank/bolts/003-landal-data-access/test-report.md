# Test Report: Landal Data Access

Status: verified-by-github-actions
Updated: 2026-05-19T19:27:01Z

## Checks Added

- `shared/types/database.ts` models `termsPermitCommercialUse` on scraping compliance reviews.
- `shared/domain/scrapingCompliance.ts` blocks scraper orchestration when terms do not explicitly permit commercial use.
- `supabase/migrations/20260519143000_initial_weekendjeweg_schema.sql` stores `terms_permit_commercial_use` with default `false`.
- `tests/qualityGates.test.ts` covers the terms-permission blocker.
- `shared/domain/tradeTrackerImport.ts` plans safe blocked import runs when secrets or credentials are missing and runs TradeTracker feed import when configured.
- `shared/domain/tradeTrackerSoapClient.ts` authenticates against TradeTracker SOAP, fetches `getFeedProducts`, and parses feed products.
- `server/api/import/landal.post.ts` adds the protected import endpoint.
- `tests/importPipeline.test.ts` covers import authorization, blocked-run planning, SOAP feed parsing, authenticated feed fetches, success summaries, and authentication failures.

## GitHub Actions Verification

Latest CI run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26120007958
- Commit: `65a73d5155ef8631e50c8490ccca417aeecc5046`
- Status: success

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Lighthouse Verification

Latest Lighthouse Preview run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26120008031
- Commit: `65a73d5155ef8631e50c8490ccca417aeecc5046`
- Status: success

Measured pages and scores:

| Page | Performance | Accessibility | SEO |
| --- | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 |
| `/parken` | 99 | 100 | 100 |

## Result

The data-access discovery, compliance gate, protected import endpoint, and TradeTracker SOAP feed client are verified. Real live TradeTracker import remains blocked until credentials and campaign approval exist.
