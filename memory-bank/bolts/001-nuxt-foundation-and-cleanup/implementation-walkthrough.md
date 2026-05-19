# Implementation Walkthrough: Nuxt Foundation and Cleanup

## Summary

The stale Vue/Vite draft was replaced with a Nuxt + TypeScript foundation using the approved route structure.

## Steps Completed

1. Updated `package.json` to Nuxt scripts and dependencies.
2. Added `nuxt.config.ts` with Dutch metadata, strict TypeScript, global CSS, and Vercel Nitro preset.
3. Added `app/app.vue` with skip link, semantic header/navigation, and `<NuxtPage />`.
4. Added route skeletons for `/`, `/parken`, `/parken/[slug]`, and `/regio/[slug]`.
5. Added accessible baseline CSS with responsive layout and visible focus states.
6. Updated TypeScript and Playwright configuration for Nuxt.
7. Added a Node foundation smoke test.
8. Removed stale Vite/Vue files and stale Vue test setup.
9. Updated README and memory-bank standards to reflect the approved Nuxt stack.

## Design Notes

- The root `div` in Vue files has no styling class.
- Search filters are present as accessible skeleton controls only; real behavior is planned for later units.
- Park detail contains placeholder price wording that avoids availability claims.
- External Landal CTA structure exists, but consent-aware click tracking is reserved for a later unit.

## Known Follow-Up

- Supabase schema and data access are not part of this bolt.
- Real Landal data is not part of this bolt.
- Lighthouse and full E2E verification are later quality-gate work.
