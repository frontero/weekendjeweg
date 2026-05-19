# Bolt 006: Production SEO Quality

Status: completed-ci-and-lighthouse-verified
Started: 2026-05-19T14:35:00Z
Completed: 2026-05-19T14:35:00Z
Verified: 2026-05-19T15:05:10Z

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
- Add static-preview Lighthouse automation with a browser warm-up audit before enforced measurements.

## Verification

GitHub Actions CI run https://github.com/frontero/weekendjeweg/actions/runs/26105841042 passed for commit `9051739919782e152b077c246c25845c964e3a8c`.

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Lighthouse

GitHub Actions Lighthouse Preview run https://github.com/frontero/weekendjeweg/actions/runs/26105840860 passed for commit `9051739919782e152b077c246c25845c964e3a8c`.

Measured pages and scores:

- `/`: Performance 99, Accessibility 100, SEO 100.
- `/parken`: Performance 99, Accessibility 100, SEO 100.

The enforced target remains 90+ for Performance, Accessibility, and SEO on key pages.
