# Requirements: weekendjeweg MVP

Status: checkpoint-2-requirements-review
Created: 2026-05-19T10:30:00Z
Updated: 2026-05-19T11:40:00Z
Phase: Inception

## Intent

Build `weekendjeweg` as a production-ready Dutch affiliate website for Landal stays.

The site helps consumers search and filter Landal parks, inspect park details, see price information for a selected period, and continue to Landal through prepared affiliate links. Booking and payment happen outside this product.

## Clarifying Answers Source

The requirements below are generated from the guided question flow recorded in:

`memory-bank/intents/001-weekendjeweg-mvp/clarifying-answers.md`

## Scope Summary

In scope for the first production version:

- Dutch-only affiliate website.
- Nuxt + TypeScript application.
- Supabase database.
- Vercel deployment.
- Landal-focused park search and park detail pages.
- Home page.
- API-first data ingestion, scraping fallback when permitted.
- Daily data refresh.
- Price display for selected period, without claiming availability.
- Placeholder affiliate tracking structure until the Landal affiliate account/network is arranged.
- Google Analytics 4 with consent banner.
- Outbound affiliate click tracking stored in Supabase.
- Strong SEO, including structured data and region/park landing pages where appropriate.
- Lighthouse 90+ target for Performance, Accessibility, and SEO on important pages.

Out of scope for the first production version:

- Payment flow.
- Real booking inside the site.
- Admin/CMS interface.
- User accounts.
- Accommodation owner dashboard.

## Functional Requirements

### FR-001: Home Page

The system shall provide a Dutch home page that introduces the Weekendjeweg affiliate experience and routes visitors into park search.

Acceptance criteria:

- When a visitor opens the home page, the visitor shall understand that the site helps find Landal weekend stays.
- When a visitor wants to start searching, the visitor shall have a clear route to the park search experience.
- When the home page is indexed, the page shall provide a meaningful title, meta description, and crawlable content.

### FR-002: Park Search

The system shall provide a searchable and filterable park search experience for technically available Landal parks.

Acceptance criteria:

- When park data exists, the visitor shall see a list of matching parks.
- When the visitor selects a region, the results shall be filtered by region.
- When the visitor selects a date or period, the results shall use that date/period to fetch or refresh price information where technically possible.
- When the visitor selects number of persons, the results shall use that value in price retrieval or affiliate-link construction where technically possible.
- When the visitor selects facilities, the results shall be filtered by matching facilities.
- When no results match, the system shall show a clear empty state and a way to reset filters.

### FR-003: Park Detail

The system shall provide a detail page for each Landal park.

Acceptance criteria:

- When a visitor opens a park detail page, the system shall show the park name, region/location, description, facilities, relevant highlights, price information where available, and a clear CTA to continue to Landal.
- When price is unavailable, the system shall show a safe fallback instead of a misleading price.
- When availability data is unavailable or unreliable, the system shall not claim availability.
- When a park slug or ID is unknown, the system shall show a useful not-found state.

### FR-004: Price Display

The system shall show price information only, without presenting availability claims.

Acceptance criteria:

- When price data is available for a selected date/period and party size, the system shall show that price with enough context to avoid ambiguity.
- When price data is stale, unavailable, or failed to refresh, the system shall show a fallback state.
- When a date/period changes, the system shall be able to trigger price refresh logic through the daily import or selected runtime strategy defined later in design.

### FR-005: Landal Affiliate Link Preparation

The system shall prepare outbound link generation for Landal affiliate tracking.

Acceptance criteria:

- When the affiliate account/network is not arranged yet, the system shall support placeholder tracking structure without pretending live affiliate tracking is active.
- When affiliate parameters become available, the system shall be able to generate Landal outbound URLs with those parameters.
- When the visitor clicks an outbound CTA, the system shall make clear that booking continues at Landal.

### FR-006: Outbound Click Tracking

The system shall store each outbound affiliate click in Supabase.

Acceptance criteria:

- When a visitor clicks a Landal outbound CTA, the system shall create a click event record in Supabase.
- The click event shall include enough context for reporting, such as park identifier, destination URL or link key, timestamp, and page context.
- The click tracking shall respect consent and privacy requirements defined during design.
- When click tracking fails, the visitor shall still be able to continue to Landal unless compliance requirements prohibit it.

### FR-007: Data Ingestion

The system shall ingest Landal park and price data through an API-first process, with scraping as a controlled fallback.

Acceptance criteria:

- When an official or affiliate-approved API/feed is available, the system shall use it before scraping.
- When no suitable API/feed is available, scraping may be used only if robots.txt, terms, affiliate/network rules, and rate limits are respected.
- When data is imported, the system shall store normalized park, facility, region, and price records in Supabase.
- When the scheduled import runs, the system shall refresh data daily.
- When an import fails, the system shall preserve the last known safe data and record the failure for review.

### FR-008: SEO

The system shall support strong SEO for the first production release.

Acceptance criteria:

- Each important page shall have a relevant title and meta description.
- The system shall generate or expose sitemap and robots.txt behavior.
- Park pages shall be crawlable where appropriate.
- Region and park landing pages shall be planned for SEO where the data model supports them.
- Structured data shall be added where it accurately represents page content.
- SEO implementation shall avoid misleading price or availability claims.

### FR-009: Analytics and Consent

The system shall use Google Analytics 4 with a consent banner.

Acceptance criteria:

- When a visitor first arrives, analytics behavior shall respect consent requirements.
- When consent is denied, GA4 shall not run in a way that violates the chosen consent model.
- When consent is granted, GA4 shall capture relevant product events.
- The consent implementation shall be accessible by keyboard and screen reader users.

### FR-010: Accessibility

The system shall meet an extended accessibility baseline from day one.

Acceptance criteria:

- All interactive controls shall be keyboard operable.
- All controls shall have accessible names.
- Focus states shall be visible.
- Page structure shall use semantic landmarks and headings.
- Screen reader flow shall be considered for search, filters, result updates, consent banner, and outbound CTAs.
- Reduced motion preferences shall be respected.
- Color contrast shall meet expected accessibility standards.

### FR-011: Production Quality

The system shall target production readiness rather than only a prototype.

Acceptance criteria:

- Important pages shall target Lighthouse scores of 90+ for Performance, Accessibility, and SEO.
- Core flows shall be covered by automated tests.
- The daily data refresh path shall be observable enough to identify failures.
- Deployment shall be planned for Vercel.
- Database needs shall be planned for Supabase.

## Non-Functional Requirements

- The application shall be implemented with Nuxt and TypeScript unless requirements review changes that decision.
- The database shall be Supabase unless requirements review changes that decision.
- The first deployment target shall be Vercel.
- The UI shall be Dutch-only with a warm holiday/inspiration style.
- The implementation shall follow `memory-bank/standards/coding-standards.md`.
- Scraping shall not be implemented without an explicit compliance check in design.
- The product shall avoid false or misleading availability claims.

## Open Questions for Requirements Review

1. Are these requirements correct for the first production release?
2. Should the existing Vue/Vite draft foundation be removed because the selected stack is Nuxt + TypeScript?
3. Should affiliate-network research be added as a blocking requirement before any outbound link implementation?
4. What consent/privacy standard should govern GA4 and Supabase click tracking?
5. Which exact Landal domains/markets are in scope for "all technically available parks"?

## Review Gate

Stop here for requirements review.

Do not regenerate design, units, tasks, or construction bolts until the requirements are approved or revised.
