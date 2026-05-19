# Story: Typed Data Access

Status: completed
Unit: 002-supabase-data-model

## User Value

As a developer, I want typed data access so UI and server logic share one reliable contract.

## Acceptance Criteria

- Reusable TypeScript contracts exist outside single components. Completed.
- Supabase access helpers centralize reads/writes for parks, prices, facilities, clicks, imports, and compliance reviews. Partially completed as framework-neutral catalog and click helpers; Supabase client wiring is deferred.
- Query helpers return predictable empty states. Completed.
- Code avoids duplicating raw query logic across pages and endpoints. Completed for catalog helpers.

## Notes

Implemented in `shared/types/database.ts`, `shared/domain/catalogRepository.ts`, and `shared/domain/clickTracking.ts`.
