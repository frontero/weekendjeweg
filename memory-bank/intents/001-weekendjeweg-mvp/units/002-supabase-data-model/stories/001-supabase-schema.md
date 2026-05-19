# Story: Supabase Schema

Status: completed-pending-ci
Unit: 002-supabase-data-model

## User Value

As the project owner, I want a clear database model so parks, prices, imports, and click tracking can be built consistently.

## Acceptance Criteria

- Schema includes regions, facilities, parks, park_facilities, price_snapshots, affiliate_link_templates, outbound_clicks, import_runs, and scraping_compliance_reviews. Completed.
- Price snapshots support arrival date, departure date, adults, children, currency, and nullable price values/labels. Completed.
- Facilities can be derived dynamically from source data. Completed.
- Compliance review records can block real scraping execution. Completed.

## Notes

Implemented in `supabase/migrations/20260519143000_initial_weekendjeweg_schema.sql`.
