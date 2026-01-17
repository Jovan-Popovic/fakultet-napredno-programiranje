# Component Composition Patterns

Here are the simple patterns that can help to build flexible, maintainable components.

---

## 1. Headless Core + Styled Wrapper

- **Core logic** (state machines, accessibility handling, event logic) in a headless component/hook.
- **Styled wrapper** composes the core and applies styles / Tailwind.
- Great for **complex inputs**, tables, date pickers, etc.

---

## 2. Compound Components

Expose a family of components that share implicit state via React Context:

```tsx
<Sidebar>
  <Sidebar.Header />
  <Sidebar.Group>
    <Sidebar.Item />
  </Sidebar.Group>
</Sidebar>
````

* Keeps related pieces together.
* Avoids prop drilling: internal context shares state.

---

## 3. Polymorphic “asChild” / Slot Pattern

* Using Radix’s `<Slot asChild>` for **polymorphic components**.
* Lets consumers render different HTML tags without losing styling/behavior.

---

## 4. Controlled vs. Uncontrolled

* **UI primitives** can be uncontrolled by default (with sensible defaults).
* Allow **controlled mode** when consumers pass `value` + `onChange`.
* Document which mode is supported.

---

## 5. Context + Hooks

* Extract shared state logic into `useSomething()` + `SomethingProvider`.
* Components read from context to avoid prop drilling.
* Keep the context **local to the component family** (don’t leak globally unless necessary).

---

## 6. Class Variants (`cva`) + `cn`

* Manage style variants in **one place** using `class-variance-authority`.
* Compose classes safely using `tailwind-merge` inside a `cn()` helper.
* **Never inline huge conditional class strings** across files.
* These implementations are found in `utils/css/`.
* When component implementations don't match this, still try to perform similar approaches so that end developer can have multiple variants for components.

---

## 7. Render Props (sparingly)

* Use when consumers need **maximum flexibility** without forking your component.
* Gives developer high control over components.
* Prefer compound components/context when ergonomics matter.

---

## 8. Error Boundaries at the Right Level

* Use local error boundaries for **complex, self-contained widgets**.
* Global error boundaries belong to the app shell.

---

## 9. API Surface (exports)

* Keep the **public API small**.
* Re-export only what’s needed from an `index.tsx`.
* Use explicit named exports (no default) to keep auto-imports consistent.

---

## 10. Testing Strategy

* **Core/headless logic**: unit tests (pure functions, headless hooks).
* **Styled wrappers**: component tests using Storybook.
* **Compound components**: test composability (render children, context sharing).
* **Polymorphic components**: assert rendered tag and forwarded props/refs.

---

## 11. Checklist Before You Ship a Component

* [ ] Clean separation: headless/core vs. styled wrapper (if applicable).
* [ ] Props are **strictly typed** (no `any`, narrow unions for variants).
* [ ] Accepts `ref` when makes sense.
* [ ] Has a Storybook story for main states & variants.
* [ ] Tested for logic-heavy parts.
* [ ] Accessible by default (ARIA, focus, keyboard).
* [ ] Styles consolidated with `cva` (if variants exist).
