# Story 002: Search and Filter Stays

Status: planned
Created: 2026-05-19T10:45:00Z

## User Story

As a visitor, I want to search and filter stays, so that I can narrow the catalog to relevant weekend options.

## Acceptance Criteria

- Given the visitor types a search term, when matching stays exist, then only matching stays are shown.
- Given the visitor selects a region or tag filter, when matching stays exist, then the result list updates.
- Given no stays match, when the result list is empty, then the app shows a clear empty state and a reset control.
- Given filters are active, when the visitor resets them, then the full catalog is shown again.

## Notes

Use explicit comparisons in search/filter code. Do not use `!value` checks.
