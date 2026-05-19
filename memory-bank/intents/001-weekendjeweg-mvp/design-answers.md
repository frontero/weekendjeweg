# Design Answers: weekendjeweg MVP

Status: completed
Created: 2026-05-19T12:10:00Z

## Guided Design Answers

1. Route structure: approved as `/`, `/parken`, `/parken/[slug]`, `/regio/[slug]`.
2. Existing Vue/Vite draft code: remove entirely at the first construction step and rebuild with Nuxt.
3. Affiliate research: build placeholder affiliate-link structure now; research later.
4. Outbound click storage and consent: store anonymized/aggregated data without consent, full tracking only with consent.
5. Images: use CSS/placeholder visuals in the first production version; real images later.
6. Daily import runner: user asked for recommendation.
7. Recommended import choice: choose simplest fitting option for Vercel + Supabase.
8. Landal market scope: Netherlands only in the first release.
9. Region SEO pages: later; first release focuses on SEO-proof park pages.
10. GA4 consent: user asked for recommendation.
11. Recommended consent choice: simple banner; GA4 only after accepting.
12. Supabase click tracking when cookies are rejected: store anonymous functional click log without cookie/user ID.
13. Date/period UI: arrival and departure date.
14. Persons filter: adults and children.
15. Facility filters: dynamically derive from Landal data; no fixed first-release list.
16. Scraping fallback: implement in first release if no API/feed exists.
17. Scraping compliance: compliance gate before every real scraper run.
18. If API/feed and scraping are not possible: block project until data access is arranged.
19. Data access blocker: only scraper/import bolt is blocked; frontend may proceed with mock data.
20. Next action: update design and stop at design review.
