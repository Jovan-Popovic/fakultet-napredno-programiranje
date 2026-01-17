# UI Components

Found under `src/components/ui/*`. These are **low-level, reusable, stateless (or minimally stateful) primitives** you can compose anywhere in the app.

---

## 1. Libraries & Sources

- **[Radix UI](https://www.radix-ui.com)** – accessibility-first primitives (we wrap/style them).
- **[Lucide](https://lucide.dev)** – icon set of choice.
- **[Shadcn UI](https://ui.shadcn.com)** – we **copy/paste** from the repo (no CLI). Use it for quick starts.

If a component doesn’t exist there:

1. Build it from **Radix primitives**.
2. Use a **trusted external module**.
3. **Build from scratch** (last resort).

---

## 2. Folder Structure

- Located under `src/components/ui/*`.
- Each component should preferably live in **its own folder** with optional subfolders:

```

src/components/ui/<component>/
├── index.tsx                # public API for the component
├── index.stories.tsx        # Storybook stories
├── index.test.tsx           # tests (if logic-heavy)
├── components/              # leaf parts (headers, footers, items...)
├── hooks/                   # internal hooks
├── utils/                   # helpers
├── types/                   # TS types, interfaces
├── enums/                   # enums for variants, sizes, etc.
├── constants/               # constants (keys, variants, etc.)
└── common/                  # (optional) shared logic reused across variants (e.g., select, date-picker)

````

> If a component is small, a single `index.tsx` file is fine. Grow the folder only when needed.
> Use **`common/`** when multiple implementations (e.g., `select/basic`, `select/creatable`, `date-picker/single`, `date-picker/range`, etc.) share utilities, hooks, or types.

---

## 3. Requirements & Conventions

- **Strictly typed props** – no `any`. Prefer native prop helpers, e.g. `React.ComponentProps<'button'>`.
- **Refs where needed** – expose `forwardRef` for interactive elements (button, input, textarea, etc.).
- **Accessible by default** – leverage Radix primitives, ARIA roles, focus states.
- **Variants via `class-variance-authority (cva)`** – centralize style contracts.
- **Tailwind CSS + `tailwind-merge`** – safe class merging.
- **No business logic** – UI components are presentational (or lightly interactive).
- **Storybook stories for every valid use case** – this is your living spec.
- **Unit tests** for meaningful logic/branching (state machines, keyboard nav, etc.).

---

## 4. Example Button

```tsx
// src/components/ui/button/index.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, FC, ForwardRefExoticComponent, ReactNode, SVGProps } from "react";

import { Spinner } from "@/components/ui/spinner";
import { classNameManager } from "@/utils/css";

const { joinClasses, mergeClasses } = classNameManager;

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-gray-50 dark:bg-gray-900 shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type Props = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    icon?: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>;
    iconClassName?: string;
    text?: string | ReactNode;
    asChild?: boolean;
  };

export const Button: FC<Props> = ({
  className,
  variant,
  size,
  icon: Icon,
  iconClassName,
  loading = false,
  text,
  asChild = false,
  ...props
}) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={mergeClasses(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {Icon && !loading && <Icon className={iconClassName ? iconClassName : "h-5 w-5 shrink-0"} />}
      {loading && (
        <Spinner className={joinClasses(variant === "default" ? "text-white" : "", "h-5 w-5")} />
      )}
      {text && typeof text === "string" ? <span>{text}</span> : text}
    </Component>
  );
};
````

---

## 5. Icons (lucide-react)

* Prefer **typed wrappers** if you need consistent sizing/color usage.
* Inline usage is fine when standardization isn’t needed.
* If an icon doesn’t exist or is custom, **don’t inline raw SVGs in components**—wrap them as typed React components.

---

## 6. Testing & Stories

* **Stories are mandatory** for all UI components.
* Add **tests** when logic/branching exists (variants, keyboard handling, a11y behavior, controlled/uncontrolled flows, etc.).

---

## 7. Do & Don’t

**✅ Do**

* Compose from primitives.
* Stay strict with typing, default props, and ref forwarding.
* Extract **shared logic into `common/`** when the component has multiple implementations (e.g., `select`, `date-picker`).

**❌ Don’t**

* Put domain/business logic inside UI components.
* Hardcode tokens/permissions/checks inside UI.
* Rebuild what Radix provides unless there’s a strong reason.
