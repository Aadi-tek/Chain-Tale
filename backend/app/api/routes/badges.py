from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.schemas.badge import BadgeCreate, BadgePublic
from app.services.badge_service import BadgeService

router = APIRouter(prefix="/badges", tags=["badges"])


def _badge_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> BadgeService:
    return BadgeService(db)


@router.get("", response_model=list[BadgePublic])
async def list_badges(service: BadgeService = Depends(_badge_service)):
    return await service.list_badges()


@router.post("", response_model=BadgePublic, status_code=status.HTTP_201_CREATED)
async def create_badge(
    payload: BadgeCreate,
    service: BadgeService = Depends(_badge_service),
    current_user=Depends(deps.get_current_user),
):
    _ = current_user
    try:
        return await service.create_badge(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

