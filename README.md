# Grease Point

A heavy equipment tracking app — maintenance schedules, repair history,
documents, inspections, and parts inventory for a fleet of machines.

This is a portfolio/learning project. The **Equipment flow** (list → detail
→ create/edit → delete) is fully built, tested, and wired to a real
database. Everything else is a documented breadcrumb — see [TODO.md](TODO.md)
for what's stubbed out and how to build it next.

## Stack

|                        |                                                   |
| ---------------------- | ------------------------------------------------- |
| Framework              | Next.js (App Router), TypeScript                  |
| UI                     | Material UI                                       |
| Data fetching          | TanStack Query                                    |
| Forms                  | react-hook-form + zod                             |
| Database               | Prisma + SQLite (driver adapter, real migrations) |
| Unit/integration tests | Vitest                                            |
| End-to-end tests       | Playwright                                        |
| Component docs         | Storybook (`@storybook/nextjs-vite`)              |
| CI                     | GitHub Actions                                    |
| Lint/format            | ESLint + Prettier                                 |

Chosen deliberately to mirror what current job postings ask for.

## Development

New to this codebase, or new to some of the tools in it? Start here, in order:

- [Getting Started](readme/dev/getting-started.md) — install everything and run the app locally
- [Database](readme/dev/database.md) — where the data lives and how to work with it
- [Running Tests](readme/dev/running-tests.md) — the two test suites and what each one covers
- [Architecture](readme/dev/architecture.md) — how the code is organized, and why

## What's next

See [TODO.md](TODO.md).
