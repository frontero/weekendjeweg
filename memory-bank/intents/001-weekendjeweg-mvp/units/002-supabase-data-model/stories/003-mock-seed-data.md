# Story: Mock Seed Data

Status: completed
Unit: 002-supabase-data-model

## User Value

As the project owner, I want frontend construction to continue even while real Landal data access is unresolved.

## Acceptance Criteria

- Mock or seed data represents Landal Netherlands parks without claiming real-time accuracy. Completed.
- Seed data covers regions, facilities, prices, and affiliate placeholder links. Completed.
- Mock data can be swapped for Supabase-backed data without rewriting UI contracts. Completed through shared catalog shape.
- Visible copy avoids implying live availability. Completed in data labels as price examples.

## Notes

Implemented in `shared/data/mockCatalog.ts`.
