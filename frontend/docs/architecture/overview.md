
# Architecture Overview

This document explains **how our frontend is put together**, the main frameworks/libraries involved.

---

## 1. Goals & Principles

- **Feature-first, modular structure** – isolate business logic per feature.
- **Type-safe end to end** – strict TypeScript + Zod validation at boundaries.
- **Server State ≠ Client State** – server data via TanStack Query; minimal client state.
- **Composable UI** – small, reusable primitives (shadcn/radix-based) + composition patterns.
- **DX matters** – fast feedback loop (Vite, Vitest, Storybook 9).

---

## 2. Tech Stack (core)

- **[React](https://react.dev)** + **[TypeScript](https://www.typescriptlang.org)**
- **[Vite](https://vite.dev)** (dev & build)
- **[TanStack Router](https://tanstack.com/router/latest)** (routing)
- **[TanStack Query](https://tanstack.com/query/latest)** (server state, caching)
- **[Zod](https://zod.dev)** (runtime validation & schemas)
- **[React Hook Form](https://react-hook-form.com)** + **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** (forms)
- **[Tailwind CSS](https://tailwindcss.com)** + [`@tailwindcss/vite`](https://www.npmjs.com/package/@tailwindcss/vite) (styling)
- **[Storybook](https://storybook.js.org)** (component docs/playground)
- **[ESLint](https://eslint.org)** + **[Prettier](https://prettier.io)** (quality)
- **[Vitest](https://vitest.dev)** + **[Testing Library](https://testing-library.com)**

---

> This will be updated once the auth & routing are finished
