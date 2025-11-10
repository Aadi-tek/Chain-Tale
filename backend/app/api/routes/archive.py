from __future__ import annotations

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.schemas.story import StoryPublic
from app.services.story_service import StoryService

router = APIRouter(prefix="/archive", tags=["archive"])


def _story_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> StoryService:
    return StoryService(db)


@router.get("", response_model=list[StoryPublic])
async def list_archived_stories(service: StoryService = Depends(_story_service)):
    return await service.list_archived()

