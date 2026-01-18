from __future__ import annotations

import enum
from datetime import datetime, timezone

from sqlalchemy import Index, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base
from app.database.enum import Enum


class PropertySource(str, enum.Enum):
    """Source of the property listing"""

    ESTITOR = "estitor"
    REALITICA = "realitica"


class PropertyType(str, enum.Enum):
    """Type of property"""

    STAN = "Stan"
    KUCA = "Kuća"
    GARSONJERA = "Garsonjera"
    APARTMAN = "Apartman"
    VIKENDICA = "Vikendica"
    POSLOVNI_PROSTOR = "Poslovni prostor"
    ZEMLJISTE = "Zemljište"
    UNKNOWN = "Unknown"


class Property(Base):
    """Property listing model with dual storage (raw + parsed values)"""

    __tablename__ = "properties"

    # Primary key
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    # Source tracking
    source: Mapped[PropertySource] = mapped_column(Enum(PropertySource), nullable=False)

    # Unique identifier - the listing URL
    link: Mapped[str] = mapped_column(String(2048), unique=True, nullable=False)

    # Featured image URL
    image_url: Mapped[str | None] = mapped_column(String(2048), nullable=True)

    # Location data
    city: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    location: Mapped[str] = mapped_column(String(512), nullable=False)

    # Property details
    title: Mapped[str] = mapped_column(Text, nullable=False)
    property_type: Mapped[PropertyType | None] = mapped_column(
        Enum(PropertyType), nullable=True, index=True
    )

    # Price - dual storage (raw string + parsed numeric)
    price_raw: Mapped[str] = mapped_column(String(255), nullable=False)
    price_eur: Mapped[float | None] = mapped_column(
        Numeric(precision=12, scale=2), nullable=True, index=True
    )

    # Area - dual storage (raw string + parsed numeric)
    area_raw: Mapped[str | None] = mapped_column(String(255), nullable=True)
    area_sqm: Mapped[float | None] = mapped_column(
        Numeric(precision=10, scale=2), nullable=True, index=True
    )

    # Rooms - dual storage (raw string + parsed numeric)
    rooms_raw: Mapped[str | None] = mapped_column(String(255), nullable=True)
    rooms: Mapped[int | None] = mapped_column(nullable=True)

    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        nullable=False, default=lambda: datetime.now(timezone.utc), index=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    deleted_at: Mapped[datetime | None] = mapped_column(nullable=True)

    # Composite indexes for common query patterns
    __table_args__ = (
        # City-based filtering with price
        Index("ix_properties_city_price", "city", "price_eur"),
        # City-based filtering with type
        Index("ix_properties_city_type", "city", "property_type"),
        # Area and rooms combination (common for filtering)
        Index("ix_properties_area_rooms", "area_sqm", "rooms"),
        # Full-text search preparation (PostgreSQL supports GIN indexes on text)
        # Note: In production, consider adding GIN index on title and location
    )

    def __repr__(self) -> str:
        return f"<Property(id={self.id}, city={self.city}, title={self.title[:30]}...)>"
