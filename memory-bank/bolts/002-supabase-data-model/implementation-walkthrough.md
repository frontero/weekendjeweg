# Implementation Walkthrough: Supabase Data Model

## Summary

Bolt 002 introduces the persistent data model and typed in-repo catalog contracts for Weekendjeweg.

## Steps Completed

1. Added a Supabase migration for regions, facilities, parks, park facilities, price snapshots, affiliate templates, outbound clicks, import runs, and scraping compliance reviews.
2. Enabled row-level security for all created tables.
3. Added shared TypeScript types that mirror the approved data model.
4. Added mock Landal Netherlands data for frontend construction while real data access is unresolved.
5. Added catalog helpers for region/facility filtering, park lookup, facility lookup, price selection, and affiliate template lookup.
6. Added anonymous functional click helper that stores no cookie or user identifier fields.
7. Added unit tests for the main data behavior.

## Design Notes

- Price snapshots store price context only and do not represent availability.
- Facilities are modeled as source-derived data rather than hardcoded UI constants.
- Affiliate link templates are placeholders until the real Landal affiliate-network parameters are known.
- Scraping compliance reviews default to blocked until explicitly approved.

## Known Follow-Up

- Supabase client wiring is deferred until server endpoints need it.
- Applying the migration to a real Supabase project is an operations step.
- The frontend still uses skeleton content until the park-search bolt consumes the shared catalog helpers.
