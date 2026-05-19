# Unit 003: Landal Data Access

Status: discovery-completed-real-import-blocked
Updated: 2026-05-19T15:15:46Z

## Purpose

Create a compliant path for daily Landal Netherlands park and price data, using official/API/feed access first and scraping only as a controlled fallback.

## Stories

1. Landal Data Discovery
2. Scraping Compliance Gate
3. Daily Import Pipeline

## Acceptance Criteria

- Official/API/feed availability is researched and recorded before scraper activation. Completed in `memory-bank/bolts/003-landal-data-access/discovery-report.md`.
- Scraping compliance checks exist for robots.txt, terms, affiliate/network rules where available, and rate limits. The gate now requires explicit terms permission for commercial use.
- Real scraper execution is blocked until a compliance review is approved.
- Vercel Cron can call a protected Nuxt server endpoint for daily import. Pending credentials-backed implementation.
- Import runs record status, failures, and imported record counts. Pending credentials-backed implementation.
- If API/feed and compliant scraping are impossible, real import work is blocked until data access is arranged.

## Out of Scope

- Running a real scraper before compliance approval.
- Claiming availability in the UI.
- Rich admin tooling for import management.

## Risks

- Landal may not provide a public API/feed outside TradeTracker publisher access.
- Scraping appears prohibited for commercial use unless written permission is obtained.
- Frontend must be able to continue with mock data if this unit blocks.

## Next Step

Use TradeTracker as the first real data route. Build the protected importer behind explicit credentials and return blocked import runs when credentials, campaign approval, or permission are missing.
