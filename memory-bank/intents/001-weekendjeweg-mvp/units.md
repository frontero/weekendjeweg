# Units: weekendjeweg MVP

Status: checkpoint-3-artifacts-review
Created: 2026-05-19T10:45:00Z

## Unit Overview

| Unit | Name | Purpose | Bolt Type |
| --- | --- | --- | --- |
| 001 | application-foundation | Establish Vue app foundation, routing, layout, and accessibility baseline | simple-construction |
| 002 | stay-catalog | Define typed seeded stay data and reusable catalog access | simple-construction |
| 003 | discovery-experience | Browse, search, filter, and inspect stay details | simple-construction |
| 004 | favorites-and-outbound | Save favorites and continue to external booking URLs | simple-construction |

## Unit 001: application-foundation

Sets up the usable app shell: routes, responsive structure, baseline styling, test harness, and accessibility conventions.

Primary stories:

- App shell and navigation.
- Accessibility baseline.

## Unit 002: stay-catalog

Provides typed stay seed data, domain types, and simple access helpers.

Primary stories:

- Define stay data model.
- Seed curated Dutch weekend stays.

## Unit 003: discovery-experience

Provides the core visitor journey for browsing, searching, filtering, and opening details.

Primary stories:

- Browse stay list.
- Search and filter stays.
- View stay detail.

## Unit 004: favorites-and-outbound

Adds visitor intent features: favorite stays and outbound booking CTA behavior.

Primary stories:

- Save and remove favorites.
- Continue to external booking destination.

## Construction Order

1. `001-application-foundation`
2. `002-stay-catalog`
3. `003-discovery-experience`
4. `004-favorites-and-outbound`

## Review Notes

This decomposition favors a small but end-to-end clickable MVP. It avoids backend and payment complexity until product direction is validated.
