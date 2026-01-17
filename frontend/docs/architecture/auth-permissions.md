# Authentication & Permissions Architecture

**We use [IAM (Identity Access Management)](https://en.wikipedia.org/wiki/Identity_management) integration with JWT tokens.**  Here we cover the complete authentication system, permissions model, and route protection.

---

## 1. Authentication Flow

### Initial Login
- User is redirected to **external IAM service** (OneLogin-style OAuth flow).
- IAM returns with authorization code in callback URL.
- Frontend exchanges code for JWT tokens via API endpoint.
- Tokens are stored in `localStorage` and user profile fetched.

### Token Management
- **Access Token**: Short-lived JWT with user session data.
- **Refresh Token**: Long-lived JWT for automatic token renewal.
- Both stored in `localStorage`.
- Automatic auth refresh if refresh token exists.

### Session Lifecycle
- **Login**: IAM redirect → code exchange → token storage → user data fetch.
- **Token refresh**: App startup checks refresh token → renews access token if valid.
- **Logout**: Clear tokens from `localStorage` → reset auth state.

---

## 2. JWT Tokens & Bearer Authentication

**We use [JWT (JSON Web Tokens)](https://jwt.io/) for stateless authentication with Bearer token authorization.**

JWT tokens serve as:
- **Authentication proof**: Verify user identity without server-side sessions
- **Authorization data**: Carry user permissions and metadata
- **Bearer tokens**: Sent in `Authorization: Bearer {token}` headers

---

## 3. Permissions System

### Permission Hierarchy
The system enforces a clear hierarchy of permission checking:

1. **System Admin**: Users with system-level `admin` permission have access to everything
2. **System Permissions**: Global access across all workspaces (override workspace permissions)
3. **Workspace Admin**: Users with workspace-level `admin` permission have full workspace access
4. **Workspace Permissions**: Scoped to specific workspaces


### Current Permission Types
- **Application-level permissions**: Each API endpoint will have its own specific permissions
- **Frontend permissions**: All permissions used in the frontend must exist in the `UserPermissions` enum (`src/services/auth/enums/permission.ts`)
- **Backend permissions**: Granular permissions (create, read, update, delete) are added as needed

---

## 4. Authentication Context

Authentication is handled by a **global auth context** that:

- **Manages authentication state**: Tracks login status, user data, and loading states
- **Handles token lifecycle**: Automatic token refresh on app startup, logout cleanup
- **Provides permission checking**: used for UI and route protection
- **Exposes user data**: Current user profile, workspace access, computed properties (initials, admin status)
- **Wraps the entire app**: Available throughout the component tree via `useAuth()` hook

---

## 5. Route Protection

### Route Security System
Route protection is implemented through a layered architecture:

#### RouteSecurityProvider
- **Global context**: Wraps the entire router with security logic
- **Permission checking**: Uses `useRouteGuard` hook for unified route access control
- **Automatic redirects**: Routes without access redirect to specified paths or home

#### Route Static Data
Each route can define security requirements in its static data:

```typescript
static: {
  security: {
    permissions: [UserPermissions.USER_MANAGEMENT],
    requireAll: false,
    redirectTo: '/unauthorized'
  }
}
```

#### beforeLoad Hook
Routes use `beforeLoad` to check permissions before rendering:
- Retrieves security config from route static data
- Checks user permissions using RouteSecurityProvider
- Throws redirect if access denied
- Runs before route component loads

#### Navigation Filtering
The navigation system automatically filters menu items based on route permissions:
- Uses router's flat routes to check accessibility
- Hides navigation items for routes the user cannot access
- Maintains clean UI without unauthorized options

See **[Routing Architecture](./routing.md)** for detailed implementation.

---

## 6. Permission Checking

### Permission System

The permission system provides flexible checking capabilities with a clear hierarchy:

#### Basic Permission Checking
```typescript
import { useAuth } from '@/contexts/auth';
import { UserPermissions } from '@/services/auth/enums/permission';

const MyComponent = () => {
  const {
    hasPermission,
    hasPermissions,
    isSystemAdmin,
    isWorkspaceAdmin
  } = useAuth();

  // Single permission check (checks system admin → system perms → workspace perms)
  if (hasPermission(UserPermissions.ADMIN)) {
    return <AdminPanel />;
  }

  // Require ANY permission
  if (hasPermissions([UserPermissions.READ, UserPermissions.WRITE])) {
    return <DataView />;
  }

  // Require ALL permissions
  if (hasPermissions([UserPermissions.READ, UserPermissions.DELETE], true)) {
    return <AdvancedActions />;
  }

  // Check admin status directly
  if (isSystemAdmin()) {
    return <SystemAdminPanel />;
  }

  if (isWorkspaceAdmin()) {
    return <WorkspaceAdminPanel />;
  }

  return <AccessDenied />;
};
```

#### Permission Hierarchy Details
- **System Admin**: `isSystemAdmin()` checks for system-level admin permission
- **System Permissions**: Override workspace permissions for the same permission type
- **Workspace Admin**: `isWorkspaceAdmin(workspaceId?)` can check specific workspace or current
- **Workspace Permissions**: Checked last in the hierarchy

#### Permission Guard Component
For declarative permission checking, use the `PermissionGuard` component:

```typescript
import { PermissionGuard } from '@/contexts/auth/components/guards/permission';
import { UserPermissions } from '@/services/auth/enums/permission';

const MyComponent = () => {
  return (
    <PermissionGuard
      permissions={[UserPermissions.USER_MANAGEMENT]}
      fallback={<AccessDenied />}
    >
      <UserManagementPanel />
    </PermissionGuard>
  );
};
```

#### Advanced Permission Patterns
```typescript
// Require ALL permissions
<PermissionGuard
  permissions={[UserPermissions.READ, UserPermissions.WRITE]}
  requireAll={true}
  fallback={<InsufficientPermissions />}
>
  <EditableContent />
</PermissionGuard>

// Require ANY permission (default behavior)
<PermissionGuard
  permissions={[UserPermissions.ADMIN, UserPermissions.MODERATOR]}
  requireAll={false}
>
  <ModerationTools />
</PermissionGuard>

// All Workspaces filtering patterns
<PermissionGuard
  permissions={[UserPermissions.USER_MANAGEMENT]}
  requireAllWorkspaces={true}
  fallback={<SystemUserManagementNotAvailable />}
>
  <SystemUserManagement />
</PermissionGuard>

<PermissionGuard
  permissions={[UserPermissions.USER_MANAGEMENT]}
  hideOnAllWorkspaces={true}
  fallback={<WorkspaceUserManagementNotAvailable />}
>
  <WorkspaceUserManagement />
</PermissionGuard>
```

#### All Workspaces Filtering

The system includes a special "All Workspaces" filtering mechanism available to system administrators:

**Hardcoded Business Logic (Frontend-Only)**
- The "All Workspaces" option is **hardcoded in the frontend** as a special workspace record
- System administrators automatically see this option in their workspace selector
- This functionality is **not backend-driven** - it's pure frontend business logic

**Usage Patterns**
```typescript
const { isCurrentAllWorkspace } = useAuth();

// Manual checking
if (isCurrentAllWorkspace) {
  return <SystemWideView />;
} else {
  return <WorkspaceSpecificView />;
}

// Declarative with PermissionGuard (see Advanced Permission Patterns above)
```

#### Consolidated Permission API
The auth context now provides a simplified API:
- **`hasPermissions(permissions[], requireAll?)`**: Replaces `hasAnyPermissions` and `hasAllPermissions`
- **`isSystemAdmin()`**: Direct system admin check
- **`isWorkspaceAdmin(workspaceId?)`**: Workspace admin check for current or specified workspace
- **`hasPermission(permission)`**: Single permission check with full hierarchy
- **`isCurrentAllWorkspace`**: Boolean flag indicating if "All Workspaces" is currently selected

---

## 7. Local Development & IAM Setup

### Development Configuration
- **IAM Proxy**: Connect to IAM service through API proxy or dedicated proxy server
- **Local Setup**: Start IAM locally, configure credentials in environment variables

### Connection Setup
- Backend API acts as **proxy to IAM service**
- All IAM communication goes through our API endpoints
- Frontend never communicates directly with IAM, except when its redirected to it during login process.
- Authentication state is managed locally while identity is handled by IAM
