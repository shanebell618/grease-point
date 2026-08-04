# Database

## SQLite: no server to start

The database is [SQLite](https://www.sqlite.org/) — the whole database is
just **one file on disk**, not a separate program running in the
background. There's no "database server" to start or stop, and no
Postgres/MySQL-style connection to a host/port. If you've only used
client-server databases before, this is the main mental shift: "starting
the database" here just means "make sure the file exists and has the
right tables in it," which is what running migrations does (see below).

[Prisma](https://www.prisma.io/) is the ORM — it's the library that lets
the app's TypeScript code do things like `prisma.equipment.findMany()`
instead of writing raw SQL. `prisma/schema.prisma` is the single source of
truth for what tables/columns exist; Prisma generates a fully-typed client
from it (that's what the `postinstall` / `prisma generate` step does).

## Where's the file, and how do I "start" it?

Connection info lives in `.env` (gitignored — `.env.example` is the
template) as `DATABASE_URL="file:./dev.db"`. That path is relative to the
project root, so your local dev database is `prisma/dev.db`.

It doesn't exist until you create it:

```bash
npx prisma migrate dev
```

This creates `prisma/dev.db` if it's missing, then applies every migration
in `prisma/migrations/` (each migration is a folder with a `migration.sql`
file — a recorded, ordered change to the schema, like "add the Equipment
table"). Run this same command again any time you pull changes that touch
`prisma/schema.prisma`.

Once created, the file just sits there. The app reads/writes it directly
whenever `npm run dev` is running — there's nothing else to start.

## Poking around in the data

```bash
npx prisma studio
```

Opens a browser-based GUI for viewing and editing rows directly — the
easiest way to check "did that actually save?" without writing SQL. Or, if
you'd rather use the command line:

```bash
sqlite3 prisma/dev.db "select * from Equipment;"
```

## Seeing the schema as a diagram

[`prisma/database.erd`](../../prisma/database.erd) is a visual,
editable entity-relationship diagram of the schema, in the format used by
the [ERD Editor](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)
VS Code extension (`.vscode/extensions.json` recommends it, so VS Code
should prompt you to install it if you don't have it already). Open the
file and VS Code renders it as an interactive diagram — drag tables
around, click a column to see its type/key info.

Unlike `prisma/schema.prisma`, this file is **not** auto-generated — it's
a separate, hand-maintained artifact. If you add or change models, update
`database.erd` yourself (add a table, drag out columns, etc.) so it stays
in sync. It won't drift automatically like a generated diagram would, but
it also won't silently go stale in a way that breaks anything — it's
purely a visual aid.

## Heads up: there are three separate database files

It's easy to assume "the database" is one thing, but this project actually
has three independent SQLite files depending on what you're doing.
Changes in one never affect the others:

| File                 | Used by                                  | Lifecycle                                                      |
| -------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| `prisma/dev.db`      | `npm run dev` (your everyday local data) | Created once, persists until you delete it                     |
| `prisma/test.db`     | `npm run test:e2e` (Playwright)          | Migrated fresh automatically before every e2e run              |
| _(none — in-memory)_ | `npm run test:unit` (Vitest)             | Not a real file at all — see [Running Tests](running-tests.md) |

So if you add some test equipment locally via `npm run dev`, then run
`npm run test:e2e`, you won't see that data in the e2e run (and vice
versa) — they're genuinely separate databases.

## Changing the schema

1. Edit `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name describe_your_change` — this
   generates a new migration file and applies it to `dev.db`.
3. Commit the new folder that appears under `prisma/migrations/`. Migrations
   are meant to be committed and replayed in order on every machine/environment
   — never edit an already-committed migration file by hand.
