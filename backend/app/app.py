from __future__ import annotations

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config.settings import Settings
from app.database.import_sqlalchemy_models import load_all_models
from app.routes import api_router
from app.utils.di import get_from_di_container
from app.utils.exceptions import (
    ConflictException,
    ForbiddenException,
    HTTPExceptionWithCode,
    InvalidRequestException,
    NotFoundException,
    ServerException,
    UnauthenticatedException,
)


def add_exception_handlers(app: FastAPI, settings: Settings) -> None:
    @app.exception_handler(NotFoundException)
    def not_found_exception_handler(
        _request: Request, exc: NotFoundException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": exc.message, "code": exc.code},
        )

    @app.exception_handler(InvalidRequestException)
    def invalid_request_exception_handler(
        _request: Request, exc: InvalidRequestException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": exc.message, "code": exc.code},
        )

    @app.exception_handler(UnauthenticatedException)
    def unauthenticated_exception_handler(
        _request: Request, _exc: InvalidRequestException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "detail": "Not authenticated",
                "code": "not_authenticated",
            },  # we ignore the exception details so we don't leak sensitive information
            headers={"WWW-Authenticate": "Bearer"},
        )

    @app.exception_handler(ForbiddenException)
    def forbidden_exception_handler(
        _request: Request, exc: InvalidRequestException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"detail": exc.message, "code": exc.code},
        )

    @app.exception_handler(ConflictException)
    def conflict_exception_handler(
        _request: Request, exc: InvalidRequestException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content={"detail": exc.message, "code": exc.code},
        )

    @app.exception_handler(ServerException)
    def server_exception_handler(
        _request: Request, exc: InvalidRequestException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": exc.message, "code": exc.code},
        )

    @app.exception_handler(HTTPExceptionWithCode)
    def http_exception_handler(
        _request: Request, exc: HTTPExceptionWithCode
    ) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail, "code": exc.code},
            headers=exc.headers or {},
        )

    # fastapi's default exception handler doesn't send CORS headers
    # (because it removes all headers that were set by other middleware)
    @app.exception_handler(Exception)
    async def default_exception_handler(
        request: Request, _exc: Exception
    ) -> JSONResponse:
        origin = request.headers.get("Origin", "")
        headers = None
        if origin in settings.ALLOWED_ORIGINS:
            headers = {
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Credentials": "true",
            }
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal Server Error"},
            headers=headers,
        )


def setup_middleware(app: FastAPI, settings: Settings) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_methods=["*"],
        allow_headers=["*"],
    )


def setup_app() -> FastAPI:
    app = FastAPI(
        redirect_slashes=False,
    )

    app.include_router(api_router)

    load_all_models()

    settings = get_from_di_container(Settings)

    add_exception_handlers(app, settings)

    setup_middleware(app, settings)

    return app
