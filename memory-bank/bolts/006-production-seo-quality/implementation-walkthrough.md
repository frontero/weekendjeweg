# Implementation Walkthrough: Production SEO Quality

Status: completed-pending-ci
Updated: 2026-05-19T14:35:00Z

## SEO Routes

`server/routes/sitemap.xml.ts` renders indexable MVP routes from the current request origin. It includes the home page, `/parken`, and park detail routes. Rich region pages are intentionally excluded because that content is out of scope for the first release.

`server/routes/robots.txt.ts` allows crawling and points to the generated sitemap.

## Structured Data

`shared/domain/seo.ts` creates conservative JSON-LD for the website, the park list, and park detail breadcrumbs. It does not emit `Offer`, `availability`, ratings, reviews, or booking availability claims.

## Metadata

Home, search, detail, and region support pages now include canonical links. Region support pages are marked `noindex,follow` until rich region SEO content is ready.

## Quality Gates

`shared/domain/catalogNormalization.ts` covers import-safe normalization helpers. `shared/domain/scrapingCompliance.ts` blocks scraper orchestration until robots, terms, rate limits, and explicit approval exist.

## Tests

`tests/seo.test.ts` covers sitemap entries, robots text, and structured-data claim safety. `tests/qualityGates.test.ts` covers normalization and scraping compliance gating.
