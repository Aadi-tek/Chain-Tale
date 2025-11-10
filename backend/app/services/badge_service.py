from __future__ import annotations

from typing import List

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.badge import BadgeCreate, BadgePublic


class BadgeService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["badges"]

    async def list_badges(self) -> List[BadgePublic]:
        cursor = self.collection.find().sort("name", 1)
        badges: List[BadgePublic] = []
        async for doc in cursor:
            badges.append(
                BadgePublic.model_validate(
                    {
                        "id": doc["_id"],
                        "name": doc["name"],
                        "description": doc["description"],
                        "icon_url": doc.get("icon_url"),
                        "created_at": doc.get("created_at"),
                    }
                )
            )
        return badges

    async def create_badge(self, payload: BadgeCreate) -> BadgePublic:
        doc = payload.model_dump()
        result = await self.collection.insert_one(doc)
        doc["_id"] = result.inserted_id
        return BadgePublic.model_validate(
            {
                "id": doc["_id"],
                "name": doc["name"],
                "description": doc["description"],
                "icon_url": doc.get("icon_url"),
                "created_at": doc["_id"].generation_time,
            }
        )

