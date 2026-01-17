from __future__ import annotations

import inspect
from collections.abc import Callable
from typing import Annotated, Any, TypedDict, TypeVar

from fastapi import Form
from fastapi.exceptions import RequestValidationError
from humps import camelize, decamelize
from pydantic import BaseModel, ConfigDict, StringConstraints, ValidationError
from pydantic.fields import FieldInfo

NonBlankStr = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


def convert_columns_to_snake_case(columns: list[str]) -> list[str]:
    """Convert camelCase column names to snake_case."""
    return [decamelize(column) for column in columns]


class CamelCaseModel(BaseModel):
    model_config = ConfigDict(alias_generator=camelize, populate_by_name=True)


T = TypeVar("T", bound=BaseModel)


class FieldOverride(TypedDict, total=False):
    default: Any
    annotation: Any
    transform: Callable[[Any], Any]


def as_form(field_overrides: dict[str, FieldOverride]) -> Callable[[type[T]], type[T]]:
    def decorator(cls: type[T]) -> type[T]:
        """
        Adds an as_form class method to decorated models. The as_form class method
        can be used with FastAPI endpoints
        """

        def get_param(field: FieldInfo) -> inspect.Parameter:
            field_override = field_overrides.get(field.alias or "", {})
            default_value = field_override.get("default", field.default)
            annotation = field_override.get("annotation", field.annotation)
            return inspect.Parameter(
                field.alias or "",
                inspect.Parameter.POSITIONAL_ONLY,
                default=(Form(default_value) if not field.is_required() else Form(...)),
                annotation=annotation,
            )

        new_params = [get_param(field) for field in cls.model_fields.values()]

        def _as_form(**data: dict[str, Any]) -> T:
            try:
                transformed_data = {
                    k: field_overrides.get(k, {}).get("transform", lambda x: x)(v)
                    for k, v in data.items()
                }
                return cls(**transformed_data)
            except ValidationError as e:
                raise RequestValidationError(e.errors(include_url=False)) from e

        sig = inspect.signature(_as_form)
        sig = sig.replace(parameters=new_params)
        _as_form.__signature__ = sig  # type: ignore[attr-defined]
        cls.as_form = _as_form  # type: ignore[attr-defined]
        return cls

    return decorator
