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
- [ ] **Dark mode** — TODO comment next to the `createTheme()` call in [`src/lib/theme.ts`](src/lib/theme.ts). MUI's `palette.mode` makes this small: a toggle component + a persisted preference (localStorage or a cookie for SSR) driving `light`/`dark`.
- [ ] **Toasts** — TODO comment in [`src/app/providers.tsx`](src/app/providers.tsx). Add a global `ToastProvider` using MUI `Snackbar`/`Alert`, then have mutations across features report through it.
- [ ] **Optimistic updates** — TODO comment on `useDeleteEquipmentMutation` in [`src/verticals/equipment/hooks.ts`](src/verticals/equipment/hooks.ts). Delete is the natural first candidate: remove the item from the `equipmentKeys.list()` cache in `onMutate`, roll back `onError`, skip the invalidate-on-success round trip.
- [ ] **File uploads** — see the Documents README; the natural successor to `Equipment.photoUrl` (currently a single string field) is a real upload pipeline.
- [ ] **Mobile app** — this stays a web app, but two realistic paths later: wrap it as a PWA (installable, fairly small lift), or reuse the API routes and `features/*/{schema,hooks,types}.ts` business logic as the backend/logic layer for a React Native/Expo app (the UI layer would need to be rebuilt natively — none of the MUI components carry over).

## Architecture notes for future features

- Keep `src/app/**` thin — route files just import and render a feature-level
  page composer (e.g. `EquipmentListPage`). All real logic lives in
  `src/verticals/<name>/`.
- Every feature needing persistence gets a Prisma model. The commented
  breadcrumb block at the bottom of
  [`prisma/schema.prisma`](prisma/schema.prisma) already sketches
  `MaintenanceRecord`, `Part`, `PartUsage`, and `Document` — uncomment and
  adjust rather than starting from scratch.
- Reusable, presentational components (tables, badges, cards) go in
  `src/common/components/` with a co-located `.stories.tsx`; feature-specific
  components stay under `src/verticals/<name>/components/`.
- New pure functions (sorting, filtering, formatting) get a Vitest unit
  test in `tests/unit/`; new components get an RTL test in
  `tests/component/` (mock the feature's `api.ts` module directly, see
  `tests/component/EquipmentList.test.tsx` for the pattern).
