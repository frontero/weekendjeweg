# System Context: weekendjeweg MVP

Status: draft-awaiting-design-review
Created: 2026-05-19T10:45:00Z
Updated: 2026-05-19T11:55:00Z

## Purpose

`weekendjeweg` is a Dutch production affiliate website focused on Landal parks.

It helps consumers search and filter Landal parks, inspect park detail pages, view price information for a selected period, and continue to Landal through prepared affiliate links. Booking and payment happen outside the system.

## Actors

| Actor | Description | Goal |
| --- | --- | --- |
| Visitor | Dutch consumer looking for a weekend away | Find a suitable Landal park and continue to Landal |
| Landal | External destination and source of park/price data where technically available | Receive qualified outbound visitors |
| Affiliate network | Future tracking provider, not arranged yet | Attribute outbound clicks/conversions |
| Scheduled import job | Automated daily data refresh process | Keep park and price data fresh enough |
| Site operator | Maintainer of import settings, content quality, SEO, and compliance | Keep the affiliate site accurate and performant |

## System Boundary

Inside the MVP:

- Nuxt + TypeScript website.
- Home page.
- Park search with filters for region, date/period, number of persons, and facilities.
- Park detail pages.
- Region/park SEO landing page behavior where supported by data.
- Supabase database for normalized park, facility, region, price, import run, consent-relevant click tracking, and outbound click events.
- Daily scheduled data import.
- API-first ingestion, scraping fallback only when permitted.
- Placeholder affiliate link structure until affiliate account/network is arranged.
- GA4 with consent banner.
- Lighthouse-oriented production quality checks.

Outside the MVP:

- Booking and payment.
- User accounts.
- Admin/CMS UI.
- Accommodation owner dashboard.
- Live affiliate conversion reconciliation.
- Manual content editing workflow.

## Data Concepts

### Park

A Landal park shown in search, detail, and SEO pages.

Core fields:

- `id`
- `slug`
- `name`
- `locationName`
- `regionId`
- `countryCode`
- `description`
- `facilities`
- `highlights`
- `imageReferences`
- `sourceUrl`
- `landalParkCode`
- `lastImportedAt`

### Region

A navigable/searchable grouping for parks and SEO landing pages.

Core fields:

- `id`
- `slug`
- `name`
- `countryCode`
- `seoTitle`
- `seoDescription`

### Facility

Filterable park feature.

Core fields:

- `id`
- `slug`
- `name`

### Price Snapshot

Price information for a park, selected date/period, and party size. It must not be presented as availability.

Core fields:

- `id`
- `parkId`
- `startDate`
- `endDate`
- `guestCount`
- `currency`
- `priceAmount`
- `priceLabel`
- `sourceCapturedAt`
- `expiresAt`

### Affiliate Link Template

Prepared outbound URL structure before live affiliate parameters are known.

Core fields:

- `id`
- `parkId`
- `baseUrl`
- `trackingTemplate`
- `status`

### Outbound Click

A recorded visitor click to Landal.

Core fields:

- `id`
- `parkId`
- `destinationUrlKey`
- `pagePath`
- `clickedAt`
- `consentState`
- `utmContext`

### Import Run

A daily ingestion attempt.

Core fields:

- `id`
- `sourceType`
- `startedAt`
- `completedAt`
- `status`
- `message`
- `recordsImported`

## Technical Context

- Frontend/runtime: Nuxt + TypeScript.
- Database: Supabase.
- Hosting/deployment: Vercel.
- Data refresh: daily scheduled job.
- Analytics: GA4 with consent banner.
- Quality target: Lighthouse 90+ for Performance, Accessibility, and SEO on important pages.

## Compliance Context

- API/feed is preferred over scraping.
- Scraping fallback requires checking robots.txt, terms, affiliate/network rules, and rate limiting.
- Price display must not imply guaranteed availability.
- GA4 and click tracking must respect consent requirements.

## Risks

- Landal API/feed availability is unknown.
- Affiliate account/network is not arranged yet.
- Scraping may be disallowed or fragile.
- Price data can become stale or misleading if freshness is not visible.
- Existing Vue/Vite draft code does not match the approved Nuxt stack.
- Strong SEO goals may require more content modeling than the first MVP initially suggests.
