# Story: Typed Data Access

Status: planned
Unit: 002-supabase-data-model

## User Value

As a developer, I want typed data access so UI and server logic share one reliable contract.

## Acceptance Criteria

- Reusable TypeScript contracts exist outside single components.
- Supabase access helpers centralize reads/writes for parks, prices, facilities, clicks, imports, and compliance reviews.
- Query helpers return predictable empty states.
- Code avoids duplicating raw query logic across pages and endpoints.

## Notes

Types should be named clearly and kept reusable for tests and server-side code.
