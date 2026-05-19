# Story: Park Detail and Region Route

Status: planned
Unit: 004-park-search-and-detail

## User Value

As a visitor, I want a park detail page with enough context to decide whether to continue to Landal.

## Acceptance Criteria

- `/parken/[slug]` shows park name, region, description/highlights, facilities, price context, and Landal CTA.
- CTA text is clear, for example `Bekijk bij Landal`.
- Detail page metadata is specific to the park.
- `/regio/[slug]` route exists as route support with honest placeholder behavior if rich region SEO is deferred.
- No copy claims booking or availability inside Weekendjeweg.

## Notes

Region SEO expansion is deferred but route support prevents dead links later.
