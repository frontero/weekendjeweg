# Unit 006: Production SEO Quality

Status: ci-verified-lighthouse-pending
Updated: 2026-05-19T14:45:16Z

## Purpose

Make the MVP production-ready through SEO, structured data, tests, and Lighthouse quality gates.

## Stories

1. SEO Foundation - completed and CI verified
2. Quality Gates - CI verified; Lighthouse measurement pending

## Acceptance Criteria

- Home, park search, and park detail pages have accurate Dutch metadata. Completed.
- Sitemap and robots behavior exist. Completed.
- Structured data is added only where accurate and never claims unsupported availability. Completed.
- Tests cover data normalization, filters, price selection, affiliate URLs, consent-aware click tracking, and scraping compliance gating. Completed.
- Lighthouse targets 90+ for Performance, Accessibility, and SEO on key pages. Pending deployed or served preview measurement.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26104690981 passed.

## Out of Scope

- Rich region SEO pages.
- Real image pipeline.
- CMS/admin content workflows.

## Risks

- Lighthouse targets require verification against a running app preview.
- Real production domain is still not configured in this repository.
