/**
 * @file Vite configuration file.
 *
 * NOTE: Do not modify on your own, consult with maintainers.
 *
 * Reference: https://vite.dev/config
 */
import path from "path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import type { PluginOption } from "vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ mode, command }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), "");
  const routerPlugin: PluginOption = tanstackRouter({
    target: "react",
    routesDirectory: "./src/router/routes",
    quoteStyle: "double",
    generatedRouteTree: "./src/router/routes-tree.gen.ts",
    autoCodeSplitting: true,
    verboseFileRoutes: false,
    semicolons: true,
  });
  const reactPlugin: PluginOption = react();
  const tailwindPlugin: PluginOption = tailwindcss();
  // NOTE: order of plugins matter
  const plugins: PluginOption[] = [routerPlugin, reactPlugin, tailwindPlugin];

  // Only use checker in dev mode, not for builds
  // Also respect the NO_CHECKS env variable
  const shouldUseChecker =
    command === "serve" && (!env.NO_CHECKS || env.NO_CHECKS.toLowerCase() !== "true");

  if (shouldUseChecker) {
    const { checker } = await import("vite-plugin-checker");
    const checkerPlugin: PluginOption = checker({
      typescript: {
        tsconfigPath: "./tsconfig.json",
        buildMode: true,
      },

      eslint: {
        lintCommand: "eslint .",
        useFlatConfig: true,
        dev: {
          overrideConfig: {
            overrideConfigFile: "./eslint.config.js",
          },
        },
      },
    });

    plugins.push(checkerPlugin);
  }

  if (env.ANALYZE && env.ANALYZE.toLowerCase() === "true") {
    const { visualizer } = await import("rollup-plugin-visualizer");
    const visualizerPlugin: PluginOption = visualizer({
      //
    });

    plugins.push(visualizerPlugin);
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // /src alias
      },
    },
    optimizeDeps: {
      exclude: ["eslint-plugin-react-hooks"],
    },
    server: {
      // Proxy configuration - use this when the app is started without backend and frontend on Docker.
      proxy: {
        "/api": {
          target: "http://0.0.0.0:8000",
          changeOrigin: false,
        },
      },
    },
  };
});
