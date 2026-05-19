# Unit 003: Landal Data Access

Status: planned-partially-blocked
Updated: 2026-05-19T12:56:57Z

## Purpose

Create a compliant path for daily Landal Netherlands park and price data, using official/API/feed access first and scraping only as a controlled fallback.

## Stories

1. Landal Data Discovery
2. Scraping Compliance Gate
3. Daily Import Pipeline

## Acceptance Criteria

- Official/API/feed availability is researched and recorded before scraper activation.
- Scraping compliance checks exist for robots.txt, terms, affiliate/network rules where available, and rate limits.
- Real scraper execution is blocked until a compliance review is approved.
- Vercel Cron can call a protected Nuxt server endpoint for daily import.
- Import runs record status, failures, and imported record counts.
- If API/feed and compliant scraping are impossible, real import work is blocked until data access is arranged.

## Out of Scope

- Running a real scraper before compliance approval.
- Claiming availability in the UI.
- Rich admin tooling for import management.

## Risks

- Landal may not provide a public API/feed.
- Scraping may be prohibited or impractical.
- Frontend must be able to continue with mock data if this unit blocks.
