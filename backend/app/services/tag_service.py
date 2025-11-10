from __future__ import annotations

from typing import List

from motor.motor_asyncio import AsyncIOMotorDatabase

from app.schemas.tag import TagCreate, TagPublic


class TagService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["tags"]

    async def list_tags(self) -> List[TagPublic]:
        cursor = self.collection.find().sort("created_at", -1)
        tags = []
        async for doc in cursor:
            tags.append(
                TagPublic.model_validate(
                    {
                        "id": doc["_id"],
                        "name": doc["name"],
                        "description": doc.get("description"),
                        "created_at": doc.get("created_at", doc["_id"].generation_time),
                    }
                )
            )
        return tags

    async def create_tag(self, payload: TagCreate) -> TagPublic:
        existing = await self.collection.find_one({"name": payload.name})
        if existing:
            raise ValueError("Tag already exists")
        doc = {
            "name": payload.name,
            "description": payload.description,
        }
        result = await self.collection.insert_one(doc)
        doc["_id"] = result.inserted_id
        return TagPublic.model_validate(
            {
                "id": doc["_id"],
                "name": doc["name"],
                "description": doc.get("description"),
                "created_at": doc["_id"].generation_time,
            }
        )

