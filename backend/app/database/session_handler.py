from __future__ import annotations

import functools
import inspect
import logging
from collections.abc import Callable, Mapping, Sequence
from enum import Enum
from typing import Any

from fastapi import APIRouter, params
from fastapi.dependencies.utils import get_typed_annotation, get_typed_return_annotation
from fastapi.routing import APIRoute
from fastapi.types import DecoratedCallable, IncEx
from fastapi.utils import generate_unique_id
from starlette.responses import JSONResponse, Response
from starlette.routing import BaseRoute

from app.database.session_factory import ISessionFactory
from app.utils.di import get_from_di_container

logger = logging.getLogger(__name__)


def db_session_handler[**P, T](func: Callable[P, T]) -> Callable[P, T]:
    @functools.wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> T:
        session = get_from_di_container(ISessionFactory)()
        try:
            result = func(*args, **kwargs)
            session.commit()
            return result
        except:
            session.rollback()
            raise
        finally:
            session.close()

    globalns = getattr(func, "__globals__", {})
    return_annotation = get_typed_return_annotation(func)
    signature = inspect.signature(func)
    typed_params = [
        inspect.Parameter(
            name=param.name,
            kind=param.kind,
            default=param.default,
            annotation=get_typed_annotation(param.annotation, globalns),
        )
        for param in signature.parameters.values()
    ]
    wrapper.__signature__ = inspect.Signature(  # type: ignore[attr-defined]
        parameters=typed_params,
        return_annotation=return_annotation,
    )

    return wrapper


def _find_error_handler(
    error_callback: (
        Callable[[Any, Any], Any] | Mapping[type, Callable[[Any, Any], Any]]
    ),
    exception: Exception,
) -> Callable[[Exception, Any], Any] | None:
    """Find the most specific error handler for the given exception."""
    if not isinstance(error_callback, Mapping):
        return error_callback

    # Find the most specific exception handler
    handler = None
    for exc_type, callback in error_callback.items():
        if isinstance(exception, exc_type) and (
            handler is None or issubclass(exc_type, handler[0])
        ):
            handler = (exc_type, callback)

    if handler:
        return handler[1]

    # No specific handler found, use default if available
    return error_callback.get(Exception)


def db_session_handler_with_error_callback(
    error_callback: (
        Callable[[Any, Any], Any] | Mapping[type, Callable[[Any, Any], Any]]
    ),
) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
    """
    Generic decorator for atomic database operations with custom error handling.

    Args:
        error_callback: Either a single function to call on any error, or a dict mapping
                       exception types to specific handler functions. Each handler receives
                       (exception, *args, **kwargs) and is executed in a separate committed transaction.

    If the main operation fails, it rolls back everything but executes the appropriate
    error_callback in a separate committed transaction.
    """

    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @functools.wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            session = get_from_di_container(ISessionFactory)()
            try:
                result = func(*args, **kwargs)
                session.commit()
                return result
            except Exception as e:
                session.rollback()
                logger.exception(f"Operation {func.__name__} failed")

                # Execute error callback in separate transaction
                error_session = get_from_di_container(ISessionFactory)()
                try:
                    handler = _find_error_handler(error_callback, e)
                    if handler:
                        handler(e, *args, **kwargs)
                        error_session.commit()
                    else:
                        logger.warning(f"No error handler found for {type(e).__name__}")
                except Exception:
                    error_session.rollback()
                    logger.exception(f"Error callback for {func.__name__} failed")
                finally:
                    error_session.close()

                raise
            finally:
                session.close()

        globalns = getattr(func, "__globals__", {})
        return_annotation = get_typed_return_annotation(func)
        signature = inspect.signature(func)
        typed_params = [
            inspect.Parameter(
                name=param.name,
                kind=param.kind,
                default=param.default,
                annotation=get_typed_annotation(param.annotation, globalns),
            )
            for param in signature.parameters.values()
        ]
        wrapper.__signature__ = inspect.Signature(  # type: ignore[attr-defined]
            parameters=typed_params,
            return_annotation=return_annotation,
        )

        return wrapper

    return decorator


# router that wraps every endpoint with db_session_handler
class DBAPIRouter(APIRouter):
    def api_route(
        self,
        path: str,
        *,
        response_model: Any = None,
        status_code: int | None = None,
        tags: list[str | Enum] | None = None,
        dependencies: Sequence[params.Depends] | None = None,
        summary: str | None = None,
        description: str | None = None,
        response_description: str = "Successful Response",
        responses: dict[int | str, dict[str, Any]] | None = None,
        deprecated: bool | None = None,
        methods: list[str] | None = None,
        operation_id: str | None = None,
        response_model_include: IncEx | None = None,
        response_model_exclude: IncEx | None = None,
        response_model_by_alias: bool = True,
        response_model_exclude_unset: bool = False,
        response_model_exclude_defaults: bool = False,
        response_model_exclude_none: bool = False,
        include_in_schema: bool = True,
        response_class: type[Response] = JSONResponse,
        name: str | None = None,
        callbacks: list[BaseRoute] | None = None,
        openapi_extra: dict[str, Any] | None = None,
        generate_unique_id_function: Callable[[APIRoute], str] = generate_unique_id,
    ) -> Callable[[DecoratedCallable], DecoratedCallable]:
        parent_decorator = super().api_route(
            path,
            response_model=response_model,
            status_code=status_code,
            tags=tags,
            dependencies=dependencies,
            summary=summary,
            description=description,
            response_description=response_description,
            responses=responses,
            deprecated=deprecated,
            methods=methods,
            operation_id=operation_id,
            response_model_include=response_model_include,
            response_model_exclude=response_model_exclude,
            response_model_by_alias=response_model_by_alias,
            response_model_exclude_unset=response_model_exclude_unset,
            response_model_exclude_defaults=response_model_exclude_defaults,
            response_model_exclude_none=response_model_exclude_none,
            include_in_schema=include_in_schema,
            response_class=response_class,
            name=name,
            callbacks=callbacks,
            openapi_extra=openapi_extra,
            generate_unique_id_function=generate_unique_id_function,
        )

        def decorator(func: Callable[..., Any]) -> Any:
            return parent_decorator(db_session_handler(func))

        return decorator
