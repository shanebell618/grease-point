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

- `src/app/api/analytics/route.ts` — one endpoint returning the three
  aggregates above (or split per-chart if the payloads get large).
- Pick **Recharts** over Chart.js — it's the more "React-native" of the two
  (components instead of imperative canvas calls), which fits this
  codebase's patterns better and is what most current job postings mean by
  "React charting experience."
- `src/verticals/analytics/components/RepairCostChart.tsx`,
  `MaintenanceFrequencyChart.tsx`, `CostPerMachineChart.tsx` — each wrapping
  a Recharts chart, fed by a `useAnalyticsQuery()` TanStack Query hook.
- `src/app/analytics/page.tsx` replaces the current `FeaturePlaceholder` stub.

## Later

This is also the natural place to eventually surface the "Equipment value"
and "Hours logged" dashboard stats once `src/app/dashboard/page.tsx` becomes
real — it can reuse the same aggregation endpoint.
