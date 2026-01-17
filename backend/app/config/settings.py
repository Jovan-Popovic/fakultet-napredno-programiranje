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
