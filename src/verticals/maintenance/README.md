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

Mirror the Equipment flow file-for-file:

- `src/app/api/maintenance/route.ts` + `[id]/route.ts` — same GET/POST/PATCH/DELETE
  shape as `src/app/api/equipment/route.ts`, but scope list queries with
  `?equipmentId=` so a machine's detail page can show its own history.
- `src/verticals/maintenance/schema.ts`, `types.ts`, `api.ts`, `queryKeys.ts`, `hooks.ts`
  — copy `src/verticals/equipment/`'s versions and adjust fields.
- `src/verticals/maintenance/components/MaintenanceTable.tsx` — the "Maintenance
  Table" reusable component from the original outline; a Storybook story for
  it is an easy win once it exists.
- A `MaintenanceHistory` section embedded in `EquipmentDetail.tsx`
  (`src/verticals/equipment/components/EquipmentDetail.tsx`) is a natural
  integration point — that's how "recent repairs" ends up on the equipment
  detail page and eventually the dashboard.
- `src/app/maintenance/page.tsx` replaces the current `FeaturePlaceholder`
  stub with a real `MaintenanceListPage`.

## Due-date logic

`nextDueDate`/`nextDueHours` calculations (e.g. "due in 3 days" / "due in
120 hours") are the interesting business logic here — good Vitest unit-test
material, same spirit as `sortEquipmentByName`/`filterEquipmentByStatus` in
`src/verticals/equipment/utils.ts`.
