from functools import lru_cache
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    project_name: str = "ChainTale API"
    api_v1_prefix: str = "/api/v1"

    mongo_uri: str
    mongo_db_name: str = "chaintale"

    jwt_secret_key: str
    jwt_refresh_secret_key: str | None = None
    jwt_algorithm: str = "HS256"
    access_token_expires_minutes: int = 30
    refresh_token_expires_minutes: int = 60 * 24 * 7

    cors_origins: List[str] = ["http://localhost:3000"]

    redis_url: str | None = None


    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_cors_origins(cls, value: List[str] | str) -> List[str]:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance."""
    return Settings()

