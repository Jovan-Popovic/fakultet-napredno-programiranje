from __future__ import annotations

import importlib
from logging import getLogger
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

from celery import Celery, Task, signals
from dotenv import load_dotenv

from app.celery.decorators import get_beat_schedule
from app.celery.serializers import register_pydantic_serializer
from app.config.settings import DBSettings, Settings
from app.database.import_sqlalchemy_models import load_all_models
from app.properties.services import estitor_scraper, realitica_scraper  # noqa: F401
from app.utils.di import add_to_di_container, get_from_di_container
from app.utils.logging import set_up_logging

logger = getLogger(__name__)

# Register Pydantic-based serializer with Decimal, date, datetime, and UUID support
register_pydantic_serializer()

Task.__class_getitem__ = classmethod(lambda cls, *_args, **_kwargs: cls)  # type: ignore[attr-defined]  # monkey patch Task so generic params can be provided

_THIS_FILE = Path(__file__).resolve()
APP_ROOT = _THIS_FILE.parents[2]
APP_FOLDER = APP_ROOT / "app"

_DOTENV = APP_ROOT / ".env"
loaded = load_dotenv(dotenv_path=_DOTENV)

settings = Settings()

load_all_models(APP_FOLDER)

celery_app = Celery(
    "app", broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_RESULT_BACKEND
)

beat_schedule: dict[str, Any] = {}

# Parse broker and result backend URLs to check for sentinel protocol
broker_parsed = urlparse(settings.CELERY_BROKER_URL)
result_backend_parsed = urlparse(settings.CELERY_RESULT_BACKEND)

celery_config = {
    "timezone": "UTC",
    "beat_schedule": beat_schedule,
    "beat_max_loop_interval": 5,
    # Use Pydantic-based JSON serializer with Decimal, date, datetime, and UUID support
    "task_serializer": "json_pydantic",
    "result_serializer": "json_pydantic",
    "accept_content": [
        "json_pydantic",
        "json",
    ],  # Accept both for backwards compatibility
    "result_expires": 7600,  # 2 hours
}

# Add broker transport options if broker URL uses sentinel protocol
if broker_parsed.scheme == "sentinel":
    celery_config["broker_transport_options"] = {
        "master_name": settings.SENTINEL_MASTER_NAME,
        "sentinel_kwargs": {"socket_timeout": 2},
    }

# Add result backend transport options if result backend URL uses sentinel protocol
if result_backend_parsed.scheme == "sentinel":
    celery_config["result_backend_transport_options"] = {
        "master_name": settings.SENTINEL_MASTER_NAME,
        "sentinel_kwargs": {"socket_timeout": 2},
    }

celery_app.conf.update(**celery_config)


def discover_all_task_modules() -> list[str]:
    task_modules = []
    task_files = APP_FOLDER.rglob("tasks/*.py")

    for task_file in task_files:
        # Skip __init__.py files
        if task_file.name == "__init__.py":
            continue

        # Convert file path to module name
        rel_path = task_file.relative_to(APP_FOLDER.parent)
        module_name = (
            str(rel_path).replace("/", ".").replace("\\", ".").replace(".py", "")
        )
        task_modules.append(module_name)

    return task_modules


autodiscover_tasks = discover_all_task_modules()

# Force import of task modules to trigger decorators
for module_name in autodiscover_tasks:
    importlib.import_module(module_name)

# celery_app.autodiscover_tasks(autodiscover_tasks)

# Update beat_schedule with decorator-registered tasks after forced imports
beat = get_beat_schedule()
beat_schedule.update(beat)

# Update celery config with the new beat schedule
celery_app.conf.beat_schedule = beat_schedule


def _wire_di() -> None:
    add_to_di_container(Settings, settings)
    add_to_di_container(DBSettings, settings)


_wire_di()


@signals.worker_process_init.connect
def on_worker_process_init(**_: Any) -> None:
    _wire_di()


@signals.worker_process_shutdown.connect
def on_worker_shutdown(**_: Any) -> None:
    """Cleanup browser pool when worker shuts down."""
    logger.info("Worker shutting down, closing browser pool")
    try:
        from app.properties.services.browser_pool import IBrowserPool

        pool = get_from_di_container(IBrowserPool)
        pool.close_all()
        logger.info("Browser pool closed successfully")
    except Exception as e:
        logger.exception(f"Error closing browser pool: {e}")


@signals.setup_logging.connect
def configure_logging(**_kwargs: Any) -> None:
    set_up_logging()
