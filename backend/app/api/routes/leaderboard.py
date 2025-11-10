from __future__ import annotations

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.schemas.leaderboard import LeaderboardResponse
from app.services.leaderboard_service import LeaderboardService

router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])


def _leaderboard_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> LeaderboardService:
    return LeaderboardService(db)


@router.get("", response_model=LeaderboardResponse)
async def get_leaderboard(service: LeaderboardService = Depends(_leaderboard_service)):
    return await service.get_current_week()

