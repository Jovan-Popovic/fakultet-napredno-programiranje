from __future__ import annotations

import logging
from typing import Annotated

from fastapi import HTTPException, Query

from app.database.session_handler import DBAPIRouter
from app.properties.models.property import PropertySource, PropertyType
from app.properties.repositories import PropertyFilters
from app.properties.schemas import (
    CitiesResponse,
    PlatformsResponse,
    PropertyListResponse,
    PropertyResponse,
)
from app.properties.services.property_service import IPropertyService
from app.utils.di import get_from_di_container

logger = logging.getLogger(__name__)

router = DBAPIRouter(prefix="/properties", tags=["Properties"])


@router.get("", response_model=PropertyListResponse)
def list_properties(
    page: Annotated[int, Query(ge=1, description="Page number")] = 1,
    size: Annotated[int, Query(ge=1, le=500, description="Items per page")] = 50,
    cities: Annotated[
        list[str] | None,
        Query(description="Filter by cities (e.g., Budva, Kotor)"),
    ] = None,
    property_types: Annotated[
        list[PropertyType] | None,
        Query(
            alias="propertyTypes",
            description="Filter by property types",
        ),
    ] = None,
    sources: Annotated[
        list[PropertySource] | None,
        Query(description="Filter by sources (estitor, realitica)"),
    ] = None,
    min_price: Annotated[
        float | None,
        Query(alias="minPrice", ge=0, description="Minimum price in EUR"),
    ] = None,
    max_price: Annotated[
        float | None,
        Query(alias="maxPrice", ge=0, description="Maximum price in EUR"),
    ] = None,
    min_area: Annotated[
        float | None,
        Query(alias="minArea", ge=0, description="Minimum area in m²"),
    ] = None,
    max_area: Annotated[
        float | None,
        Query(alias="maxArea", ge=0, description="Maximum area in m²"),
    ] = None,
    rooms: Annotated[
        list[int] | None,
        Query(ge=1, description="Filter by number of rooms"),
    ] = None,
    search: Annotated[
        str | None,
        Query(
            min_length=2,
            max_length=200,
            description="Search in title and location",
        ),
    ] = None,
) -> PropertyListResponse:
    """
    List property listings with filtering and pagination.

    Supports filtering by:
    - Cities (multiple)
    - Property types (multiple)
    - Sources (estitor, realitica)
    - Price range (min/max EUR)
    - Area range (min/max m²)
    - Room count (multiple)
    - Full-text search in title and location

    Results are paginated and sorted by newest first.
    """
    service = get_from_di_container(IPropertyService)

    # Build filters
    filters = PropertyFilters(
        cities=cities,
        property_types=property_types,
        sources=sources,
        min_price=min_price,
        max_price=max_price,
        min_area=min_area,
        max_area=max_area,
        rooms=rooms,
        search=search,
        page=page,
        size=size,
    )

    # Get properties
    properties, total = service.list_properties(filters)

    # Build response
    return PropertyListResponse.from_properties(
        properties=properties,
        total=total,
        page=page,
        size=size,
    )


@router.get("/cities", response_model=CitiesResponse)
def get_cities() -> CitiesResponse:
    """
    Get all unique cities from properties.

    Returns a list of unique city names sorted alphabetically.
    Useful for populating filter dropdowns.
    """
    service = get_from_di_container(IPropertyService)
    cities = service.get_unique_cities()
    return CitiesResponse(cities=cities)


@router.get("/platforms", response_model=PlatformsResponse)
def get_platforms() -> PlatformsResponse:
    """
    Get all available platforms/sources.

    Returns a list of all PropertySource enum values.
    Useful for populating filter dropdowns.
    """
    service = get_from_di_container(IPropertyService)
    platforms = service.get_available_platforms()
    return PlatformsResponse(platforms=platforms)


@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int) -> PropertyResponse:
    """
    Get a single property by ID.

    Returns 404 if property not found or deleted.
    """
    service = get_from_di_container(IPropertyService)

    property_obj = service.get_property(property_id)
    if not property_obj:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "property_not_found",
                "message": f"Property with ID {property_id} not found",
            },
        )

    return PropertyResponse.from_model(property_obj)
