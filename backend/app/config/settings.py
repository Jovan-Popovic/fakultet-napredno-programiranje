from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class DBSettings(BaseSettings):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_PORT: int = 5432
    POSTGRES_HOST: str

    model_config = SettingsConfigDict(
        env_file=".env", use_enum_values=True, extra="ignore"
    )


class Settings(DBSettings):
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173"]

    # Celery configuration
    CELERY_BROKER_URL: str = "redis://localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/0"
    SENTINEL_MASTER_NAME: str = "mymaster"

    # Browser pool configuration
    BROWSER_POOL_SIZE: int = 3
    BROWSER_POOL_TIMEOUT: int = 30  # seconds
    BROWSER_HEADLESS: bool = True
