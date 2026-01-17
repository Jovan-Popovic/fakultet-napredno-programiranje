# Code Standards

> The goal: **predictable, readable, testable code** that’s easy to review and refactor.
> This doc defines *how we write code* — the what/why live in other docs.

---

## 0. Scope & Enforcement

- **ESLint + Prettier** are the source of truth.
- CI rejects code that doesn’t pass **lint, typecheck, and tests**.
- Follow these rules unless there’s a documented exception, or a comment with a ticket reference.

---

## 1. Golden Rules

1. **Strong typing everywhere** — no `any` (use `unknown` + narrow where needed).
2. **Separation of concerns** — components don’t call Axios; hooks don’t render; services don’t know React.
3. **Prefer composition over inheritance.**
4. **Kebab-case filenames and folders** (see *[Naming Conventions](../conventions/naming.md)* doc).
5. **Tests for utilities & non-trivial logic** (see *[Testing](../testing/general.md)* doc).
6. **Storybook stories for all UI components**.
7. **Minimal global state** — server state in TanStack Query, form state in RHF, UI state in components.

---

## 2. Linting, Formatting & Type-Checking

- **TypeScript strict mode**:
  - `pnpm typecheck`
  - build runs typechecks too
  - Prefer **native TS strictness** over helpers like `ts-reset` (not adopted here).
- **ESLint** + **Prettier**, run via:
  - `pnpm lint` (with autofix)
  - `pnpm format:check`

---

## 3. TypeScript Standards

- **No `any`** — use:
  - `unknown` when you need to validate.
  - `never` to enforce exhaustiveness.
- **Return types are explicit** for public functions and services.
- **Prefer discriminated unions** over `enum` when modeling finite states.
- Avoid `as const` all over the place unless it actually enforces a contract.
- Avoid `!` (non-null assertions). Fix the types or guard.

---

## 4. File, Folder & Export Standards

- **Filenames & directories**: `kebab-case.ts[x]`.
- **One React component per file** unless it’s a compound component family, or a tiny sub-part of a bigger component.
- **Avoid `index.ts` barrel exports by default.** Import concrete files to keep resolution explicit and avoid circular deps.
- Co-locate tests (`*.test.ts[x]`) and stories (`*.stories.tsx`) with the component/hook.
- Shared logic for multi-variant components (e.g., select/date-picker) goes under `common/`.

See: [`docs/architecture/project-structure.md`](../architecture/project-structure.md) and [`docs/conventions/naming.md`](../conventions/naming.md)

---

## 5. React & Components

- **Functional components only**; **no default exports** (named exports are easier to refactor/search).
- **Strictly typed props** (`React.ComponentProps<'button'>`, `VariantProps<typeof cva>`, etc.).
- **Use `forwardRef`** when the component is interactive or likely to be focused.
- **Accessibility-first**: ARIA roles, keyboard support, focus states (Radix primitives help).
- **Styling**
  - Tailwind v4 + `class-variance-authority (cva)` for variants.
  - Use `tailwind-merge` for safe class merging (wrap with `cn()` helper).
- **No business logic** in UI components — logic lives in hooks/services.

---

## 6. Hooks

- Must start with `use-` **except** for the ones inside `queries/`.
- **Only call inside React function bodies** (components or other hooks).
- **Encapsulate framework/state logic** (React Query, Router, etc.) and expose a **clean API** to components.
- Prefer **small, focused hooks** over monoliths. Split when a hook grows significantly.

---

## 7. State Management

- **Server state** → **TanStack Query**.
  - Keys live in `src/queries/keys/*` (or alongside the query hook if scoped).
  - Always strongly type the `queryFn` return type.
- **Form state** → **React Hook Form** (zodResolver).
- **UI/local state** → component state (`useState`, `useReducer`).
- **No Redux/Zustand** for now (can be introduced later if justified and documented).

---

## 8. Services & API

- **Services go in `src/services/**`**. They:
  - Talk to Axios (via `src/api/*` clients).
  - Parse/validate with Zod.
  - Contain **business logic** and domain transformations.
  - Are **React-agnostic** (never import React, never call React Query).
- **Components must not use services directly.** Use **hooks** to wire services to the UI via TanStack Query.
- **Axios instances** live in `src/api/`, with interceptors, base URLs, auth headers, etc.
- **Never throw raw Axios errors** — normalize at the service layer.

---

## 9. Forms

