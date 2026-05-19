# Story 003: View Stay Detail

Status: planned
Created: 2026-05-19T10:45:00Z

## User Story

As a visitor, I want to open a stay detail view, so that I can understand the offer before continuing externally.

## Acceptance Criteria

- Given the visitor selects a stay, when the detail route opens, then complete stay details are shown.
- Given the stay exists, when the detail page renders, then it includes name, location, description, highlights, amenities, price label, and booking CTA area.
- Given the stay ID is unknown, when the detail route opens, then the app shows a not-found state and a route back to browse.

## Notes

Not-found handling should use early returns in code paths where practical.
