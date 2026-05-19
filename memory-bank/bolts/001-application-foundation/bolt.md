# Bolt 001: application-foundation

Status: draft-not-approved
Created: 2026-05-19T10:45:00Z
Started: 2026-05-19T11:00:00Z
Implemented: 2026-05-19T11:10:00Z
Paused: 2026-05-19T11:25:00Z
Intent: `001-weekendjeweg-mvp`
Unit: `001-application-foundation`
Bolt type: simple-construction

## Process Status

This bolt was implemented before the spec-driven development review was explicitly approved. It is therefore a draft, not an approved construction result.

Construction is paused until `memory-bank/intents/001-weekendjeweg-mvp/spec-review.md` is approved.

## Objective

Create the technical and UX foundation for the Weekendjeweg MVP.

## Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/001-application-foundation/stories/001-app-shell-and-routing.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/001-application-foundation/stories/002-accessibility-baseline.md`

## Expected Outputs

- Vue 3 + TypeScript + Vite project foundation.
- App shell and routes for browse, detail, and favorites.
- Baseline styling and responsive layout approach.
- Vitest and Playwright setup.
- Accessibility baseline verified for shell navigation.

## Draft Delivered Outputs

- Vue 3 + TypeScript + Vite app foundation.
- App shell with skip link, labeled navigation, and main landmark.
- Routes for browse, detail, and favorites.
- Placeholder views for future bolts.
- Baseline responsive CSS and focus-visible styles.
- Vitest and Playwright configuration.
- CI workflow for install, typecheck, unit tests, and build.

## Done Criteria

- App starts locally in development environment: pending runtime verification.
- Core routes render without runtime errors: covered by tests, pending runtime verification.
- Keyboard focus is visible in app shell: implemented in CSS.
- Initial tests can run: test files added, pending runtime verification.
- Coding standards are followed: static review completed.
- SDD review approval: pending.

## Implementation Notes

- Work was GitHub-only through connector commits.
- No local files were written by Codex.
- This draft should be kept, revised, or removed only after spec review.

## Human Checkpoint

Review SDD artifacts before deciding whether this draft foundation is accepted.
