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
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.ts", "tests/component/**/*.test.tsx"],
    exclude: ["tests/e2e/**", "node_modules/**"],
  },
});
