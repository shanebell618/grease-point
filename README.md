# Grease Point

A heavy equipment tracking app — maintenance schedules, repair history,
documents, inspections, and parts inventory for a fleet of machines.

This is a portfolio/learning project. The **Equipment flow** (list → detail
→ create/edit → delete) is fully built, tested, and wired to a real
database. Everything else is a documented breadcrumb — see [TODO.md](TODO.md)
for what's stubbed out and how to build it next.

## Stack

|                      |                                                   |
| -------------------- | ------------------------------------------------- |
| Framework            | Next.js (App Router), TypeScript                  |
| UI                   | Material UI                                       |
| Data fetching        | TanStack Query                                    |
| Forms                | react-hook-form + zod                             |
| Database             | Prisma + SQLite (driver adapter, real migrations) |
| Unit/component tests | Vitest + React Testing Library                    |
| End-to-end tests     | Playwright                                        |
| Component docs       | Storybook (`@storybook/nextjs-vite`)              |
| CI                   | GitHub Actions                                    |
| Lint/format          | ESLint + Prettier                                 |

Chosen deliberately to mirror what current job postings ask for — see the
project's original planning notes for the full rationale.

## Getting started

Requires Node 22 (pinned in `.nvmrc`):

```bash
nvm use
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to
`/equipment`.

## Scripts

```bash
npm run dev              # start the dev server
npm run build             # production build
npm run lint               # eslint
npm run format:check        # prettier --check
npm run test:unit            # vitest (unit + component tests)
npm run test:e2e               # playwright (builds, starts against a test DB)
npm run storybook                # storybook dev server
npm run build-storybook           # storybook static build
```

## Architecture

```
src/
  app/            routes only — thin files that import a feature's page
                  composer and render it; real logic never lives here
  components/     generic, reusable, cross-feature (Button, StatusBadge,
                  AppNavBar, FeaturePlaceholder), each with a .stories.tsx
  features/
    equipment/    the fully-built reference implementation:
                  schema.ts    zod schema, shared by the API route and the form
                  types.ts     TS types (derived from the Prisma model)
                  utils.ts     pure helpers (sort/filter/format) — Vitest targets
                  api.ts       fetch wrappers
                  queryKeys.ts  centralized TanStack Query key factory
                  hooks.ts      list/detail queries + create/update/delete mutations
                  components/   presentational pieces (EquipmentCard, EquipmentForm, ...)
                  Equipment*Page.tsx   composers consumed by src/app/equipment/**
    maintenance/  breadcrumb — README.md only, no code yet
    inventory/    breadcrumb
    documents/    breadcrumb
    analytics/    breadcrumb
    auth/         breadcrumb
  lib/            prisma.ts (client singleton), theme.ts (shared MUI theme)
  utils/          generic formatters (currency, date)
tests/
  unit/           Vitest, pure functions
  component/      Vitest + React Testing Library
  e2e/            Playwright
prisma/
  schema.prisma   Equipment is live; other models are sketched as comments
```

Why routes stay thin: it keeps `src/app/**` as pure routing/composition,
and makes every feature's logic testable and reusable independent of
Next.js's routing conventions.

## Database

SQLite via Prisma's driver-adapter workflow (`@prisma/adapter-better-sqlite3`).
`npx prisma studio` to browse data, `npx prisma migrate dev --name <name>`
after schema changes.

## Git workflow

Feature branches, merged with `--no-ff` so the graph shows real branch
structure (`git log --oneline --graph --all`). Commit messages describe the
change, not the file (`Add equipment list and detail pages`, not `update
files`).

## What's next

See [TODO.md](TODO.md).
