# Story: Daily Import Pipeline

Status: skeleton-completed-real-feed-blocked
Unit: 003-landal-data-access

## User Value

As the project owner, I want park and price data refreshed daily so visitors see recent price information.

## Acceptance Criteria

- Vercel Cron can call a protected Nuxt server endpoint.
- Import orchestration tries official/API/feed access first.
- Scraping fallback runs only after compliance approval.
- Parks, regions, facilities, and price snapshots are normalized into the Supabase model.
- Import run status, message, and record counts are stored.

## Current Result

`POST /api/import/landal` exists and is protected by `x-import-secret`. It validates cron access and returns safe blocked import plans until TradeTracker credentials are configured. The endpoint does not call Landal or TradeTracker yet.

## Current Blocker

TradeTracker publisher/site/campaign approval and credentials are required before a real Landal import can run. Supabase persistence for import runs also remains a follow-up.

## Notes

The next implementation can add a real TradeTracker feed client behind the existing blocked-run and credential checks.
