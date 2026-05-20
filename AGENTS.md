# AGENTS.md

This repository uses specs.md with the AI-DLC flow.

## Required Context

Before planning or changing code, read:

1. `memory-bank/project.yaml`
2. `memory-bank/standards/tech-stack.md`
3. `memory-bank/standards/coding-standards.md`
4. `memory-bank/standards/accessibility.md`
5. `memory-bank/standards/system-architecture.md`
6. The active intent, unit, story, and bolt artifacts when they exist.

## Workflow

Use the AI-DLC sequence:

1. Inception: clarify intent, requirements, context, units, stories, and bolt plan.
2. Construction: implement only planned bolts.
3. Operations: build, deploy, verify, monitor, and document rollback.

Do not start production implementation before an intent and bolt plan exist.

## Standards

Follow `memory-bank/standards/coding-standards.md` strictly. For Vue and TypeScript work, the standards in that file override generic preferences.

Accessibility is a hard EAA 2025 release requirement. New and modified user-facing code must follow `memory-bank/standards/accessibility.md`, with EN 301 549, WCAG 2.1 Level AA, and WCAG 2.2 Level AA as the enforced development baseline. Do not consider UI work complete until `npm run test:accessibility` is green and the changed flow has had a keyboard/focus review.
