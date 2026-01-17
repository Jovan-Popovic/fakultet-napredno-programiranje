# Feature-Based Architecture

This document explains **how features are organized**, defining boundaries, structure, and communication patterns.

---

## 1. What is a Feature?

A **feature** is a self-contained business capability that:
- Represents a complete user workflow (e.g., "create workspace", "manage users")
- Contains all necessary components, logic, and state for that capability
- Has clear boundaries and minimal dependencies on other features
- Can be developed, tested, and maintained independently

---

## 2. Feature Structure

Features live under `src/features/{domain}/{feature-name}/`:

```
src/features/
└── users/
    ├── system/
    │   ├── create-user-modal/
    │   ├── edit-user-modal/
    │   └── delete-user-action/
    └── workspace/
        ├── create-user-modal/
        ├── edit-user-modal/
        └── delete-user-action/
```

---

## 3. Feature Boundaries

### When to Create a New Feature
- **Complete user workflow**: Represents a full user journey or task
- **Business capability**: Maps to a distinct business function
- **Independence**: Can be developed and tested without tight coupling to other features
- **Reusability**: Will be used across multiple pages or contexts

### When to Extend an Existing Feature
- **Related functionality**: Extends or modifies existing user workflow
- **Shared context**: Uses the same domain models and business logic
- **Similar patterns**: Follows same interaction patterns (e.g., another CRUD operation)

### Domain Organization
Features are organized by **business domain**:
- `workspaces/` - Everything related to workspace management
- `users/` - User management across different contexts
  - `system/` - System-level user operations
  - `workspace/` - Workspace-specific user operations

---

## 4. Cross-Feature Communication

### Allowed Patterns
1. **Shared Services**: Features can use shared services from `src/services/`
2. **Shared Queries**: Features can use shared query hooks from `src/queries/`
3. **Shared Components**: Features can use shared UI components from `src/components/`
4. **Event-based**: Features can communicate through URL state or global contexts

### Prohibited Patterns
- **Direct imports**: Features should not import from other features
- **Shared state**: Features should not share internal state or hooks
- **Tight coupling**: Features should not depend on other feature internals

---

## 5. Integration with Application Architecture

### Routing
- Features are consumed by pages in `src/pages/`
- Route definitions in `src/routes/` import and use features
- Features should not define their own routes

### State Management
- **Server state**: Use shared queries from `src/queries/`
- **Local state**: Keep within feature boundaries
- **Global state**: Use contexts from `src/contexts/` sparingly

### Services Integration
- Features consume business logic through `src/services/{domain}/`
- Services handle API communication and business rules
- Features focus on UI/UX and local interaction logic

---

## 6. Development Guidelines

### Naming Conventions
- **Domain-first** organization (group by business area)
- **Action-oriented** feature names (create-user, edit-workspace)

### Testing Strategy
- **Unit tests** for feature utilities and hooks
- **Integration tests** via Storybook stories for feature components
- **End-to-end workflows** tested at page level

### Performance Considerations
- **Code splitting**: Features are naturally split by domain
- **Lazy loading**: Features can be dynamically imported by pages
- **Bundle optimization**: Keep feature dependencies minimal

---

## 7. Migration from Existing Code

When converting existing code to feature-based structure:

1. **Identify user workflows** that can become features
2. **Group related components** under feature directories
3. **Move domain-specific logic** into feature boundaries
4. **Extract shared logic** to services or utilities
5. **Update imports** to use feature entry points

---

## 8. Best Practices

- **Start small**: Begin with focused, single-purpose features
- **Refactor gradually**: Extract features from existing code incrementally
- **Maintain boundaries**: Resist the temptation to create dependencies between features
- **Document decisions**: Update architecture docs when adding new feature domains
- **Review structure**: Periodically assess if feature boundaries still make sense as the application grows
