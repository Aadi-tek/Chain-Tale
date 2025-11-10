from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.db.mongo import lifespan

settings = get_settings()


def create_app() -> FastAPI:
    application = FastAPI(
        title=settings.project_name,
        version="0.1.0",
        lifespan=lifespan,
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(api_router, prefix=settings.api_v1_prefix)

    @application.get("/healthz")
    async def health_check() -> dict[str, str]:
        return {"status": "ok"}

    return application


app = create_app()

