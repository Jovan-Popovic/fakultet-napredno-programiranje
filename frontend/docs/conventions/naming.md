## Naming conventions

We **prefer `kebab-case` everywhere** (files, folders, test/story suffixes). Be boring and consistent.

### General rules

- **Files & folders:** `kebab-case`
- **Hooks:** start with `use-`, still `kebab-case` after the prefix
- **Tests:** `<base>.test.ts` / `<base>.test.tsx`
- **Stories:** `<base>.stories.tsx`
- **Markdown Docs:** `<base>.mdx`
- **Mocks / fixtures:** `<base>.mock.ts`, `<base>.fixtures.ts`
- **Types / enums / schemas** (optional suffixes, used where folders are not possible): `<base>.types.ts`, `<base>.enums.ts`, `<base>.schema.ts`
- **Avoid `index.ts[x]`** unless there is a strong reason (e.g., framework convention)

### Patterns & examples

| Kind                  | Pattern / Suffix            | Example filename                    |
|-----------------------|-----------------------------|-------------------------------------|
| Component             | `kebab-case.tsx`            | `user-card.tsx`                     |
| Hook                  | `use-<kebab>.ts[x]`         | `use-auth-token.ts`                 |
| Utility               | `kebab-case.ts`             | `format-date.ts`                    |
| Test                  | `<base>.test.ts[x]`         | `user-card.test.tsx`                |
| Storybook story       | `<base>.stories.tsx`        | `user-card.stories.tsx`             |
| Mock                  | `<base>.mock.ts`            | `auth-service.mock.ts`              |
| Fixture               | `<base>.fixtures.ts`        | `user.fixtures.ts`                  |
| Types                 | `<base>.types.ts`           | `user.types.ts`                     |
| Enums                 | `<base>.enums.ts`           | `permission.enums.ts`               |
| Schema (zod, etc.)    | `<base>.schema.ts`          | `login.schema.ts`                   |
| CSS                   | `kebab-case.css`            | `index.css`, `table.css`            |

### Do & Don’t

**✅ Do**

```
components/
└── user-card.tsx
hooks/
└── use-mobile.ts
queries/
└── auth/
    ├── user.ts
    ├── token.ts
```

**❌ Don’t**

```
components/
└── UserCard.tsx
hooks/
└── useMobile.ts
queries/
└── auth/
    ├── User.ts
    └── getUser.ts
```

### Why kebab-case?

- Plays nicely with most filesystems & tools.
- Visually consistent (no guessing between `camelCase`, `PascalCase`, `snake_case`).
- Keeps diffs and globs simpler.
