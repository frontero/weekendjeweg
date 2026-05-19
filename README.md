# weekendjeweg

AI-DLC/specs.md managed project for a Dutch Landal affiliate site.

This repository is managed through direct GitHub-based work. Project context, standards, intents, bolts, and operations notes live in `memory-bank/`.

## Workflow

This repository uses the specs.md AI-DLC flow:

1. Inception: define the intent, requirements, system context, units, stories, and bolt plan.
2. Construction: execute planned bolts and verify code changes.
3. Operations: build, deploy, verify, monitor, and capture rollback context.

## Current State

- Flow: AI-DLC through specs.md.
- Phase: Construction.
- Approved stack: Nuxt + TypeScript, Supabase, Vercel.
- Active product direction: Landal Netherlands affiliate site with price-only comparison and outbound Landal links.
- Current completed bolt: `001-nuxt-foundation-and-cleanup`.
- Next planned bolt: `002-supabase-data-model`.

## Development

Install dependencies and run the Nuxt app:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
```

## Key Paths

- `.specsmd/manifest.yaml`: specs.md installation metadata.
- `.specsmd/aidlc/`: compact AI-DLC agent and schema definitions.
- `memory-bank/project.yaml`: project state.
- `memory-bank/standards/`: project standards for all future work.
- `memory-bank/intents/`: Inception and planning artifacts.
- `memory-bank/bolts/`: Construction execution records.
- `memory-bank/operations/`: Operations context.
