"""Browser pool for resource-efficient web scraping."""

import logging
import threading
from contextlib import contextmanager
from queue import Empty, Full, Queue
from typing import Generator, Protocol

from playwright.sync_api import Browser, PlaywrightContextManager, sync_playwright

from app.config.settings import Settings
from app.utils.di import inject

logger = logging.getLogger(__name__)


class IBrowserPool(Protocol):
    """Protocol for browser pool implementations."""

    @contextmanager
    def get_browser(self) -> Generator[Browser, None, None]:
        """Checkout browser from pool, yield for use, auto-return on exit."""
        ...

    def close_all(self) -> None:
        """Gracefully close all browsers and playwright context."""
        ...


@inject(alias=IBrowserPool, singleton=True)
class BrowserPool:
    """Thread-safe browser pool with fixed capacity.

    Manages a pool of Playwright browsers to avoid the overhead of creating
    a new browser instance for each scraping task. Browsers are checked out
    from the pool, used, and automatically returned.

    The pool is a per-worker singleton - each Celery worker process maintains
    its own pool of browsers.
    """

    def __init__(self, settings: Settings) -> None:
        """Initialize browser pool.

        Args:
            settings: Application settings containing pool configuration.
        """
        self.pool_size = settings.BROWSER_POOL_SIZE
        self.timeout = settings.BROWSER_POOL_TIMEOUT
        self.headless = settings.BROWSER_HEADLESS

        self._browsers: Queue[Browser] = Queue(maxsize=self.pool_size)
        self._playwright: PlaywrightContextManager | None = None
        self._lock = threading.Lock()
        self._initialized = False

        logger.info(
            f"Browser pool initialized with size={self.pool_size}, "
            f"timeout={self.timeout}s, headless={self.headless}"
        )

    @contextmanager
    def get_browser(self) -> Generator[Browser, None, None]:
        """Checkout browser from pool, yield for use, auto-return on exit.

        This is a context manager that ensures the browser is always returned
        to the pool, even if an exception occurs during scraping.

        Yields:
            Browser: A Playwright browser instance ready for use.

        Raises:
            Empty: If no browser is available within the timeout period.
        """
        browser = self._checkout_browser()
        logger.debug("Browser checked out from pool")
        try:
            yield browser
        finally:
            self._return_browser(browser)
            logger.debug("Browser returned to pool")

    def _checkout_browser(self) -> Browser:
        """Get browser from pool or create new one if pool not full.

        Returns:
            Browser: A Playwright browser instance.

        Raises:
            Empty: If no browser is available within the timeout period.
        """
        # Try to get existing browser from pool
        try:
            return self._browsers.get(timeout=self.timeout)
        except Empty:
            # Pool is empty, create new browser if possible
            with self._lock:
                # Initialize Playwright on first use
                if self._playwright is None:
                    logger.info("Starting Playwright context")
                    self._playwright = sync_playwright().start()
                    self._initialized = True

                # Launch new browser
                logger.info("Launching new browser")
                return self._playwright.chromium.launch(headless=self.headless)

    def _return_browser(self, browser: Browser) -> None:
        """Return browser to pool for reuse.

        If the pool is full, the browser is closed and discarded.

        Args:
            browser: The browser to return to the pool.
        """
        try:
            self._browsers.put_nowait(browser)
        except Full:
            # Pool is full, close the browser
            logger.warning("Browser pool full, closing excess browser")
            browser.close()

    def close_all(self) -> None:
        """Gracefully close all browsers and playwright context.

        This should be called during worker shutdown to ensure clean
        termination of all browser processes.
        """
        logger.info("Closing all browsers in pool")

        # Close all browsers in the queue
        closed_count = 0
        while not self._browsers.empty():
            try:
                browser = self._browsers.get_nowait()
                browser.close()
                closed_count += 1
            except Empty:
                break

        logger.info(f"Closed {closed_count} browsers")

        # Stop Playwright context
        if self._playwright and self._initialized:
            logger.info("Stopping Playwright context")
            self._playwright.stop()
            self._playwright = None
            self._initialized = False

        logger.info("Browser pool cleanup complete")
