# Running Tests

There are two independent test suites, run with two different tools, and
they answer different questions:

- **Unit/integration tests** ([Vitest](https://vitest.dev/)) — "does this
  one function/class do the right thing?" Fast, no browser involved.
- **End-to-end tests** ([Playwright](https://playwright.dev/)) — "does the
  whole app actually work, clicking through it like a real user?" Slower,
  drives a real (headless) browser against a real running copy of the app.

## Unit/integration tests — `npm run test:unit`

```bash
npm run test:unit          # run once and exit
npm run test:unit:watch    # re-run automatically as you edit files
```

Tests live **co-located** next to the code they test, in a `__test__/`
folder — e.g. `src/server/dataAccess/__test__/EquipmentDao.findMany.test.ts`
tests `src/server/dataAccess/EquipmentDao.ts`. There's no separate
top-level `tests/` folder for these (that's reserved for the e2e suite,
below). If you're adding a test for a new file, put it in a `__test__/`
folder right next to that file.

Roughly three kinds of things get tested here:

| What                                                            | Example                                                                                          |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Pure functions                                                  | `src/verticals/equipment/utils/__test__/` — sorting, filtering, formatting                       |
| Data access (`Dao` classes)                                     | `src/server/dataAccess/__test__/` — one test file per method, e.g. `EquipmentDao.create.test.ts` |
| Business logic (`useCase`s) and boundary validation (`action`s) | `src/server/useCases/equipment/__test__/`, `src/server/actions/equipment/__test__/`              |

Frontend components (React) currently don't have automated tests — test
coverage here is focused on business logic (useCases, actions, data
access) rather than UI. If that changes later, component tests would use
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/),
which is already installed.

### No real database involved

This is worth calling out because it's a little unusual if you haven't
seen it before: **`npm run test:unit` never touches a real database file.**
Tests that exercise `EquipmentDao`/useCases run against an **in-memory
fake Prisma client** instead (via the [`prisma-mock`](https://www.npmjs.com/package/prisma-mock)
package — see `src/lib/prisma/mockMode.ts` and `mockClient.ts`). It
behaves like a real Prisma client (same methods, same query behavior) but
just stores everything in a plain JS object in memory, which gets wiped
clean before every single test.

Why bother with this instead of just using `dev.db`? Two reasons:

1. **Speed** — no disk I/O.
2. **Safety from race conditions** — Vitest normally runs test _files_ in
   parallel. If every file shared one real SQLite file on disk, one file's
   test cleanup could delete rows another file's test was still using,
   causing flaky, hard-to-reproduce failures. Since each test file gets
   its own private in-memory client instead, there's nothing to share, so
   parallel execution is safe by construction.

Action tests go one step further and mock the _useCase_ itself (not
Prisma) — see `src/server/actions/equipment/__test__/createEquipmentAction.test.ts`
for the pattern. That's intentional: an action's whole job is "validate
input, then hand off to the use case," so its test just checks that
wiring, not the database behavior underneath (the useCase's own test
already covers that).

## End-to-end test — `npm run test:e2e`

```bash
npm run test:e2e                  # headless — same as CI
npx playwright test --headed      # watch it drive an actual browser window
npx playwright test --ui           # Playwright's interactive debugger — the
                                     #   best way to step through a failure
```

There's currently one spec, `tests/e2e/equipment.spec.ts`: it opens
`/equipment`, adds a machine through the real UI, confirms it shows up in
the list, then deletes it. This is a genuine integration test — it runs
`next build && next start` (a real production build) against a real,
dedicated `prisma/test.db`, which gets migrated automatically first (see
the `pretest:e2e` script in `package.json`, and
[Database](database.md#heads-up-there-are-three-separate-database-files)
for how that file relates to your everyday `dev.db`).

**Gotcha:** the e2e config will reuse an already-running server on port
3000 if it finds one (so repeated local runs are fast). That means if your
`npm run dev` is running while you run `npm run test:e2e`, it'll test
against _that_ server and your regular `dev.db` — not the isolated,
freshly-migrated `test.db`. Stop `npm run dev` first if you want the
clean, from-scratch run that CI does.

First time only, if you haven't already: `npx playwright install --with-deps chromium`
to download the browser Playwright drives.

## What CI runs

Every push/PR to `main` runs, in order: lint → format check → `test:unit`
→ production build → `test:e2e` → Storybook build. See
`.github/workflows/ci.yml`. If you want to double-check something will
pass before pushing, running those same commands locally in that order is
exactly what CI does.
