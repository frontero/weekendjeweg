# Design: weekendjeweg MVP

Status: draft-awaiting-review
Created: 2026-05-19T11:25:00Z

## Design Goal

Define the technical and interaction design for the first Weekendjeweg MVP before construction continues.

This design supersedes the accidental early construction flow. Existing code in the repository is treated as a pre-approval draft until this design and the task plan are reviewed.

## Product Shape

The MVP is a Dutch consumer-facing stay discovery app.

Core user journey:

1. Visitor lands on the discovery experience.
2. Visitor scans a curated stay list.
3. Visitor searches or filters by region/tag.
4. Visitor opens a stay detail route.
5. Visitor saves/removes favorites.
6. Visitor follows an external booking CTA.

## Architecture

### Frontend

- Vue 3 application with TypeScript.
- Vite for development/build.
- Vue Router for browse, detail, and favorites routes.
- Pinia only where shared state is needed.
- Static seed data for stays in the first MVP.

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Discovery and stay list |
| `/verblijven/:stayId` | Stay detail |
| `/favorieten` | Favorites |

### Modules

| Area | Responsibility |
| --- | --- |
| `src/types/` | Reusable TypeScript types such as `Stay` and `FavoriteStay` |
| `src/data/` | Static seeded stay catalog |
| `src/composables/` | Reusable logic for search/filter or ID/state helpers when useful |
| `src/stores/` | Pinia stores for favorites and potentially filters |
| `src/views/` | Route-level views |
| `src/components/` | Reusable UI components such as cards, filters, and empty states |
| `src/styles/` | Baseline and component styling |

## Data Design

### Stay

Reusable type under `src/types/`.

Expected fields:

- `id: string`
- `name: string`
- `locationName: string`
- `region: string`
- `shortDescription: string`
- `description: string`
- `priceLabel: string`
- `tags: string[]`
- `highlights: string[]`
- `amenities: string[]`
- `externalBookingUrl: string | null`

### Favorite State

Favorites can be stored locally for the MVP. Persistence may be in memory first; localStorage is optional and must be explicitly decided before implementation.

## Interaction Design

### Discovery

- The discovery page is the first screen.
- It should show usable content, not a marketing-only landing page.
- Search and filters must be visible, labeled, keyboard operable, and resettable.

### Detail

- The detail page should include all key stay fields and a clear way back to discovery.
- Unknown stay IDs should show a not-found state.

### Favorites

- Favorite controls must have accessible names.
- Toggle behavior must use explicit boolean comparisons.
- The favorites route must include an empty state.

### External Booking CTA

- The CTA must make clear that booking continues externally.
- Missing URLs must not render broken links.

## Accessibility Design

Required from the first implementation pass:

- Skip link.
- Labeled navigation.
- Visible focus states.
- Keyboard-operable filters, favorite controls, and CTAs.
- Semantic headings.
- Accessible names for icon-only or compact controls.
- No focus traps.
- Reduced-motion friendly transitions.

## Testing Design

### Unit/Component Tests

- App shell renders navigation.
- Catalog helpers return expected data.
- Search/filter logic handles matching and empty results.
- Favorite store toggles add/remove state using explicit comparisons.

### E2E Tests

Critical Playwright path:

1. Open discovery route.
2. Search or filter stays.
3. Open stay detail.
4. Save a favorite.
5. Visit favorites.
6. Verify outbound CTA visibility.

## Open Decisions Before Construction Continues

1. Should favorite state persist in localStorage or only in memory for the first MVP?
2. Should external booking URLs be real, placeholder, or disabled until partner direction is clear?
3. Should the seeded catalog use real-looking image URLs, generated/static placeholders, or CSS-first visual treatment?
4. Is Vue 3 + Vite approved as the implementation stack?

## Review Requirement

Construction must not continue beyond the already-created draft foundation until this design and `tasks.md` are approved.
