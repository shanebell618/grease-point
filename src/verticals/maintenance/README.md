# Maintenance — breadcrumb

Not built yet. This is the second flow worth building, since it's the next
most central entity after Equipment and reuses every pattern from
`src/verticals/equipment/` almost exactly.

## Data model

Uncomment `MaintenanceRecord` at the bottom of [`prisma/schema.prisma`](../../../prisma/schema.prisma),
add the `equipmentId` relation field + `@relation` back to `Equipment`, then
run `npx prisma migrate dev --name add_maintenance_record`.

Fields already sketched: `equipmentId`, `performedAt`, `description`, `cost`,
`nextDueHours`, `nextDueDate`, `createdAt`. This is enough to cover the
outline's oil changes / tire replacements / hydraulic service / completed
work / due dates.

## Suggested first slice

Mirror the Equipment flow file-for-file — see
[`readme/dev/architecture.md`](../../../readme/dev/architecture.md) for the
full explanation of this layering if any of it is unfamiliar:

**Backend** (`src/server/`):

- `schemas/maintenance/createMaintenanceInputSchema.ts` — zod schema
- `dataAccess/MaintenanceDao.ts` — raw Prisma queries only
- `useCases/maintenance/{createMaintenanceUseCase,updateMaintenanceUseCase,deleteMaintenanceUseCase,findAllMaintenanceUseCase,getMaintenanceByIdUseCase}.ts`
- `actions/maintenance/{createMaintenanceAction,updateMaintenanceAction,deleteMaintenanceAction}.ts` —
  reads (`findAll`/`getById`) don't get actions, same as Equipment; they're
  called directly from the route.
- Each of the above gets a co-located `__test__/` — see
  [`readme/dev/running-tests.md`](../../../readme/dev/running-tests.md).

**API routes** (`src/app/api/maintenance/route.ts` + `[id]/route.ts`) —
same GET/POST/PATCH/DELETE shape as `src/app/api/equipment/route.ts`, but
scope list queries with `?equipmentId=` so a machine's detail page can
show its own history.

**Frontend** (`src/verticals/maintenance/`):

- `api.ts`, `types.ts`, `queryKeys.ts`, `hooks.ts` — copy
  `src/verticals/equipment/`'s versions and adjust fields.
- `components/MaintenanceTable/index.tsx` — the "Maintenance Table"
  reusable component from the original outline; a co-located
  `MaintenanceTable.stories.tsx` is an easy win once it exists.
- `pages/MaintenanceListPageView/index.tsx` — replaces the current
  `FeaturePlaceholder` stub rendered by `src/app/maintenance/page.tsx`.

A `MaintenanceHistory` section embedded in
`src/verticals/equipment/pages/EquipmentPageView/components/EquipmentDetail/`
is a natural integration point — that's how "recent repairs" ends up on
the equipment detail page and eventually the dashboard.

## Due-date logic

`nextDueDate`/`nextDueHours` calculations (e.g. "due in 3 days" / "due in
120 hours") are the interesting business logic here — good candidates for
the `useCase` layer, and good Vitest test material, same spirit as
`sortEquipmentByName`/`filterEquipmentByStatus` in
`src/verticals/equipment/utils/`.
