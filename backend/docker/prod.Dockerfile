FROM public.ecr.aws/docker/library/python:3.13-slim-bookworm as python-base

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on

#==============================================================================

FROM python-base as deps

ARG POETRY_VERSION=2.1.3

RUN python -m venv /venv

ENV POETRY_HOME="/venv/bin/poetry" \
    PATH="/venv/bin:$PATH" \
    POETRY_VIRTUALENVS_IN_PROJECT=true

RUN pip install poetry==${POETRY_VERSION}

WORKDIR /home/user/fakultet-napredno-programiranje

COPY poetry.lock pyproject.toml ./

RUN poetry install --no-root --without dev --with prod

#==============================================================================

FROM python-base as api

RUN useradd --create-home user

USER user

WORKDIR /home/user/fakultet-napredno-programiranje

ENV PATH="/home/user/fakultet-napredno-programiranje/.venv/bin:$PATH"

COPY --chown=user:user docker/entrypoint.sh .
COPY --from=deps --chown=user:user /home/user/fakultet-napredno-programiranje/.venv .venv
COPY --chown=user:user alembic.ini alembic.ini
COPY --chown=user:user manage.py manage.py
COPY --chown=user:user alembic alembic
COPY --chown=user:user app app

ENTRYPOINT ["bash","/home/user/fakultet-napredno-programiranje/entrypoint.sh"]

EXPOSE 8000
