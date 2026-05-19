# Bolt 004: Park Search and Detail

Status: completed-pending-ci
Started: 2026-05-19T14:15:00Z
Completed: 2026-05-19T14:15:00Z

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

## Implemented Files

- `app/components/ParkResultCard.vue`
- `app/pages/index.vue`
- `app/pages/parken/index.vue`
- `app/pages/parken/[slug].vue`
- `app/pages/regio/[slug].vue`
- `app/assets/styles/main.css`
- `shared/types/parkSearch.ts`
- `shared/domain/parkPresentation.ts`
- `shared/domain/catalogRepository.ts`
- `tests/parkPresentation.test.ts`
- `e2e/app-shell.spec.ts`

## Verification

Pending GitHub Actions verification.

## Next Bolt

`005-affiliate-consent-tracking` is recommended after this bolt is green.
