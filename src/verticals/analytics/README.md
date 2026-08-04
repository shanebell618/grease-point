# Analytics — breadcrumb

Not built yet. This is the natural home for the "Charts" stretch goal and
depends on Maintenance existing first (repair cost and frequency are derived
from `MaintenanceRecord`).

## Data needed

Once `MaintenanceRecord` exists (see `src/verticals/maintenance/README.md`),
these three outline items become straightforward aggregation queries:

- **Repair cost over time** — `prisma.maintenanceRecord.groupBy({ by: ['performedAt'], _sum: { cost: true } })`,
  bucketed by month in application code (SQLite has no native date-trunc).
- **Maintenance frequency** — count of `MaintenanceRecord` rows per
  `equipmentId` over a time window.
- **Cost per machine** — `groupBy({ by: ['equipmentId'], _sum: { cost: true } })`,
  joined with `Equipment.name` for display.

## Suggested first slice

- Backend, following the usual layering (see
  [`readme/dev/architecture.md`](../../../readme/dev/architecture.md)):
  the three `groupBy` queries above belong in `server/dataAccess/AnalyticsDao.ts`
  (or split across the relevant model's existing Dao), called by
  `server/useCases/analytics/` — read-only, so no `actions/` needed, same
  as Equipment's `findAll`/`getById`.
- `src/app/api/analytics/route.ts` — one endpoint returning the three
  aggregates above (or split per-chart if the payloads get large).
- Pick **Recharts** over Chart.js — it's the more "React-native" of the two
  (components instead of imperative canvas calls), which fits this
  codebase's patterns better and is what most current job postings mean by
  "React charting experience."
- `src/verticals/analytics/components/RepairCostChart/index.tsx`,
  `MaintenanceFrequencyChart/index.tsx`, `CostPerMachineChart/index.tsx` —
  each wrapping a Recharts chart, fed by a `useAnalyticsQuery()` TanStack
  Query hook.
- `src/verticals/analytics/pages/AnalyticsPageView/index.tsx` replaces the
  current `FeaturePlaceholder` stub rendered by `src/app/analytics/page.tsx`.

## Later

This is also the natural place to eventually surface the "Equipment value"
and "Hours logged" dashboard stats once `src/app/dashboard/page.tsx` becomes
real — it can reuse the same aggregation endpoint.
