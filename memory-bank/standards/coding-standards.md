# Coding Standards

These standards are mandatory for new and modified code.

## Strict Comparisons

- Always use explicit comparisons: `=== null`, `=== undefined`, `=== false`.
- Never use `!variable` for null or undefined checks.
- Never use `!booleanExpression`; use `booleanExpression === false`.
- Example: use `datesSet.has(shiftDate) === false`, not `!datesSet.has(shiftDate)`.

## Early Return Pattern

- Avoid `else` and `else if`.
- Use early returns to control flow.

```ts
if (condition === true) {
  doSomething()
  return
}

doSomethingElse()
```

## If Statement Syntax

- Always use braces, including one-liners.
- Put every statement on its own line.

```ts
if (value === null) {
  return fallback
}
```

## Vue Template Attribute Order

Use this order:

1. Directives: `v-if`, `v-else`, `v-for`, `v-show`.
2. Unique attributes: `:key`, `ref`.
3. Dynamic attributes: `:class`, `:aria-label`, `:prop`.
4. Static attributes: `class`, `role`, `type`, `href`.
5. Events: `@click`, `@keydown`.

## Multi-Line Component Props

Use one prop per line.

```vue
<Component
  :prop="value"
/>
```

## No Inline Template Logic

Move complex logic to computed values or methods for testability and coverage.

```vue
:ref="(el) => setMenuItemRef(el, index)"
```

## Dynamic and Static Classes

Separate dynamic and static classes.

```vue
<i
  :class="option.icon"
  class="fa fa-fw"
/>
```

## Types and Interfaces

- Do not define reusable interfaces or types inline in components.
- Put reusable shared types in `shared/types/` or `app/types/`.
- Use `declare interface` for globally available types when appropriate.
- Give new local variables and loop variables explicit, meaningful types where practical.
- Prefer descriptive names such as `workplaceId` over abbreviations such as `wpId`.

## Vue Props Declaration

Props declaratie (Vue + TypeScript)
In `*.vue` bestanden met `<script setup lang="ts">` declareren we props type-based.
Als er defaults zijn, gebruiken we altijd:

```ts
const props = withDefaults(defineProps<{
  // props
}>(), {
  // defaults
})
```

De runtime-objectstijl (`defineProps({ ... })`) gebruiken we niet in nieuwe of aangepaste code.

Zonder defaults:

```ts
const props = defineProps<{
  // props
}>()
```

## Composables

- Move reusable logic to `app/composables/` for Nuxt application code.
- Shared framework-neutral helpers can live in `shared/`.
- Composable names start with `use`, for example `useShiftModal` or `useUniqueId`.

## CSS Over JavaScript

- Prefer CSS selectors such as `:nth-child` and `:last-child` for styling logic.
- Avoid inline `style="..."` attributes.

## Component Section Order

Use these script sections in this order:

```ts
// Definitions
const props = defineProps<{}>()
const emit = defineEmits<{}>()

// Stores
const rosterStore = useRosterStore()

// Computed
const data = computed(() => {})

// Functions
const handleClick = () => {}

// Lifecycle
onMounted(() => {})
```

## Function Size

- Keep functions to 25 lines or fewer.
- Split large functions into smaller focused functions.

## GraphQL

- Avoid redundant fields.
- If `entity { id name }` exists, do not separately request `entityId` unless required by the API.
- Use nested objects for property access.

## DRY and IDs

- Avoid repeated logic.
- Use shared base IDs for related elements, such as a toggle and its menu.

## Accessibility

- Accessibility is a hard EAA 2025 requirement for every user-facing change.
- Follow `memory-bank/standards/accessibility.md` before changing UI.
- EN 301 549 and WCAG 2.1 Level AA are the minimum baseline.
- WCAG 2.2 Level AA is the development baseline for new and modified components.
- Run `npm run test:accessibility` before marking UI work complete.
- Keep accessibility in scope for every UI change.
- Use semantic markup and ARIA only where it improves actual assistive technology behavior.
- Ensure keyboard navigation, focus management, labels, accessible names, contrast, and visible state are covered.
- Repeated links or buttons must have unique accessible names that include their visible label text.
- Do not add accessibility overlay widgets as a substitute for accessible implementation.

## Vue Root Element

The root div in a `.vue` file must not contain styling classes. Add styling classes where the component is rendered unless there is a documented exception.

## Boolean Toggles

Do not invert booleans with `!`.

```ts
rosterStore.quickRosterOpen = rosterStore.quickRosterOpen === false
```

## Specs

- Do not use relative import paths in `.spec.js` files.
