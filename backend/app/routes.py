from __future__ import annotations

from fastapi import APIRouter

from app.properties.router import router as properties_router

api_router = APIRouter(prefix="/api")

# Include routers
api_router.include_router(properties_router)
