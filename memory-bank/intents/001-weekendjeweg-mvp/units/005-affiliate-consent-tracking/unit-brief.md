# Unit 005: Affiliate Consent Tracking

Status: completed-and-ci-verified
Updated: 2026-05-19T14:31:10Z

## Purpose

Create placeholder Landal affiliate links, outbound click logging, consent handling, and GA4 loading that respects user consent.

## Stories

1. Affiliate Link Templates - completed
2. Consent-Aware Click Tracking - completed
3. GA4 Consent Banner - completed

## Acceptance Criteria

- Affiliate URLs can be generated from placeholder templates and later extended with real network parameters. Completed.
- Outbound clicks are stored in Supabase before redirect where possible. Completed.
- Redirect to Landal continues even if non-blocking click logging fails. Completed.
- GA4 loads only after analytics consent is accepted. Completed.
- Cookie rejection still allows anonymous functional click logging without cookie or user ID. Completed.

## Verification

GitHub Actions run https://github.com/frontero/weekendjeweg/actions/runs/26103869775 passed.

## Out of Scope

- Final Landal affiliate-network integration details until account/network access is known.
- Personalized tracking before consent.
- Payment or booking conversion events inside Weekendjeweg.

## Risks

- Supabase persistence depends on server-side runtime config.
- Final affiliate-network parameters still need account/network details.
