# Implementation Walkthrough: Affiliate Consent Tracking

Status: completed-pending-ci
Updated: 2026-05-19T14:25:00Z

## Affiliate URLs

`shared/domain/affiliateLinks.ts` builds outbound Landal URLs from the park record and affiliate template. Placeholder Weekendjeweg parameters are added separately from future network-specific tracking templates.

## Consent

`app/components/ConsentBanner.vue` gives visitors explicit analytics accept and reject actions. `app/composables/useConsentState.ts` stores the consent choice and only injects the GA4 script after analytics acceptance.

## Outbound Clicks

`app/composables/useOutboundClickTracking.ts` sends click payloads with `sendBeacon` where available and falls back to `fetch` with `keepalive`. The detail CTA keeps navigating even if click logging fails.

`server/api/outbound-click.post.ts` validates the payload, creates consent-aware click records, filters anonymous identifier keys for rejected or unknown consent, and writes to Supabase REST only when server-side Supabase config is present.

## Tests

`tests/affiliateLinks.test.ts` covers placeholder URL generation, consent scope decisions, anonymous identifier filtering, and full-consent click scope.
