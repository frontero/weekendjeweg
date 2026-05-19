# Bolt 003: Landal Data Access Discovery and Import Skeleton

Status: importer-skeleton-verified-real-import-blocked
Started: 2026-05-19T15:08:00Z
Completed: 2026-05-19T15:23:30Z
Verified: 2026-05-19T15:23:30Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/003-landal-data-access/stories/001-landal-data-discovery.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/003-landal-data-access/stories/002-scraping-compliance-gate.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/003-landal-data-access/stories/003-daily-import-pipeline.md`

## Implemented Scope

- Researched public Landal and TradeTracker data-access options.
- Recorded that Landal directs affiliate publishers to TradeTracker.
- Recorded that TradeTracker has a public Landal.nl campaign page with deeplink support.
- Recorded that Landal terms prohibit non-personal/commercial site use unless written permission is obtained.
- Checked `https://www.landal.nl/robots.txt` and `https://www.landal.com/robots.txt` for crawler directives.
- Tightened the scraping compliance gate with an explicit `termsPermitCommercialUse` requirement.
- Added a protected `POST /api/import/landal` skeleton endpoint.
- Added TradeTracker import planning logic that returns blocked runs until credentials are configured.
- Added runtime config placeholders for TradeTracker credentials and the import cron secret.
- Added unit tests for import authorization and blocked-run planning.

## Verification

GitHub Actions CI run https://github.com/frontero/weekendjeweg/actions/runs/26106913937 passed for commit `bea3e92cf7e5e4ba9f503a7dc031da7ee3a784f9`.

GitHub Actions Lighthouse Preview run https://github.com/frontero/weekendjeweg/actions/runs/26106913888 passed for commit `bea3e92cf7e5e4ba9f503a7dc031da7ee3a784f9`.

## Result

Unit 003 has a verified discovery record, a stricter scraping gate, and a safe protected import skeleton. Real TradeTracker import remains blocked until publisher/site/campaign approval and credentials exist. Real Landal scraping remains blocked unless written commercial-use permission is recorded.
