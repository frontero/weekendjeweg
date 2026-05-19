# Unit 004: Park Search and Detail

Status: completed-pending-ci
Updated: 2026-05-19T14:15:00Z

## Purpose

Build the core Dutch visitor journey for discovering Landal parks, filtering them, viewing park details, and continuing to Landal.

## Stories

1. Home and Park Search - completed pending CI
2. Search Filters and Price Context - completed pending CI
3. Park Detail and Region Route - completed pending CI

## Acceptance Criteria

- `/` leads visitors into the park discovery flow. Completed.
- `/parken` supports region, arrival/departure date, adults, children, and dynamic facility filters. Completed.
- Result counts, empty states, and filters are accessible. Completed.
- Price display includes enough context and never implies availability. Completed.
- `/parken/[slug]` contains useful park detail and a clear Landal CTA. Completed.
- `/regio/[slug]` exists as route support without pretending rich region SEO content is complete. Completed.

## Out of Scope

- Payment, booking, or reservation.
- Availability claims.
- Rich region SEO pages.
- Real images for first release.

## Risks

- The route still uses mock data until Supabase reads are wired in a later step.
- Affiliate click tracking follows in a separate bolt.
