from __future__ import annotations

import logging
from typing import Any

from celery.schedules import crontab

from app.celery.celery_app import celery_app
from app.celery.decorators import beat_schedule
from app.database.session_handler import db_session_handler
from app.properties.models.property import PropertySource
from app.properties.services.estitor_scraper import IEstitorScraper
from app.properties.services.property_service import IPropertyService
from app.properties.services.realitica_scraper import IRealiticaScraper
from app.utils.di import get_from_di_container

logger = logging.getLogger(__name__)


# ============================================================================
# ESTITOR TASKS
# ============================================================================


@celery_app.task()
@db_session_handler
def scrape_estitor_city(city: str, city_slug: str) -> dict[str, Any]:
    """
    Scrape a single city from Estitor.

    Args:
        city: Display name of the city
        city_slug: URL-friendly slug for the city

    Returns:
        Dictionary with scraping results and status
    """
    try:
        scraper = get_from_di_container(IEstitorScraper)
        property_service = get_from_di_container(IPropertyService)
        logger.info(f"Starting Estitor scraper for {city}")

        listings = scraper.scrape_city(city, city_slug)

        logger.info(f"Successfully scraped {len(listings)} listings from {city}")

        # Save listings to database
        saved_count = property_service.bulk_save_scraped_properties(
            listings, PropertySource.ESTITOR
        )

        logger.info(f"Saved {saved_count} properties from {city} to database")

        return {
            "scraper": "estitor",
            "city": city,
            "scraped_count": len(listings),
            "saved_count": saved_count,
            "status": "success",
        }

    except Exception as e:
        logger.exception(f"Failed to scrape {city} with Estitor")
        return {
            "scraper": "estitor",
            "city": city,
            "scraped_count": 0,
            "saved_count": 0,
            "status": "failed",
            "error": str(e),
        }


@celery_app.task()
def scrape_all_estitor_cities() -> dict[str, Any]:
    """
    Queue scraping tasks for all cities supported by Estitor.

    Returns:
        Dictionary with task IDs and status
    """
    try:
        scraper = get_from_di_container(IEstitorScraper)
        cities = scraper.get_cities()

        logger.info(f"Queueing Estitor tasks for {len(cities)} cities")

        task_ids = []
        for city, slug in cities.items():
            result = scrape_estitor_city.delay(city, slug)
            task_ids.append(result.id)
            logger.debug(f"Queued task {result.id} for {city}")

        logger.info(f"Successfully queued {len(task_ids)} Estitor tasks")

        return {
            "scraper": "estitor",
            "cities_queued": len(task_ids),
            "task_ids": task_ids,
            "status": "success",
        }

    except Exception as e:
        logger.exception("Failed to queue Estitor tasks")
        return {
            "scraper": "estitor",
            "cities_queued": 0,
            "status": "failed",
            "error": str(e),
        }


# ============================================================================
# REALITICA TASKS
# ============================================================================


@celery_app.task()
@db_session_handler
def scrape_realitica_city(city: str, city_slug: str) -> dict[str, Any]:
    """
    Scrape a single city from Realitica.

    Args:
        city: Display name of the city
        city_slug: URL-friendly slug for the city

    Returns:
        Dictionary with scraping results and status
    """
    try:
        scraper = get_from_di_container(IRealiticaScraper)
        property_service = get_from_di_container(IPropertyService)
        logger.info(f"Starting Realitica scraper for {city}")

        listings = scraper.scrape_city(city, city_slug)

        logger.info(f"Successfully scraped {len(listings)} listings from {city}")

        # Save listings to database
        saved_count = property_service.bulk_save_scraped_properties(
            listings, PropertySource.REALITICA
        )

        logger.info(f"Saved {saved_count} properties from {city} to database")

        return {
            "scraper": "realitica",
            "city": city,
            "scraped_count": len(listings),
            "saved_count": saved_count,
            "status": "success",
        }

    except Exception as e:
        logger.exception(f"Failed to scrape {city} with Realitica")
        return {
            "scraper": "realitica",
            "city": city,
            "scraped_count": 0,
            "saved_count": 0,
            "status": "failed",
            "error": str(e),
        }


@celery_app.task()
def scrape_all_realitica_cities() -> dict[str, Any]:
    """
    Queue scraping tasks for all cities supported by Realitica.

    Returns:
        Dictionary with task IDs and status
    """
    try:
        scraper = get_from_di_container(IRealiticaScraper)
        cities = scraper.get_cities()

        logger.info(f"Queueing Realitica tasks for {len(cities)} cities")

        task_ids = []
        for city, slug in cities.items():
            result = scrape_realitica_city.delay(city, slug)
            task_ids.append(result.id)
            logger.debug(f"Queued task {result.id} for {city}")

        logger.info(f"Successfully queued {len(task_ids)} Realitica tasks")

        return {
            "scraper": "realitica",
            "cities_queued": len(task_ids),
            "task_ids": task_ids,
            "status": "success",
        }

    except Exception as e:
        logger.exception("Failed to queue Realitica tasks")
        return {
            "scraper": "realitica",
            "cities_queued": 0,
            "status": "failed",
            "error": str(e),
        }


# ============================================================================
# GENERAL SCHEDULED TASK
# ============================================================================


@beat_schedule(
    name="daily-property-scraper",
    schedule=crontab(hour=2, minute=0),  # Run daily at 2:00 AM UTC
)
@celery_app.task()
def run_all_scrapers_scheduled() -> dict[str, Any]:
    """
    Scheduled task to run all scrapers daily.

    This task is automatically triggered by Celery Beat at 2:00 AM UTC.
    It queues scraping tasks for both Estitor and Realitica.

    Returns:
        Dictionary with triggered scrapers and status
    """
    try:
        logger.info("Starting daily scraper run")

        # Queue Estitor scraper
        logger.info("Triggering Estitor scraper")
        scrape_all_estitor_cities.delay()

        # Queue Realitica scraper
        logger.info("Triggering Realitica scraper")
        scrape_all_realitica_cities.delay()

        logger.info("Daily scraper run completed")

        return {
            "scrapers_triggered": ["estitor", "realitica"],
            "status": "success",
        }

    except Exception as e:
        logger.exception("Failed to run scheduled scraper task")
        return {
            "scrapers_triggered": [],
            "status": "failed",
            "error": str(e),
        }
