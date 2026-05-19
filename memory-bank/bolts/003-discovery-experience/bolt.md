# Bolt 003: discovery-experience

Status: planned
Created: 2026-05-19T10:45:00Z
Intent: `001-weekendjeweg-mvp`
Unit: `003-discovery-experience`
Bolt type: simple-construction
Depends on: `001-application-foundation`, `002-stay-catalog`

## Objective

Build the core browse, search, filter, and detail experience.

## Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/003-discovery-experience/stories/001-browse-stay-list.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/003-discovery-experience/stories/002-search-and-filter-stays.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/003-discovery-experience/stories/003-view-stay-detail.md`

## Expected Outputs

- Stay list UI.
- Search and filter controls.
- Empty state with reset.
- Stay detail route and not-found state.
- Tests for filtering and detail routing.

## Done Criteria

- Visitor can browse and narrow stays.
- Detail pages render complete stay information.
- No complex logic is embedded directly in templates.
- Controls are keyboard operable and labeled.
- Playwright covers browse, filter, and detail flow.

## Human Checkpoint

Review user flow before favorites and outbound booking behavior are added.
