from __future__ import annotations

import logging
from datetime import datetime, timezone
from io import BytesIO
from typing import Any, Protocol

from fastapi import HTTPException

from app.properties.models.property import Property, PropertySource
from app.properties.repositories import (
    EXPORT_LIMIT,
    IPropertyRepository,
    PropertyFilters,
)
from app.properties.services.csv_export_service import ICSVExportService
from app.properties.services.property_parser import IPropertyParser
from app.utils.di import inject

logger = logging.getLogger(__name__)


class IPropertyService(Protocol):
    """Protocol interface for property service."""

    def get_property(self, property_id: int) -> Property | None:
        """Get property by ID."""
        ...

    def list_properties(self, filters: PropertyFilters) -> tuple[list[Property], int]:
        """List properties with filters."""
        ...

    def export_properties(self, filters: PropertyFilters) -> tuple[BytesIO, str]:
        """Export properties to CSV. Returns (csv_buffer, filename)."""
        ...

    def get_unique_cities(self) -> list[str]:
        """Get all unique cities from non-deleted properties."""
        ...

    def get_available_platforms(self) -> list[PropertySource]:
        """Get all available platforms/sources."""
        ...

    def save_scraped_property(
        self, scraped_data: dict[str, Any], source: PropertySource
    ) -> Property:
        """Save single scraped property."""
        ...

    def bulk_save_scraped_properties(
        self, scraped_data_list: list[dict[str, Any]], source: PropertySource
    ) -> int:
        """Bulk save scraped properties. Returns count of saved properties."""
        ...


@inject(alias=IPropertyService, singleton=True)
class PropertyService(IPropertyService):
    """
    Service for property business logic.

    Coordinates between parser and repository, transforms scraped data
    into database format, and provides high-level property operations.
    """

    def __init__(
        self,
        repository: IPropertyRepository,
        parser: IPropertyParser,
        csv_export_service: ICSVExportService,
    ):
        self.repository = repository
        self.parser = parser
        self.csv_export_service = csv_export_service

    def get_property(self, property_id: int) -> Property | None:
        """
        Get property by ID.

        Args:
            property_id: Property ID

        Returns:
            Property if found, None otherwise
        """
        return self.repository.get_by_id(property_id)

    def list_properties(self, filters: PropertyFilters) -> tuple[list[Property], int]:
        """
        List properties with filtering and pagination.

        Args:
            filters: PropertyFilters with filter criteria

        Returns:
            Tuple of (list of properties, total count)
        """
        return self.repository.list_properties(filters)

    def export_properties(self, filters: PropertyFilters) -> tuple[BytesIO, str]:
        """
        Export properties to CSV format.

        Args:
            filters: PropertyFilters with filter criteria

        Returns:
            Tuple of (csv_buffer, filename)

        Raises:
            HTTPException: If result count exceeds EXPORT_LIMIT
        """
        properties, total_count = self.repository.list_all_properties(filters)

        # Check if total count exceeds limit
        if total_count > EXPORT_LIMIT:
            raise HTTPException(
                status_code=413,
                detail=f"Export limited to {EXPORT_LIMIT:,} properties. "
                f"Please refine your filters. Found {total_count:,} matching properties.",
            )

        # Generate CSV
        csv_buffer = self.csv_export_service.export_properties_to_csv(properties)

        # Generate filename
        filename = self.csv_export_service.generate_filename(filters)

        logger.info(f"Exported {len(properties)} properties as {filename}")
        return csv_buffer, filename

    def get_unique_cities(self) -> list[str]:
        """
        Get all unique cities from non-deleted properties.

        Returns:
            List of unique city names sorted alphabetically
        """
        return self.repository.get_unique_cities()

    def get_available_platforms(self) -> list[PropertySource]:
        """
        Get all available platforms/sources.

        Returns:
            List of all PropertySource enum values
        """
        return list(PropertySource)

    def _transform_scraped_data(
        self, scraped_data: dict[str, Any], source: PropertySource
    ) -> dict[str, Any]:
        """
        Transform scraped data into database format.

        Args:
            scraped_data: Raw scraped data with fields:
                - grad: city name
                - naslov: title
                - cijena: price string
                - kvadratura: area string
                - broj_soba: rooms string
                - tip: property type string
                - lokacija: location
                - link: unique URL
                - slika_url: featured image URL (optional)
            source: PropertySource enum

        Returns:
            Dictionary ready for database insertion
        """
        now = datetime.now(timezone.utc)

        # Parse values
        price_eur = self.parser.parse_price(scraped_data.get("cijena", ""))
        area_sqm = self.parser.parse_area(scraped_data.get("kvadratura"))
        rooms = self.parser.parse_rooms(scraped_data.get("broj_soba"))
        property_type = self.parser.parse_property_type(scraped_data.get("tip"))

        return {
            "source": source,
            "link": scraped_data["link"],
            "image_url": scraped_data.get("slika_url"),
            "city": scraped_data["grad"],
            "location": scraped_data["lokacija"],
            "title": scraped_data["naslov"],
            "property_type": property_type,
            # Raw values
            "price_raw": scraped_data.get("cijena", ""),
            "area_raw": scraped_data.get("kvadratura"),
            "rooms_raw": scraped_data.get("broj_soba"),
            # Parsed values
            "price_eur": price_eur,
            "area_sqm": area_sqm,
            "rooms": rooms,
            # Timestamps
            "created_at": now,
            "updated_at": now,
        }

    def save_scraped_property(
        self, scraped_data: dict[str, Any], source: PropertySource
    ) -> Property:
        """
        Save single scraped property.

        Args:
            scraped_data: Raw scraped data
            source: PropertySource enum (ESTITOR or REALITICA)

        Returns:
            Saved Property
        """
        property_data = self._transform_scraped_data(scraped_data, source)
        return self.repository.upsert(property_data)

    def bulk_save_scraped_properties(
        self, scraped_data_list: list[dict[str, Any]], source: PropertySource
    ) -> int:
        """
        Bulk save scraped properties.

        Args:
            scraped_data_list: List of raw scraped data dictionaries
            source: PropertySource enum (ESTITOR or REALITICA)

        Returns:
            Count of saved properties
        """
        if not scraped_data_list:
            logger.info("No properties to save")
            return 0

        # Transform all scraped data
        properties_data = [
            self._transform_scraped_data(data, source) for data in scraped_data_list
        ]

        # Bulk upsert
        count = self.repository.bulk_upsert(properties_data)
        logger.info(
            f"Saved {count} properties from {source.value} (total scraped: {len(scraped_data_list)})"
        )
        return count
