# Story 001: Save and Remove Favorites

Status: planned
Created: 2026-05-19T10:45:00Z

## User Story

As a visitor, I want to save interesting stays, so that I can compare them before choosing where to continue.

## Acceptance Criteria

- Given a stay is not a favorite, when the visitor activates the favorite control, then the stay is added to favorites.
- Given a stay is already a favorite, when the visitor activates the favorite control, then the stay is removed from favorites.
- Given favorites exist, when the visitor opens favorites, then saved stays are shown.
- Given no favorites exist, when the visitor opens favorites, then a helpful empty state is shown.

## Notes

Do not implement toggle logic with `!favoriteState`. Use explicit boolean comparison.
