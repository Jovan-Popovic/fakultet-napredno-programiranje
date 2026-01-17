"""Custom Celery serializers using Pydantic's fast encoder with explicit type markers."""

from __future__ import annotations

import json
from datetime import date, datetime
from decimal import Decimal
from typing import Any
from uuid import UUID

from kombu.serialization import register
from pydantic_core import to_json as pydantic_to_json


def add_type_markers(obj: Any) -> Any:
    """
    Recursively add type markers for complex types that JSON can't represent.

    Transforms:
    - Decimal → {"__decimal__": str}
    - datetime → {"__datetime__": ISO string}
    - date → {"__date__": ISO string}
    - UUID → {"__uuid__": str}
    """
    if isinstance(obj, Decimal):
        return {"__decimal__": str(obj)}
    if isinstance(obj, datetime):
        return {"__datetime__": obj.isoformat()}
    if isinstance(obj, date):
        return {"__date__": obj.isoformat()}
    if isinstance(obj, UUID):
        return {"__uuid__": str(obj)}
    if isinstance(obj, dict):
        return {k: add_type_markers(v) for k, v in obj.items()}
    if isinstance(obj, list | tuple):
        return [add_type_markers(item) for item in obj]
    return obj


def dumps(obj: Any) -> str:
    """
    Serialize object to JSON string using Pydantic's fast encoder with type markers.

    Automatically handles:
    - Decimal (preserves precision with __decimal__ marker)
    - date (ISO format with __date__ marker)
    - datetime (ISO format with __datetime__ marker)
    - UUID (string with __uuid__ marker)
    """
    # Add type markers first
    marked_obj = add_type_markers(obj)
    # Use Pydantic's fast to_json on the marked-up object
    return pydantic_to_json(marked_obj).decode("utf-8")


def loads(data: str) -> Any:
    """
    Deserialize JSON string with type restoration using markers.

    Restores types based on explicit markers:
    - {"__decimal__": "..."} → Decimal
    - {"__date__": "..."} → date
    - {"__datetime__": "..."} → datetime
    - {"__uuid__": "..."} → UUID
    """

    def object_hook(obj: dict[str, Any]) -> Any:
        """Convert marked values back to proper Python types."""
        if "__decimal__" in obj:
            return Decimal(obj["__decimal__"])
        if "__datetime__" in obj:
            return datetime.fromisoformat(obj["__datetime__"])
        if "__date__" in obj:
            return date.fromisoformat(obj["__date__"])
        if "__uuid__" in obj:
            return UUID(obj["__uuid__"])
        return obj

    return json.loads(data, object_hook=object_hook)


def register_pydantic_serializer() -> None:
    """Register Pydantic-based JSON serializer with Decimal, date, datetime, and UUID support to Celery/Kombu."""
    register(
        "json_pydantic",
        dumps,
        loads,
        content_type="application/json",
        content_encoding="utf-8",
    )
