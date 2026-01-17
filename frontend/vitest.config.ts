/**
 * @file Vitest configuration file.
 *
 * NOTE: Do not modify on your own, consult with maintainers.
 *
 * Reference: https://vitest.dev/config
 */

import path from "node:path";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, defineProject } from "vitest/config";

export default defineConfig(async () => {
  const sourcePath = path.resolve(__dirname, "./src");
  const projects = [
    // Unit
    defineProject({
      plugins: [react()],
      resolve: { alias: { "@": sourcePath } },
      test: {
        name: "unit",
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{ts,tsx,js,jsx}"],
        exclude: ["**/*.stories.*"],
        setupFiles: ["./config/test/unit-setup.ts"],
        browser: { enabled: false },
      },
    }),
    // Storybook
    defineProject({
      plugins: [react(), storybookTest()],
      resolve: { alias: { "@": sourcePath } },
      test: {
        name: "storybook",
        setupFiles: [".storybook/vitest.setup.ts"],
        browser: {
          enabled: true,
          provider: "playwright",
          instances: [{ browser: "chromium" }],
          headless: true,
        },
      },
    }),
  ];

  return {
    test: { projects },
  };
});
