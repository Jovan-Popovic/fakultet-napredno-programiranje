from __future__ import annotations

from logging.config import fileConfig
from pathlib import Path

import alembic_postgresql_enum
from sqlalchemy import engine_from_config, pool

from alembic import context
from alembic.script import write_hooks
from app.config.settings import DBSettings
from app.database import Base
from app.database.import_sqlalchemy_models import load_all_models
from app.database.session_factory import construct_db_url

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

alembic_postgresql_enum.set_configuration(
    alembic_postgresql_enum.Config(
        add_type_ignore=True,
    )
)

imported_models = load_all_models()

for names in imported_models:
    globals().update(names)

settings = DBSettings()  # validates db env variables

url = construct_db_url(
    username=settings.POSTGRES_USER,
    password=settings.POSTGRES_PASSWORD,
    host=settings.POSTGRES_HOST,
    database=settings.POSTGRES_DB,
    port=settings.POSTGRES_PORT,
)

config.set_main_option("sqlalchemy.url", url.render_as_string(hide_password=False))

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()


@write_hooks.register(
    "custom_enum"
)  # in alembic versions replace our custom enum with sqlalchemy's Enum
def custom_enum(filename: str, _options: dict[str, str]) -> None:
    lines: list[str] = []
    with Path(filename).open() as file:
        lines.extend(line.replace("app.database.enum.Enum", "sa.Enum") for line in file)
    with Path(filename).open("w") as file:
        file.write("".join(lines))
