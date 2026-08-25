# TODO

Grease Point's Equipment flow (list → detail → create/edit → delete) is the
only fully-built, fully-tested feature. Everything below is a breadcrumb —
a stub page plus a written plan, not working code — so you can keep
extending this as a learning project. Each item mirrors the Equipment
flow's file layout (`src/app/api/equipment/`, `src/verticals/equipment/`),
so that's the reference implementation to copy from throughout.

## Features (each has its own README with a suggested first slice)

- [ ] **Maintenance** — [`src/verticals/maintenance/README.md`](src/verticals/maintenance/README.md)
- [ ] **Parts Inventory** — [`src/verticals/inventory/README.md`](src/verticals/inventory/README.md)
- [ ] **Documents** — [`src/verticals/documents/README.md`](src/verticals/documents/README.md)
- [ ] **Analytics / charts** — [`src/verticals/analytics/README.md`](src/verticals/analytics/README.md)
- [ ] **Dashboard** — depends on Maintenance + Analytics existing first (it aggregates both); no dedicated README yet, revisit once those land.

## Cross-cutting stretch goals

- [ ] **Auth** (JWT or Google login) — [`src/verticals/auth/README.md`](src/verticals/auth/README.md)
- [ ] **Dark mode** — TODO comment next to the `createTheme()` call in [`src/styles/theme.ts`](src/styles/theme.ts). MUI's `palette.mode` makes this small: a toggle component + a persisted preference (localStorage or a cookie for SSR) driving `light`/`dark`.
- [ ] **Toasts** — TODO comment in [`src/app/providers.tsx`](src/app/providers.tsx). Add a global `ToastProvider` using MUI `Snackbar`/`Alert`, then have mutations across features report through it.
- [ ] **Optimistic updates** — TODO comment on `useDeleteEquipmentMutation` in [`src/verticals/equipment/hooks.ts`](src/verticals/equipment/hooks.ts). Delete is the natural first candidate: remove the item from the `equipmentKeys.list()` cache in `onMutate`, roll back `onError`, skip the invalidate-on-success round trip.
- [ ] **File uploads** — see the Documents README; the natural successor to `Equipment.photoUrl` (currently a single string field) is a real upload pipeline.
- [ ] **"View all" for the maintenance landing page** — `/maintenance` defaults to `?recent=true` (active work plus anything completed in the last 7 days), so older completed records disappear from the card grid entirely. Add a "View all" button/link somewhere on that page that drops the `?recent` filter and shows the full, unfiltered history — probably as a paginated `DataGridTable` (same component the equipment-detail history table already uses) rather than the card grid, since an unfiltered history could get long.
- [ ] **Sync Equipment.status from MaintenanceRecord.status** — right now the two are independent; creating/updating a maintenance record never touches its equipment's status. E.g. starting an oil change (maintenance status → `IN_PROGRESS`) should probably flip the equipment to `MAINTENANCE`, and finishing it (→ `COMPLETE`) should flip it back. Belongs in `createMaintenanceUseCase`/`updateMaintenanceUseCase`, calling `EquipmentDao.update` after the maintenance write. Open questions to work out before building it: which maintenance statuses count as "equipment is in maintenance" (`IN_PROGRESS` and `WAITING_ON_PARTS` both seem like yes, `SCHEDULED` less obviously so); whether this should ever override an equipment status that was set manually for an unrelated reason (`RETIRED`/`OUT_OF_SERVICE` probably shouldn't be silently overwritten); and what happens when one piece of equipment has multiple open maintenance records at once.
- [ ] **Server Component data fetching** — this app currently fetches everything client-side (`fetchEquipmentList` + TanStack Query), even for a page's very first load. The App Router alternative: make a page/layout an `async function` Server Component that calls a `useCase` directly (no HTTP round trip, since it's already running server-side) and passes the result down as props — see `dip-financing-portal`'s `app/app/deals/page.tsx` for a real example of this pattern (it uses no client data-fetching library at all, relying on `revalidatePath` after mutations instead). Deliberately not adopted yet, since TanStack Query is one of this project's explicit skills-to-demonstrate — but worth prototyping later, maybe on the Equipment list page, to compare the two approaches directly.
- [ ] **Mobile app** — this stays a web app, but two realistic paths later: wrap it as a PWA (installable, fairly small lift), or reuse the API routes and `verticals/*/{types,hooks}.ts` + `server/**` business logic as the backend/logic layer for a React Native/Expo app (the UI layer would need to be rebuilt natively — none of the MUI components carry over).

## Architecture notes for future features

Full writeup: [`readme/dev/architecture.md`](readme/dev/architecture.md). Quick version:

- Keep `src/app/**` thin — route files just import and render a feature's
  page composer (e.g. `EquipmentListPageView`). All real logic lives in
  `src/verticals/<name>/`.
- Backend logic is layered: `server/dataAccess/` (raw Prisma queries) →
  `server/useCases/<name>/` (business logic) → `server/actions/<name>/`
  (input validation, called by mutation routes only — reads call the
  use case directly). Copy `equipment`'s files as the template.
- Every feature needing persistence gets a Prisma model. The commented
  breadcrumb block at the bottom of
  [`prisma/schema.prisma`](prisma/schema.prisma) already sketches
  `MaintenanceRecord`, `Part`, `PartUsage`, and `Document` — uncomment and
  adjust rather than starting from scratch.
- Reusable, presentational components go in `src/common/components/` as
  `ComponentName/index.tsx` with a co-located `.stories.tsx`; components
  used by only one page live inside that page's own folder
  (`pages/<Name>PageView/components/`); components shared by multiple
  pages within a feature live at that feature's `verticals/<name>/components/`.
- New pure functions and new `dataAccess`/`useCases`/`actions` files get a
  Vitest test in a co-located `__test__/` folder next to the file they
  test (see [`readme/dev/running-tests.md`](readme/dev/running-tests.md)
  for the pattern — `dataAccess`/`useCases` tests run against an
  in-memory mocked Prisma client, `actions` tests mock the use case).
