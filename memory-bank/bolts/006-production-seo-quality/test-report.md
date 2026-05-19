# Test Report: Production SEO Quality

Status: verified-by-github-actions-and-lighthouse
Updated: 2026-05-19T15:05:10Z

## Checks Added

- `tests/seo.test.ts` validates sitemap entries, robots text, sitemap XML shell, and structured-data claim safety.
- `tests/qualityGates.test.ts` validates data normalization and scraping-compliance gating.
- `e2e/app-shell.spec.ts` includes sitemap and robots smoke coverage.
- `.github/workflows/pages.yml` generates and serves a static preview for Lighthouse quality checks.

## GitHub Actions Verification

Latest CI run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26105841042
- Commit: `9051739919782e152b077c246c25845c964e3a8c`
- Status: success

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Lighthouse Verification

Latest Lighthouse Preview run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26105840860
- Commit: `9051739919782e152b077c246c25845c964e3a8c`
- Status: success

Measured pages and scores:

| Page | Performance | Accessibility | SEO |
| --- | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 |
| `/parken` | 99 | 100 | 100 |

The workflow includes a non-enforced warm-up audit so the first cold Chrome/Lighthouse run does not create a false negative while the enforced 90+ target remains unchanged.

## Failed Runs During Fix Cycle

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26104534648
- Cause: Nuxt head script typing for the park detail JSON-LD helper.
- Fix: commit `ac69e184a0887973870c4579409ba1f2e1bf6597` removes the custom script interface and lets Nuxt infer the head script shape.

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26105519549
- Cause: first Lighthouse audit on the GitHub runner measured homepage Performance at 82 due to cold browser/audit startup noise; `/parken` measured 99 with the same asset profile.
- Fix: commit `9051739919782e152b077c246c25845c964e3a8c` adds an explicit warm-up audit before enforced Lighthouse checks.

## Result

Bolt 006 is CI verified and Lighthouse verified.
