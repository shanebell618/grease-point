# TODO

Grease Point's Equipment flow (list → detail → create/edit → delete) is the
only fully-built, fully-tested feature. Everything below is a breadcrumb —
a stub page plus a written plan, not working code — so you can keep
extending this as a learning project. Each item mirrors the Equipment
flow's file layout (`src/app/api/equipment/`, `src/verticals/equipment/`),
so that's the reference implementation to copy from throughout.

## Features (each has its own README with a suggested first slice)

- [x] **Maintenance** — [`src/verticals/maintenance/README.md`](src/verticals/maintenance/README.md)
- [ ] **Parts** — [`src/verticals/parts/README.md`](src/verticals/parts/README.md) (backend done — schema, DAOs, use cases, actions, API routes, and the maintenance-record tie-in are all built and tested; the frontend, a searchable parts table, is what's left)
- [ ] **Documents** — [`src/verticals/documents/README.md`](src/verticals/documents/README.md)
- [ ] **Analytics / charts** — [`src/verticals/analytics/README.md`](src/verticals/analytics/README.md)
- [ ] **Dashboard** — depends on Maintenance + Analytics existing first (it aggregates both); no dedicated README yet, revisit once those land.

## Cross-cutting stretch goals

- [ ] **Auth + data ownership** — originally scoped as a standalone "Auth" item, but user-scoped data ("each user has their own equipment/maintenance") only means something once real accounts exist, so these are one feature, not two sequential ones. Recommended: [Clerk](https://clerk.com) (free up to 50k monthly users) rather than rolling a JWT/Auth.js flow — `dip-financing-portal` already uses it for exactly this, so it's a real reference implementation to copy from, not a cold start. The shape: a `User` model in `prisma/schema.prisma`; a `userId` foreign key on `Equipment` (`MaintenanceRecord` inherits ownership through its equipment, same as everything else it already inherits); every equipment/maintenance query scoped to the logged-in user's id; and — the part that's easy to skip and shouldn't be — an authorization check on every _mutation_, not just the list queries, so user A can't edit user B's equipment by guessing an id in the URL. DIP's `Policy` layer (`src/common/policies/ListingPolicy.ts` et al.) is the pattern to copy for that last part rather than inventing one. [`src/verticals/auth/README.md`](src/verticals/auth/README.md) was written before this decision and still describes the older JWT/Auth.js plan — needs a pass to match before this is actually started.
- [ ] **Dark mode** — TODO comment next to the `createTheme()` call in [`src/styles/theme.ts`](src/styles/theme.ts). MUI's `palette.mode` makes this small: a toggle component + a persisted preference (localStorage or a cookie for SSR) driving `light`/`dark`.
- [x] **Toasts** — shipped with [notistack](https://www.npmjs.com/package/notistack) rather than hand-rolled MUI `Snackbar`/`Alert`, matching `dip-financing-portal`'s `useToasts` pattern exactly (see [`src/common/hooks/useToasts.ts`](src/common/hooks/useToasts.ts) and its `SnackbarProvider` in [`src/app/providers.tsx`](src/app/providers.tsx)). Every mutation across the app now reports through it — success and error — replacing the inline `Alert` blocks each feature was building on its own before.
- [ ] **Optimistic updates** — TODO comment on `useDeleteEquipmentMutation` in [`src/verticals/equipment/hooks.ts`](src/verticals/equipment/hooks.ts). Delete is the natural first candidate: remove the item from the `equipmentKeys.list()` cache in `onMutate`, roll back `onError`, skip the invalidate-on-success round trip.
- [ ] **File uploads** — see the Documents README; the natural successor to `Equipment.photoUrl` (currently a single string field) is a real upload pipeline.
- [ ] **"View all" for the maintenance landing page** — `/maintenance` defaults to `?recent=true` (active work plus anything completed in the last 7 days), so older completed records disappear from the card grid entirely. Add a "View all" button/link somewhere on that page that drops the `?recent` filter and shows the full, unfiltered history — probably as a paginated `DataGridTable` (same component the equipment-detail history table already uses) rather than the card grid, since an unfiltered history could get long.
- [x] **Sync Equipment.status from MaintenanceRecord.status** — landed narrower than originally scoped, after realizing a maintenance record's own status (scheduled/in progress/waiting on parts) says how far along the work is, not whether the equipment is usable in the meantime — an oil change and a safety-system repair can sit at the same maintenance status with opposite real-world impact, so deriving equipment status from the full status range wasn't safe. What shipped instead: a maintenance record entering `IN_PROGRESS` (via `createMaintenanceUseCase`/`updateMaintenanceUseCase`) automatically sets its equipment to `OUT_OF_SERVICE` — "actively being worked on right now" is the one state that's unambiguously true regardless of the work's nature — unless the equipment is already `RETIRED`/`OUT_OF_SERVICE` (see `syncEquipmentOutOfServiceUseCase`). Deliberately one-directional: nothing auto-reverts the equipment when the record leaves `IN_PROGRESS` again, since "is this actually safe to use again" is a judgment call, not an inference. Bringing equipment back into service is a manual action via `EquipmentStatusControl`, a dropdown on the equipment detail page that replaced the old static status badge.
- [ ] **Server Component data fetching** — this app currently fetches everything client-side (`fetchEquipmentList` + TanStack Query), even for a page's very first load. The App Router alternative: make a page/layout an `async function` Server Component that calls a `useCase` directly (no HTTP round trip, since it's already running server-side) and passes the result down as props — see `dip-financing-portal`'s `app/app/deals/page.tsx` for a real example of this pattern (it uses no client data-fetching library at all, relying on `revalidatePath` after mutations instead). Deliberately not adopted yet, since TanStack Query is one of this project's explicit skills-to-demonstrate — but worth prototyping later, maybe on the Equipment list page, to compare the two approaches directly.
- [ ] **Mobile app** — this stays a web app, but two realistic paths later: wrap it as a PWA (installable, fairly small lift), or reuse the API routes and `verticals/*/{types,hooks}.ts` + `server/**` business logic as the backend/logic layer for a React Native/Expo app (the UI layer would need to be rebuilt natively — none of the MUI components carry over).
- [ ] **Use `next/link` everywhere** — only [`SiteLogo`](src/common/components/AppNavBar/components/SiteLogo.tsx) actually uses Next's `Link`. Every other internal link in the app (`EquipmentCard`, `MaintenanceCard`, the "Edit"/"Add Equipment" buttons, even the nav bar's own links) is an `href` prop on an MUI `Button`/`CardActionArea`/`ListItemButton`. There's no `LinkBehavior` theme wiring connecting MUI's `href` to `next/link`, so every one of those renders as a plain `<a>` and triggers a full page reload instead of Next's client-side transition. Fix is theme-level, not per-component: wire MUI's `LinkBehavior` (see the MUI + Next.js integration docs) so `href` on any MUI component automatically routes through `next/link`.
- [ ] **Adopt `prisma-zod-generator`** — `dip-financing-portal` has a fourth Prisma generator (`generator zod { provider = "prisma-zod-generator" }`) that auto-generates Zod schemas mirroring every Prisma input type, so its DAOs type `create`/`update` against `z.infer<>` of the generated schema instead of `Prisma.XCreateInput` directly — one generator serving both compile-time types and runtime validation from a single source. Grease-point doesn't have this generator; its Zod schemas (`createEquipmentInputSchema.ts`, `createMaintenanceInputSchema.ts`) are hand-written and validate the request boundary (with coercion, e.g. `z.coerce.number()`), not Prisma's exact write shape, so DAOs here are typed against raw `Prisma.XCreateInput`/`UpdateInput` instead — a real, working pattern, just a different one. Adding the generator to close that gap is a legitimate follow-up, but it's a bigger, separate decision (new generator, regenerated types, reworking both existing hand-written schemas) that touches the whole app — not something to fold into any single feature's DAO work.
- [ ] **Extract shared Zod validators into `src/lib/zod/utils/`** — `z.coerce.number().nonnegative().optional().nullable()` (and close variants of it) is now hand-typed separately in `createEquipmentInputSchema.ts`, `createMaintenanceInputSchema.ts`, and `createPartInputSchema.ts`, and will keep getting copy-pasted into every new feature's schema otherwise. `dip-financing-portal` has exactly this problem solved already at `src/lib/zod/utils/` — small named builders like `optionalNumber.ts`, `requiredString.ts`, `requiredEmail.ts` that every schema imports instead of re-deriving the same Zod chain. Same pattern to copy here: one file per reusable validator, schemas import them instead of writing `z.coerce...` inline each time.

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
- New or changed **presentational** components (props in, JSX out — no
  data-fetching hooks, no mutations) get a co-located `.stories.tsx`
  covering their meaningful prop variations, regardless of which folder
  they live in. **Connected** components (they call a `useQuery`/
  `useMutation` hook themselves) generally don't — there's no interesting
  fixed set of props to showcase, and Storybook has nothing real to fetch
  from. When touching an existing component, check whether its story (if
  it has one) still matches — a prop shape change or a new variant is as
  much a "story change" as a "code change."
- Name `id` parameters specifically rather than generically, once a
  function takes more than one or the meaning isn't obvious from
  context — `equipmentId`, `maintenanceRecordId`, not a bare `id` that
  makes a call site read as "update(id, id, data)." Matches DIP's own
  convention (`updateListingUseCase(actorId, listingId, ...)`). Existing
  bare `id` parameters get renamed opportunistically when that code is
  next touched, not as a dedicated sweep.
