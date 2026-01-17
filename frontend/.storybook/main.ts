import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public", "."],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  // NOTE: story tests on CI will fail due to storybook bug
  // This is a temporary workaround, do not modify
  // Reference: https://oss.issuehunt.io/r/storybookjs/storybook/issues/32049
  viteFinal: async (config) => {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        "react-dom/client",
        "@tanstack/react-query",
        "@tanstack/react-query-devtools",
        "@tanstack/react-router",
        "react-use",
        "@tanstack/react-router-devtools",
        "axios",
        "query-string",
        "jwt-decode",
        "@radix-ui/react-slot",
        "decimal.js",
        "@mui/x-charts",
      ],
    };

    return config;
  },
};

export default config;
