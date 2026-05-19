# Unit 006: Production SEO Quality

Status: planned-awaiting-checkpoint-4-review
Updated: 2026-05-19T12:56:57Z

## Purpose

Make the MVP production-ready through SEO, structured data, tests, and Lighthouse quality gates.

## Stories

1. SEO Foundation
2. Quality Gates

## Acceptance Criteria

- Home, park search, and park detail pages have accurate Dutch metadata.
- Sitemap and robots behavior exist.
- Structured data is added only where accurate and never claims unsupported availability.
- Tests cover data normalization, filters, price selection, affiliate URLs, consent-aware click tracking, and scraping compliance gating.
- Lighthouse targets 90+ for Performance, Accessibility, and SEO on key pages.

## Out of Scope

- Rich region SEO pages.
- Real image pipeline.
- CMS/admin content workflows.

## Risks

- SEO can overclaim if structured data is not aligned with available data.
- Lighthouse targets require verification after implementation, not just code review.
