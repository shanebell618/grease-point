# Parts Inventory — breadcrumb

Not built yet.

## Data model

Uncomment `Part` and `PartUsage` at the bottom of
[`prisma/schema.prisma`](../../../prisma/schema.prisma). `Part` covers
filters/search/categories from the outline (`sku`, `name`, `quantityOnHand`,
`reorderThreshold`, `unitCost`); `PartUsage` is the join table linking a part
to the equipment (and optionally the maintenance record) it was used on.

## Suggested first slice

Same shape as Equipment/Maintenance — see
[`readme/dev/architecture.md`](../../../readme/dev/architecture.md) for the
full layering explanation:

- Backend: `src/server/schemas/inventory/`, `dataAccess/PartDao.ts`,
  `useCases/inventory/`, `actions/inventory/` (mutations only), each with
  a co-located `__test__/`.
- `src/app/api/parts/route.ts` + `[id]/route.ts`.
- `src/verticals/inventory/{types,api,queryKeys,hooks}.ts`.
- `src/verticals/inventory/components/PartsTable/index.tsx` + a `SearchBox`
  component (`src/common/components/SearchBox/index.tsx`) — both named
  explicitly in the original outline as components worth a Storybook page.
- Filtering/sorting by category and low-stock (`quantityOnHand <=
reorderThreshold`) is the interesting pure-function logic — good Vitest
  target, same pattern as `filterEquipmentByStatus`.
- `src/verticals/inventory/pages/InventoryListPageView/index.tsx` replaces
  the current `FeaturePlaceholder` stub rendered by `src/app/inventory/page.tsx`.

## Later

A "low stock" indicator here is a natural dashboard widget once
`src/app/dashboard/page.tsx` becomes real.
