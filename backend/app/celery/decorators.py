from __future__ import annotations

import logging
from collections.abc import Callable
from functools import wraps
from typing import Any, cast, overload

from celery.schedules import crontab

logger = logging.getLogger(__name__)


# Global registry for beat scheduled tasks
_BEAT_TASKS_REGISTRY: dict[str, dict[str, Any]] = {}


def beat_schedule[F: Callable[..., Any]](
    name: str,
    schedule: float | str | crontab,
    **kwargs: Any,
) -> Callable[[F], F]:
    """
    Decorator to automatically register a Celery task in the beat schedule.

    Args:
        name: Unique name for the beat schedule entry
        schedule: Schedule interval (seconds as float, crontab object, or crontab string)
        **kwargs: Additional celery beat options (e.g. options={"queue": "high_priority"})

    Usage:
        @beat_schedule("daily-task", crontab(minute=0, hour=0))
        @celery_app.task()
        def my_daily_task():
            pass

        @beat_schedule("priority-task", 60, options={"queue": "high_priority"})
        @celery_app.task()
        def priority_task():
            pass
    """

    def decorator(func: F) -> F:
        # Store the function reference instead of task name initially
        _BEAT_TASKS_REGISTRY[name] = {
            "func": func,
            "schedule": schedule,
            "options": kwargs,
        }
        return func

    return decorator


@overload
def chord_safe[**P, R](func: Callable[P, R], /) -> Callable[P, R]: ...
@overload
def chord_safe[**P, R](
    *, default_return: R | None = None
) -> Callable[[Callable[P, Any]], Callable[P, R]]: ...


def chord_safe[**P, R](
    func: Callable[P, Any] | None = None, /, *, default_return: R | None = None
) -> Callable[P, R] | Callable[[Callable[P, Any]], Callable[P, R]]:
    """
    Decorator that catches exceptions and returns a default value.

    Usage:
        @chord_safe                      # Returns None on failure (if R is Optional)
        @chord_safe()                    # Same as above
        @chord_safe(default_return=[])   # Returns [] on failure
    """

    def decorator(fn: Callable[P, Any]) -> Callable[P, R]:
        @wraps(fn)
        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
            try:
                result = fn(*args, **kwargs)
                # Return the actual result from the function
                return cast(R, result)
            except Exception as e:
                logger.error(f"Task {fn.__name__} failed: {e}", exc_info=True)
                # Only return default_return when an exception occurs
                return cast(R, default_return)

        return wrapper

    if func is not None:
        # Used as @chord_safe
        return decorator(func)

    # Used as @chord_safe(...)
    return decorator


def get_beat_schedule() -> dict[str, Any]:
    """Get all registered beat scheduled tasks."""
    # Convert function references to proper task names
    beat_schedule = {}
    for name, config in _BEAT_TASKS_REGISTRY.items():
        func = config["func"]
        # Get the actual celery task name (this should be the registered task name)
        if hasattr(func, "name"):
            task_name = func.name
        else:
            task_name = f"{func.__module__}.{func.__name__}"

        beat_schedule[name] = {
            "task": task_name,
            "schedule": config["schedule"],
            **config.get("options", {}),
        }
    return beat_schedule


def clear_beat_registry() -> None:
    """Clear the beat tasks registry (mainly for testing)."""
    _BEAT_TASKS_REGISTRY.clear()
