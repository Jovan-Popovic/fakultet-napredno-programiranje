from __future__ import annotations

import logging
import re
from datetime import datetime, timezone
from io import BytesIO
from typing import Protocol

import polars as pl

from app.properties.models.property import Property
from app.properties.repositories import PropertyFilters
from app.utils.di import inject

logger = logging.getLogger(__name__)


class ICSVExportService(Protocol):
    """Protocol interface for CSV export service."""

    def export_properties_to_csv(self, properties: list[Property]) -> BytesIO:
        """Export properties to CSV format."""
        ...

    def generate_filename(self, filters: PropertyFilters) -> str:
        """Generate descriptive filename from filters."""
        ...


@inject(alias=ICSVExportService, singleton=True)
class CSVExportService(ICSVExportService):
    """
    Service for exporting properties to CSV format.

    Uses Polars for efficient CSV generation with proper UTF-8 encoding.
    """

    def export_properties_to_csv(self, properties: list[Property]) -> BytesIO:
        """
        Export properties to CSV format.

        Args:
            properties: List of Property models to export

        Returns:
            BytesIO buffer containing CSV data with UTF-8 BOM
        """
        # Convert properties to dictionaries with selected columns
        data = [
            {
                "id": prop.id,
                "source": prop.source.value,
                "city": prop.city,
                "location": prop.location,
                "title": prop.title,
                "propertyType": prop.property_type.value if prop.property_type else None,
                "priceEur": float(prop.price_eur) if prop.price_eur else None,
                "priceRaw": prop.price_raw,
                "areaSqm": float(prop.area_sqm) if prop.area_sqm else None,
                "areaRaw": prop.area_raw,
                "rooms": prop.rooms,
                "roomsRaw": prop.rooms_raw,
                "link": prop.link,
                "imageUrl": prop.image_url,
                "createdAt": prop.created_at.isoformat(),
                "updatedAt": prop.updated_at.isoformat(),
            }
            for prop in properties
        ]

        # Create Polars DataFrame
        df = pl.DataFrame(data)

        # Write to BytesIO buffer
        buffer = BytesIO()

        # Add UTF-8 BOM for Excel compatibility
        buffer.write(b"\xef\xbb\xbf")

        # Write CSV
        df.write_csv(buffer)

        # Reset buffer position
        buffer.seek(0)

        logger.info(f"Exported {len(properties)} properties to CSV")
        return buffer

    def generate_filename(self, filters: PropertyFilters) -> str:  # noqa: C901
        """
        Generate descriptive filename from filters.

        Format: properties_export_YYYYMMDD_HHMMSS[_filter_summary].csv

        Args:
            filters: PropertyFilters to generate summary from

        Returns:
            Sanitized filename string
        """
        # Base timestamp
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        base = f"properties_export_{timestamp}"

        # Build filter summary parts
        parts: list[str] = []

        if filters.cities:
            # Join cities with underscore
            cities_str = "_".join(filters.cities[:3])  # Limit to 3 cities
            parts.append(cities_str)

        if filters.property_types:
            # Join property types
            types_str = "_".join(t.value for t in filters.property_types[:2])
            parts.append(types_str)

        if filters.min_price or filters.max_price:
            # Price range
            price_parts = []
            if filters.min_price:
                price_parts.append(f"{int(filters.min_price)}")
            if filters.max_price:
                price_parts.append(f"{int(filters.max_price)}")
            parts.append(f"{'-'.join(price_parts)}eur")

        if filters.min_area or filters.max_area:
            # Area range
            area_parts = []
            if filters.min_area:
                area_parts.append(f"{int(filters.min_area)}")
            if filters.max_area:
                area_parts.append(f"{int(filters.max_area)}")
            parts.append(f"{'-'.join(area_parts)}sqm")

        if filters.rooms:
            # Rooms
            rooms_str = "_".join(str(r) for r in filters.rooms[:3])
            parts.append(f"{rooms_str}rooms")

        if filters.search:
            # Search term (sanitized)
            search_clean = re.sub(r"[^\w\s-]", "", filters.search)[:20]
            parts.append(search_clean.replace(" ", "_"))

        # Combine parts
        if parts:
            filter_summary = "_".join(parts)
            # Sanitize and limit length
            filter_summary = re.sub(r"[^\w\s-]", "", filter_summary)
            filter_summary = filter_summary[:100]  # Max 100 chars
            filename = f"{base}_{filter_summary}.csv"
        else:
            filename = f"{base}.csv"

        # Final sanitization
        filename = filename.lower().replace(" ", "_")

        logger.debug(f"Generated filename: {filename}")
        return filename
