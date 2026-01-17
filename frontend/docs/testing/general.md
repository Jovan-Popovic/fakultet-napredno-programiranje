# Testing Guidelines

Covers **unit tests** (pure logic, hooks, utilities, pipelines) and **Storybook-driven component tests** (our UI library & larger feature pieces).

---

## Tooling

- **Test runner:** [Vitest](https://vitest.dev/)
- **UI testing utils:** `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- **Storybook** + `@storybook/addon-vitest` for component tests that reuse stories
- **Config/bootstrap:** `config/test/unit-setup.ts`
- **Coverage:** `@vitest/coverage-v8`

---

## Commands

From `package.json`:

| Script             | What it runs                                                        |
|--------------------|---------------------------------------------------------------------|
| `pnpm test`        | Run **all** Vitest projects headlessly (unit + storybook)          |
| `pnpm test:unit`   | Run only the **unit** Vitest project                                |
| `pnpm test:unit:ui`| Open the **Vitest UI** for unit tests (great for debugging)         |
| `pnpm test:story`  | Run only the **storybook** Vitest project                           |
| `pnpm test:story:ui`| Open the **Vitest UI** for storybook tests                         |

> Add `--coverage` to any of the above to generate coverage reports:
> ```bash
> pnpm test:unit --coverage
> ```

---

## File placement & naming

We **prefer `kebab-case`** everywhere.

- **Co-locate** tests with the code they document/test.
- **Test files:** `<base>.test.ts` / `<base>.test.tsx`
- **Stories:** `<base>.stories.tsx`

**✅ Do**

```text
components/
└── button/
    ├── button.tsx
    ├── button.test.tsx
    └── button.stories.tsx
utils/
└── url/
    ├── query.ts
    └── query.test.ts
````

**❌ Don’t**

```text
tests/
└── random-folder/
    └── my-tests.test.ts   # detached from the subject-under-test
```

---

## Unit tests

### What must be unit-tested?

* **All utilities** (`src/utils/**`).
* **Pipelines & functions** that power components or services (e.g., table column builders, query key factories, token utilities, permission calculators).
* **Hooks** (logic-heavy ones): keep them small & test their behavior, not implementation details.

### What’s optional?

* Simple “glue” code that delegates to other tested logic may not need unit coverage—**but document your decision in the PR**.

### Do / Don’t

**✅ Do**

* Test **behavior**, not implementation details.
* Use Testing Library **queries by role** and **userEvent** (no direct `.click()` unless necessary).
* Assert with `@testing-library/jest-dom` matchers (`toBeInTheDocument`, `toHaveTextContent`, …).
* NOTE: This may change over time

**❌ Don’t**

* Snapshot everything. Use snapshots **sparingly**, mainly for stable markup contracts.
* Mock React or the component under test itself.
* Test third-party libraries; test how **your code** uses them.

### Example: utility test

```ts
// src/utils/url/query.test.ts
import { buildQuery } from './query';

describe('buildQuery', () => {
  it('builds a query string without nullish values', () => {
    const q = buildQuery({ page: 1, q: null });
    expect(q).toBe('?page=1');
  });
});
```

### Example: pipeline/function test

```ts
// src/queries/keys/queries.test.ts
import { queryKeys } from './queries';

describe('queryKeys', () => {
  it('returns stable keys', () => {
    expect(queryKeys.user.me()).toEqual(['auth', 'user', 'me']);
  });
});
```

---

## Component tests (Storybook + Vitest)

**Every component in our UI library (`src/components/ui`, `src/components/form`, `src/components/layouts`) must:**

1. **Have Storybook stories** demonstrating its states/variants.
2. **Be covered by Vitest tests when it has meaningful logic.**

### Why stories?

* They are living documentation for designers & developers.
* Promote **visual regression** and **interaction** tests (via Storybook Test Runner or Vitest + `@storybook/addon-vitest`).
* Encourage isolated, accessible APIs.

### When to add Storybook **tests**?

* Complex stateful components (e.g., `table`, `select`, `date-picker`, `sidebar`).
* Feature-level components where interactions are critical.
* Any component that introduces **branching logic**, **a11y behaviors**, **keyboard handling**, etc.

### Example: testing a component via its story

```ts
// src/components/ui/button/index.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

export default {
  title: 'UI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export const Primary: StoryObj<typeof Button> = {
  args: { children: 'Click me', variant: 'primary' },
};
```

```ts
// src/components/ui/button/index.stories.test.tsx
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './index.stories';

const { Primary } = composeStories(stories);

describe('Button (stories)', () => {
  it('renders primary button', () => {
    render(<Primary />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
```

---

## Hooks tests

* For **logic-heavy hooks**, use `@testing-library/react`’s `render` on a dummy component or `@testing-library/react-hooks` alternative patterns (Vitest + RTL component wrapper works fine).
* Mock dependencies with `vi.mock` where needed.

---

## Mocks & test utils

* Prefer **realistic** tests. Mock **only boundaries** (e.g., network, time).
* Use `vi.spyOn` or `vi.mock` for module-level mocks.
* Put **shared test utilities** under `src/test/` (or `config/test/` if they are global bootstraps). You already have `config/test/unit-setup.ts`.

---

## Coverage & Quality Gates

* Run coverage locally with `--coverage`.
* (Optional, recommended) Set **coverage thresholds** in `vitest.config.ts` to avoid regressions.
* Don’t chase 100%—**cover the risk** (business logic paths, critical UI states, error paths).

---

## Storybook a11y & interactions

* Use `@storybook/addon-a11y` to fix accessibility issues early.
* Write **`play` functions** for interactive scenarios (clicking, typing, etc.).
* You can hook Vitest to run assertions against stories (as shown above) or use Storybook’s test runner.

---

## Checklist before merging

* [ ] Utilities / pipelines have **unit tests**.
* [ ] New or modified UI components have **stories**.
* [ ] Complex components/features have **tests** (Vitest or Storybook tests).
* [ ] Tests assert **behavior**, not implementation details.
* [ ] Coverage is not regressing significantly.

---

## TL;DR (what we expect)

- **Every utility module must have a unit test.**
- **Any non-trivial function/pipeline that powers components must have unit tests.**
- **Every reusable UI component in our library must have a Storybook story** (as documentation & for visual/manual testing).
- **Add Storybook/Vitest tests when the component has logic, state, or complex rendering.**
- **When building bigger features or page sections, add Storybook stories and test them (interaction/visual regressions where appropriate).**
