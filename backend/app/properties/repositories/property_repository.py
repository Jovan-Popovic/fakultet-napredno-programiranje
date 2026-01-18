from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Any, Protocol

from sqlalchemy import and_, func, or_, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from app.database.session_factory import ISessionFactory
from app.properties.models.property import Property, PropertySource, PropertyType
from app.utils.di import inject

logger = logging.getLogger(__name__)


@dataclass
class PropertyFilters:
    """Filters for property queries."""

    cities: list[str] | None = None
    property_types: list[PropertyType] | None = None
    sources: list[PropertySource] | None = None
    min_price: float | None = None
    max_price: float | None = None
    min_area: float | None = None
    max_area: float | None = None
    rooms: list[int] | None = None
    search: str | None = None
    page: int = 1
    size: int = 50


class IPropertyRepository(Protocol):
    """Protocol interface for property repository."""

    def get_by_id(self, property_id: int) -> Property | None:
        """Get property by ID."""
        ...

    def list_properties(self, filters: PropertyFilters) -> tuple[list[Property], int]:
        """List properties with filtering and pagination. Returns (items, total_count)."""
        ...

    def upsert(self, property_data: dict[str, Any]) -> Property:
        """Insert or update property by unique link."""
        ...

    def bulk_upsert(self, properties_data: list[dict[str, Any]]) -> int:
        """Bulk insert or update properties. Returns count of affected rows."""
        ...


@inject(alias=IPropertyRepository, singleton=False)
class PropertyRepository(IPropertyRepository):
    """
    Repository for property data access operations.

    Provides CRUD operations, filtering, pagination, and bulk upsert
    functionality for property listings.
    """

    def __init__(self, session_factory: ISessionFactory):
        self.session_factory = session_factory

    @property
    def session(self) -> Session:
        """Get current session from DI container."""
        return self.session_factory()

    def get_by_id(self, property_id: int) -> Property | None:
        """
        Get property by ID.

        Args:
            property_id: Property ID

        Returns:
            Property if found, None otherwise
        """
        stmt = select(Property).where(
            and_(Property.id == property_id, Property.deleted_at.is_(None))
        )
        return self.session.execute(stmt).scalar_one_or_none()

    def list_properties(self, filters: PropertyFilters) -> tuple[list[Property], int]:
        """
        List properties with filtering and pagination.

        Args:
            filters: PropertyFilters with filter criteria and pagination

        Returns:
            Tuple of (list of properties, total count)
        """
        # Build base query
        stmt = select(Property).where(Property.deleted_at.is_(None))

        # Apply filters
        conditions: list[Any] = []

        if filters.cities:
            conditions.append(Property.city.in_(filters.cities))

        if filters.property_types:
            conditions.append(Property.property_type.in_(filters.property_types))

        if filters.sources:
            conditions.append(Property.source.in_(filters.sources))

        if filters.min_price is not None:
            conditions.append(Property.price_eur >= filters.min_price)

        if filters.max_price is not None:
            conditions.append(Property.price_eur <= filters.max_price)

        if filters.min_area is not None:
            conditions.append(Property.area_sqm >= filters.min_area)

        if filters.max_area is not None:
            conditions.append(Property.area_sqm <= filters.max_area)

        if filters.rooms:
            conditions.append(Property.rooms.in_(filters.rooms))

        if filters.search:
            # Full-text search across title and location
            search_term = f"%{filters.search}%"
            conditions.append(
                or_(
                    Property.title.ilike(search_term),
                    Property.location.ilike(search_term),
                )
            )

        if conditions:
            stmt = stmt.where(and_(*conditions))

        # Get total count before pagination
        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_count = self.session.execute(count_stmt).scalar() or 0

        # Apply sorting (newest first)
        stmt = stmt.order_by(Property.created_at.desc())

        # Apply pagination
        offset = (filters.page - 1) * filters.size
        stmt = stmt.offset(offset).limit(filters.size)

        # Execute query
        properties = list(self.session.execute(stmt).scalars().all())

        return properties, total_count

    def upsert(self, property_data: dict[str, Any]) -> Property:
        """
        Insert or update property by unique link.

        Uses PostgreSQL's ON CONFLICT DO UPDATE for efficient upserts.

        Args:
            property_data: Dictionary with property fields

        Returns:
            Inserted or updated Property
        """
        stmt = (
            insert(Property)
            .values(**property_data)
            .on_conflict_do_update(
                index_elements=["link"],
                set_={
                    k: v
                    for k, v in property_data.items()
                    if k not in ["created_at", "link"]
                },
            )
            .returning(Property)
        )

        result = self.session.execute(stmt)
        return result.scalar_one()

    def bulk_upsert(self, properties_data: list[dict[str, Any]]) -> int:
        """
        Bulk insert or update properties.

        Uses PostgreSQL's ON CONFLICT DO UPDATE for efficient bulk upserts.
        All operations are performed in a single transaction.

        Args:
            properties_data: List of dictionaries with property fields

        Returns:
            Count of affected rows
        """
        if not properties_data:
            return 0

        try:
            stmt = (
                insert(Property)
                .values(properties_data)
                .on_conflict_do_update(
                    index_elements=["link"],
                    set_={
                        "source": insert(Property).excluded.source,
                        "city": insert(Property).excluded.city,
                        "location": insert(Property).excluded.location,
                        "title": insert(Property).excluded.title,
                        "property_type": insert(Property).excluded.property_type,
                        "price_raw": insert(Property).excluded.price_raw,
                        "price_eur": insert(Property).excluded.price_eur,
                        "area_raw": insert(Property).excluded.area_raw,
                        "area_sqm": insert(Property).excluded.area_sqm,
                        "rooms_raw": insert(Property).excluded.rooms_raw,
                        "rooms": insert(Property).excluded.rooms,
                        "updated_at": insert(Property).excluded.updated_at,
                    },
                )
            )

            result = self.session.execute(stmt)
            affected_rows = result.rowcount or 0
            logger.info(f"Bulk upserted {affected_rows} properties")
            return affected_rows

        except Exception as e:
            logger.exception(f"Bulk upsert failed: {e}")
            raise
