# Bolt 005: Affiliate Consent Tracking

Status: completed-and-ci-verified
Started: 2026-05-19T14:25:00Z
Completed: 2026-05-19T14:25:00Z
Verified: 2026-05-19T14:31:10Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/005-affiliate-consent-tracking/stories/001-affiliate-link-templates.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/005-affiliate-consent-tracking/stories/002-consent-aware-click-tracking.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/005-affiliate-consent-tracking/stories/003-ga4-consent-banner.md`

## Implemented Scope

- Add reusable placeholder Landal affiliate URL builder.
- Add consent-aware outbound click creation and anonymous safety filtering.
- Add `/api/outbound-click` endpoint with optional Supabase REST persistence.
- Add accessible consent banner with explicit accept and reject actions.
- Load GA4 only after accepted analytics consent and configured measurement ID.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26103869775 passed for commit `b689ca68496371cc88c8adbed704f9f9e636ac61`.

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Next Bolt

`006-production-seo-quality` is recommended after this bolt.
