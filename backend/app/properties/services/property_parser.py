from __future__ import annotations

import logging
import re
from typing import ClassVar, Protocol

from app.properties.models.property import PropertyType
from app.utils.di import inject

logger = logging.getLogger(__name__)


class IPropertyParser(Protocol):
    """Protocol interface for property data parsing."""

    def parse_price(self, price_str: str) -> float | None:
        """Parse price string to numeric EUR value."""
        ...

    def parse_area(self, area_str: str | None) -> float | None:
        """Parse area string to numeric square meter value."""
        ...

    def parse_rooms(self, rooms_str: str | None) -> int | None:
        """Parse room count string to integer."""
        ...

    def parse_property_type(self, type_str: str | None) -> PropertyType | None:
        """Map property type string to PropertyType enum."""
        ...


@inject(alias=IPropertyParser, singleton=True)
class PropertyParser(IPropertyParser):
    """
    Service for parsing and transforming scraped property data.

    Handles conversion of raw string values (prices, areas, rooms)
    into structured numeric values suitable for database storage.
    """

    # Room count mapping for Serbian/Montenegrin terms
    ROOM_MAPPING: ClassVar = {
        "garsonjera": 1,
        "jednosoban": 1,
        "dvosoban": 2,
        "trosoban": 3,
        "četvorosoban": 4,
        "petsoban": 5,
        "šestosoban": 6,
    }

    # Property type mapping
    TYPE_MAPPING: ClassVar = {
        "stan": PropertyType.STAN,
        "kuća": PropertyType.KUCA,
        "kuca": PropertyType.KUCA,
        "garsonjera": PropertyType.GARSONJERA,
        "apartman": PropertyType.APARTMAN,
        "vikendica": PropertyType.VIKENDICA,
        "poslovni prostor": PropertyType.POSLOVNI_PROSTOR,
        "poslovni": PropertyType.POSLOVNI_PROSTOR,
        "zemljište": PropertyType.ZEMLJISTE,
        "zemljiste": PropertyType.ZEMLJISTE,
    }

    def parse_price(self, price_str: str) -> float | None:
        """
        Parse price string to numeric EUR value.

        Examples:
            "€123,456" -> 123456.00
            "123.456 €" -> 123456.00
            "123456" -> 123456.00

        Args:
            price_str: Price string from scraper

        Returns:
            Parsed price as float, or None if parsing fails
        """
        if not price_str:
            return None

        try:
            # Remove currency symbols and whitespace
            cleaned = price_str.replace("€", "").replace(" ", "").strip()

            # Remove thousands separators (both comma and period)
            # Replace comma with nothing, period with nothing
            cleaned = cleaned.replace(",", "").replace(".", "")

            # Convert to float
            return float(cleaned)
        except (ValueError, AttributeError) as e:
            logger.warning(f"Failed to parse price '{price_str}': {e}")
            return None

    def parse_area(self, area_str: str | None) -> float | None:
        """
        Parse area string to numeric square meter value.

        Examples:
            "85 m²" -> 85.00
            "85m2" -> 85.00
            "85.5 m²" -> 85.50

        Args:
            area_str: Area string from scraper

        Returns:
            Parsed area as float, or None if parsing fails
        """
        if not area_str:
            return None

        try:
            # Extract numeric value using regex
            # Matches patterns like "85", "85.5", "85,5"
            match = re.search(r"(\d+(?:[.,]\d+)?)", area_str)
            if match:
                # Replace comma with period for decimal
                number_str = match.group(1).replace(",", ".")
                return float(number_str)

            return None
        except (ValueError, AttributeError) as e:
            logger.warning(f"Failed to parse area '{area_str}': {e}")
            return None

    def parse_rooms(self, rooms_str: str | None) -> int | None:
        """
        Parse room count string to integer.

        Examples:
            "dvosoban" -> 2
            "trosoban" -> 3
            "2" -> 2
            "garsonjera" -> 1

        Args:
            rooms_str: Room count string from scraper

        Returns:
            Parsed room count as int, or None if parsing fails
        """
        if not rooms_str:
            return None

        try:
            # Normalize to lowercase for comparison
            normalized = rooms_str.lower().strip()

            # Check if it's a numeric value
            if normalized.isdigit():
                return int(normalized)

            # Check mapping for Serbian/Montenegrin terms
            for term, count in self.ROOM_MAPPING.items():
                if term in normalized:
                    return count

            # Try to extract number from string
            match = re.search(r"(\d+)", normalized)
            if match:
                return int(match.group(1))

            return None
        except (ValueError, AttributeError) as e:
            logger.warning(f"Failed to parse rooms '{rooms_str}': {e}")
            return None

    def parse_property_type(self, type_str: str | None) -> PropertyType | None:
        """
        Map property type string to PropertyType enum.

        Examples:
            "Stan" -> PropertyType.STAN
            "Kuća" -> PropertyType.KUCA
            "garsonjera" -> PropertyType.GARSONJERA

        Args:
            type_str: Property type string from scraper

        Returns:
            PropertyType enum value, or PropertyType.UNKNOWN if not recognized
        """
        if not type_str:
            return PropertyType.UNKNOWN

        try:
            # Normalize to lowercase for comparison
            normalized = type_str.lower().strip()

            # Check direct mapping
            if normalized in self.TYPE_MAPPING:
                return self.TYPE_MAPPING[normalized]

            # Check if any mapping key is contained in the string
            for key, prop_type in self.TYPE_MAPPING.items():
                if key in normalized:
                    return prop_type

            logger.debug(f"Unknown property type '{type_str}', using UNKNOWN")
            return PropertyType.UNKNOWN
        except (AttributeError, KeyError) as e:
            logger.warning(f"Failed to parse property type '{type_str}': {e}")
            return PropertyType.UNKNOWN
