# Unit 004: Park Search and Detail

Status: planned-awaiting-checkpoint-4-review
Updated: 2026-05-19T12:56:57Z

## Purpose

Build the core Dutch visitor journey for discovering Landal parks, filtering them, viewing park details, and continuing to Landal.

## Stories

1. Home and Park Search
2. Search Filters and Price Context
3. Park Detail and Region Route

## Acceptance Criteria

- `/` leads visitors into the park discovery flow.
- `/parken` supports region, arrival/departure date, adults, children, and dynamic facility filters.
- Result counts, empty states, and filters are accessible.
- Price display includes enough context and never implies availability.
- `/parken/[slug]` contains useful park detail and a clear Landal CTA.
- `/regio/[slug]` exists as route support without pretending rich region SEO content is finished.

## Out of Scope

- Payment, booking, or reservation.
- Availability claims.
- Rich region SEO pages.
- Real images for first release.

## Risks

- Date and person filters can easily sound like availability search; copy must stay price-only.
- Placeholder visuals should still feel intentional and production-worthy.
