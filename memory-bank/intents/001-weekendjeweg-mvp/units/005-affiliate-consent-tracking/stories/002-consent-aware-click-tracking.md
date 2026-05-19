# Story: Consent-Aware Click Tracking

Status: planned
Unit: 005-affiliate-consent-tracking

## User Value

As the project owner, I want outbound clicks measured while respecting consent choices.

## Acceptance Criteria

- Outbound clicks are logged in Supabase before redirect where possible.
- Redirect continues if non-blocking logging fails.
- Rejected or missing analytics consent stores anonymous functional click logs only.
- Accepted analytics consent may store full allowed tracking context.
- Click logs include page path, destination key, consent state, tracking scope, and click timestamp.

## Notes

No cookie ID or user ID is stored for anonymous functional tracking.
