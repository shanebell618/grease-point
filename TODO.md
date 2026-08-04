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
