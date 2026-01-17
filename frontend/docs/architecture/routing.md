# Routing Architecture

**We use [TanStack Router](https://tanstack.com/router/latest) with authentication-based layout routes.** Here we cover the complete routing system including route protection.

---

## 1. Route Structure

### Core Files
- **`src/router/routes/__root.tsx`** – Root route with auth context and loading states
- **`src/router/routes/_authenticated.tsx`** – Layout route for protected pages (requires login)
- **`src/router/routes/_guest.tsx`** – Layout route for public pages (login, register, etc.)
- **`src/router/routes-tree.gen.ts`** – Auto-generated route tree (never edit manually)
- **`src/router/index.tsx`** – Router configuration and setup
- **`src/router/config/route-metadata.ts`** – Route security configuration registry
- **`src/router/utils/route-permissions.ts`** – Permission checking utilities for routes

### Route Hierarchy
```
src/router/routes/
├── __root.tsx (auth context + loading)
├── _authenticated.tsx (protected route guard)
│   ├── index.tsx (dashboard home)
│   ├── accounts/index.tsx
│   ├── facebook-pages/index.tsx
│   ├── facebook-pixels/index.tsx
│   ├── users/index.tsx
│   ├── workspaces/index.tsx
│   └── workspace-selection/index.tsx
├── _guest.tsx (public route guard)
│   └── login/index.tsx
└── routes-tree.gen.ts (auto-generated)
```

---

## 2. Authentication-Based Route Protection

- **Root Routes**: Provides global auth context and handles app loading state
- **Protected Routes**: Guards all routes that require authentication
- **Guest Routes**: Prevents authenticated users from accessing guest-only pages

---

## 3. Route Organization

### Page-to-Route Mapping
- **1:1 mapping**: Every screen in `src/pages/**` has a matching route file in `src/router/routes/**`
- **Layout integration**: Routes wrap page components in appropriate layouts
- **Route security**: Each route file co-locates its security configuration using `registerRouteSecurityConfig`

### Route Nesting
- **Protected routes**: All go under `_authenticated/` directory
- **Public routes**: All go under `_guest/` directory
- **Layout routes**: `_authenticated` and `_guest` serve as layout boundaries with different authentication behaviors.

---

## 4. Development Guidelines

### Route Constraints
- **Routes stay lightweight**: Only handle routing logic and layout wrapping
- **No business logic**: Keep API calls, state management in pages/contexts
- **Authentication checks**: Handled by layout routes (`_authenticated`, `_guest`)
- **Authorization/Permission checks**: Use co-located security config with `registerRouteSecurityConfig`
- **Manual redirects**: Avoid manual auth checks in individual routes

### Route Security Configuration
- **Co-located config**: Each route defines its own security requirements
- **Permission-based access**: Routes can require specific permissions using `UserPermissions`
- **Flexible requirements**: Routes can require `ANY` or `ALL` specified permissions
- **Registry pattern**: Security configs are registered centrally for navigation consumption

---

## 5. Special Route Behaviors

### Authentication Flow
- **Auto-redirect**: Unauthenticated users automatically redirected to `/login`
- **Return URL**: Original URL preserved in search params for post-login redirect
- **IAM integration**: Login page handles OAuth flow with external IAM service
- **Route guard**: Authenticated users are redirected away from login/register pages

### Home Page Protection
- **Root route** (`/`) is protected (under `_authenticated/`)
- **Landing page**: Unauthenticated users see login instead of home
- **Post-login redirect**: Users return to intended page after authentication
- **Dashboard layout**: Protected routes use DashboardLayout with full navigation

### Permission-Based Access
- **Route-level permissions**: Individual routes can require specific permissions
- **Automatic redirects**: Users without required permissions are redirected to home
- **Permission checking**: Uses the same permission system as components
- **Co-located security**: Security requirements are defined alongside route components

---

## 6. Route Security Implementation

### Co-located Security Configuration
Each route file defines its security requirements alongside the route component:

```typescript
// src/router/routes/_authenticated/users/index.tsx
import { registerRouteSecurityConfig, type RouteSecurityConfig } from '@/router/config/route-metadata';
import { UserPermissions } from '@/services/auth/enums/permission';

const routeSecurityConfig: RouteSecurityConfig = {
  permissions: [UserPermissions.USER_MANAGEMENT],
  requireAll: false // User needs ANY of the specified permissions
};

registerRouteSecurityConfig('/users', routeSecurityConfig);

export const Route = createFileRoute('/_authenticated/users/')({ ... });
```

---

## 7. Route Development Patterns

### Adding New Protected Routes
1. **Create route file** under `src/router/routes/_authenticated/`
2. **Define security config** with required permissions
3. **Register security config** using `registerRouteSecurityConfig`
4. **Wrap with DashboardLayout** for full navigation experience

### Adding New Public Routes
1. **Create route file** under `src/router/routes/_guest/`
2. **Use MinimalLayout** for focused experiences
3. **Handle authenticated users** if they shouldn't access the route

### Route File Structure
```typescript
// Import required components and utilities
import { UserPermissions } from '@/services/auth/enums/permission';
import { registerRouteSecurityConfig, type RouteSecurityConfig } from '@/router/config/route-metadata';
import { DashboardLayout } from '@/layouts/dashboard';
import { MyPageComponent } from '@/pages/my-page';

// Define security requirements (optional)
const routeSecurityConfig: RouteSecurityConfig = {
  permissions: [UserPermissions.REQUIRED_PERMISSION],
  requireAll: true
};

// Register security config
registerRouteSecurityConfig('/my-page', routeSecurityConfig);

// Export route configuration
export const Route = createFileRoute('/_authenticated/my-page/')({
  component: () => <DashboardLayout element={<MyPageComponent />} />
});
```

---
