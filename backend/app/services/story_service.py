from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo import ReturnDocument

from app.schemas.story import CommentCreate, LineCreate, StoryPublic


class StoryService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db["stories"]

    async def get_active_story(self, tag_id: str) -> StoryPublic | None:
        document = await self.collection.find_one({"tag_id": ObjectId(tag_id), "is_archived": False})
        if not document:
            return None
        return StoryPublic.model_validate(
            {
                "id": document["_id"],
                "tag_id": document["tag_id"],
                "title": document.get("title", "Untitled Tale"),
                "lines": document.get("lines", []),
                "word_count": document.get("word_count", 0),
                "created_at": document.get("created_at", document["_id"].generation_time),
                "is_archived": document.get("is_archived", False),
            }
        )

    async def add_line(self, tag_id: str, user_id: str, payload: LineCreate) -> StoryPublic:
        now = datetime.now(timezone.utc)
        update = {
            "$setOnInsert": {
                "title": "Untitled Tale",
                "tag_id": ObjectId(tag_id),
                "created_at": now,
                "is_archived": False,
                "word_count": 0,
                "lines": [],
            },
            "$push": {
                "lines": {
                    "id": ObjectId(),
                    "user_id": ObjectId(user_id),
                    "content": payload.content,
                    "timestamp": now,
                    "upvotes": 0,
                    "comments": [],
                }
            },
            "$inc": {"word_count": len(payload.content.split())},
        }
        result = await self.collection.find_one_and_update(
            {"tag_id": ObjectId(tag_id), "is_archived": False},
            update,
            upsert=True,
            return_document=ReturnDocument.AFTER,
        )
        if not result:
            raise ValueError("Failed to create or update story")
        return StoryPublic.model_validate(result)

    async def add_comment(self, line_id: str, user_id: str, payload: CommentCreate) -> dict[str, Any]:
        comment_doc = {
            "user_id": ObjectId(user_id),
            "text": payload.text,
            "timestamp": datetime.now(timezone.utc),
        }
        result = await self.collection.find_one_and_update(
            {"lines.id": ObjectId(line_id)},
            {"$push": {"lines.$.comments": comment_doc}},
            return_document=ReturnDocument.AFTER,
        )
        if not result:
            raise ValueError("Line not found")
        return comment_doc

    async def vote_line(self, line_id: str, direction: int) -> int:
        if direction not in (-1, 1):
            raise ValueError("Invalid vote direction")
        result = await self.collection.find_one_and_update(
            {"lines.id": ObjectId(line_id)},
            {"$inc": {"lines.$.upvotes": direction}},
            return_document=ReturnDocument.AFTER,
        )
        if not result:
            raise ValueError("Line not found")
        for line in result.get("lines", []):
            if str(line.get("id")) == line_id:
                return line.get("upvotes", 0)
        raise ValueError("Line not found")

    async def list_archived(self) -> list[StoryPublic]:
        cursor = self.collection.find({"is_archived": True}).sort("created_at", -1)
        stories: list[StoryPublic] = []
        async for doc in cursor:
            stories.append(StoryPublic.model_validate(doc))
        return stories

