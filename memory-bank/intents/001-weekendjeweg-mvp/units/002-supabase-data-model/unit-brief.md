# Unit 002: Supabase Data Model

Status: planned-awaiting-checkpoint-4-review
Updated: 2026-05-19T12:56:57Z

## Purpose

Define the Supabase-backed data model and reusable TypeScript data contracts before UI, imports, and tracking depend on them.

## Stories

1. Supabase Schema
2. Typed Data Access
3. Mock Seed Data

## Acceptance Criteria

- The schema supports regions, facilities, parks, park facilities, price snapshots, affiliate templates, outbound clicks, import runs, and scraping compliance reviews.
- Facilities can be derived from Landal data instead of fixed manually in the UI.
- Price snapshots store arrival date, departure date, adults, children, currency, and price value/label.
- Anonymous functional click logs do not contain cookie IDs or user IDs.
- Mock or seed data allows frontend construction while real Landal data access is unresolved.

## Out of Scope

- Real data scraping or API ingestion.
- Final affiliate-network tracking parameter mapping.
- Full admin/CMS features.

## Risks

- A too-narrow schema could make price and facility import brittle.
- Click tracking must be designed carefully so rejected-cookie behavior stays privacy-safe.
