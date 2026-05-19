# Implementation Walkthrough: Park Search and Detail

## Summary

Bolt 004 turns the Nuxt route skeleton into a mock-data-backed visitor journey.

## Steps Completed

1. Added typed park card view models and price presentation helpers.
2. Added a reusable `ParkResultCard` component.
3. Updated home page to show featured park cards from the mock catalog.
4. Updated `/parken` with dynamic filters and accessible result counts.
5. Updated `/parken/[slug]` to render mock park details and a placeholder Landal CTA.
6. Updated `/regio/[slug]` to show route-supported regional park lists while keeping rich SEO deferred.
7. Added tests for view model generation and price copy.
8. Updated E2E expectations for the now-data-backed flow.

## Design Notes

- Price copy says `Prijsvoorbeeld` and explicitly avoids availability claims.
- Facility filters are derived from mock catalog data shaped like future Landal-derived data.
- Region pages remain lightweight by design; rich region SEO is deferred.

## Known Follow-Up

- Real Supabase reads remain future work.
- Affiliate click logging and consent are handled in a later bolt.
- Real images remain deferred.
