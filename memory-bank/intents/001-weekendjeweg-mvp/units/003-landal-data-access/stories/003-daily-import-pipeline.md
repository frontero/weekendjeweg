# Story: Daily Import Pipeline

Status: blocked-waiting-tradetracker-credentials
Unit: 003-landal-data-access

## User Value

As the project owner, I want park and price data refreshed daily so visitors see recent price information.

## Acceptance Criteria

- Vercel Cron can call a protected Nuxt server endpoint.
- Import orchestration tries official/API/feed access first.
- Scraping fallback runs only after compliance approval.
- Parks, regions, facilities, and price snapshots are normalized into the Supabase model.
- Import run status, message, and record counts are stored.

## Current Blocker

TradeTracker publisher/site/campaign approval and credentials are required before a real Landal import can run. The next implementation can build a protected importer with fixtures and blocked-run behavior, but it must not call TradeTracker or Landal without credentials and approval.

## Notes

This story can be built with test doubles before real Landal access is available.
