from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.core import security
from app.core.config import get_settings
from app.schemas import auth as auth_schema
from app.schemas.user import UserPublic
from app.services.user_service import UserService

router = APIRouter(tags=["auth"])


def _user_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> UserService:
    return UserService(db)


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(payload: auth_schema.RegisterRequest, service: UserService = Depends(_user_service)):
    try:
        return await service.create_user(payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/login", response_model=auth_schema.TokenResponse)
async def login(payload: auth_schema.LoginRequest, service: UserService = Depends(_user_service)):
    user = await service.authenticate(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access = security.create_access_token(str(user["_id"]))
    refresh = security.create_refresh_token(str(user["_id"]))
    settings = get_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expires_minutes)
    return auth_schema.TokenResponse(access_token=access, refresh_token=refresh, expires_at=expires_at)


@router.get("/me", response_model=UserPublic)
async def read_current_user(current_user=Depends(deps.get_current_user)):
    joined_tags = [str(tag) for tag in current_user.get("joined_tags", [])]
    return UserPublic(
        id=str(current_user["_id"]),
        username=current_user["username"],
        email=current_user["email"],
        joined_tags=joined_tags,
        badges=current_user.get("badges", []),
        streak_days=current_user.get("streak_days", 0),
        avatar_url=current_user.get("avatar_url"),
        created_at=current_user.get("created_at", current_user["_id"].generation_time),
    )

