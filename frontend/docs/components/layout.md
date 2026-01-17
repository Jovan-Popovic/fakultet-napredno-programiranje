# Layout Components

- Layout components define **reusable page patterns**: app shells, navbars, sidebars, content areas, etc.

---

## 1. Why Layouts?

- **Consistency**: Shared headers/sidebars/footers across pages.
- **Separation**: Keep UI structure apart from page content.
- **Reusability**: Multiple screens can drop into the same layout pattern.

---

## 2. Where they live

Located under `src/layouts/*`.

Example:

````
src/layouts/dashboard/
├── index.tsx                 # <DashboardLayout />
├── components/
│   ├── navbar/
│   ├── sidebar/
│   ├── content/
│   └── ...
├── constants/                # configurations
├── hooks/                    # use-navigation, etc.
├── types/                    # navigation types
└── enums/                    # navigation enums

````

---

## 3. Principles

- **Structural**: layout components should render slots/children — no domain logic.
- **Composable**: export sub-components (e.g., `<DashboardLayout.Navbar />`, `<DashboardLayout.Sidebar />`).
- **Context if needed**: Provide layout-level context (e.g., expanded sidebar state), **but avoid leaking domain state**.
- **Accessibility**: Correct landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), keyboard navigation.

---

## 4. Dummy Example

```tsx
// src/layouts/dashboard/index.tsx
type DashboardLayoutProps = {
  element: ReactNode;
};

export const DashboardLayout = ({ element }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardLayoutNavbar />
      <DashboardLayoutSidebar />
      <DashboardLayoutContent>{element}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
````

Use it in a route:

```tsx
// In route files - layouts are applied automatically
// Dashboard content is passed as `element` prop
const Route = () => {
  return <Dashboard />
}

// Layout wrapping happens in route configuration
export const Route = createFileRoute('/_authenticated/')({
  component: () => <DashboardLayout element={<HomePage />} />
})
```

---

## 5. Testing & Stories

* **Stories**: show layout with placeholder children (skeleton content).
* **Tests**: snapshot is fine for layouts (structure), but test logic-heavy child components separately.

---

## 6. When to create a new layout

* Multiple pages share the **same skeleton** (shell).
* You need to **standardize** the structure and navigation for a feature area.
* You want to **compose** layout parts (e.g., swapping sidebars by route).
