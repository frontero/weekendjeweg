# AGENTS.md

This repository uses specs.md with the AI-DLC flow.

## Required Context

Before planning or changing code, read:

1. `memory-bank/project.yaml`
2. `memory-bank/standards/tech-stack.md`
3. `memory-bank/standards/coding-standards.md`
4. `memory-bank/standards/system-architecture.md`
5. The active intent, unit, story, and bolt artifacts when they exist.

## Workflow

Use the AI-DLC sequence:

1. Inception: clarify intent, requirements, context, units, stories, and bolt plan.
2. Construction: implement only planned bolts.
3. Operations: build, deploy, verify, monitor, and document rollback.

Do not start production implementation before an intent and bolt plan exist.

## Standards

Follow `memory-bank/standards/coding-standards.md` strictly. For Vue and TypeScript work, the standards in that file override generic preferences.
