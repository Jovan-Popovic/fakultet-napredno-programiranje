# Backend Docs

## About

This directory contains implementation of our backend. It is written in python using [FastAPI](https://github.com/tiangolo/fastapi) framework and [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy) as an ORM. Familiarity with these technologies is important if you want to contribute to this project. Thankfully they have extensive documentation covering almost anything you're likely to need.

## Getting Started

### Prerequisites

To work on this project you need:

- python 3.13+ - many ways to install it, probably best to use the [official installer](https://www.python.org/downloads/) or a version manager such as [pyenv](https://github.com/pyenv/pyenv)
- poetry 2.1+ - official [installation guide](https://python-poetry.org/docs/#installing-with-the-official-installer)

If you don't want to set up python on your local machine you can refer to the [`README.md`](../README.md) in the root of the repo containing instructions on spinning up the entire project's stack using docker. However at this stage it may not be ergonomic enough for heavy use, as it's mostly meant for running the components such as database and parts of the stack you're not working on and hence not changing often.

You will also need a postgres database and redis, which can be spun up locally using docker compose (`docker compose up -d`).

### Local Development

To start working on the project you need to:

- put environment variables in a `.env` file. Some of the values are available inside `.env.example`. AWS configuration like `AWS_PROFILE` variable can also be put into the .env file
- install the dependencies by running `poetry install` (this will also create a virtual environment inside the project dir)
- activate the virtual environment with `source ./.venv/bin/activate`
- run migrations with `poetry run migrate`

Once everything mentioned above is in place you can spin up a dev server by running:

```
poetry run start
```

We also provide a django-like management interface, for example you can start the dev server with `python manage.py runserver`, or run migrations with `python manage.py migrate`

**Note:** In case you don't want to activate the project's virtual environment you can prefix all commands with `poetry run` which will run the command inside the virtual env automatically

### Running Background Tasks

The project uses [Celery](https://docs.celeryq.dev/) for handling background tasks and periodic jobs.

#### Celery Worker

To run a Celery worker for processing background tasks:

```
celery -A app.celery.celery_app:celery_app worker --loglevel=info
```

Or using poetry:

```
poetry run celery -A app.celery.celery_app:celery_app worker --loglevel=info
```

#### Celery Beat

To run Celery Beat for periodic tasks scheduling:

```
celery -A app.celery.celery_app:celery_app beat --loglevel=info
```

Or using poetry:

```
poetry run celery -A app.celery.celery_app:celery_app beat --loglevel=info
```

### Migrations

After creating/updating database models you need to create alembic migrations. This can be done by running `python manage.py makemigrations "some description of changes"` which will detect all changes and autogenerate the migration file. You can also create an empty migration file with `python manage.py makemigrations --empty "some description"` and manually add alembic instructions to it.

## Code Quality

### Linting and Formatting

We use [black](https://github.com/psf/black) for formatting and [ruff](https://github.com/charliermarsh/ruff) for linting.

We use default black config, especially since it only offers limited configurability. Ruff config is located inside [`pyproject.toml`](./pyproject.toml) file.

You can run linting and formatting using the following commands:

```
black .
ruff check --fix .
```

`--fix` flag will fix violations that can be fixed automatically.

You can also use [pre-commit](https://github.com/pre-commit/pre-commit).

```
pre-commit run --all-files
```

Pre-commit runs some additional checks which should not cause any issues but can be disabled by setting them in `SKIP` env variable (e.g. `SKIP=trailing-whitespace,end-of-file-fixer`) or running the individual hooks:

```
pre-commit run black --all-files
pre-commit run ruff --all-files
```

### Type Checking

Typechecking is performed using [mypy](https://github.com/python/mypy).

Mypy config is located inside [`pyproject.toml`](./pyproject.toml) file.

To run the typechecker use the following command:

```
poetry run typecheck
```

or

```
mypy .
```

### Testing

We use [pytest](https://github.com/pytest-dev/pytest) as our test runner. To run tests use the following command:

```
poetry run test
```

or

```
pytest
```

To also get the coverage report run:

```
pytest --cov
```

## Architecture Overview

The backend follows a **layered architecture** with clear separation of concerns:

```
API Layer → Service Layer → Repository Layer
```

- **API Layer** (`app/*/api/`): FastAPI route handlers, request/response handling, permission validation
- **Service Layer** (`app/*/services/`): Business logic, orchestration, domain rules
- **Repository Layer** (`app/*/repositories/`): Database access, ORM queries, data persistence

### Module Structure

Each domain module follows this consistent structure:

```
{module}/
├── api/                    # API endpoints
│   ├── {entity}.py        # System-level endpoints
│   └── workspace_{entity}.py # Workspace-scoped endpoints (if applicable)
├── exceptions/            # Domain-specific exceptions
├── models/               # SQLAlchemy models
├── repositories/         # Data access layer
├── schemas/              # Pydantic schemas
├── services/             # Business logic
└── routes.py             # Route aggregation
```

## Developer Guidelines

### Naming Conventions

#### Classes and Schemas

- **Request Schemas**: `*RequestSchema` (e.g., `PixelCreateRequestSchema`)
- **Response Schemas**: `*ResponseSchema` (e.g., `PixelResponseSchema`)
- **Base Schemas**: `*BaseSchema` for shared properties
- **Services**: `*Service` with corresponding `I*Service` Protocol interface
- **Repositories**: `*Repository` with corresponding `I*Repository` Protocol interface
- **Exceptions**: `*Exception` inheriting from base exception classes

#### Database Conventions

- **Enum Values**: `snake_case` (e.g., `waiting_for_approval`, `approved`, `rejected`)
- **Table Names**: Plural of model name (e.g., `pixels`, `business_managers`, `workspaces`)
- **Association Tables**: Combined entity names (e.g., `pixels_accounts`, `accounts_users`)
- **Foreign Keys**: `{table}_id` pattern (e.g., `workspace_id`, `business_manager_id`)

#### File and Folder Naming

- **Modules**: Plural names (e.g., `/pixels/`, `/accounts/`, `/business_managers/`)
- **Model Files**: Singular within plural module (e.g., `/pixels/models/pixel.py`)

#### Endpoint Path Conventions

- **System Endpoints**: `/api/{resource}/` (e.g., `/api/pixels/`)
- **Workspace Endpoints**: `/api/workspaces/{workspace_id}/{resource}/`
- **Always use trailing slashes** on endpoint paths
- **Entity names in paths must be plural** (e.g., `/api/pixels/`, not `/api/pixel/`)

### SQLAlchemy Guidelines

#### Model Field Definitions

**IMPORTANT**: Do not use the `nullable` keyword argument in SQLAlchemy model field definitions. SQLAlchemy automatically infers nullability from the type hint:

```python
# ✅ Correct - SQLAlchemy infers nullable=False from non-optional type
name: Mapped[str] = mapped_column()

# ✅ Correct - SQLAlchemy infers nullable=True from optional type
description: Mapped[str | None] = mapped_column()

# ❌ Incorrect - Don't use nullable kwarg
name: Mapped[str] = mapped_column(nullable=False)  # Redundant
```

#### Encapsulation

SQLAlchemy should be **fully encapsulated** within models and repositories. Services should not know SQLAlchemy exists - they should only work with repository interfaces and business objects.

### Exception Handling

Services and repositories should use domain-specific exceptions that inherit from the base exception types (`NotFoundException`, `InvalidRequestException`, etc.). The `HTTPExceptionWithCode` exception is **reserved for usage in the API layer only**, since only the API layer should care about HTTP status codes.

```python
# ✅ In service/repository layer
raise PixelNotFoundException(pixel_id=123)

# ✅ In API layer
raise HTTPExceptionWithCode(status_code=404, detail="Resource not found", code="not_found")
```

### Permission Handling

The application uses two main permission dependency types for access control:

#### System Permissions

Use `HasSystemPermission` for system-wide administrative endpoints that don't belong to any specific workspace:

```python
# ✅ System-level endpoint
@router.get(
  path="/api/pixels/",
  dependencies=[Depends(HasSystemPermission(PixelPermission.READ))]
)
def get_all_pixels():
    pass
```

#### Workspace Permissions

Endpoints that use `HasWorkspacePermission` dependency **must have paths that begin with `/workspaces/{workspace_id}`**:

```python
# ✅ Correct - workspace-scoped endpoint
@router.get(
  path="/workspaces/{workspace_id}/pixels/",
  dependencies=[Depends(HasWorkspacePermission(PixelPermission.READ))]
)
def get_workspace_pixels():
    pass

# ❌ Incorrect - path doesn't start with /workspaces/{workspace_id}
@router.get(
  path="/pixels/workspace/{workspace_id}",
```

#### Permission Hierarchy

- **System permissions** are typically used for admin operations and global resource management
- **Workspace permissions** are used for operations scoped to a specific workspace
- Users can have different permissions in different workspaces

### Data Transfer Between Layers

#### Service to API Communication

Services should **never return business entities** (SQLAlchemy models) to the API layer. Instead, they should return DTOs (Pydantic schemas). The API layer should use Pydantic schemas for transferring data to services.

```python
# ✅ Correct - service returns DTO
def create_pixel(self, data: PixelCreateRequestSchema) -> PixelResponseSchema:
    # Business logic
    return PixelResponseSchema.model_validate(pixel_model)

# ❌ Incorrect - service returns SQLAlchemy model
def create_pixel(self, data: PixelCreateRequestSchema) -> Pixel:
    return pixel_model  # Don't return ORM models
```

### Dependency Injection

The project uses a custom dependency injection system built on top of the [kink](https://github.com/kodemore/kink) library:

#### Service Registration

```python
from app.utils.di import inject

@inject(alias=IWorkspaceService)
class WorkspaceService(IWorkspaceService):
    def __init__(self, workspace_repository: IWorkspaceRepository) -> None:
        self._workspace_repository = workspace_repository
```

#### Dependency Resolution in FastAPI

```python
from app.deps import get_di_entity

@router.get("/workspaces/")
def get_workspaces(
    workspace_service: Annotated[IWorkspaceService, Depends(get_di_entity(IWorkspaceService))]
) -> List[WorkspaceResponseSchema]:
    return workspace_service.get_workspaces()
```

#### Manual DI Container Access

```python
from app.utils.di import add_to_di_container, get_from_di_container

# Register a service
add_to_di_container(IWorkspaceService, WorkspaceService())

# Retrieve a service
service = get_from_di_container(IWorkspaceService)
```

#### Protocol-Based Interfaces

Use Python protocols to define service and repository interfaces:

```python
from typing import Protocol

class IWorkspaceService(Protocol):
    def create_workspace(self, data: WorkspaceCreateRequestSchema) -> WorkspaceResponseSchema: ...
    def get_workspace_by_id(self, workspace_id: int) -> WorkspaceResponseSchema: ...
```

### External Service Communication

Use "clients" for communication with external services. Clients should:

- Be located in `/app/clients/{service}/`
- Implement Protocol interfaces for testability
- Use the mixin pattern for shared functionality
- Handle external service errors and convert to domain exceptions

### Import Patterns

#### TYPE_CHECKING for Recursive Imports

Use `TYPE_CHECKING` to handle recursive imports in models:

```python
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.pixels.models.pixel import Pixel
    from app.users.models.user import User
```

**Important**: This indirect import pattern should be used **only when parent model imports child model**. Child models should import parents directly to avoid circular dependencies.

### Custom Management Commands

The `manage.py` file provides a Django-like management interface. To create custom commands:

```python
class MyCustomCommand(BaseCommand):
    name = "mycustomcommand"
    description = "Description of what this command does"

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument("--option", help="Command option")

    def handle(self, option: str | None = None) -> None:
        # Command implementation
        pass
```

Add your command to the `commands` list in the `main()` function.

## Known Issues

- When generating a migration that works with Enums, you must add `# ruff: noqa: TID251` at the top of the file
- When generating a migration that creates a table with a new enum, the generated code will create the enum at the beginning, and create_table will also create the enum, which will cause an error. You need to either delete the part that creates the enum at the beginning, or replace sa.Enum in create_table with postgresql.ENUM and add create_type=False.
