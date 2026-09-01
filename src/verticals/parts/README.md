# Parts

Fully built: schema, DAOs, use cases, actions, and API routes on the
backend; a searchable parts list with add/edit/delete dialogs on the
frontend; and the parts-used section on `MaintenanceForm` tying the two
together.

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
- Frontend: `src/verticals/parts/{types,api,queryKeys,hooks}.ts`, the
  shared `components/PartForm/`, and
  `pages/PartsListPageView/` — a searchable `DataGridTable` with
  add/edit/delete dialogs (`AddPartDialog`, `EditPartDialog`,
  `DeletePartButton`), rendered by `src/app/parts/page.tsx`.
- The parts-used section on `MaintenanceForm`
  (`src/verticals/maintenance/components/MaintenanceForm/components/PartsUsedFields/`) —
  shown only when status is `COMPLETE`, a searchable part `Autocomplete` +
  quantity per row via `useFieldArray`, with an "Add part" control for
  more than one. Submits as the `partsUsed` array
  `createMaintenanceInputSchema` already accepts, and
  `getMaintenanceByIdUseCase` reads it back out so the edit dialog can
  pre-fill what's already recorded on a job.
- `prisma/seeds/sampleParts.ts` — sample stock, including a few parts at
  or below their `reorderThreshold` so the "Low stock" indicator has
  something real to show.

## Later

A "low stock" indicator (`quantityOnHand <= reorderThreshold`) is a
natural dashboard widget once `src/app/dashboard/page.tsx` becomes real.
