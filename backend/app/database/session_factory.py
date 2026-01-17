from __future__ import annotations

from typing import Protocol

from sqlalchemy import URL, Engine, create_engine
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy.pool import NullPool

from app.config.settings import DBSettings
from app.utils.di import inject


def construct_db_url(
    username: str, password: str, host: str, database: str, port: int
) -> URL:
    return URL.create(
        "postgresql+psycopg",
        username=username,
        password=password,
        host=host,
        database=database,
        port=port,
    )


class ISessionFactory(Protocol):
    url: URL
    engine: Engine

    def __call__(self) -> Session:
        """returns Session (connection) objects based on current thread"""


@inject(alias=ISessionFactory, singleton=True)
class SessionFactory(ISessionFactory):
    def __init__(self, settings: DBSettings):
        self.url = construct_db_url(
            username=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            host=settings.POSTGRES_HOST,
            database=settings.POSTGRES_DB,
            port=settings.POSTGRES_PORT,
        )
        self.engine = create_engine(self.url, poolclass=NullPool)

        session_maker = sessionmaker(bind=self.engine, autoflush=False)
        self._session_factory = scoped_session(session_maker)

    def __call__(self) -> Session:
        return self._session_factory()
