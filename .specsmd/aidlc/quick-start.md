# specs.md AI-DLC Quick Start

## Flow

1. Run Master Agent behavior to inspect project state.
2. Use Inception Agent behavior to create an intent.
3. Create requirements, system context, units, stories, and a bolt plan.
4. Use Construction Agent behavior to execute one selected bolt at a time.
5. Use Operations Agent behavior only after construction is complete.

## Commands by Convention

- `/specsmd-master-agent project-init`
- `/specsmd-inception-agent intent-create`
- `/specsmd-inception-agent requirements`
- `/specsmd-inception-agent bolt-plan`
- `/specsmd-construction-agent bolt-list`
- `/specsmd-construction-agent bolt-start`
- `/specsmd-operations-agent deploy`

## Current Next Step

Create the first intent under `memory-bank/intents/` after clarifying the product scope.
