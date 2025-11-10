from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, HttpUrl

from .common import MongoModel


class BadgeCreate(BaseModel):
    name: str
    description: str
    icon_url: HttpUrl | None = None


class BadgePublic(MongoModel):
    name: str
    description: str
    icon_url: HttpUrl | None = None
    created_at: datetime | None = None

