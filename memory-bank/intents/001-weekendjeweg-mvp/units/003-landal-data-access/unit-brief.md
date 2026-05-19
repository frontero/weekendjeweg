# Unit 003: Landal Data Access

Status: tradetracker-feed-client-verified-real-live-import-blocked
Updated: 2026-05-19T19:27:01Z

## Purpose

Create a compliant path for daily Landal Netherlands park and price data, using official/API/feed access first and scraping only as a controlled fallback.

## Stories

1. Landal Data Discovery
2. Scraping Compliance Gate
3. Daily Import Pipeline

## Acceptance Criteria

- Official/API/feed availability is researched and recorded before scraper activation. Completed in `memory-bank/bolts/003-landal-data-access/discovery-report.md`.
- Scraping compliance checks exist for robots.txt, terms, affiliate/network rules where available, and rate limits. The gate requires explicit terms permission for commercial use.
- Real scraper execution is blocked until a compliance review is approved.
- Vercel Cron can call a protected Nuxt server endpoint for daily import. Implemented via `POST /api/import/landal`.
- TradeTracker SOAP feed fetching is implemented for configured credentials, using `authenticate` and `getFeedProducts` from the public WSDL.
- Import runs return status, failures, and imported record counts. Current response bodies are implemented; Supabase persistence remains the next implementation step.
- If API/feed and compliant scraping are impossible, real import work is blocked until data access is arranged.

## Out of Scope

- Running a real scraper before compliance approval.
- Claiming availability in the UI.
- Rich admin tooling for import management.

## Risks

- Landal may not provide a usable feed before TradeTracker publisher/site/campaign approval.
- Live TradeTracker import cannot be verified without credentials.
- Scraping appears prohibited for commercial use unless written permission is obtained.
- Frontend must be able to continue with mock data if this unit blocks.

## Next Step

Map parsed TradeTracker feed products into catalog and price-snapshot upserts, then persist import-run status in Supabase after a real or representative approved feed sample is available.
