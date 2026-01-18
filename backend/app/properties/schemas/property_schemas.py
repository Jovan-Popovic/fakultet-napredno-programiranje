from __future__ import annotations

from datetime import datetime

from app.properties.models.property import Property, PropertySource, PropertyType
from app.utils.schemas import CamelCaseModel


class PropertyResponse(CamelCaseModel):
    """Response schema for a single property."""

    id: int
    source: PropertySource
    link: str
    city: str
    location: str
    title: str
    property_type: PropertyType | None

    # Raw values
    price_raw: str
    area_raw: str | None
    rooms_raw: str | None

    # Parsed values
    price_eur: float | None
    area_sqm: float | None
    rooms: int | None

    # Display fields (formatted for UI)
    price_display: str
    area_display: str | None
    image_url: str | None

    # Timestamps
    created_at: datetime
    updated_at: datetime

    @classmethod
    def from_model(cls, property: Property) -> PropertyResponse:
        """
        Create PropertyResponse from Property model.

        Args:
            property: Property model instance

        Returns:
            PropertyResponse with formatted display fields
        """
        # Format price for display
        price_display = property.price_raw
        if property.price_eur is not None:
            # Format with thousands separator
            price_display = f"€{property.price_eur:,.0f}".replace(",", ".")

        # Format area for display
        area_display = property.area_raw
        if property.area_sqm is not None and not property.area_raw:
            area_display = f"{property.area_sqm:.0f} m²"

        return cls(
            id=property.id,
            source=property.source,
            link=property.link,
            city=property.city,
            location=property.location,
            title=property.title,
            property_type=property.property_type,
            price_raw=property.price_raw,
            area_raw=property.area_raw,
            rooms_raw=property.rooms_raw,
            price_eur=property.price_eur,
            area_sqm=property.area_sqm,
            rooms=property.rooms,
            price_display=price_display,
            area_display=area_display,
            image_url=property.image_url,
            created_at=property.created_at,
            updated_at=property.updated_at,
        )


class PropertyListResponse(CamelCaseModel):
    """Response schema for paginated property list."""

    items: list[PropertyResponse]
    total: int
    page: int
    size: int
    pages: int

    @classmethod
    def from_properties(
        cls,
        properties: list[Property],
        total: int,
        page: int,
        size: int,
    ) -> PropertyListResponse:
        """
        Create PropertyListResponse from list of properties.

        Args:
            properties: List of Property models
            total: Total count of properties (before pagination)
            page: Current page number
            size: Page size

        Returns:
            PropertyListResponse with pagination metadata
        """
        items = [PropertyResponse.from_model(prop) for prop in properties]
        pages = (total + size - 1) // size if total > 0 else 0

        return cls(
            items=items,
            total=total,
            page=page,
            size=size,
            pages=pages,
        )
