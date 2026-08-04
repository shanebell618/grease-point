import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Storybook's CLI also offers a "storybook" Vitest project (running stories
// as browser tests via @storybook/addon-vitest); it's deliberately not wired
// in here — it currently conflicts with @testing-library/dom's nested
// aria-query version in this toolchain, and RTL component tests plus
// `npm run build-storybook` already cover this project's needs.
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // dataAccess/useCases tests run against an in-memory mock Prisma client
    // (see src/lib/prisma/mockClient.ts) instead of a real database — each
    // test file gets its own isolated in-memory state, so there's no shared
    // file to race across parallel workers the way a real SQLite file would.
    env: {
      PRISMA_USE_MOCK: "true",
    },
    // Tests live co-located in __test__/ folders next to the code they
    // test (see src/verticals/equipment/__test__ for the pattern);
    // tests/e2e is Playwright's, a separate runner entirely.
    include: ["src/**/__test__/**/*.test.{ts,tsx}"],
  },
});
