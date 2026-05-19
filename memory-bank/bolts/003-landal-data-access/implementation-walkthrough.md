# Implementation Walkthrough: Landal Data Access

Status: tradetracker-feed-client-verified-real-live-import-blocked
Updated: 2026-05-19T19:27:01Z

## Discovery

`memory-bank/bolts/003-landal-data-access/discovery-report.md` records the data-access decision. Landal affiliate access should go through TradeTracker first. Scraping is not a default route because Landal terms require written permission for non-personal/commercial use.

The public TradeTracker SOAP WSDL at `http://ws.tradetracker.com/soap/affiliate?wsdl` exposes feed operations including `getFeeds`, `getFeedProductCategories`, and `getFeedProducts`.

## Compliance Gate

`shared/domain/scrapingCompliance.ts` requires `termsPermitCommercialUse === true` before scraper orchestration can be approved. The Supabase compliance table stores this as `terms_permit_commercial_use`, defaulting to `false`.

## Protected Import Endpoint

`server/api/import/landal.post.ts` exposes a protected import endpoint for future Vercel Cron use. The endpoint reads `x-import-secret` and rejects unauthorized requests with status 401.

When authorization succeeds, the endpoint now calls `runLandalTradeTrackerImport`. Missing TradeTracker credentials return a safe blocked response. Configured credentials trigger the TradeTracker SOAP feed flow.

## TradeTracker SOAP Client

`shared/domain/tradeTrackerSoapClient.ts` implements the current feed client without adding a heavy SOAP runtime dependency:

- Authenticates against `authenticate`.
- Carries the returned session cookie into `getFeedProducts`.
- Filters products by `TRADETRACKER_LANDAL_CAMPAIGN_ID`.
- Parses SOAP XML with `fast-xml-parser`.
- Returns typed product records with identifier, name, category, description, price, product URL, image URL, and additional feed fields.

`shared/domain/tradeTrackerImport.ts` wraps this client into import responses:

- `blocked` when required configuration is missing.
- `success` when feed products are fetched and parsed.
- `failed` when TradeTracker authentication or feed fetching fails.

## Runtime Configuration

`nuxt.config.ts` exposes private runtime-config placeholders:

- `importCronSecret`
- `tradeTrackerCustomerId`
- `tradeTrackerAccessKey`
- `tradeTrackerAffiliateSiteId`
- `tradeTrackerCampaignId`

## Tests

`tests/importPipeline.test.ts` covers missing/invalid cron secrets, accepted secret checks, missing TradeTracker credential blockers, pending configured import plans, SOAP feed parsing, authenticated feed calls, successful import summaries, and failed authentication responses.

## Verification

- CI: https://github.com/frontero/weekendjeweg/actions/runs/26120007958
- Lighthouse Preview: https://github.com/frontero/weekendjeweg/actions/runs/26120008031
