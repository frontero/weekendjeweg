# Tasks: weekendjeweg MVP

Status: draft-awaiting-review
Created: 2026-05-19T11:25:00Z

## Process Correction

Construction started too early. The existing foundation code is treated as a pre-approval draft. The project must return to spec review before additional implementation.

## Task Plan

### Phase 0: Spec Review Gate

- [ ] Review `requirements.md`.
- [ ] Review `system-context.md`.
- [ ] Review `design.md`.
- [ ] Review `units.md`.
- [ ] Review `tasks.md`.
- [ ] Decide open design questions.
- [ ] Approve or revise construction bolts.

### Phase 1: Bolt 001 - Application Foundation

Status: draft implementation exists, pending approval.

- [ ] Decide whether to keep, revise, or replace the existing foundation draft.
- [ ] Verify package choices and dependency versions.
- [ ] Run install/typecheck/unit/build/e2e verification when local or CI execution is allowed.
- [ ] Apply any review feedback.
- [ ] Mark Bolt 001 complete only after approval and verification path is clear.

### Phase 2: Bolt 002 - Stay Catalog

Blocked until Phase 0 and Bolt 001 approval.

- [ ] Define reusable `Stay` type in `src/types/`.
- [ ] Add seeded stays with Dutch content.
- [ ] Add catalog helper functions.
- [ ] Test helper behavior and data coverage.

### Phase 3: Bolt 003 - Discovery Experience

Blocked until Bolt 002.

- [ ] Build stay card list.
- [ ] Build search input and filter controls.
- [ ] Build empty state and reset behavior.
- [ ] Build stay detail route and not-found state.
- [ ] Add tests for browse, filter, and detail flow.

### Phase 4: Bolt 004 - Favorites and Outbound

Blocked until Bolt 003.

- [ ] Add favorite store/composable.
- [ ] Add accessible favorite controls.
- [ ] Add favorites route content and empty state.
- [ ] Add external booking CTA and missing URL fallback.
- [ ] Add tests for favorite and CTA behavior.

### Phase 5: Operations Readiness

Blocked until all construction bolts are complete.

- [ ] Confirm build and test status.
- [ ] Decide deployment target.
- [ ] Create deployment verification checklist.
- [ ] Create rollback notes.

## Approval Rules

- No new production implementation should start until Phase 0 is approved.
- Bolt 001 can be kept as draft code, but it is not considered completed until reviewed.
- Each following bolt requires a checkpoint before the next bolt starts.
