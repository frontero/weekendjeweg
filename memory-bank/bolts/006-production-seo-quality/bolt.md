# Bolt 006: Production SEO Quality

Status: completed-pending-ci
Started: 2026-05-19T14:35:00Z
Completed: 2026-05-19T14:35:00Z

## Source Stories

- `memory-bank/intents/001-weekendjeweg-mvp/units/006-production-seo-quality/stories/001-seo-foundation.md`
- `memory-bank/intents/001-weekendjeweg-mvp/units/006-production-seo-quality/stories/002-quality-gates.md`

## Implemented Scope

- Add canonical metadata for home, park search, park detail, and region support pages.
- Add conservative JSON-LD for website, park list, and park detail breadcrumbs without availability or offer claims.
- Add dynamic `/sitemap.xml` and `/robots.txt` routes.
- Keep temporary region support pages out of the sitemap and mark them `noindex,follow`.
- Add normalization and scraping-compliance gate helpers with tests.
- Add SEO route and structured-data tests.

## Verification

Pending GitHub Actions verification.

## Lighthouse

Lighthouse targets remain pending until a deployed or locally served preview URL is available for measurement. The target remains 90+ for Performance, Accessibility, and SEO on key pages.
