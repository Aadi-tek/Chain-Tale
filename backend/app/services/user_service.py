from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.core.security import get_password_hash, verify_password
from app.schemas.user import UserCreate, UserPublic


class UserService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["users"]

    async def create_user(self, payload: UserCreate) -> UserPublic:
        existing = await self.collection.find_one({"email": payload.email})
        if existing:
            raise ValueError("Email already registered")
        created_at = datetime.now(timezone.utc)
        document: dict[str, Any] = {
            "username": payload.username,
            "email": payload.email,
            "password_hash": get_password_hash(payload.password),
            "joined_tags": [],
            "badges": [],
            "streak_days": 0,
            "created_at": created_at,
        }
        result = await self.collection.insert_one(document)
        document["_id"] = result.inserted_id
        return UserPublic.model_validate(
            {
                "id": document["_id"],
                "username": document["username"],
                "email": document["email"],
                "joined_tags": document["joined_tags"],
                "badges": document["badges"],
                "streak_days": document["streak_days"],
                "avatar_url": None,
                "created_at": created_at,
            }
        )

    async def authenticate(self, email: str, password: str) -> dict[str, Any] | None:
        user = await self.collection.find_one({"email": email})
        if not user:
            return None
        if not verify_password(password, user["password_hash"]):
            return None
        return user

