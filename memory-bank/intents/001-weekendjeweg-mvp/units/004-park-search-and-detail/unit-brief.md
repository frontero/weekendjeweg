# Unit 004: Park Search and Detail

Status: completed-and-ci-verified
Updated: 2026-05-19T14:22:00Z

## Purpose

Build the core Dutch visitor journey for discovering Landal parks, filtering them, viewing park details, and continuing to Landal.

## Stories

1. Home and Park Search - completed
2. Search Filters and Price Context - completed
3. Park Detail and Region Route - completed

## Acceptance Criteria

- `/` leads visitors into the park discovery flow. Completed.
- `/parken` supports region, arrival/departure date, adults, children, and dynamic facility filters. Completed.
- Result counts, empty states, and filters are accessible. Completed.
- Price display includes enough context and never implies availability. Completed.
- `/parken/[slug]` contains useful park detail and a clear Landal CTA. Completed.
- `/regio/[slug]` exists as route support without pretending rich region SEO content is complete. Completed.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26102998069 passed.

## Out of Scope

- Payment, booking, or reservation.
- Availability claims.
- Rich region SEO pages.
- Real images for first release.
