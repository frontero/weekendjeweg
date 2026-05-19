# Bolt 004: favorites-and-outbound

Status: planned
Created: 2026-05-19T10:45:00Z
Intent: `001-weekendjeweg-mvp`
Unit: `004-favorites-and-outbound`
Bolt type: simple-construction
Depends on: `001-application-foundation`, `002-stay-catalog`, `003-discovery-experience`

## Objective

Add visitor intent features: saving favorites and continuing to external booking destinations.

## Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/004-favorites-and-outbound/stories/001-save-and-remove-favorites.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/004-favorites-and-outbound/stories/002-continue-to-external-booking.md`

## Expected Outputs

- Favorite toggle behavior on list and detail views.
- Favorites view or section.
- External booking CTA with clear outbound wording.
- Safe fallback for missing booking URLs.
- Tests for favorites and CTA rendering.

## Done Criteria

- Favorite toggles are keyboard accessible.
- Toggle logic uses explicit boolean comparisons.
- Favorites can be added, removed, and reviewed.
- External booking CTA behavior is clear and safe.
- Critical Playwright flow covers browse, favorite, detail, and CTA visibility.

## Human Checkpoint

Review end-to-end MVP flow before Operations phase.
