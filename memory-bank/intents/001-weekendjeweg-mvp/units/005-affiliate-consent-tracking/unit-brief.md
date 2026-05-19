# Unit 005: Affiliate Consent Tracking

Status: planned-awaiting-checkpoint-4-review
Updated: 2026-05-19T12:56:57Z

## Purpose

Create placeholder Landal affiliate links, outbound click logging, consent handling, and GA4 loading that respects user consent.

## Stories

1. Affiliate Link Templates
2. Consent-Aware Click Tracking
3. GA4 Consent Banner

## Acceptance Criteria

- Affiliate URLs can be generated from placeholder templates and later extended with real network parameters.
- Outbound clicks are stored in Supabase before redirect where possible.
- Redirect to Landal continues even if non-blocking click logging fails.
- GA4 loads only after analytics consent is accepted.
- Cookie rejection still allows anonymous functional click logging without cookie or user ID.

## Out of Scope

- Final Landal affiliate-network integration details until account/network access is known.
- Personalized tracking before consent.
- Payment or booking conversion events inside Weekendjeweg.

## Risks

- Tracking implementation must not accidentally load analytics before consent.
- Affiliate placeholder structure should be flexible enough for future network parameters.
