#!/usr/bin/env python

from __future__ import annotations

import sys
import time
from argparse import ArgumentParser
from logging import INFO, basicConfig
from pathlib import Path
from typing import Any, ClassVar

from app.config.settings import DBSettings, Settings
from app.database.import_sqlalchemy_models import load_all_models
from app.utils import logging
from app.utils.di import add_to_di_container, get_from_di_container
from dotenv import load_dotenv

logger = logging.getLogger(__name__)


class BaseCommand:
    name: ClassVar[str]
    description: ClassVar[str] = ""

    def add_arguments(self, parser: ArgumentParser) -> None:
        pass

    def handle(self, *args: Any, **kwargs: Any) -> None:
        """
        The actual logic of the command. Subclasses must implement this method. kwargs are all arguments you add in add_arguments()
        """
        raise NotImplementedError(
            "subclasses of BaseCommand must provide a handle() method"
        )


class CommandRunner:
    commands: list[type[BaseCommand]]
    description: str

    def __init__(self, commands: list[type[BaseCommand]], description: str):
        self.commands = commands
        self.description = description

    def execute(self, args: list[str]) -> None:
        parser = ArgumentParser(description=self.description)
        subparsers = parser.add_subparsers(
            dest="command", help="Command to run", required=True
        )
        for command_class in self.commands:
            command_name = getattr(
                command_class, "name", command_class.__name__.lower()
            )
            subparser = subparsers.add_parser(
                command_name, description=command_class.description
            )
            command = command_class()
            command.add_arguments(subparser)
            subparser.set_defaults(func=command.handle)

        parsed_args = parser.parse_args(args)
        subcommand_args = vars(parsed_args).copy()
        subcommand_args.pop("command", None)
        subcommand_args.pop("func", None)
        parsed_args.func(**subcommand_args)


class RunServer(BaseCommand):
    name = "runserver"
    description = "run dev server"

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument(
            "-p", "--port", dest="port", type=int, default=8000, help="listening port"
        )
        parser.add_argument(
            "-H",
            "--host",
            dest="host",
            type=str,
            default="127.0.0.1",
            help="host address",
        )

    def handle(self, port: int, host: str) -> None:
        import uvicorn

        uvicorn.run("app.main:app", reload=True, port=port, host=host)


class Typecheck(BaseCommand):
    name = "typecheck"
    description = "typecheck project"

    def handle(self) -> None:
        from mypy.api import run as run_mypy

        run_mypy(["."])


class MakeMigrations(BaseCommand):
    name = "makemigrations"
    description = "make migrations"

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument("name", type=str, help="name of migration")
        parser.add_argument(
            "--empty",
            action="store_true",
            help="generate empty migration",
        )

    def handle(self, name: str, empty: bool = False) -> None:
        import alembic.config

        if not empty:
            alembic_args = ["revision", "--autogenerate", "-m", name]
        else:
            alembic_args = ["revision", "-m", name]
        alembic.config.main(argv=alembic_args)


class Migrate(BaseCommand):
    name = "migrate"
    description = "run migrations"

    def handle(self) -> None:
        import alembic.config

        alembic_args = [
            "upgrade",
            "head",
        ]
        alembic.config.main(argv=alembic_args)


class CeleryBeat(BaseCommand):
    name = "celerybeat"
    description = "run celery beat scheduler"

    def handle(self) -> None:
        import subprocess
        import sys

        subprocess.run(
            [
                sys.executable,
                "-m",
                "celery",
                "-A",
                "app.celery.celery_app",
                "beat",
                "--loglevel=info",
            ]
        )


class CeleryWorker(BaseCommand):
    name = "celeryworker"
    description = "run celery worker"

    def handle(self) -> None:
        import subprocess
        import sys

        subprocess.run(
            [
                sys.executable,
                "-m",
                "celery",
                "-A",
                "app.celery.celery_app",
                "worker",
                "--loglevel=info",
            ]
        )


class CeleryFlower(BaseCommand):
    name = "celeryflower"
    description = "run celery flower"

    def handle(self) -> None:
        import subprocess
        import sys

        subprocess.run(
            [
                sys.executable,
                "-m",
                "celery",
                "-A",
                "app.celery.celery_app",
                "flower",
            ]
        )


def configure_settings() -> None:
    # Configure logging
    basicConfig(level=INFO)

    # Initialize DI container
    env_path = Path(".env")
    load_dotenv(dotenv_path=env_path)

    settings = Settings()
    add_to_di_container(Settings, settings)
    add_to_di_container(DBSettings, settings)

    # Load all models for SQLAlchemy
    load_all_models()


def main(args: list[str]) -> None:
    CommandRunner(
        commands=[
            RunServer,
            Typecheck,
            MakeMigrations,
            Migrate,
            CeleryBeat,
            CeleryWorker,
            CeleryFlower,
        ],
        description="Project management commands",
    ).execute(args)


def poetry_start() -> None:
    """Launched with `poetry run start` at root level"""
    main(["runserver", *sys.argv[1:]])


def poetry_test() -> None:
    """Launched with `poetry run test` at root level"""
    main(["test", *sys.argv[1:]])


def poetry_typecheck() -> None:
    """Launched with `poetry run typecheck` at root level"""
    main(["typecheck", *sys.argv[1:]])


def poetry_migrate() -> None:
    """Launched with `poetry run migrate` at root level"""
    main(["migrate", *sys.argv[1:]])


def poetry_celerybeat() -> None:
    """Launched with `poetry run celerybeat` at root level"""
    main(["celerybeat", *sys.argv[1:]])


def poetry_celeryworker() -> None:
    """Launched with `poetry run celeryworker` at root level"""
    main(["celeryworker", *sys.argv[1:]])


def poetry_celeryflower() -> None:
    """Launched with `poetry run celeryflower` at root level"""
    main(["celeryflower", *sys.argv[1:]])


if __name__ == "__main__":
    main(sys.argv[1:])
