# Tools & Scripts

Everything you can run from the terminal, plus where each tool is configured.

---

## 1. Core Toolchain

| Tool / Library            | What it’s for                                | Key Config Files / Folders                |
|---------------------------|----------------------------------------------|-------------------------------------------|
| **[Vite](https://vite.dev)**                  | Dev server & production build                | `vite.config.ts`                          |
| **[TypeScript](https://www.typescriptlang.org)**            | Static typing                                | `tsconfig.json`, `tsconfig.*.json`        |
| **[ESLint](https://eslint.org)**                | Linting                                      | `.eslintrc.*`, `eslint.config.*`          |
| **[Prettier](https://prettier.io)**              | Formatting                                   | `.prettierrc*`, `prettier.config.*`       |
| **[Vitest](https://vitest.dev)**                | Unit/Story tests                             | `vitest.config.*` (or inline in package)  |
| **[Testing Library](https://testing-library.com/)**   | React testing utilities                      | —                                         |
| **[Storybook](https://storybook.js.org)**           | Interactive component docs                   | `.storybook/`                             |
| **[Playwright](https://playwright.dev)**            | (Optional) browser automation / E2E          | `playwright.config.*`                     |
| **[Rollup Plugin Visualizer](https://github.com/btd/rollup-plugin-visualizer)** | Bundle analysis                          | Called during build when `ANALYZE=true`   |
| **[Vite Plugin Checker](https://github.com/fi3ework/vite-plugin-checker)**   | Type/lint checks inside Vite dev server      | `vite.config.ts`                          |

---

## 2. Package Scripts

Run with `pnpm <script>`.

| Script              | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `dev`               | Start Vite dev server                                                       |
| `typecheck`         | Runs Typescript compiler for typechecking                                   |
| `lint`              | ESLint with cache & auto-fix over the repo (`eslint --cache --fix .`)       |
| `format`            | Prettier format all files (`prettier --cache -w .`)                         |
| `build`             | Type-check with `tsc -b`, then build with Vite                              |
| `preview`           | Serve the built bundle (`dist/`) locally                                    |
| `story`             | Launch Storybook on port 6006                                               |
| `story:build`       | Build Storybook as static files                                             |
| `story:preview`     | Serve the static bundle locally                                             |
| `test`              | Run **all** Vitest projects headlessly                                      |
| `test:unit`         | Run only the `unit` Vitest project                                          |
| `test:unit:ui`      | Open Vitest UI for `unit` project (browser-like test runner)                |
| `test:story`        | Run only the `storybook` Vitest project                                     |
| `test:story:ui`     | Open Vitest UI for `storybook` project                                      |

---

## 3. Storybook

- Start locally: `pnpm story`
- Primary config: `.storybook/`
- Test integration: Vitest project `storybook` (see `test:story*` scripts).

---

## 4. Testing Stack

- **Vitest** (unit/component): fast TS-first test runner.
- **@testing-library/react** & **jest-dom**: assertions & DOM helpers.
- **Vitest UI**: interactive runner via `vitest --ui`.
- **Playwright** is available for E2E if/when you add tests (script will be added when needed).

Typical commands:

```bash
pnpm test          # all projects
pnpm test:unit     # unit tests only
pnpm test:unit:ui  # open UI
````

---

## 5. Linting & Formatting

* **Lint:** `pnpm lint`
* **Format:** `pnpm format:fix`

---

## 6. Bundle Analysis

```bash
ANALYZE=true pnpm build
```

* `rollup-plugin-visualizer` generates an interactive treemap in `dist/stats.html` (path may vary).
* Open it in your browser to inspect bundle size.

---

## 7. Adding New Scripts

1. Add to `"scripts"` in `package.json`, but consult with maintainers first.
2. Keep names consistent (`:` for namespaces, e.g., `test:e2e`).
3. Document it here in this file.
