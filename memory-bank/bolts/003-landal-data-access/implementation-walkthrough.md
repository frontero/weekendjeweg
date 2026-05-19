# Implementation Walkthrough: Landal Data Access

Status: importer-skeleton-verified-real-import-blocked
Updated: 2026-05-19T15:23:30Z

## Discovery

`memory-bank/bolts/003-landal-data-access/discovery-report.md` records the data-access decision. Landal affiliate access should go through TradeTracker first. Scraping is not a default route because Landal terms require written permission for non-personal/commercial use.

## Compliance Gate

`shared/domain/scrapingCompliance.ts` now requires `termsPermitCommercialUse === true` before scraper orchestration can be approved. The Supabase compliance table stores this as `terms_permit_commercial_use`, defaulting to `false`.

## Import Skeleton

`server/api/import/landal.post.ts` adds a protected endpoint for future Vercel Cron use. The endpoint reads `x-import-secret` and rejects unauthorized requests with status 401.

`shared/domain/tradeTrackerImport.ts` validates import access and creates a blocked import plan when required TradeTracker configuration is missing. Even when credentials are configured, the current skeleton returns `blocked` because the real TradeTracker feed client is intentionally not implemented yet.

## Runtime Configuration

`nuxt.config.ts` now exposes private runtime-config placeholders:

- `importCronSecret`
- `tradeTrackerCustomerId`
- `tradeTrackerAccessKey`
- `tradeTrackerAffiliateSiteId`
- `tradeTrackerCampaignId`

## Tests

`tests/importPipeline.test.ts` covers missing/invalid cron secrets, accepted secret checks, missing TradeTracker credential blockers, and the skeleton's no-real-fetch behavior.

## Verification

- CI: https://github.com/frontero/weekendjeweg/actions/runs/26106913937
- Lighthouse Preview: https://github.com/frontero/weekendjeweg/actions/runs/26106913888
