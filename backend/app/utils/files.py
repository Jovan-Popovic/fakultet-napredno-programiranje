from __future__ import annotations

import inspect
import os

from fastapi import File, UploadFile
from fastapi.exceptions import RequestValidationError

from app.utils.dependency_base import DependencyBase


class FieldUploadFile(DependencyBase):
    """
    Dependency for validating UploadFile similar to Pydantic's Field.

    Args:
        min_bytes (Optional[int]): Minimum file size in bytes.
        max_bytes (Optional[int]): Maximum file size in bytes.
        allowed_extensions (Optional[list[str]]): List of allowed file extensions (e.g., ["jpg", "png"]).
        field_name (str): Name of the field (used in validation error location).
    """

    def __init__(
        self,
        min_bytes: int | None = None,
        max_bytes: int | None = None,
        allowed_extensions: list[str] | None = None,
        optional: bool = False,
        field_name: str = "file",
    ) -> None:
        self.min_bytes = min_bytes
        self.max_bytes = max_bytes
        self.allowed_extensions = (
            [extension.lower() for extension in allowed_extensions]
            if allowed_extensions
            else None
        )
        self.field_name = field_name
        self.optional = optional
        annotation = UploadFile | None if optional else UploadFile
        # Dynamically create __call__ signature with correct param name
        param = inspect.Parameter(
            name=self.field_name,
            kind=inspect.Parameter.POSITIONAL_OR_KEYWORD,
            default=None if self.optional else File(...),
            annotation=annotation,
        )
        sig = inspect.Signature(
            parameters=[param],
            return_annotation=annotation,
        )
        self.__signature__ = sig  # FastAPI inspects this for OpenAPI schema

    async def __call__(self, **kwargs: UploadFile | None) -> UploadFile | None:
        errors = []
        file = kwargs.get(self.field_name, None)

        if file is None:
            if self.optional:
                return None
            # NOTE: This will never happen as pydantic handles this before
            raise RequestValidationError(
                [
                    {
                        "type": "missing",
                        "loc": ("body", self.field_name),
                        "msg": "Field required",
                        "input": None,
                    }
                ]
            )
        # --- validate file size ---
        pos = file.file.tell()
        file.file.seek(0, os.SEEK_END)
        size = file.file.tell()
        file.file.seek(pos)  # restore position

        if self.min_bytes is not None and size < self.min_bytes:
            errors.append(
                {
                    "type": "value_error.too_small",
                    "loc": ("body", self.field_name),
                    "msg": f"ensure this file has at least {self.min_bytes} bytes",
                    "input": f"{size} bytes",
                    "ctx": {"min_bytes": self.min_bytes, "actual_size": size},
                }
            )

        if self.max_bytes is not None and size > self.max_bytes:
            errors.append(
                {
                    "type": "value_error.too_large",
                    "loc": ("body", self.field_name),
                    "msg": f"ensure this file has at most {self.max_bytes} bytes",
                    "input": f"{size} bytes",
                    "ctx": {"max_bytes": self.max_bytes, "actual_size": size},
                }
            )

        # --- validate file extension ---
        if self.allowed_extensions is not None and file.filename:
            file_extension = (
                file.filename.split(".")[-1].lower() if "." in file.filename else ""
            )
            if file_extension not in self.allowed_extensions:
                errors.append(
                    {
                        "type": "value_error.invalid_extension",
                        "loc": ("body", self.field_name),
                        "msg": f"file extension must be one of: {', '.join(self.allowed_extensions)}",
                        "input": file.filename,
                        "ctx": {
                            "allowed_extensions": self.allowed_extensions,
                            "actual_extension": file_extension,
                        },
                    }
                )

        if errors:
            # raise FastAPI's native validation error
            raise RequestValidationError(errors)

        return file
