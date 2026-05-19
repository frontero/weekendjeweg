# Unit 006: Production SEO Quality

Status: completed-pending-ci
Updated: 2026-05-19T14:35:00Z

## Purpose

Make the MVP production-ready through SEO, structured data, tests, and Lighthouse quality gates.

## Stories

1. SEO Foundation - completed pending CI
2. Quality Gates - completed pending CI

## Acceptance Criteria

- Home, park search, and park detail pages have accurate Dutch metadata. Completed pending CI.
- Sitemap and robots behavior exist. Completed pending CI.
- Structured data is added only where accurate and never claims unsupported availability. Completed pending CI.
- Tests cover data normalization, filters, price selection, affiliate URLs, consent-aware click tracking, and scraping compliance gating. Completed pending CI.
- Lighthouse targets 90+ for Performance, Accessibility, and SEO on key pages. Pending deployed or served preview measurement.

## Out of Scope

- Rich region SEO pages.
- Real image pipeline.
- CMS/admin content workflows.

## Risks

- Lighthouse targets require verification against a running app preview.
- Real production domain is still not configured in this repository.
