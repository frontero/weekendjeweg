# Test Report: Supabase Data Model

Status: verified-by-github-actions
Updated: 2026-05-19T14:00:00Z

## Checks Added

- `tests/catalog.test.ts` validates mock catalog behavior.
- `npm run test:unit` now runs the existing foundation smoke test and TypeScript catalog tests through `tsx`.

## GitHub Actions Verification

Latest verified run:

- Run: https://github.com/frontero/weekendjeweg/actions/runs/26102041215
- Commit: `7b389b232af6a5657424fa5d728f0ddb150df0e2`
- Status: success

Passed steps:

- Install dependencies.
- Typecheck.
- Unit tests.
- Build.

## Manual Review

Reviewed the schema and TypeScript contracts for:

- Required Supabase tables.
- Dynamic facilities.
- Price-only snapshot model.
- Placeholder affiliate templates.
- Anonymous functional click logs without cookie or user identifier fields.
- Scraping compliance gate data structure.

## Result

Bolt 002 is verified green by GitHub Actions.
