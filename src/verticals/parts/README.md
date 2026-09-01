# Parts — breadcrumb

Backend done — schema, DAOs, use cases, actions, and API routes are all
built and tested. The frontend (a searchable parts table, plus the
parts-used section on the maintenance form) is what's left.

## Data model

`Part` — `sku`, `name`, `quantityOnHand`, `reorderThreshold`, `unitCost`.

`PartUsage` — a join table linking a `Part` to the `MaintenanceRecord` it
was used on (`quantityUsed`). Deliberately has no `equipmentId` of its
own — every `MaintenanceRecord` already has one, so carrying a second
copy here would just be a second value that could drift out of sync
with the first.

Completing a maintenance record (or editing an already-completed one's
parts list) automatically adjusts `Part.quantityOnHand` to match —
see [`reconcilePartUsageUseCase`](../../server/useCases/maintenance/reconcilePartUsageUseCase.ts)
for the reconciliation logic, and
[`createMaintenanceUseCase`](../../server/useCases/maintenance/createMaintenanceUseCase.ts)/
[`updateMaintenanceUseCase`](../../server/useCases/maintenance/updateMaintenanceUseCase.ts)/
[`deleteMaintenanceUseCase`](../../server/useCases/maintenance/deleteMaintenanceUseCase.ts)
for where it's called from, each wrapped in
[`withTransaction`](../../lib/prisma/index.ts) so the stock adjustment
and the maintenance-record write always succeed or fail together.

## What's built

- Backend: `src/server/schemas/parts/`, `src/server/dataAccess/PartDao.ts`
  and `PartUsageDao.ts`, `src/server/useCases/parts/`,
  `src/server/actions/parts/` (mutations only — reads call the use case
  directly), each with a co-located `__test__/`.
- `src/app/api/parts/route.ts` and `[id]/route.ts`.

## What's left — suggested first slice

Same shape as Equipment/Maintenance's frontend — see
[`readme/dev/architecture.md`](../../../readme/dev/architecture.md) for the
full layering explanation:

- `src/verticals/parts/{types,api,queryKeys,hooks}.ts`.
- `src/verticals/parts/pages/PartsListPageView/index.tsx` — a searchable
  `DataGridTable` (same component the equipment-detail history table
  uses), replacing the `FeaturePlaceholder` stub `src/app/parts/page.tsx`
  currently renders.
- A parts-used section on `MaintenanceForm`, shown only when status is
  `COMPLETE`: a searchable part picker + quantity, with an "add another
  part" control for more than one. Submits as the `partsUsed` array
  `createMaintenanceInputSchema` already accepts.

## Later

A "low stock" indicator (`quantityOnHand <= reorderThreshold`) is a
natural dashboard widget once `src/app/dashboard/page.tsx` becomes real.
