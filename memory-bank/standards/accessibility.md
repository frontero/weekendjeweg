# Accessibility Standard

Status: mandatory-eaa-2025-baseline
Updated: 2026-05-20T15:55:00Z

Accessibility is a hard release requirement for Weekendjeweg. New and modified user-facing code must be designed, implemented, reviewed, and tested against this standard before it can be shipped.

## Compliance Target

- Legal baseline: European Accessibility Act 2025 expectations for consumer-facing digital services in the EU.
- Technical baseline: EN 301 549 for web content, using WCAG 2.1 Level AA success criteria as the minimum baseline.
- Development baseline: WCAG 2.2 Level AA where axe, manual review, and component design can reasonably enforce it.
- Language baseline: Dutch pages use `lang="nl"` and readable Dutch labels.

WCAG 2.2 AA is intentionally stricter than the currently common EN 301 549 v3.2.1 / WCAG 2.1 AA baseline. If a future harmonised EN 301 549 version changes the baseline, this standard must be updated before feature work continues.

## Non-Negotiable UI Rules

- Every page has one meaningful `main` landmark, a reachable skip link, a clear page title, and a logical heading order.
- Interactive controls must use native elements first: `button`, `a`, `input`, `select`, `textarea`, `fieldset`, `legend`, and semantic landmarks.
- Links and buttons with repeated visible text must have a unique accessible name that still contains the visible label text.
- Icon-only controls require an accessible name and a visible focus state.
- Images require useful alt text unless they are purely decorative. Decorative images must be hidden from assistive technology.
- Forms require labels, grouped controls where needed, clear validation text, and no color-only error communication.
- Dynamic result counts, filters, and validation feedback must be announced with appropriate live regions only where the announcement helps.
- Keyboard users must be able to reach, operate, and leave every control without a mouse.
- Focus must never be trapped accidentally. Custom overlays must close with Escape and outside click when appropriate.
- Text and meaningful UI graphics must meet WCAG contrast requirements: 4.5:1 for normal text, 3:1 for large text and UI components.
- Touch targets should be at least 24 by 24 CSS pixels and preferably 44 by 44 CSS pixels for primary controls.
- Do not add accessibility overlay widgets as a substitute for accessible implementation.

## Required Verification

For every UI change:

1. Run `npm run typecheck`.
2. Run `npm run test:unit`.
3. Run `npm run test:accessibility`.
4. Perform a keyboard smoke test on changed flows: Tab, Shift+Tab, Enter, Space, Escape, and visible focus.
5. Review screen-reader names for new controls, especially repeated links and icon buttons.
6. Confirm Lighthouse accessibility stays at 100 where feasible and never below the configured gate.

Axe and Lighthouse are gates, not proof of full legal compliance. Manual keyboard, focus, content, and assistive-technology review remain required.

## Review Checklist

- Can a keyboard-only user complete the flow?
- Does every control expose name, role, value, and state?
- Are labels and visible text consistent with accessible names?
- Are headings, lists, tables, and landmarks semantic?
- Are errors described in text and connected to the affected interaction?
- Are focus order and reading order predictable on desktop and mobile?
- Does the UI remain usable at 200% zoom and narrow mobile widths?
- Are outbound affiliate links clearly labelled and marked as sponsored where applicable?
