# Clarifying Answers: weekendjeweg MVP

Status: completed
Created: 2026-05-19T11:40:00Z

## Guided Answers

1. Product type: affiliate site with external links.
2. Primary user: consumer looking for a weekend away.
3. MVP flow: search/filter -> results -> accommodation detail -> external booking link.
4. Booking/payment: no booking/payment in MVP, only external affiliate link.
5. Data source: API-first; if no API/feed is available, use scraping as fallback.
6. Affiliate target: create affiliate links for Landal.
7. Stack: Nuxt + TypeScript.
8. Accessibility: extended baseline with keyboard, labels, focus states, contrast, screenreader flow, reduced motion, and skip links.
9. Language/branding: Dutch only, warm holiday/inspiration style.
10. Out of scope: payments and real booking.
11. Success criterion: production-ready affiliate site.
12. Landal affiliate status: not arranged yet.
13. Until affiliate is arranged: prepare placeholder tracking structure and fill real affiliate parameters later.
14. Initial offering: all Landal parks that are technically available.
15. Required filters: region, date/period, number of persons, and facilities.
16. Data freshness: daily refresh is enough.
17. Price/availability display: show price only, no availability claim.
18. Date/period usage: use date/period to fetch/refresh price, without showing availability.
19. Data import: daily scheduled job with database.
20. Backend/database: Supabase.
21. Hosting/deploy: Vercel.
22. Scraping/legal: scraping fallback may be used only while respecting robots.txt/terms and applying rate limiting.
23. Admin/CMS: later, not in first production version.
24. Content pages: park search, park detail, and home.
25. SEO: strong SEO with basics, region/park landing pages, and structured data.
26. Analytics: Google Analytics 4 with consent banner.
27. Affiliate click tracking: store each outbound click in Supabase.
28. Quality target: Lighthouse 90+ for Performance, Accessibility, and SEO on important pages.
29. Next action: generate requirements now and stop at review.
