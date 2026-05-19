# Unit Brief: discovery-experience

Status: planned
Created: 2026-05-19T10:45:00Z

## Purpose

Build the main visitor experience for browsing, searching, filtering, and inspecting weekend stays.

## Scope

Included:

- Stay card list.
- Search by name, location, and tags.
- Region/tag filtering.
- Empty state and reset flow.
- Stay detail view.

Excluded:

- Favorites behavior.
- External booking CTA behavior beyond detail placement.
- Backend search.
- Maps.

## Quality Bar

- Filtering logic lives in computed values, composables, or testable functions.
- No complex inline Vue template logic.
- Controls are keyboard operable and labeled.
