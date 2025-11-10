from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.schemas.tag import TagCreate, TagPublic
from app.services.tag_service import TagService

router = APIRouter(prefix="/tags", tags=["tags"])


def _tag_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> TagService:
    return TagService(db)


@router.get("", response_model=list[TagPublic])
async def list_tags(service: TagService = Depends(_tag_service)):
    return await service.list_tags()


@router.post("", response_model=TagPublic, status_code=status.HTTP_201_CREATED)
async def create_tag(
    payload: TagCreate,
    service: TagService = Depends(_tag_service),
    current_user=Depends(deps.get_current_user),
):
    _ = current_user  # placeholder for permission checks
    try:
        return await service.create_tag(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

