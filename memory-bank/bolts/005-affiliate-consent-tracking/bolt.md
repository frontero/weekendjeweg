# Bolt 005: Affiliate Consent Tracking

Status: completed-pending-ci
Started: 2026-05-19T14:25:00Z
Completed: 2026-05-19T14:25:00Z

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

Pending GitHub Actions verification.

## Next Bolt

`006-production-seo-quality` is recommended after this bolt is green.
