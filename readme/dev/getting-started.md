# Getting Started

## Prerequisites

- **Node 22.** This project pins its Node version in `.nvmrc`. If you use
  [nvm](https://github.com/nvm-sh/nvm), just run `nvm use` in the project
  root and it'll switch you to the right version automatically (installing
  it first if you don't have it: `nvm install`). If your default `node -v`
  is something else, commands in this project may fail in confusing ways —
  always `nvm use` first in a new terminal tab.

## Install and run

```bash
nvm use               # switch to the pinned Node version
npm install             # installs dependencies, and also runs `prisma generate`
                          #   automatically (see the "postinstall" script in
                          #   package.json) — this generates the Prisma Client
                          #   code your app imports, based on prisma/schema.prisma
cp .env.example .env      # only needed if you don't already have a .env file
npx prisma migrate dev      # creates the local SQLite database file and applies
                              #   migrations — see readme/dev/database.md for what
                              #   this actually does
npm run dev                   # starts the dev server
```

Open [http://localhost:3000](http://localhost:3000) — it redirects straight to
`/equipment`.

## Everyday scripts

| Command                                   | What it does                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`                             | Start the dev server (hot reload)                                                       |
| `npm run build` then `npm run start`      | Production build, then run it                                                           |
| `npm run lint`                            | ESLint                                                                                  |
| `npm run format` / `npm run format:check` | Prettier — `format` rewrites files, `format:check` just reports problems (what CI runs) |
| `npm run test:unit`                       | Vitest — see [Running Tests](running-tests.md)                                          |
| `npm run test:e2e`                        | Playwright — see [Running Tests](running-tests.md)                                      |
| `npm run storybook`                       | Component-explorer dev server, at [http://localhost:6006](http://localhost:6006)        |
| `npm run build-storybook`                 | Static Storybook build (also run in CI, to catch broken stories)                        |

## If something feels broken

Most "nothing makes sense" moments in a project like this come down to one
of:

1. **Wrong Node version.** Run `node -v` and compare to `.nvmrc`. Run `nvm use`.
2. **Prisma Client out of date.** If you just pulled changes that touched
   `prisma/schema.prisma`, run `npx prisma generate` (or just `npm install`
   again, since that triggers it automatically).
3. **Database out of date.** If the schema changed, run `npx prisma migrate dev`
   again to apply the new migration.

## Git workflow

This repo uses feature branches merged into `main` with `--no-ff`
(`git merge --no-ff <branch>`), so the graph shows real branch/merge
structure even without GitHub pull requests
(`git log --oneline --graph --all` to see it). Commit messages describe the
_change_, not the file — `Add equipment list and detail pages`, not
`update files`.
