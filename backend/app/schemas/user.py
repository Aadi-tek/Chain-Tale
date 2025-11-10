from __future__ import annotations

from datetime import datetime
from typing import List

from pydantic import BaseModel, EmailStr, HttpUrl

from .common import MongoModel, PyObjectId


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserPublic(MongoModel, UserBase):
    joined_tags: List[PyObjectId] = []
    badges: List[str] = []
    streak_days: int = 0
    avatar_url: HttpUrl | None = None
    created_at: datetime

