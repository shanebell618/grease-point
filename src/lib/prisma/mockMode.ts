// Vitest sets this via test.env in vitest.config.ts, so dataAccess/useCases
// tests run against an in-memory Prisma client instead of a real database —
// no real db, no cross-test-file locking/races to worry about.
export function isPrismaMockEnabled(): boolean {
  return process.env.PRISMA_USE_MOCK === "true";
}
