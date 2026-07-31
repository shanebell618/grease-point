# Parts Inventory — breadcrumb

Not built yet.

## Data model

Uncomment `Part` and `PartUsage` at the bottom of
[`prisma/schema.prisma`](../../../prisma/schema.prisma). `Part` covers
filters/search/categories from the outline (`sku`, `name`, `quantityOnHand`,
`reorderThreshold`, `unitCost`); `PartUsage` is the join table linking a part
to the equipment (and optionally the maintenance record) it was used on.

## Suggested first slice

Same shape as Equipment/Maintenance:

- `src/app/api/parts/route.ts` + `[id]/route.ts`.
- `src/features/inventory/{schema,types,api,queryKeys,hooks}.ts`.
- `src/features/inventory/components/PartsTable.tsx` + a `SearchBox`
  component (`src/components/SearchBox/`) — both named explicitly in the
  original outline as components worth a Storybook page.
- Filtering/sorting by category and low-stock (`quantityOnHand <=
reorderThreshold`) is the interesting pure-function logic — good Vitest
  target, same pattern as `filterEquipmentByStatus`.
- `src/app/inventory/page.tsx` replaces the current `FeaturePlaceholder` stub.

## Later

A "low stock" indicator here is a natural dashboard widget once
`src/app/dashboard/page.tsx` becomes real.
