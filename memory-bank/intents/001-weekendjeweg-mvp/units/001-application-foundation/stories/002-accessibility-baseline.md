# Story 002: Accessibility Baseline

Status: planned
Created: 2026-05-19T10:45:00Z

## User Story

As a keyboard or assistive technology user, I want the app controls to be reachable and understandable, so that I can complete the weekend stay discovery flow without a mouse.

## Acceptance Criteria

- Given an interactive control exists, when it receives focus, then it has a visible focus state.
- Given icon-only controls are introduced, when a screen reader reads them, then each control has a meaningful accessible name.
- Given filters or result counts change, when the UI updates, then focus is not trapped or lost.
- Given the user prefers reduced motion, when the app renders transitions, then motion is nonessential or reduced.

## Notes

Accessibility failures block construction completion for this unit.
