# Bolt 003: Landal Data Access Discovery

Status: discovery-completed-real-import-blocked
Started: 2026-05-19T15:08:00Z
Completed: 2026-05-19T15:15:46Z
Verified: 2026-05-19T15:15:46Z

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
- Updated the Supabase schema, shared types, and quality-gate tests for the stricter compliance rule.

## Verification

GitHub Actions CI run https://github.com/frontero/weekendjeweg/actions/runs/26106463771 passed for commit `4a17b2b4c6241b9856c9199a5e5d0661dc7444f1`.

GitHub Actions Lighthouse Preview run https://github.com/frontero/weekendjeweg/actions/runs/26106463769 passed for commit `4a17b2b4c6241b9856c9199a5e5d0661dc7444f1`.

## Result

Discovery is complete enough to choose the next path: use TradeTracker publisher/campaign credentials first. Real Landal scraping remains blocked unless written permission or campaign terms explicitly allow commercial data use.
