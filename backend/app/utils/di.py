from __future__ import annotations

from typing import Any

from kink import di
from kink import inject as kink_inject  # noqa: TID251


def add_to_di_container[T](key: type[T], value: T) -> None:
    di[key] = value


def get_from_di_container[T](key: type[T]) -> T:
    return di[key]


def inject(alias: Any | None = None, singleton: bool = False) -> Any:
    return kink_inject(alias=alias, use_factory=not singleton)


def remove_from_di_container(key: type[Any]) -> None:
    del di._services[key]  # noqa: SLF001


class LazyInjector[T]:
    def __init__(self, service_ref: type[T]):
        self._service_ref = service_ref
        self._resolved: T | None = None

    def __getattr__(self, name: str) -> Any:
        if self._resolved is None:
            self._resolved = get_from_di_container(self._service_ref)
        return getattr(self._resolved, name)


def get_from_di_container_lazy[T](service_ref: type[T]) -> T:
    """Create a lazy proxy for a dependency"""
    # NOTE: `__getattr__` of LazyInjector is fixing this issue
    return LazyInjector(service_ref)  # type: ignore[return-value]
