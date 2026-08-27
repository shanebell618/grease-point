# Architecture

Equipment is the one fully-built feature and is meant as the **reference
implementation** — the pattern every other feature (Maintenance, Inventory,
Documents, Analytics — see the root [TODO.md](../../TODO.md)) should copy.
If you're building a new feature and unsure where something goes, find the
equivalent Equipment file and put your version in the same spot.

## The big picture

Two halves, kept deliberately separate:

- **`src/app/`** — Next.js routing only. These files are intentionally
  thin: a route file's whole job is to import a page component from
  `src/verticals/` and render it. If you're tempted to write real logic
  in a file under `src/app/`, it almost always belongs in `src/verticals/`
  instead.
- **`src/server/`** — everything that talks to the database or enforces
  business rules, in three layers (explained below). Nothing in here knows
  anything about Next.js or React.

Everything shared across features lives in `src/common/` (UI) or
`src/lib/`/`src/styles/` (infrastructure).

## Frontend: `src/verticals/`

Each feature gets a folder here — `src/verticals/equipment/` is the built
one; `maintenance/`, `inventory/`, `documents/`, `analytics/`, `auth/`
currently just contain a `README.md` describing what to build.

```
src/verticals/equipment/
  api.ts                fetch() wrappers calling the /api/equipment routes
  hooks.ts               TanStack Query hooks (queries + mutations) built on api.ts
  queryKeys.ts             centralized cache-key factory, so every hook invalidates consistently
  types.ts                  TS types for an Equipment record, as it looks over the wire
  utils/                     pure helper functions (sort/filter/format), with __test__/ inside
  components/
    EquipmentCard/            shared across multiple pages -> lives at the vertical root
    EquipmentForm/             shared by both the "new" and "edit" pages -> also at the vertical root
  pages/
    EquipmentListPageView/
      index.tsx                  the actual page component
      components/
        EquipmentList/             only used by this one page -> lives inside it, not the vertical root
    EquipmentPageView/              detail page (view/edit/delete one machine)
    NewEquipmentPageView/           create-new-equipment page
    EditEquipmentPageView/          edit page
```

The rule of thumb for "does this component go in `verticals/equipment/components/`
or inside a specific `pages/<Name>PageView/components/`?": **if it's used
by more than one page, it goes at the vertical root; if it's only used by
one page, it lives inside that page's own folder, as a sibling of that
page's `index.tsx`.** `EquipmentForm` is shared by the New and Edit pages,
so it's at the vertical root. `EquipmentList` is only ever rendered by the
list page, so it lives inside `EquipmentListPageView/components/`.

You'll notice every component is a _folder_ containing `index.tsx`
(`EquipmentCard/index.tsx`, not `EquipmentCard.tsx`) — that's consistent
everywhere in this codebase, even for components with no other files in
their folder yet. It leaves room to add a co-located `.stories.tsx`
(Storybook) or sub-component later without having to restructure.

## Backend: `src/server/`

This is a layered backend — each layer has one job, and only talks to the
layer directly below it. This structure mostly matters once a feature gets
more complex than trivial CRUD (auth checks, cross-model logic, background
jobs) — for straightforward create/read/update/delete it can feel like a
lot of ceremony for not much payoff, but it's the pattern the rest of this
project follows, so new backend code should follow it too rather than
mixing styles.

```
src/server/
  schemas/equipment/
    createEquipmentInputSchema.ts    zod schema — the one place input shape is defined
  dataAccess/
    EquipmentDao.ts                    "Data Access Object" — the ONLY file that calls
                                          prisma.equipment.* directly. Just raw queries,
                                          no business rules.
  useCases/
    equipment/
      createEquipmentUseCase.ts          business logic. Takes already-validated,
      updateEquipmentUseCase.ts           already-typed input, calls the Dao, applies
      deleteEquipmentUseCase.ts            any rules ("can't update equipment that
      getAllEquipmentUseCase.ts              doesn't exist" -> NotFoundError, etc.)
      getAllEquipmentByStatusUseCase.ts
      getEquipmentByIdUseCase.ts
    errors.ts                            shared error types (NotFoundError, ...)
  actions/
    equipment/
      createEquipmentAction.ts           the boundary. Takes raw, untrusted input
      updateEquipmentAction.ts            (e.g. a JSON request body), validates it
      deleteEquipmentAction.ts             with the zod schema, then calls the use case.
```

Reading this top-to-bottom is also the request flow for a mutation (create/update/delete):

**API route** (`src/app/api/equipment/route.ts`) receives the HTTP
request → calls the matching **action** → the action validates the raw
input against the zod schema and calls the matching **use case** → the
use case runs any business rules and calls the **Dao** → the Dao runs the
actual Prisma query.

Reads (`GET` requests — listing equipment, fetching one by id) skip the
action layer entirely and go straight from the route to the use case —
there's nothing at that boundary worth validating beyond an id or a query
string, so an action there would just be a pointless pass-through. This
mirrors how the layers are meant to be used generally: each one exists to
do a specific job, not to exist for its own sake — skip a layer when it
genuinely wouldn't do anything.

### Why split `Dao` / `useCase` / `action` into three files instead of one?

The short version: each layer is independently testable and independently
reusable.

- The **Dao** test (`EquipmentDao.create.test.ts`) proves the actual
  database query works, without dragging in validation logic.
- The **useCase** test (`createEquipmentUseCase.test.ts`) proves the
  business rule works (e.g. "updating equipment that doesn't exist throws
  `NotFoundError`"), using real (mocked) data, without caring about HTTP at all.
- The **action** test (`createEquipmentAction.test.ts`) proves invalid
  input gets rejected _before_ ever reaching the use case, by mocking the
  use case out entirely and just checking it was (or wasn't) called.

See [Running Tests](running-tests.md) for how each of those test types
actually run.

## Everything else

```
src/common/
  components/       generic, reusable UI (StatusBadge, AppNavBar, FeaturePlaceholder)
  utils/formatters/  generic formatters (currency, date) — not feature-specific
src/lib/
  prisma/           the Prisma Client singleton, and the real-vs-mock switching
                      logic used by tests (see Running Tests)
src/styles/
  theme.ts          the shared MUI theme (used by both the app and Storybook,
                      so stories render exactly like the real app)
src/test/
  setup.ts             global Vitest setup (runs before every test file)
  renderWithQueryClient.tsx   shared test helper
  factories/               helpers for building test data (e.g. equipmentFactory)
prisma/
  schema.prisma       Equipment is a real model; the others (MaintenanceRecord,
                        Part, Document, ...) are sketched as comments at the
                        bottom, ready to uncomment when you build that feature
  migrations/           one folder per schema change, applied in order
tests/e2e/
  equipment.spec.ts    the one Playwright end-to-end test
```
