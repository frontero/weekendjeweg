# Bolt 002: stay-catalog

Status: planned
Created: 2026-05-19T10:45:00Z
Intent: `001-weekendjeweg-mvp`
Unit: `002-stay-catalog`
Bolt type: simple-construction
Depends on: `001-application-foundation`

## Objective

Create typed seeded stay data and testable catalog helpers.

## Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/002-stay-catalog/stories/001-typed-stay-model.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/002-stay-catalog/stories/002-seeded-stay-catalog.md`

## Expected Outputs

- Reusable TypeScript types under `src/types/`.
- Seed data with multiple Dutch regions and tags.
- Catalog access helpers.
- Tests for data shape and helper behavior.

## Done Criteria

- Type checks pass.
- Seed data supports matching and empty-state tests.
- No reusable types are defined inline in Vue components.
- Search/filter-ready helpers are covered by tests.

## Human Checkpoint

Review content shape before building the discovery UI.
