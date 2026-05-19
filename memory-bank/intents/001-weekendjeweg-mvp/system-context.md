# System Context: weekendjeweg MVP

Status: checkpoint-3-artifacts-review
Created: 2026-05-19T10:45:00Z

## Purpose

`weekendjeweg` helps Dutch-speaking consumers discover a small curated set of weekend stays, compare practical details, save favorites, and continue to an external booking destination.

## Actors

| Actor | Description | Goal |
| --- | --- | --- |
| Visitor | Consumer planning a weekend away | Find a suitable stay quickly |
| External booking destination | Partner or placeholder destination outside this app | Complete booking outside the MVP |
| Future editor | Not part of MVP | Maintain stay content later |

## System Boundary

Inside the MVP:

- Frontend app shell and routing.
- Seeded stay catalog.
- Search and region/tag filtering.
- Stay detail page.
- Favorites state.
- External booking CTA.
- Tests for critical flows.

Outside the MVP:

- Real booking engine.
- Payments.
- User accounts.
- Admin/editor dashboard.
- CMS.
- Reviews.
- Maps.
- Email notifications.

## Data Concepts

### Stay

A weekend stay that can be shown in browse, detail, and favorites views.

Core fields:

- `id`
- `name`
- `locationName`
- `region`
- `shortDescription`
- `description`
- `priceLabel`
- `tags`
- `highlights`
- `amenities`
- `externalBookingUrl`

### Favorite

A visitor-selected stay stored locally for MVP usage.

Core fields:

- `stayId`
- `createdAt`

## UX Context

The app should feel practical, warm, and easy to scan. Visitors should understand within seconds what options exist and how to narrow them down.

The first screen should be the working discovery experience, not a marketing landing page.

## Accessibility Context

The critical browse and detail flows must be usable without a mouse. Search, filters, favorite toggles, and outbound CTA must have accessible names and clear focus states.

## Technical Context

The provisional stack is confirmed for the first MVP unless changed during review:

- Vue 3
- TypeScript
- Vite
- Pinia for shared favorite/filter state when needed
- Vitest
- Playwright

## Risks

- Static seed data can make the MVP feel unrealistic if content quality is weak.
- External booking CTA can confuse users if labels do not clearly state that booking continues elsewhere.
- Favorites can become inaccessible if implemented as icon-only controls without labels.
- Search/filter logic can become hard to test if placed inline in Vue templates.
