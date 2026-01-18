from __future__ import annotations

import logging
import random
import re
import time
from typing import Any, ClassVar, Protocol

from playwright.sync_api import Locator, Page

from app.properties.services.browser_pool import IBrowserPool
from app.utils.di import inject

logger = logging.getLogger(__name__)


class IRealiticaScraper(Protocol):
    """Protocol interface for Realitica scraper."""

    def scrape_city(self, city: str, city_slug: str) -> list[dict[str, Any]]:
        """Scrape all property listings for a single city from Realitica."""
        ...

    def parse_listing(self, div: Locator, city: str) -> dict[str, Any] | None:
        """Parse a single Realitica listing element."""
        ...

    def get_cities(self) -> dict[str, str]:
        """Return Realitica city mappings."""
        ...


@inject(alias=IRealiticaScraper, singleton=False)
class RealiticaScraper(IRealiticaScraper):
    """
    Scraper for Realitica.com property listings.

    Implements the ScraperProtocol interface for scraping real estate
    listings from the Realitica website across 23 cities in Montenegro.
    """

    BASE_URL_PARAMS = (
        "https://www.realitica.com/index.php?"
        "for=Prodaja&pZpa=Crna+Gora&pState=Crna+Gora"
        "&type%5B%5D=&price-min=&price-max="
        "&since-day=p-anytime&qob=p-default&qry=&lng=hr"
    )
    CITIES: ClassVar = {
        "Andrijevica": "Andrijevica",
        "Bar": "Bar",
        "Berane": "Berane",
        "Bijelo Polje": "Bijelo Polje",
        "Budva": "Budva",
        "Budva okolina": "Budva Okolina",
        "Cetinje": "Cetinje",
        "Danilovgrad": "Danilovgrad",
        "Herceg Novi": "Herceg Novi",
        "Kolašin": "Kolašin",
        "Kotor": "Kotor",
        "Mojkovac": "Mojkovac",
        "Nikšić": "Nikšić",
        "Plav": "Plav",
        "Plužine": "Plužine",
        "Pljevlja": "Pljevlja",
        "Podgorica": "Podgorica",
        "Podgorica okolina": "Podgorica Okolina",
        "Rožaje": "Rožaje",
        "Šavnik": "Šavnik",
        "Tivat": "Tivat",
        "Ulcinj": "Ulcinj",
        "Žabljak": "Žabljak",
    }

    # Browser settings
    HEADLESS: bool = True
    TIMEOUT: int = 60000

    # Rate limiting and delays
    MIN_DELAY: float = 1.5
    MAX_DELAY: float = 4.0

    def __init__(self, browser_pool: IBrowserPool) -> None:
        self.browser_pool = browser_pool
        self.seen_links: set[str] = set()

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

    def get_cities(self) -> dict[str, str]:
        """Return Realitica city mappings from configuration."""
        return self.CITIES

    def scrape_city(self, city: str, city_slug: str) -> list[dict[str, Any]]:
        results: list[dict[str, Any]] = []
        page_num = 1

        logger.info(f"Starting Realitica scrape for {city}")

        with self.browser_pool.get_browser() as browser:
            page = browser.new_page()
            try:
                while True:
                    # Build URL with city parameter and pagination
                    if page_num == 1:
                        url = f"{self.BASE_URL_PARAMS}&opa%5B%5D={city_slug}"
                    else:
                        url = f"{self.BASE_URL_PARAMS}&opa%5B%5D={city_slug}&cur_page={page_num}"

                    logger.info(f"Scraping {city} - Page {page_num}: {url}")

                    try:
                        self._navigate_to_url(page, url)

                        # Wait for page to load
                        page.wait_for_timeout(4000)

                        # Find all listing containers
                        listings = page.locator('div:has(a[href*="listing"])')
                        listing_count = listings.count()

                        if listing_count == 0:
                            logger.info(
                                f"No listings found on page {page_num} for {city}"
                            )
                            break

                        logger.debug(
                            f"Found {listing_count} listing elements on page {page_num}"
                        )

                        new_items = 0

                        # Parse each listing
                        for i in range(listing_count):
                            try:
                                div = listings.nth(i)
                                parsed = self.parse_listing(div, city)

                                if parsed and not self._is_duplicate_link(
                                    parsed["link"]
                                ):
                                    results.append(parsed)
                                    new_items += 1

                            except Exception as e:
                                logger.warning(
                                    f"Failed to parse listing {i} in {city}: {e}",
                                    exc_info=True,
                                )
                                continue

                        logger.info(f"Page {page_num}: Found {new_items} new listings")

                        # If no new items were found, we've reached the end
                        if new_items == 0:
                            logger.info(f"No new listings on page {page_num}, stopping")
                            break

                        page_num += 1
                        self._human_sleep()

                    except Exception as e:
                        logger.error(
                            f"Error scraping {city} page {page_num}: {e}", exc_info=True
                        )
                        break
            finally:
                page.close()

        logger.info(f"Completed scraping {city}: {len(results)} listings found")
        return results

    def parse_listing(  # noqa: C901
        self, div: Locator, city: str
    ) -> dict[str, Any] | None:
        """
        Parse a single Realitica listing element.

        Extracts:
        - Title (naslov)
        - Price (cijena)
        - Area (kvadratura)
        - Rooms (broj_soba)
        - Property type (tip)
        - Location (lokacija)
        - Link
        - Featured image URL (slika_url)

        Args:
            div: Playwright Locator for the listing container
            city: City name to include in result

        Returns:
            Property dictionary or None if parsing fails
        """
        try:
            text = div.inner_text()

            # Extract link
            link = ""
            link_locators = div.locator("a")
            for i in range(link_locators.count()):
                href = link_locators.nth(i).get_attribute("href")
                if href and "listing" in href:
                    link = href
                    break

            if not link:
                logger.debug("Listing missing link, skipping")
                return None

            # Extract featured image URL
            image_url = ""
            img_locators = div.locator("img")
            if img_locators.count() > 0:
                src = img_locators.first.get_attribute("src")
                if src:
                    image_url = src

            # Extract title (naslov) - look for "prodaje se" pattern
            naslov = ""
            strong_locators = div.locator("strong")
            for i in range(strong_locators.count()):
                strong_text = strong_locators.nth(i).inner_text().strip()
                if "prodaje" in strong_text.lower():
                    naslov = strong_text
                    break

            if not naslov:
                logger.debug("Listing missing title, skipping")
                return None

            # Extract price - pattern like €123,456
            cijena = ""
            price_match = re.search(r"€[\d\.,]+", text)
            if price_match:
                cijena = price_match.group(0)

            # Extract area - pattern like "85 m"
            kvadratura = ""
            area_match = re.search(r"(\d+)\s*m", text)
            if area_match:
                kvadratura = area_match.group(1)

            # Extract rooms - pattern like "2 sobe"
            broj_soba = ""
            rooms_match = re.search(r"(\d+)\s*sobe?", text)
            if rooms_match:
                broj_soba = rooms_match.group(1)

            # Extract location - pattern like "City, Area, Crna Gora"
            lokacija = ""
            location_match = re.search(r".+?,.+?,\s*Crna Gora", text)
            if location_match:
                lokacija = location_match.group(0)

            # Determine property type from title
            tip = self._determine_property_type(naslov)

            return {
                "grad": city,
                "naslov": naslov,
                "cijena": cijena,
                "kvadratura": kvadratura,
                "broj_soba": broj_soba,
                "tip": tip,
                "lokacija": lokacija,
                "link": link,
                "slika_url": image_url,
            }

        except Exception as e:
            logger.warning(f"Exception parsing Realitica listing: {e}", exc_info=True)
            return None

    def _determine_property_type(self, title: str) -> str:
        """
        Determine property type from Realitica listing title.

        Args:
            title: Property title text

        Returns:
            Property type string
        """
        title_lower = title.lower()

        if "stan" in title_lower:
            return "Stan"
        if "kuća" in title_lower:
            return "Kuća"
        if "zemljište" in title_lower or "plac" in title_lower:
            return "Zemljište"

        return ""
