from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from .common import MongoModel


class TagCreate(BaseModel):
    name: str
    description: Optional[str] = None


class TagPublic(MongoModel):
    name: str
    description: str | None = None
    created_at: datetime

