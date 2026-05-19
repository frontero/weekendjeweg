# Unit Brief: stay-catalog

Status: planned
Created: 2026-05-19T10:45:00Z

## Purpose

Define the typed content foundation for weekend stays so the discovery experience can be built against stable data contracts.

## Scope

Included:

- `Stay` and related types.
- Static seed data for a small curated catalog.
- Helper functions for retrieving stays by ID and filtering by simple criteria.

Excluded:

- CMS integration.
- Backend persistence.
- Remote API calls.
- Real partner availability.

## Quality Bar

- Types live in `src/types/` when reusable.
- Data access logic is testable outside Vue templates.
- Seed data has enough variation to test regions, tags, and empty states.
