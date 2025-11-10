from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.schemas.story import CommentCreate, LineCreate, StoryPublic, VoteRequest
from app.services.story_service import StoryService

router = APIRouter(prefix="/story", tags=["stories"])


def _story_service(db: AsyncIOMotorDatabase = Depends(deps.get_db)) -> StoryService:
    return StoryService(db)


@router.get("/{tag_id}", response_model=StoryPublic | None)
async def get_story(tag_id: str, service: StoryService = Depends(_story_service)):
    return await service.get_active_story(tag_id)


@router.post("/{tag_id}/add-line", response_model=StoryPublic, status_code=status.HTTP_201_CREATED)
async def add_line(
    tag_id: str,
    payload: LineCreate,
    service: StoryService = Depends(_story_service),
    current_user=Depends(deps.get_current_user),
):
    try:
        return await service.add_line(tag_id, str(current_user["_id"]), payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/line/{line_id}/vote", status_code=status.HTTP_200_OK)
async def vote_line(
    line_id: str,
    payload: VoteRequest,
    service: StoryService = Depends(_story_service),
    current_user=Depends(deps.get_current_user),
):
    _ = current_user
    try:
        upvotes = await service.vote_line(line_id, payload.direction)
        return {"upvotes": upvotes}
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/line/{line_id}/comment", status_code=status.HTTP_201_CREATED)
async def comment_on_line(
    line_id: str,
    payload: CommentCreate,
    service: StoryService = Depends(_story_service),
    current_user=Depends(deps.get_current_user),
):
    try:
        comment = await service.add_comment(line_id, str(current_user["_id"]), payload)
        return comment
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc

