from __future__ import annotations

from typing import Any, TypedDict

from fastapi import HTTPException


class AppBaseException(Exception):
    def __init__(self, message: str, code: str) -> None:
        super().__init__(message)
        self.message = message
        self.code = code


class NotFoundException(AppBaseException):
    pass


class InvalidRequestException(AppBaseException):
    pass


class UnauthenticatedException(AppBaseException):
    pass


class ForbiddenException(AppBaseException):
    pass


class ConflictException(AppBaseException):
    pass


class ServerException(AppBaseException):
    pass


class HTTPExceptionWithCode(HTTPException):
    # override the default HTTPException to include a custom error code
    def __init__(
        self,
        status_code: int,
        detail: Any = None,
        headers: dict[str, str] | None = None,
        code: str = "",
    ) -> None:
        super().__init__(status_code=status_code, detail=detail, headers=headers)
        self.code = code
