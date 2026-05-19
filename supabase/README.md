# Supabase

This folder contains database artifacts for the Weekendjeweg MVP.

## Migrations

Apply migrations through the Supabase CLI or the Supabase dashboard SQL editor.

Current migration:

- `migrations/20260519143000_initial_weekendjeweg_schema.sql`

## Scope

The first schema supports:

- Landal Netherlands regions, parks, and dynamically derived facilities.
- Price snapshots without availability claims.
- Placeholder affiliate link templates.
- Anonymous or consent-aware outbound click logs.
- Import run state.
- Scraping compliance reviews that block real scraper execution by default.

No secrets belong in this repository.
