# Bolt 004: Park Search and Detail

Status: completed-and-ci-verified
Started: 2026-05-19T14:15:00Z
Completed: 2026-05-19T14:15:00Z
Verified: 2026-05-19T14:22:00Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/004-park-search-and-detail/stories/001-home-and-park-search.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/004-park-search-and-detail/stories/002-search-filters-and-price-context.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/004-park-search-and-detail/stories/003-park-detail-and-region-route.md`

## Scope

- Use the shared mock Landal catalog in the home, search, park detail, and region routes.
- Add reusable park result card component.
- Add region, date, adults, children, and dynamic facility filters on `/parken`.
- Add accessible result count, empty state, and reset controls.
- Add price-only context copy without availability claims.
- Add park detail pages backed by mock data and placeholder Landal CTA.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26102998069 passed for commit `cba5e95aba352ab1eab92549c50f15aea0da3ea7`.

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Next Bolt

`005-affiliate-consent-tracking` is recommended after this bolt.