- **RHF + Zod** for validation.
- Form components under `src/components/form/**` wrap **UI primitives** to provide RHF bindings (Controller/useController).
- **Field errors & labels** are consistent across all fields (shared error components).
- Use **strictly typed `name`** props (generics tied to form schema types).

---

## 10. Routing

- **TanStack Router (file-based)**.
- For now: `src/pages/*` maps 1:1 to `src/routes/*`.
- **No business logic in routes** — when auth lands, we’ll use `beforeLoad`/guards.
- Never edit `routes-tree.gen.ts`.
- See [Routing docs](../architecture/routing.md)

---

## 11. Error Handling

- **API errors** normalized in Axios interceptors / services.
- **UI errors** handled in hooks/components (toast, fallback UIs).
- Global **ErrorBoundary** in app shell; local boundaries only for complex widgets.

---

## 12. Testing

- **Every utility module must have tests.**
- **Pipelines / non-trivial functions** must be covered.
- **Every reusable UI component must have stories.** Add tests for logic-heavy parts.
- **Hooks**: test behavior (loading/error/success), not implementation details.
- **Use Vitest + Testing Library**. Coverage is encouraged, but don’t chase 100% blindly — cover risk.
- See [Testing docs](../testing/general.md)

---

## 13. Accessibility

- Prefer **Radix** primitives to inherit a11y by default.
- All interactive elements must be keyboard accessible.
- Use `@storybook/addon-a11y` to catch regressions.

---

## 14. Performance

- Prefer **React.lazy / code-splitting** for heavy routes/components.
- **Memoize** only when there’s a measured/rendered perf problem.
- Derive state when possible; avoid duplicating derived values.
- Use **React Query** for server state to prevent unnecessary re-fetches/double renders.

---

## 15. Comments, TODOs & Deprecations

- **Prefer self-explanatory code** over comments.
- Allowed tags:
  - `// TODO(JIRA-123): …`
  - `// FIXME(JIRA-123): …`
  - `// DEPRECATED(JIRA-123): …`
- Remove TODOs when addressed.

---

## 16. Dependencies

- Prefer **well-maintained, typed** packages.
- Avoid giant UI frameworks unless discussed (we build on Radix + Tailwind).
- Keep `package.json` lean; remove unused deps.

---

## 17. Security

- Never commit secrets (env, tokens).
- Validate/encode user input properly.
- Sanitize any HTML rendering (rare).

---

## 18. When to Write an Architecture Decision Record (ADR)

- Any decision that significantly changes:
  - Architecture
  - Dependency stack
  - State management approach
  - Error handling
  - Testing strategy

> We don't have it for now; to be added if needed.

---

## 19. Breaking the Rules

- If you must, **document why** (PR description or ADR).
- Add a lint disable comment **with a reason** and preferably a ticket:
  ```ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we receive unknown payloads from <service>; validated downstream (JIRA-123)

---

## 20. JSDoc & Inline Documentation

We rely on strong TS types, but **JSDoc is required where types alone don’t explain intent, side-effects, or contracts**.

### 20.1 Where JSDoc is **mandatory**

- **`src/services/**`** exported functions:
  - Document **what the function does**, **its domain contract**, **transforms**, and **normalized errors**.
  - Use `@throws` to document domain-specific errors (e.g., `AuthError`, `PermissionError`).
- **`src/utils/**`** non-trivial utilities (e.g., `auth/token.ts`, `url/query`, `css/index.ts`) — particularly those with edge cases or tricky transformations.
- **Complex hooks** (especially in `src/queries/**` and global hooks in `src/hooks/**`):
  - Document the **shape of the returned object**, side-effects (e.g., subscriptions, timers), and key configuration (stale times, retry logic).
- **Query key factories** under `src/queries/keys/**`:
  - Document **key structure** and **usage conventions**.
- **Context providers** exposing a public API.
- **Domain-specific enums/types** where semantics aren’t obvious from the name.

### 20.2 Where JSDoc is **optional / avoid noise**

- Simple, purely presentational components (props are self-documenting).
- Tiny wrapper functions whose intent is obvious and covered by types.
- Tests and stories (write expressive code instead).

### 20.3 Examples

**Service**

```ts
/**
 * Fetches the current user from the API and normalizes the shape to our domain model.
 *
 * @returns The authenticated user or throws an AuthError if the token is invalid/expired.
 * @throws {AuthError} When authentication fails.
 */
export async function getCurrentUser(): Promise<User> { ... }
