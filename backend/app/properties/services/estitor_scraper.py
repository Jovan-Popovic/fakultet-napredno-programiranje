from __future__ import annotations

import logging
import random
import re
import time
from collections.abc import Generator
from contextlib import contextmanager
from typing import Any, ClassVar, Protocol

from playwright.sync_api import Browser, ElementHandle, Page, sync_playwright

from app.utils.di import inject

logger = logging.getLogger(__name__)


class IEstitorScraper(Protocol):
    """Protocol interface for Estitor scraper."""

    def scrape_city(self, city: str, city_slug: str) -> list[dict[str, Any]]:
        """Scrape all property listings for a single city from Estitor."""
        ...

    def parse_listing(self, element: ElementHandle, city: str) -> dict[str, Any] | None:
        """Parse a single Estitor listing element."""
        ...

    def get_cities(self) -> dict[str, str]:
        """Return Estitor city mappings."""
        ...


@inject(alias=IEstitorScraper, singleton=True)
class EstitorScraper(IEstitorScraper):
    """
    Scraper for Estitor.com property listings.

    Implements the ScraperProtocol interface for scraping real estate
    listings from the Estitor website across 15 cities in Montenegro.
    """

    BASE_URL = "https://estitor.com"
    CITIES: ClassVar = {
        "Tivat": "grad-tivat",
        "Podgorica": "grad-podgorica",
        "Budva": "grad-budva",
        "Bar": "grad-bar",
        "Nikšić": "grad-niksic",
        "Herceg Novi": "grad-herceg-novi",
        "Kotor": "grad-kotor",
        "Danilovgrad": "grad-danilovgrad",
        "Kolašin": "grad-kolasin",
        "Cetinje": "grad-cetinje",
        "Žabljak": "grad-zabljak",
        "Ulcinj": "grad-ulcinj",
        "Bjelo Polje": "grad-bijelo-polje",
        "Plužine": "grad-pluzine",
        "Berane": "grad-berane",
    }

    # Browser settings
    HEADLESS: bool = True
    TIMEOUT: int = 60000

    # Rate limiting and delays
    MIN_DELAY: float = 1.5
    MAX_DELAY: float = 4.0
    PAGE_SCROLL_COUNT: int = 6

    def __init__(self) -> None:
        self.seen_links: set[str] = set()

    @contextmanager
    def _create_browser(self) -> Generator[Browser]:
        """Context manager for browser instance."""
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=self.HEADLESS)
            try:
                yield browser
            finally:
                browser.close()

    @contextmanager
    def _create_page(self) -> Generator[Page]:
        """Context manager for page instance."""
        with self._create_browser() as browser:
            page = browser.new_page()
            try:
                yield page
            finally:
                page.close()

    def _human_sleep(
        self, min_s: float | None = None, max_s: float | None = None
    ) -> None:
        """Sleep for a random duration to simulate human behavior."""
        min_delay = min_s if min_s is not None else self.MIN_DELAY
        max_delay = max_s if max_s is not None else self.MAX_DELAY
        duration = random.uniform(min_delay, max_delay)
        logger.debug(f"Sleeping for {duration:.2f} seconds")
        time.sleep(duration)

    def _navigate_to_url(self, page: Page, url: str) -> None:
        """Navigate to URL with configured timeout."""
        logger.info(f"Navigating to: {url}")
        page.goto(url, timeout=self.TIMEOUT)

    def _is_duplicate_link(self, link: str) -> bool:
        """Check if a link has already been seen."""
        if link in self.seen_links:
            logger.debug(f"Duplicate link skipped: {link}")
            return True
        self.seen_links.add(link)
        return False

    def _scroll_page(self, page: Page, count: int | None = None) -> None:
        """Scroll page multiple times to trigger lazy loading."""
        scroll_count = count if count is not None else self.PAGE_SCROLL_COUNT
        logger.debug(f"Scrolling page {scroll_count} times")

        for i in range(scroll_count):
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            self._human_sleep(0.5, 1.0)
            logger.debug(f"Scroll iteration {i + 1}/{scroll_count}")

    def _build_absolute_url(self, base_url: str, href: str) -> str:
        """Convert relative URL to absolute URL."""
        if href.startswith("http"):
            return href
        return (
            f"{base_url}{href}"
            if not href.startswith("/")
            else f"{base_url}/{href.lstrip('/')}"
        )

    def _parse_area_from_text(self, text: str) -> str | None:
        """Extract area like '85 m²' from text."""
        match = re.search(r"(\d+)\s*m²?", text)
        if match:
            return f"{match.group(1)} m²"
        return None

    def _parse_rooms_from_text(self, text: str) -> str | None:
        """Extract room count from Serbian/Montenegrin text patterns."""
        text_lower = text.lower()

        rooms_map = {
            "jednosoban": "1",
            "dvosoban": "2",
            "trosoban": "3",
            "četvorosoban": "4",
            "garsonjera": "1",
        }

        for key, value in rooms_map.items():
            if key in text_lower:
                return value

        match = re.search(r"(\d+)\s*sobe?", text_lower)
        if match:
            return match.group(1)

        return None

    def _parse_property_type(self, text: str) -> str | None:
        """Determine property type from title text."""
        text_lower = text.lower()

        if "garsonjera" in text_lower:
            return "Garsonjera"
        if "stan" in text_lower:
            return "Stan"
        if "kuća" in text_lower or "kuca" in text_lower:
            return "Kuća"
        if "poslovni prostor" in text_lower:
            return "Poslovni prostor"
        if "zemljište" in text_lower or "plac" in text_lower:
            return "Zemljište"

        return None

    def _extract_location_from_title(self, title: str) -> str:
        """Extract location suffix from title (text after last comma)."""
        parts = title.split(",")
        return parts[-1].strip() if len(parts) > 1 else ""

    def _clean_price_text(self, price_text: str) -> str:
        """Clean price text by removing extra whitespace."""
        return " ".join(price_text.split()).strip()

    def get_cities(self) -> dict[str, str]:
        """Return Estitor city mappings from configuration."""
        return self.CITIES

    def scrape_city(self, city: str, city_slug: str) -> list[dict[str, Any]]:
        """
        Scrape all property listings for a single city from Estitor.

        Iterates through pagination until no more listings are found.

        Args:
            city: Display name of the city
            city_slug: URL-friendly slug for the city

        Returns:
            List of property dictionaries
        """
        results: list[dict[str, Any]] = []
        page_num = 1

        logger.info(f"Starting Estitor scrape for {city}")

        with self._create_page() as page:
            while True:
                # Build URL with pagination
                url = f"{self.BASE_URL}/me/nekretnine/namjena-prodaja/{city_slug}"
                if page_num > 1:
                    url += f"/strana-{page_num}"

                logger.info(f"Scraping {city} - Page {page_num}: {url}")

                try:
                    self._navigate_to_url(page, url)

                    # Wait for listings to load
                    try:
                        page.wait_for_selector("article", timeout=10000)
                    except Exception:
                        logger.info(
                            f"No more listings found for {city} at page {page_num}"
                        )
                        break

                    # Add delay and scroll to trigger lazy loading
                    self._human_sleep(2, 4)
                    self._scroll_page(page)

                    # Get all listing elements
                    listings = page.query_selector_all("article")
                    if not listings:
                        logger.info(f"No listings found on page {page_num} for {city}")
                        break

                    logger.debug(
                        f"Found {len(listings)} listing elements on page {page_num}"
                    )

                    # Parse each listing
                    for listing in listings:
                        try:
                            parsed = self.parse_listing(listing, city)
                            if parsed:
                                results.append(parsed)
                        except Exception as e:
                            logger.warning(
                                f"Failed to parse listing in {city}: {e}", exc_info=True
                            )
                            continue

                    page_num += 1
                    self._human_sleep(3, 6)

                except Exception as e:
                    logger.error(
                        f"Error scraping {city} page {page_num}: {e}", exc_info=True
                    )
                    break

        logger.info(f"Completed scraping {city}: {len(results)} listings found")
        return results

    def parse_listing(self, element: ElementHandle, city: str) -> dict[str, Any] | None:
        """
        Parse a single Estitor listing element.

        Extracts:
        - Title and metadata (area, rooms, type, location)
        - Price
        - Link to full listing

        Args:
            element: Playwright ElementHandle for the article element
            city: City name to include in result

        Returns:
            Property dictionary or None if parsing fails
        """
        try:
            # Extract title
            title_el = element.query_selector("h3")
            title = title_el.inner_text().strip() if title_el else None

            if not title:
                logger.debug("Listing missing title, skipping")
                return None

            # Extract price
            price_el = element.query_selector("[class*=price]")
            price = self._clean_price_text(price_el.inner_text()) if price_el else None

            # Extract link
            link_el = element.query_selector("a")
            href = link_el.get_attribute("href") if link_el else None

            if not href:
                logger.debug("Listing missing link, skipping")
                return None

            # Build absolute URL
            link = self._build_absolute_url(self.BASE_URL, href)

            # Skip duplicates
            if self._is_duplicate_link(link):
                return None

            # Parse metadata from title
            area = self._parse_area_from_text(title)
            rooms = self._parse_rooms_from_text(title)
            prop_type = self._parse_property_type(title)
            location = self._extract_location_from_title(title)

            return {
                "grad": city,
                "naslov": title,
                "cijena": price,
                "kvadratura": area,
                "broj_soba": rooms,
                "tip": prop_type,
                "lokacija": location,
                "link": link,
            }

        except Exception as e:
            logger.warning(f"Exception parsing Estitor listing: {e}", exc_info=True)
            return None
