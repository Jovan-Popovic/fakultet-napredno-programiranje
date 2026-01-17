from __future__ import annotations

import logging
import time
from collections.abc import Callable
from functools import wraps
from typing import Any, TypeVar

logger = logging.getLogger(__name__)


F = TypeVar("F", bound=Callable[..., Any])


def retry_on_failure(
    max_retries: int = 3, delay: float = 1.0, backoff: float = 2.0
) -> Callable[[F], F]:
    """Decorator to retry function execution on failure with exponential backoff."""

    def decorator(func: F) -> F:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            attempt = 1
            current_delay = delay

            while attempt <= max_retries:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries:
                        logger.exception(f"Failed after {max_retries} attempts")
                        raise

                    logger.warning(
                        f"Attempt {attempt} failed, retrying in {current_delay}s: {e}"
                    )
                    time.sleep(current_delay)
                    current_delay *= backoff
                    attempt += 1

            return None  # This should never be reached, but added for type checking

        return wrapper  # type: ignore[return-value]

    return decorator
