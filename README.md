# Grease Point

A heavy equipment tracking app — maintenance schedules, repair history,
documents, inspections, and parts inventory for a fleet of machines.

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

## Development

New to this codebase, or new to some of the tools in it? Start here, in order:

- [Getting Started](readme/dev/getting-started.md) — install everything and run the app locally
- [Database](readme/dev/database.md) — where the data lives and how to work with it
- [Running Tests](readme/dev/running-tests.md) — the two test suites and what each one covers
- [Architecture](readme/dev/architecture.md) — how the code is organized, and why

## What's next

See [TODO.md](TODO.md).
