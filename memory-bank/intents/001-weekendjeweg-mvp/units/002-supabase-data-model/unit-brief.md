# Unit 002: Supabase Data Model

Status: completed-and-ci-verified
Updated: 2026-05-19T14:00:00Z

## Purpose

Define the Supabase-backed data model and reusable TypeScript data contracts before UI, imports, and tracking depend on them.

## Stories

1. Supabase Schema - completed
2. Typed Data Access - completed
3. Mock Seed Data - completed

## Acceptance Criteria

- The schema supports regions, facilities, parks, park facilities, price snapshots, affiliate templates, outbound clicks, import runs, and scraping compliance reviews. Completed.
- Facilities can be derived from Landal data instead of fixed manually in the UI. Completed through `facilities` and `park_facilities`.
- Price snapshots store arrival date, departure date, adults, children, currency, and price value/label. Completed.
- Anonymous functional click logs do not contain cookie IDs or user IDs. Completed in schema and helper tests.
- Mock or seed data allows frontend construction while real Landal data access is unresolved. Completed.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26102041215 passed.

## Out of Scope

- Real data scraping or API ingestion.
- Final affiliate-network tracking parameter mapping.
- Full admin/CMS features.

## Risks

- The schema still needs to be applied to a real Supabase project in operations.
- Frontend consumption of the mock catalog follows in a later bolt.
