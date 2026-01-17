# Form Components

Form components are **higher-order wrappers** around UI primitives that add a **React Hook Form (RHF) control layer**: labels, validation errors, touched state, helpers, etc.

---

## 1. Purpose

- Encapsulate `useController` logic.
- Expose a **clean prop surface** for forms (field name, rules, schema integration).
- Separate **view (UI component)** from **control (form state)**.

---

## 2. Structure

Located under `src/components/form/*`.

A typical form component is composed of:

````
src/components/form/<field>/
├── index.tsx             # <ControlledX> that binds RHF control + UI primitive
├── index.stories.tsx
├── index.test.tsx        # (if logic-heavy)
├── components/           # additional components
├── hooks/                # form-specific hooks (e.g., useFormField)
├── schemas/              # reusable zod schemas for form validations
└── utils/                # utilities/helpers.
````

> Complexity & size of form fields varies from components potential use cases. It's important to keep it modular and extendable.
---

## 3. Rules

- **UI stays dumb**: `src/components/ui/input` should never import RHF.
- **Form components wrap UI**: `src/components/form/input` binds RHF to UI’s `<Input />`.
- **Typed props**: `name` must always be typed; use generics to tie `FormValues` to fields.
- **Validation**: Zod schemas + `zodResolver` on the form level.
- **Consistent error surface**: show `message.tsx` / `icon.tsx` patterns uniformly.

---

## 4. Example Implementation

- Refer to [input form field](../../src/components/form/fields/input/index.tsx) & it's stories as example.

---

## 5. Forms End-to-End

* **Form provider** using `FormProvider` so nested form components can access `useFormContext`.
* **Schema-first** with Zod:
  * Schema -> `zodResolver(schema)` -> typed `useForm<SchemaType>()`.
* **Field arrays**, dynamic fields, async selects → encapsulate complexity in dedicated form components.

---

## 6. When to write a form component

* When you need **RHF + UI** integration.
* When a base UI component doesn’t handle validation display, touched states, etc.
* When multiple screens reuse the same controlled input pattern.
  * Page/Feature specific controlled implementations should remain within that page/feature, not component library.

---

## 7. Testing

* Prefer **integration-like unit tests**:

  * Mount `<FormProvider>` → render the field → simulate user events → assert `formState`.
* Ensure proper typing: the `name` prop should cause compile-time errors if it doesn’t belong to the form’s values.

---

## 8. Checklist

* [ ] Uses `useFormContext` (never manually manage form state).
* [ ] Forward props to underlying UI component.
* [ ] Shows consistent errors (icon + message).
* [ ] Strictly typed `name` prop.
* [ ] Stories covering common/edge cases (invalid state, disabled, async).
