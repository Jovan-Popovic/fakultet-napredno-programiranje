from __future__ import annotations

import math
from collections.abc import Sequence
from dataclasses import dataclass
from math import ceil
from typing import Annotated, Any, TypeVar, cast, overload

from fastapi import Query
from pydantic import BaseModel, ConfigDict, NonNegativeInt
from sqlalchemy import func, select
from sqlalchemy.orm import Session, noload
from sqlalchemy.sql import Select

T = TypeVar("T")


class Page[T](BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    total: NonNegativeInt
    items: Sequence[T]
    pages: NonNegativeInt | None


class CacheablePage[T](Page[T]):
    """Extended Page class with automatic cache serialization/deserialization."""

    def to_cache_dict(self) -> dict[str, Any]:
        """Convert Page to cache-friendly dict format."""
        return {
            "total": self.total,
            "pages": self.pages,
            "items": [
                item.model_dump() if hasattr(item, "model_dump") else item
                for item in self.items
            ],
        }

    @classmethod
    def from_cache_dict(
        cls, data: dict[str, Any], item_class: type[BaseModel]
    ) -> CacheablePage[T]:
        """Reconstruct Page from cached dict with proper item type."""
        return cls(
            total=data["total"],
            pages=data["pages"],
            items=[item_class(**item) for item in data["items"]],
        )


@dataclass
class PaginationParams:
    page: int
    size: int


def get_pagination_params(
    page: Annotated[int, Query(ge=1, description="Page number")] = 1,
    size: Annotated[int, Query(le=500, description="Page size")] = 50,
) -> PaginationParams:
    return PaginationParams(page=page, size=size)


def len_or_none(obj: Any) -> int | None:
    try:
        return len(obj)
    except TypeError:
        return None


def count_pages(total: int, size: int) -> int:
    return math.ceil(total / size) if size != 0 else 1


@overload
def paginate[T](
    query: Select[tuple[T]], pagination_params: PaginationParams, db: Session
) -> Page[T]: ...
@overload
def paginate[T: tuple[Any, ...]](
    query: Select[T], pagination_params: PaginationParams, db: Session
) -> Page[T]: ...


def paginate(
    query: Select[Any], pagination_params: PaginationParams, db: Session
) -> Page[Any]:
    total = cast(
        int,
        db.scalar(
            select(func.count()).select_from(
                query.order_by(None).options(noload("*")).subquery()
            )
        ),
    )

    pages = None
    limit = None
    offset = None
    if pagination_params.size > 0:
        limit = pagination_params.size
        offset = (pagination_params.page - 1) * limit
        pages = ceil(total / limit)

    results = db.execute(query.limit(limit).offset(offset)).all()
    items = [
        item[0] if len_or_none(item) == 1 else item for item in results
    ]  # get first "column" from row if only one column, else get entire row

    return Page(total=total, items=items, pages=pages)
