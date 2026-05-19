# Unit 005: Affiliate Consent Tracking

Status: completed-pending-ci
Updated: 2026-05-19T14:25:00Z

## Purpose

Create placeholder Landal affiliate links, outbound click logging, consent handling, and GA4 loading that respects user consent.

## Stories

1. Affiliate Link Templates - completed pending CI
2. Consent-Aware Click Tracking - completed pending CI
3. GA4 Consent Banner - completed pending CI

## Acceptance Criteria

- Affiliate URLs can be generated from placeholder templates and later extended with real network parameters. Completed pending CI.
- Outbound clicks are stored in Supabase before redirect where possible. Completed pending CI.
- Redirect to Landal continues even if non-blocking click logging fails. Completed pending CI.
- GA4 loads only after analytics consent is accepted. Completed pending CI.
- Cookie rejection still allows anonymous functional click logging without cookie or user ID. Completed pending CI.

## Out of Scope

- Final Landal affiliate-network integration details until account/network access is known.
- Personalized tracking before consent.
- Payment or booking conversion events inside Weekendjeweg.

## Risks

- Supabase persistence depends on server-side runtime config.
- Final affiliate-network parameters still need account/network details.
