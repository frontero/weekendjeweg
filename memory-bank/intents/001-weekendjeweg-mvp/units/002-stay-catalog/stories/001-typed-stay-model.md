# Story 001: Typed Stay Model

Status: planned
Created: 2026-05-19T10:45:00Z

## User Story

As a developer, I want a typed stay model, so that browse, detail, favorite, and outbound booking behavior share the same contract.

## Acceptance Criteria

- Given stay data is defined, when TypeScript checks run, then stay objects satisfy the shared `Stay` type.
- Given a stay is shown in list or detail views, when fields are accessed, then code uses meaningful property names.
- Given reusable types are needed, when they are created, then they live in `src/types/`.

## Notes

Avoid abbreviations in property and variable names.
