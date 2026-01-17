# Frontend Docs

This repository contains the codebase for our frontend, a single-page application constructed using [React](https://react.dev).

## 🚀 Quick Start

### Prerequisites

- **[Node.js](https://nodejs.org)** 22+
- **[pnpm](https://pnpm.io)** 10+ (preferred package manager)

### Development Setup

1. **Install dependencies**
   ```bash
   cd /frontend
   pnpm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```


## 🛠 Tech Stack

### Core Framework
- **[React](https://react.dev)** with **[TypeScript](https://www.typescriptlang.org)** for type safety
- **[Vite](https://vitejs.dev)** for lightning-fast development and builds
- **[Tailwind CSS](https://tailwindcss.com)** for utility-first styling

### Routing & State
- **[TanStack Router](https://tanstack.com/router)** for type-safe routing with auto-generated route trees
- **[TanStack Query](https://tanstack.com/query)** for server state management and caching
- **[React Context](https://react.dev/learn/passing-data-deeply-with-context)** for client-side state management

### UI & Components
- **[Radix UI](https://www.radix-ui.com)** primitives for accessible, unstyled components
- **Custom component library** built on Radix + Tailwind
- **[React Hook Form](https://react-hook-form.com)** with **[Zod](https://zod.dev)** validation

### Development Tools
- **[Storybook](https://storybook.js.org)** for component development and documentation
- **[Vitest](https://vitest.dev)** for unit and integration testing
- **[Playwright](https://playwright.dev)** for end-to-end testing
- **[ESLint](https://eslint.org)** + **[Prettier](https://prettier.io)** for code quality

## 📁 Project Structure

```
src/
├── api/              # API client and type definitions
├── components/       # Reusable UI components
│   ├── ui/          # Base UI primitives (Button, Input, etc.)
│   ├── form/        # Form-specific components with validation
│   └── layouts/     # Layout components (Navbar, Sidebar, etc.)
├── contexts/        # React contexts for global state
├── hooks/           # Custom global React hooks
├── services/        # Business logic and external integrations
├── queries/         # TanStack Query definitions and keys
├── pages/           # Page components mapped to routes
├── routes/          # TanStack Router route definitions
├── styles/          # Global styles and Tailwind configuration
└── utils/           # Helper functions and utilities
```

## 🎯 Key Features

- **Type-safe routing** with auto-generated route trees
- **Comprehensive component library** with Storybook documentation
- **Advanced form handling** with validation and error management
- **Robust authentication** with JWT tokens and permissions
- **Responsive design** with dark/light theme support
- **Comprehensive testing** setup with unit, integration, and E2E coverage

## 📚 Documentation

- **[Complete Documentation](./docs/README.md)** - Comprehensive guides and references
- **[Architecture Overview](./docs/architecture/overview.md)** - System design and data flow
- **[Component Library](./docs/components/ui.md)** - Building components and common patterns
- **[API Data Flows](./docs/architecture/data-flow.md)** - Working with APIs & Services

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Unit tests only
pnpm test:unit

# Unit tests with UI
pnpm test:unit:ui

# Storybook tests only
pnpm test:story

# Storybook tests with UI
pnpm test:story
```

## 🎨 Storybook

Explore and test components in isolation:

```bash
pnpm story
```

Our Storybook includes:
- Interactive component playground
- Component documentation and usage examples

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm lint` | Run ESLint with auto-fix |
| `pnpm format:fix` | Format code with Prettier |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run all tests |
| `pnpm story` | Launch Storybook |

## 🏗 Development Workflow

1. **Feature Development**: Start with component design in Storybook
2. **Implementation**: Build components following our [conventions](./docs/conventions/naming.md)
3. **Integration**: Connect with routing, state management, and APIs
4. **Testing**: Write unit tests and update Storybook stories
5. **Documentation**: Update relevant documentation

See our [Component Development Guide](./docs/workflow/components.md) for detailed workflows.

## 🔐 Authentication & Permissions

The application uses JWT-based authentication with role-based permissions. Key areas:

- **Authentication Context**: `src/contexts/auth.tsx`
- **Token Management**: `src/utils/auth/token.ts`
- **Permission Services**: `src/services/permissions/`

> **Note**: Auth implementation is evolving as backend services are finalized, this section will be updated accordingly.

## 🎨 Styling & Theming

- **Tailwind CSS** for utility-first styling
- **Class Variance Authority** for component variants
- **Dark/Light themes** with system preference detection
- **Responsive design** with mobile-first approach

## 🤝 Contributing

1. Follow our [coding standards](./docs/development/code-standards.md)
2. Write tests for new & important features
3. Update documentation for significant changes after consulting with maintainers
4. Use conventional commit messages
5. Ensure all checks pass before submitting MRs

## 🔍 Troubleshooting

**Development server won't start?**
- Check Node.js version (21+)
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check port availability (default: 5173)

**Type errors?**
- Run `pnpm build` to see TypeScript errors
- Check route generation: routes are auto-generated from file structure

**Need Help?**
- Check our [comprehensive documentation](./docs/README.md)
- Consult team members for domain-specific questions
- Update the docs when needed
