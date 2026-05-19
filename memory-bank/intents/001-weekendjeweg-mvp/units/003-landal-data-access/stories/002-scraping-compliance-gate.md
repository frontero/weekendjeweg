# Story: Scraping Compliance Gate

Status: completed-real-run-blocked
Unit: 003-landal-data-access

## User Value

As the project owner, I want scraping to be controlled and compliant so the project does not run a real scraper before checks are approved.

## Acceptance Criteria

- Compliance review records include target domain, robots check, terms check, terms permission for commercial use, rate limit policy, approval state, approval timestamp, and notes.
- Real scraper execution checks the compliance gate before any Landal request.
- The default state blocks real scraping.
- Tests verify blocked and approved behavior.

## Result

The compliance gate now requires `termsPermitCommercialUse === true`. Landal's public terms currently block commercial site use unless written permission is obtained, so real scraping remains blocked by default.

## Notes

Scraping may be implemented as fallback code with fixtures, but it must not run against real Landal pages before written permission and compliance approval are recorded.
