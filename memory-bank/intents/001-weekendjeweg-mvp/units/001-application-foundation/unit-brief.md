# Unit Brief: application-foundation

Status: planned
Created: 2026-05-19T10:45:00Z

## Purpose

Create the app foundation needed to build the MVP safely: Vue 3 + TypeScript + Vite project structure, routing, responsive shell, baseline styling, and test setup.

## Scope

Included:

- App shell with primary content area.
- Basic routes for browse, detail, and favorites.
- Shared layout primitives.
- Accessibility baseline patterns.
- Vitest and Playwright setup.

Excluded:

- Real stay content beyond wiring placeholders.
- Search/filter behavior.
- Favorite behavior.
- External booking behavior.

## Quality Bar

- Follows `memory-bank/standards/coding-standards.md`.
- No inline template logic for complex behavior.
- Root Vue elements avoid styling classes.
- Keyboard focus states are visible.
