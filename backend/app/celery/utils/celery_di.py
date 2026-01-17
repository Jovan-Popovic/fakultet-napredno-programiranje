from __future__ import annotations

import inspect
from collections.abc import Callable
from functools import wraps
from typing import Any, get_type_hints

from kink import di

INJECTION_DEFAULT: Any = (
    ...
)  # Dummy default that must be used on all injectable params so mypy doesn't complain


def inject_by_annotations[F: Callable[..., Any]](func: F) -> F:
    sig: inspect.Signature = inspect.signature(func)

    # Resolve annotations (handles forward refs)
    try:
        resolved_hints: dict[str, Any] = get_type_hints(func)
    except Exception:
        # Fallback if something cannot be resolved; we'll use raw annotations
        resolved_hints = {name: p.annotation for name, p in sig.parameters.items()}

    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:

        if "kwargs" in kwargs and isinstance(kwargs["kwargs"], dict):
            nested = kwargs.pop("kwargs")
            kwargs.update(nested)

        # Bind what Celery provided
        bound: inspect.BoundArguments = sig.bind_partial(*args, **kwargs)

        for name, param in sig.parameters.items():
            if name in bound.arguments:
                continue  # already provided

            # Determine the type to inject using resolved hints if available
            annotation: Any = resolved_hints.get(name, param.annotation)

            if annotation is not inspect.Signature.empty and annotation in di:
                bound.arguments[name] = di[annotation]
                continue

        # Apply defaults so we don't inject where a default is present
        bound.apply_defaults()

        return func(*bound.args, **bound.kwargs)

    return wrapper  # type: ignore[return-value]
